from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import registerSerializer, loginSerializer, getUsernameExistsSerializer
from .models import RainUser
from backend.siteManagement.models import SiteSettings
import ldap

# GetUsernameExists API
class getUsernameExistsAPI(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        existingUsernames = [rainuser.username for rainuser in RainUser.objects.all()]
        
        requestUsername = request.data.get('username')

        userExists = False

        for username in existingUsernames:
            if username == requestUsername:
                userExists = True
                break
            else:
                userExists = False

        if userExists:
            serializer = getUsernameExistsSerializer(RainUser.objects.get(username=requestUsername))
            userExists = serializer.data
        return Response({"objUsernameExists": userExists})

# Register API
class registerAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    serializer_class = registerSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        newUser = serializer.save()

        return Response({
            "objLoggedInUser": registerSerializer(newUser, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(newUser)[1]
        })

    def get(self, request):
        users = RainUser.objects.all()
        # The many param informs the serializer it will be serializing more than one requisition.
        serializer = registerSerializer(users, many=True)
        return Response({"objLoggedInUser": serializer.data})

class userManagementAPI(generics.GenericAPIView):
    queryset = RainUser.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = loginSerializer

    def get(self, request):
        if request.GET.get('role') == '100':
            users = RainUser.objects.filter(username__icontains = request.GET.get('username'))
        else:
            users = RainUser.objects.filter(username__icontains = request.GET.get('username')).filter( role = request.GET.get('role'))

        serializer = loginSerializer(users, many=True)
        return Response({"objUsers": serializer.data})

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        newUser = serializer.save()

        return Response({
            "objNewUser": loginSerializer(newUser, context=self.get_serializer_context()).data,
        })
    
    def put(self, request, *args, **kwargs):
        
        id = request.data.get('id')
        targetUser = RainUser.objects.get(id=id)
        
        if(request.data.get('mode') == "toggle"):
            newStatus = {'is_active' : not targetUser.is_active}
            serializer = loginSerializer(instance=targetUser, data=newStatus, partial=True)
            if serializer.is_valid(raise_exception=True):
                targetUser_saved = serializer.save()
                return Response({"success": "User '{}' updated successfully".format(targetUser_saved.id)})
        else:
            data = request.data
            serializer = loginSerializer(
                instance=targetUser, data=data, partial=True)
            if serializer.is_valid(raise_exception=True):
                targetUser_saved = serializer.save()
                return Response({"success": "User '{}' updated successfully".format(targetUser_saved.id)})

    def delete(self, request):
        id = request.GET.get('id')
        targetUser = RainUser.objects.get(id=id)
        print(targetUser.role)
        if targetUser.role != "-2":
            targetUser.delete()
            return Response({"success": "User deleted"})
        else:
            return Response("Cannot delete admin user. Please change user role before deleting.", status=status.HTTP_400_BAD_REQUEST)

class ldapLoginAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    serializer_class = loginSerializer

    def post(self, request, *args, **kwargs):       
        loginUsername = request.data.get('username')
        loginPassword = request.data.get('password')

        settings = SiteSettings.objects.first()

        ldap_server_address = 'ldap://' + settings.LDAPServerAddress
        ldap_user_directory = settings.LDAPUserDirectory

        try:
            rainUser = RainUser.objects.get(username=loginUsername)
            
            if(not rainUser.is_active):
                raise Exception("This user account is not active. Please contact a system administrator.")

            user_dn = f'uid={loginUsername},' + ldap_user_directory
            user_pw = loginPassword
            
            connection = ldap.initialize(ldap_server_address)
            ldap_response = connection.bind_s(user_dn, user_pw)
            
            return Response({
            "objLoggedInUser": loginSerializer(rainUser, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(rainUser)[1]
            })

        except ldap.INVALID_CREDENTIALS:
            return Response("Invalid LDAP username or password", status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(e.args[0], status=status.HTTP_400_BAD_REQUEST)


# Login API
class loginAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    serializer_class = loginSerializer

    def post(self, request, *args, **kwargs):       
        loginUsername = request.data.get('username')
        loginPassword = request.data.get('password')

        try:
            rainUser = RainUser.objects.get(username=loginUsername)
        except:
            return Response("Invalid login credentials", status=status.HTTP_400_BAD_REQUEST)

        if (not rainUser.is_active):
            return Response("This user account is not active. Please contact a system administrator.", status=status.HTTP_400_BAD_REQUEST)
        
        if (not rainUser.password):
            return Response("Simple login not valid for this user", status=status.HTTP_400_BAD_REQUEST)

        if rainUser.password == loginPassword:
            return Response({
            "objLoggedInUser": loginSerializer(rainUser, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(rainUser)[1]
            })
        else:
            return Response("Invalid login credentials", status=status.HTTP_400_BAD_REQUEST)
    
    # def get(self, request, *args, **kwargs):
    #     rainUser = RainUser.objects.get_object()
    #     serializer = loginSerializer(rainUser)
    #     return Response({"objLoggedInUser": serializer.data})
