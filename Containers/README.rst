IBM Content Navigator Container Deployment for CMOD & CM8
=====================================================

Introduction
------------

Welcome to the IBM Content Navigator Container Deployment for CMOD & CM8 readme! This readme provides instructions for preparation and deployment of IBM Content Navigator in a kubernettes environment.
For more details on IBM Content Navigator, please refer to the provided `documentation <https://www.ibm.com/docs/en/content-navigator/3.0.15>`_.

Currently supported version using the following instructions:
 * IBM Content Navigator 3.0.13
 * IBM Content Navigator 3.0.14
 * IBM Content Navigator 3.0.15



Prerequisites
-------------

Before proceeding with the installation, please ensure that you have the following prerequisites in place:

Tools:
 * Kubernetes or OCP CLI: Installed and properly configured on your system

Preparation Steps
------------------

Complete the following tasks to prepare for your deployment:

#. Download the deployment files contained in this repository.
      * Run the following command to clone this repo to your local system:

         .. code-block:: bash

             git clone https://github.com/ibm-ecm/ibm-content-navigator-samples.git

      * Extract the contents of the downloaded file to a local directory.
      * Open a terminal or command prompt and navigate to the directory where the installer package was extracted:

        .. code-block:: bash

              cd ./ibm-content-navigator-samples/Containers

#. Create the IBM Content Navigator database.
      * IBM Content Navigator supports the following databases:
           * Db2
           * Oracle
           * Microsoft SQL Server
           * PostgreSQL

      * Select your database type and Review the provided scripts in the `SQL` folder.
      * Replace the following values in the scripts with your desired values:
          * `${icn_name}`
          * `${youruser1}`
          * `${yourpassword}`

      * Create the database using the provided scripts.
      .. note::
         The provided scripts should be reviewed and modified to meet your specific requirements.

      .. note::
         The IBM Navigator Operator comes preloaded with the JDBC driver.
         Please see the below for the drivers included:

        .. list-table:: Database Drivers
                   :header-rows: 1

                   * - Database
                     - Version
                   * - DB2
                     - 11.5 M8 FP0
                   * - Oracle
                     - 19.18.0.0
                   * - Microsoft SQL Server
                     - 12.2.0
                   * - PostgreSQL
                     - 42.6.0


#. Create the IBM Content Navigator namespace in your cluster.
      * Login to your OCP or CNCF cluster.
      * Option 1: Run the following command to create the namespace:

         .. code-block:: bash

              kubectl create namespace <namespace-name>

      * Option 2: Create the namespace through the OCP Console.

#. Create the `ibm-ban-secret` in your cluster.
    * Obtain the following information:
        * appLoginUsername & appLoginPassword:
           This user will become the IBM Content Navigator administrator.
        * navigatorDBUsername & navigatorDBPassword:
           This user will be used to connect to the IBM Content Navigator database.
        * ltpaPassword:
             This password will be used to generate the LTPA token.
        * keystorePassword:
             This password will be used to generate the keystore.
    * Using the provided `ibm-ban-secret.yaml` file, fill in all `<Required>` values.
    * Run the following command to create the secret in your cluster:

        .. code-block:: bash

            kubectl create -f ibm-ban-secret.yaml -n <namespace-name>

#. Prepare your deployment files.
    * Navigate to folder for the version of IBM Content Navigator you are deploying.

        .. code-block:: bash

            cd ./Containers/3.0.15

    * Edit the supplied `cluster_role_binding.yaml` file to include the namespace you created in the previous step.
    * Replace the `<NAMESPACE>` values with your created namespace.

Operator Deployment Steps
-----

After completing the above preparation steps, you are ready to deploy the IBM Content Navigator Operator.

#. *OCP Only* - Apply the cluster role and binding to your cluster. These artifacts are applied cluster-wide.
    * Run the following command to create the cluster role and binding:

        .. code-block:: bash

            kubectl create -f cluster_role.yaml
            kubectl create -f cluster_role_binding.yaml

#. Apply the role, binding and service account.

    * Run the following command to create the role, binding and service account:

        .. code-block:: bash

                kubectl create -f role.yaml -n <namespace-name>
                kubectl create -f service_account.yaml -n <namespace-name>
                kubectl create -f role_binding.yaml -n <namespace-name>

#. Apply the CRD (Custom Resource Definition) to your cluster. These artifacts are applied cluster-wide.

    * Run the following command to create the CRD:

        .. code-block:: bash

            kubectl create -f ibm_v1_icn_crd.yaml

#. Deploy the Operator to your cluster.

    * Run the following command to deploy the Operator:

        .. code-block:: bash

            kubectl create -f operator.yaml -n <namespace-name>

#. Verify that the Operator is running.

    * Run the following command to verify that the Operator is running:

        .. code-block:: bash

            kubectl get pods -n <namespace-name>

    * Verify that the Operator pod is running.

        .. code-block:: bash

            NAME                    READY   STATUS    RESTARTS   AGE
            ibm-icn-operator-xxx    1/1     Running   0          2m

Create the Custom Resource (CR)
-----

After deploying the Operator, you are ready to create the CR.
Use the supplied CR templates to create the CR.

