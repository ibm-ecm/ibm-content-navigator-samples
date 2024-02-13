IBM Content Navigator Container Deployment Custom Resource Reference
=====================================================

This document provides a reference for the custom resources that are used to deploy IBM Content Navigator in a containerized environment.
The custom resources are defined in the `ibm_icn_cr_production_FC.yaml` and `ibm_icn_cr_production.yaml` file.

Spec Parameters
---------------

    .. csv-table:: Spec Parameters
       :header: "Parameter", "Description", "Example", "Required"
       :widths: 15, 20, 20, 10

        "content_optional_components","Specify which component to include (true) or omit (false).","cpe: false","No"
        ,,"graphql: false",
        ,,"cmis: false",
        ,,"css: false",
        ,,"es: false",
        ,,"tm: false",
        ,,"ban: true",
        ,,,
        "license.accept","Must exist to accept the IBM license. The only valid value is ""true"".","true","Yes"
        "appVersion", "The version of the current release.", "23.0.2", "Yes"

Shared Parameters
----------------

    .. csv-table:: Shared Parameters
       :file: ./CSV/shared-reference.csv
       :header-rows: 1

OIDC Parameters
---------------

    .. csv-table:: OIDC Parameters
       :file: ./CSV/oidc-reference.csv
       :header-rows: 1

Monitoring and Logging Parameters
---------------------------------

    .. csv-table:: Monitoring Parameters
       :file: ./CSV/monitoring-reference.csv
       :header-rows: 1

    .. csv-table:: Logging Parameters
       :file: ./CSV/logging-reference.csv
       :header-rows: 1

Datasource Parameters
---------------------

    .. csv-table:: Shared Datasource Parameters
       :file: ./CSV/database-shared-reference.csv
       :header-rows: 1

    .. csv-table:: Datasource Parameters
       :file: ./CSV/database-reference.csv
       :header-rows: 1

Navigator Parameters
--------------------

    .. csv-table:: Navigator Parameters
       :file: ./CSV/navigator-reference.csv
       :header-rows: 1





