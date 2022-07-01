from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):

    initial = True

    dependencies = []

    def create_MRI_form(apps, schema_editor):
        # MRI form
        MRIForm = apps.get_model("formManagement", "RainForm")
        MRI = MRIForm(
            strFormName = "MRI",
            strModality = "MRI",
            boolEnabled = True,
        )
        MRI.save()

        # MRI form - Outpatient field
        MRIForm_Outpatient = apps.get_model("formManagement", "RainFormField")
        Outpatient = MRIForm_Outpatient(
            strFieldName = "Outpatient",
            strFieldValue = "",
            objAssociatedForm = MRI
        )
        Outpatient.save()

        # MRI form - Outpatient field - Validation rule
        MRIForm_Outpatient_ValidationRule = apps.get_model("formManagement", "RainFormFieldValidationRule")
        Outpatient_ValidationRule = MRIForm_Outpatient_ValidationRule(          
            boolRequired = True,
            boolAttachmentSupported = False,
            boolAttachmentRequired = False,
            boolBypassAllowed = False,
            objFieldRules = Outpatient
        )
        Outpatient_ValidationRule.save()
        
    operations = [
        migrations.CreateModel(
            name='RainForm',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('strFormName', models.CharField(max_length=200)),
                ('strModality', models.CharField(max_length=200)),
                ('boolEnabled', models.BooleanField()),
                ('dateCreated_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='RainFormField',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('strFieldName', models.CharField(max_length=200)),
                ('strFieldValue', models.CharField(blank=True, max_length=2000)),
                ('objAssociatedForm', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='formfield', to='formManagement.RainForm')),
            ],
        ),
        migrations.CreateModel(
            name='RainFormFieldValidationRule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('boolRequired', models.BooleanField()),
                ('boolAttachmentSupported', models.BooleanField()),
                ('boolAttachmentRequired', models.BooleanField()),
                ('boolBypassAllowed', models.BooleanField()),
                ('objFieldRules', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='fieldrules', to='formManagement.RainFormField')),
            ],
        ),
        migrations.RunPython(create_MRI_form),
    ]