There are two options for the CR template:

* Option 1: ibm_icn_cr_production.yaml
    * This template will deploy IBM Content Navigator with a default configuration.
* Option 2: ibm_icn_cr_production_FC_navigator.yaml
    * This template will deploy IBM Content Navigator with all available parameters.

.. note::

    The `ibm_icn_cr_production.yaml` template is a minimal configuration.
    Start with the ibm_icn_cr_production.yaml template and add the parameters from the ibm_icn_cr_production_FC_navigator.yaml template as needed.
    Use `ibm_icn_cr_production_FC_navigator.yaml` as a reference for all available parameters. See `Reference.rst` for a complete list of all available parameters.

#. Edit the supplied CR template to include your desired values.

    * Use the below table as a reference for the required values.

        .. list-table:: CR Required Values
           :header-rows: 1

           * - Section
             - Parameters
           * - spec.license
             - accept
           * - spec.storage_configuration
             - sc_slow_file_storage_classname
               sc_medium_file_storage_classname
               sc_fast_file_storage_classname
           * - spec.datasource_configuration.dc_icn_datasource
             - dc_database_type
               database_servername
               database_port
               database_name

#. If you have SSL enabled Database connection then you need follow the below procedure:

    .. note::

        By default SSL is enabled for the database connection.
        If you want to disable SSL then you need to update the CR with the following parameters:
        `spec.datasource_configuration.dc_ssl_enabled = false`

        If SSL is disabled, `spec.datasource_configuration.dc_icn_datasource.database_ssl_secret_name` is not required.


    * Create a secret for the SSL certificate.

        .. code-block:: bash

            kubectl create secret generic db-ssl-secret --from-file=tls.crt=<PathToCertFile> -n <namespace-name>

    * Update the CR with the following parameters:

            .. list-table:: CR Values for SSL enabled Database
               :header-rows: 1

               * - Section
                 - Parameters
                 - Value
               * - spec.datasource_configuration
                 - dc_ssl_enabled
                 - true
               * - spec.datasource_configuration.dc_icn_datasource
                 - database_ssl_secret_name
                 - db-ssl-secret


#. Apply the CR in your cluster.

    * Run the following command to create the CR:

        .. code-block:: bash

            kubectl create -f ibm_icn_cr_production.yaml -n <namespace-name>


Verifying your Deployment
---------------

#. Verify that the IBM Content Navigator pods are running.

    * Run the following command to verify that the IBM Content Navigator pods are running:

        .. code-block:: bash

            kubectl get pods -n <namespace-name>

    * Verify that the IBM Content Navigator pods are running.

        .. code-block:: bash

            NAME                                 READY   STATUS    RESTARTS   AGE
            icndeploy-navigator-deploy-xxx       1/1     Running   0          2m

#. Check the CR status for verification.

    * Run the following command to check the CR status:

        .. code-block:: bash

            kubectl get FNCMCluster icndeploy -n <namespace> -o jsonpath='{.status.components.navigator}'.

    * Verify that the CR status is `Ready` for all components.

        .. code-block:: bash

            navigator:
              lastTransitionTime: '2023-08-06T01:43:51Z'
              message: ''
              navigatorDeployment: Ready
              navigatorService: Ready
              navigatorStorage: Ready
              reason: ''

#. Accessing your deployment through the IBM Content Navigator web client.


    * Obtain the IBM Content Navigator route. This applies to OCP deployments only. For CNCF deployments, an ingress object will need to create, refer to Advanced.rst for more details.

        * Option 1: Retrieve the route from `icndeploy-fncm-access-info` configmap.

            .. code-block:: bash

                kubectl get configmap icndeploy-fncm-access-info -n <namespace-name> -o yaml

        * Option 2: Run the following command to get the IBM Content Navigator route:

            .. code-block:: bash

                kubectl get route -n <namespace-name>

    * Copy the route and paste it into your browser.
    * Login with the admin console credentials you created in the preparation steps.

        .. note::

            The username and password was created in the `ibm-ban-secret.yaml`.
            Review the `appLoginUsername` and `appLoginPassword`.

Troubleshooting
---------------
#. Check the Operator logs for errors.

    * Run the following command to check the Operator logs:

        .. code-block:: bash

            kubectl get pods -n <namespace-name> | grep operator
            kubectl exec -it <operator-pod-name> -- bash
            cat /tmp/ansible-operator/runner/fncm.ibm.com/v1/FNCMCluster/<namespace>/icndeploy/artifacts/latest/stdout


Conclusion
----------

Congratulations! You have successfully installed IBM Content Navigator.

Next Steps
----------

#. For more information on connecting your respective repository to IBM Content Navigator, please refer to the provided documentation below:

    * `Connecting to IBM Content Manager OnDemand <https://www.ibm.com/docs/en/content-navigator/3.0.15?topic=ccrcn-connecting-content-manager-ondemand-repository-from-content-navigator-container-deployment>`_
    * `Connecting to IBM Content Manager 8 <https://www.ibm.com/docs/en/content-navigator/3.0.15?topic=ccrcn-connecting-content-manager-repository-from-content-navigator-container-deployment>`_
