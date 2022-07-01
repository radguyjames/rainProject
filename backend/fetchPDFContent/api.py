from rest_framework.views import APIView
from rest_framework import permissions
from .serializers import FileSerializer
from rest_framework.response import Response

from django.http import JsonResponse

import pdfminer

from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
from pdfminer.psparser import PSLiteral
from pdfminer.pdftypes import resolve1

import os
import shutil

class FetchPDFContentAPI(APIView):
    permissions_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()

            filepath=str(file_serializer.data['file'])
            fp = open(filepath, 'rb')
            parser = PDFParser(fp)
            doc = PDFDocument(parser)

            try:
                fields = resolve1(doc.catalog['AcroForm'])['Fields']
                keys=[]
                values=[]
                pdfcontents={}
                string=""
                for i in fields:
                    field = resolve1(i)
                    name, value = field.get('T'), field.get('V')
                    name = name.decode('utf-8')
                    if isinstance(value, bytes):
                        value = value.decode('utf-8')
                    if isinstance(value, PSLiteral):
                        value = value.name
                    keys.append(name)
                    values.append(value)
            
                pdfcontents=dict(zip(keys, values))
                
                fp.close()
                os.remove(filepath)
                # shutil.rmtree("./uploads")
                return Response(pdfcontents)
            except:
                fp.close()
                os.remove(filepath)
                return Response({"formType": "unsupported"})

        else:
            return Response(file_serializer.errors)