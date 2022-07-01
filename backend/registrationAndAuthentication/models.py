from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import validate_comma_separated_integer_list

# Create your models here.
class RainUserManager(BaseUserManager):
    def create_user(self, username, password, first_name, middle_initial, last_name, phone, fax, role, site, department):
        if not username:
            raise ValueError("Username is required.")
        if not password:
            raise ValueError("Password is required.")
        if not first_name:
            raise ValueError("First Name is required.")
        if not last_name:
            raise ValueError("Last Name is required.")
        if not phone:
            raise ValueError("phone is required.")
        if not role:
            raise ValueError("Role is required.")

        user = self.model(
            username       = self.normalize_email(email),
            first_name     = self.first_name,
            middle_initial = self.middle_initial,
            last_name      = self.last_name,
            phone          = self.phone,
            fax            = self.fax,
            role           = self.role,
            site           = self.site,
            department     = self.department,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self):
        superuser = self.create_user()
        user.save(using=self._db)
        return superuser

class RainUser(AbstractBaseUser):
    username          = models.CharField(max_length=140, unique=True)
    password          = models.CharField(max_length=140, blank=True)
    first_name        = models.CharField(max_length=140)
    middle_initial    = models.CharField(max_length=1, blank=True)
    last_name         = models.CharField(max_length=140)
    phone             = models.CharField(max_length=10)
    fax               = models.CharField(max_length=10, blank=True)
    role              = models.CharField(max_length=2)
    site              = models.CharField(max_length=140, blank=True)
    department        = models.CharField(max_length=140, blank=True)
    register_at       = models.DateTimeField(auto_now_add=True)
    last_login        = models.DateTimeField(auto_now=True)
    is_active         = models.BooleanField(default=True)

    # fields have to be added to support custom user model
    # isAdmin         = models.BooleanField(default=False)
    # isStaff         = models.BooleanField(default=False)
    # isSuperuser     = models.BooleanField(default=False)


    USERNAME_FIELD  = 'username'
    REQUIRED_FIELDS = ['password', 'first_name', 'last_name', 'phone', 'role']

    objects = RainUserManager()

    # functions have to be added to support custom user model
    def has_perm(self, perm, obj=None):
        return self.isAdmin

    def has_module_perms(self, app_label):
        return True