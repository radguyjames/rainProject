from django.test import TestCase
from .models import CustomRequisition


# Create your tests here.
class CustomRequisitionTestCase(TestCase):
    def setUp(self):
        CustomRequisition.objects.create(clinicalInformation="History of headaches, rule out TIA",
                                         patientFirstName="Paulie",
                                         patientLastName="Smith",
                                         phin="",
                                         weight=0,
                                         height=0,
                                         anatomicalLocation="Neuro",
                                         subLocation="Brain")

    def test_requisition(self):
        """Requisition that can"""
        ambulatory = CustomRequisition.objects.get(patientFirstName="Paulie")
        self.assertEqual(ambulatory, 'Ambulatory')
