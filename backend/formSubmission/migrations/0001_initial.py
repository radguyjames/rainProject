# Generated by Django 3.1.3 on 2022-04-22 21:14

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import re


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CalendarEvent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('startDateTime', models.DateTimeField()),
                ('endDateTime', models.DateTimeField()),
                ('earlyComplete', models.BooleanField(blank=True, default=False)),
                ('scanner', models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='CustomRequisition',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('clinicalInformation', models.CharField(blank=True, max_length=1500)),
                ('urgency', models.IntegerField(default=4, validators=[django.core.validators.RegexValidator(re.compile('^\\d+(?:,\\d+)*\\Z'), code='invalid', message='Enter only digits separated by commas.')])),
                ('priority', models.IntegerField(default=10, validators=[django.core.validators.RegexValidator(re.compile('^\\d+(?:,\\d+)*\\Z'), code='invalid', message='Enter only digits separated by commas.')])),
                ('dateCreated', models.DateTimeField(auto_now_add=True)),
                ('patientFirstName', models.CharField(max_length=50)),
                ('patientLastName', models.CharField(max_length=50)),
                ('phin', models.CharField(max_length=9)),
                ('weight', models.DecimalField(decimal_places=2, max_digits=10)),
                ('height', models.DecimalField(decimal_places=2, max_digits=10)),
                ('ward', models.CharField(default='', max_length=100)),
                ('clinician', models.CharField(default='Doctor', max_length=50)),
                ('gender', models.CharField(default='male', max_length=10)),
                ('dob', models.DateField(default='2000-12-12')),
                ('feedback', models.CharField(blank=True, max_length=1500)),
                ('additionalComments', models.CharField(blank=True, max_length=1500)),
            ],
        ),
        migrations.CreateModel(
            name='FinishProtocol',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('startDateTime', models.DateTimeField()),
                ('endDateTime', models.DateTimeField()),
                ('suggestedProtocol', models.CharField(max_length=1500)),
                ('timing', models.IntegerField(blank=True)),
                ('approvalLevel', models.CharField(max_length=200)),
                ('confidence', models.FloatField(blank=True, default=0)),
                ('sequences', models.CharField(blank=True, default='', max_length=1500)),
                ('clinicalInformation', models.CharField(blank=True, max_length=1500)),
                ('urgency', models.IntegerField(validators=[django.core.validators.RegexValidator(re.compile('^\\d+(?:,\\d+)*\\Z'), code='invalid', message='Enter only digits separated by commas.')])),
                ('priority', models.IntegerField(validators=[django.core.validators.RegexValidator(re.compile('^\\d+(?:,\\d+)*\\Z'), code='invalid', message='Enter only digits separated by commas.')])),
                ('dateCreated', models.DateTimeField()),
                ('patientFirstName', models.CharField(max_length=50)),
                ('patientLastName', models.CharField(max_length=50)),
                ('phin', models.CharField(max_length=9)),
                ('weight', models.DecimalField(decimal_places=2, max_digits=10)),
                ('height', models.DecimalField(decimal_places=2, max_digits=10)),
                ('ward', models.CharField(default='', max_length=100)),
                ('anatomicalLocation', models.CharField(max_length=20)),
                ('subLocation', models.CharField(max_length=20)),
                ('clinician', models.CharField(default='Doctor', max_length=50)),
                ('gender', models.CharField(default='male', max_length=10)),
                ('dob', models.DateField(default='2000-12-12')),
                ('feedback', models.CharField(blank=True, max_length=1500)),
                ('additionalComments', models.CharField(blank=True, max_length=1500)),
                ('isolationPrecaution', models.CharField(blank=True, max_length=200)),
                ('mobilityRequirement', models.CharField(blank=True, max_length=200)),
                ('sedationRequirement', models.CharField(blank=True, max_length=200)),
                ('sedationRequirement_message', models.CharField(blank=True, max_length=1500)),
                ('deniedMessage', models.CharField(blank=True, max_length=1500)),
            ],
        ),
        migrations.CreateModel(
            name='ScheduleProtocol',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('suggestedProtocol', models.CharField(blank=True, max_length=1500)),
                ('timing', models.IntegerField(blank=True)),
                ('approvalLevel', models.CharField(max_length=200)),
                ('confidence', models.FloatField(blank=True, default=0)),
                ('sequences', models.CharField(blank=True, max_length=1500)),
            ],
        ),
        migrations.CreateModel(
            name='ScheduleProtocolProtocolConnector',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='sortParam',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(default='', max_length=200)),
                ('sortParam', models.CharField(default='', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='ScheduleProtocolSequenceConnector',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('scheduleProtocolID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='formSubmission.scheduleprotocol')),
            ],
        ),
    ]