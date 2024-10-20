# Generated by Django 3.2.19 on 2023-07-24 18:55

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("models", "9748_branch_excel_exporter"),
    ]

    add_tile_excel_exporter = """
        INSERT INTO etl_modules (
            etlmoduleid,
            name,
            description,
            etl_type,
            component,
            componentname,
            modulename,
            classname,
            config,
            icon,
            slug,
            helpsortorder,
            helptemplate)
        VALUES (
            '63ae4bd2-404a-402f-9917-b18b21215cf2',
            'Tile Excel Exporter',
            'Export a Tile Excel file from Arches',
            'export',
            'views/components/etl_modules/tile-excel-exporter',
            'tile-excel-exporter',
            'tile_excel_exporter.py',
            'TileExcelExporter',
            '{"bgColor": "#f5c60a", "circleColor": "#f9dd6c"}',
            'fa fa-upload',
            'tile-excel-exporter',
            6,
            'tile-excel-exporter-help');
        """
    remove_tile_excel_exporter = """
        DELETE FROM load_staging WHERE loadid IN (SELECT loadid FROM load_event WHERE etl_module_id = '63ae4bd2-404a-402f-9917-b18b21215cf2');
        DELETE FROM load_event WHERE etl_module_id = '63ae4bd2-404a-402f-9917-b18b21215cf2';
        DELETE FROM etl_modules WHERE etlmoduleid = '63ae4bd2-404a-402f-9917-b18b21215cf2';
    """

    operations = [
        migrations.RunSQL(
            add_tile_excel_exporter,
            remove_tile_excel_exporter,
        ),
    ]
