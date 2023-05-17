# Generated by Django 3.2.18 on 2023-05-17 16:33

import arches.app.models.fields.i18n
import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('models', '9055_add_branch_publication_to_node'),
    ]

    operations = [
        migrations.CreateModel(
            name='PublishedGraphEdit',
            fields=[
                ('edit_id', models.UUIDField(default=uuid.uuid1, primary_key=True, serialize=False)),
                ('edit_time', models.DateTimeField(default=datetime.datetime.now)),
                ('notes', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'published_graph_edits',
                'managed': True,
            },
        ),
        migrations.AlterField(
            model_name='graphxpublishedgraph',
            name='user',
            field=models.ForeignKey(db_column='userid', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='publishedgraphedit',
            name='publication',
            field=models.ForeignKey(db_column='publicationid', on_delete=django.db.models.deletion.CASCADE, to='models.graphxpublishedgraph'),
        ),
        migrations.AddField(
            model_name='publishedgraphedit',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='graphxpublishedgraph',
            name='most_recent_edit',
            field=models.ForeignKey(blank=True, db_column='edit_id', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='models.publishedgraphedit'),
        ),
    ]
