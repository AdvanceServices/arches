# Generated by Django 4.2.13 on 2024-06-19 12:58

import django.contrib.postgres.fields
from django.db import connection, migrations, models


def add_constraint(apps, schema_editor):
    with connection.cursor() as cursor:
        cursor.execute(
            """
            CREATE FUNCTION validate_graph_resource_instance_lifecycle_state() RETURNS trigger AS $$
            BEGIN
                IF NOT (NEW.lifecycle_state = ANY(SELECT unnest(resource_instance_lifecycle_states) FROM graphs WHERE graphid = NEW.graphid)) THEN
                    RAISE EXCEPTION 'Invalid choice for lifecycle_state';
                END IF;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;

            CREATE TRIGGER resource_instance_lifecycle_state_trigger
            BEFORE INSERT OR UPDATE ON resource_instances
            FOR EACH ROW
            EXECUTE FUNCTION validate_graph_resource_instance_lifecycle_state();
        """
        )


def remove_constraint(apps, schema_editor):
    with connection.cursor() as cursor:
        cursor.execute(
            """
            DROP TRIGGER IF EXISTS resource_instance_lifecycle_state_trigger ON resource_instances;
            DROP FUNCTION IF EXISTS validate_graph_resource_instance_lifecycle_state();
        """
        )


class Migration(migrations.Migration):

    dependencies = [
        ("models", "9525_add_published_graph_edits"),
    ]

    operations = [
        migrations.AddField(
            model_name="graphmodel",
            name="resource_instance_lifecycle_states",
            field=django.contrib.postgres.fields.ArrayField(
                base_field=models.CharField(max_length=200),
                blank=True,
                default=["draft", "published", "retired"],
                size=None,
            ),
        ),
        migrations.AddField(
            model_name="resourceinstance",
            name="lifecycle_state",
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.RunPython(add_constraint, remove_constraint),
    ]
