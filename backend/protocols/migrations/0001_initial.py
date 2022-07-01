# Generated by Django 3.1.3 on 2022-04-22 21:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('keywords', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExamCode',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('examCode', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Protocol',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('protocol', models.CharField(max_length=200)),
                ('examTime', models.IntegerField(blank=True, default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Sequence',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sequence', models.CharField(max_length=200, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Type',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='TypeSubpart',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subtype', models.CharField(max_length=50)),
                ('typeID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='protocols.type')),
            ],
        ),
        migrations.CreateModel(
            name='ProtocolSequenceConnector',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('protocolID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='protocols.protocol')),
                ('sequenceID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='protocols.sequence')),
            ],
        ),
        migrations.CreateModel(
            name='ProtocolKeywordConnector',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('keywordID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='keywords.keyword')),
                ('protocolID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='protocols.protocol')),
            ],
        ),
        migrations.CreateModel(
            name='ProtocolExamCodeConnector',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('examCodeID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='protocols.examcode')),
                ('protocolID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='protocols.protocol')),
            ],
        ),
        migrations.AddField(
            model_name='protocol',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='protocols.type'),
        ),
        migrations.AlterUniqueTogether(
            name='protocol',
            unique_together={('protocol', 'type', 'examTime')},
        ),
    ]