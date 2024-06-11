# -*- coding: utf-8 -*-
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("models", "10710_fix_whatisthis"),
    ]

    sql = """
        update search_component set sortorder = sortorder + 1;
        insert into search_component (
            searchcomponentid,
            name,
            icon,
            modulename,
            classname,
            type,
            componentpath,
            componentname,
            sortorder,
            enabled
        ) values (
            '69695d63-6f03-4536-8da9-841b07116381',
            'Core Search',
            '',
            'core_search.py.py',
            'CoreSearchFilter',
            'backend',
            'views/components/search/core-search',
            'core-search',
            0,
            true
        ),
        (
            'ada062d9-092d-400c-bcf7-94a931d1f271',
            'Localize Result Descriptors',
            '',
            'localize_result_descriptors.py',
            'LocalizeResultDescriptors',
            'backend',
            'views/components/search/localize-descriptors',
            'localize-descriptors',
            99,
            true
        );
    """
    reverse_sql = """
        delete from search_component where searchcomponentid in (
            '69695d63-6f03-4536-8da9-841b07116381',
            'ada062d9-092d-400c-bcf7-94a931d1f271'
        );
        update search_component set sortorder = sortorder - 1 where sortorder > 0;
    """

    operations = [
        migrations.RunSQL(
            sql,
            reverse_sql,
        ),
        migrations.AddField(
            model_name="searchcomponent",
            name="config",
            field=models.JSONField(default={"requiredComponents": []}),
        ),
    ]
