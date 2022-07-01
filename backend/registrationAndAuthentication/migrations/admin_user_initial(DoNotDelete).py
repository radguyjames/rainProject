import django.core.validators
from django.db import migrations, models
import re


class Migration(migrations.Migration):

    initial = True

    def create_admin_user(apps, schema_editor):
        rainUser = apps.get_model("registrationAndAuthentication", "RainUser")
        admin = rainUser(
            username= "admin@rain.ai",
            password= "Password01!",
            first_name= "Admin",
            middle_initial= "",
            last_name= "User",
            phone= "9999999999",
            fax= "",
            role= "-2",
            site= "0,1,2,3,4,5",
            department= "0,1,2,3,4,5",
            )
        admin.save()

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='RainUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.EmailField(max_length=140, unique=True)),
                ('password', models.CharField(max_length=140)),
                ('first_name', models.CharField(max_length=140)),
                ('middle_initial', models.CharField(blank=True, max_length=1)),
                ('last_name', models.CharField(max_length=140)),
                ('phone', models.CharField(max_length=10)),
                ('fax', models.CharField(blank=True, max_length=10)),
                ('role', models.CharField(max_length=2)),
                ('site', models.CharField(blank=True, max_length=40, validators=[django.core.validators.RegexValidator(re.compile('^\\d+(?:,\\d+)*\\Z'), code='invalid', message='Enter only digits separated by commas.')])),
                ('department', models.CharField(blank=True, max_length=40, validators=[django.core.validators.RegexValidator(re.compile('^\\d+(?:,\\d+)*\\Z'), code='invalid', message='Enter only digits separated by commas.')])),
                ('register_at', models.DateTimeField(auto_now_add=True)),
                ('last_login', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.RunPython(create_admin_user),
    ]