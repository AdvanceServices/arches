# Generated by Django 3.2.18 on 2023-06-01 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("models", "9466_immutable_branches"),
    ]

    operations = [
        migrations.AlterField(
            model_name="tilemodel",
            name="nodegroup",
            field=models.UUIDField(db_column="nodegroupid", null=True),
        ),
        migrations.RenameField(
            model_name="tilemodel",
            old_name="nodegroup",
            new_name="nodegroup_id",
        )
    ]
