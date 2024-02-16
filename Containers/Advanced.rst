IBM Content Navigator Container Deployment Advanced Options for CMOD & CM8
=====================================================

This document covers advanced deployment options and configurations for IBM Content Navigator deployment.

Static Persistent Volume Claims (PVC) and Persistent Volumes (PV)
---------------------------------------------------------------

.. note::
        Storage can be provisioned using a mixture of static and dynamic. The operator uses the persistent volume claim names, of the default values, to determine if a claim already exists.

        * If the claim does not exist, dynamic provisioning is used. The persistent volume claim names provided in the custom resource YAML are used when the claim is created.
        * If the claim does exist, that claim is used when deploying.
        * If static provisioning is used, the persistent volumes and persistent volume claims must be pre-created and the persistent volume claim name provided in the CR.

The permissions that are described in the following steps are examples that provide a secure environment. Your environment might have different permission requirements. Consider the following possibilities when you apply permissions to your folders:

    * The NFS export root_squash option is strongly recommended for security. If you use the root_squash option, then the file directories to be used for the PVs group ownership must be set to the one specified by the anongid option given in the NFS export definition. The default anongid value is 65534.
    * If the no_root_squash option is used, the PV group ownership must be set to the root group 0.
    * Assign read, write, execute permissions to both the user and group owners, for example, chmod 770

The following settings are required by FileNet® Content Manager when creating your NFS exports:

    * The rw,sync,no_wdelay settings are required.
    * The no_subtree_check setting is recommended for performance.

Complete the following steps to create your static PVC and PV:

#. Use the below template to create your PV and PVC's.
   Edit the template with the values found in the tables below:

    .. code-block:: yaml

        apiVersion: v1
        kind: PersistentVolume
        metadata:
          name: <PVName>
        spec:
          accessModes:
          - ReadWriteMany
          capacity:
            storage: <Size>
          nfs:
            path: <HostPath>
            server: <NFS Server>
          persistentVolumeReclaimPolicy: Retain

        ---
        apiVersion: v1
        kind: PersistentVolumeClaim
        metadata:
          name: <PVCName>
          namespace: <NAMESPACE>
        spec:
          accessModes:
          - ReadWriteMany
          resources:
            requests:
              storage: <Size>
          volumeName: <PVName>
          storageClassName: ""


#. Replace the following values in the template with your desired values:

        * `<PVName>`: The name of the persistent volume.
        * `<Size>`: The size of the persistent volume.
        * `<HostPath>`: The path to the NFS server.
        * `<NFS Server>`: The NFS server.
        * `<PVCName>`: The name of the persistent volume claim.
        * `<NAMESPACE>`: The namespace where the PVC will be created.

    .. csv-table:: PV & PVC Values for IBM Content Navigator and Operator
       :header: Volume purpose,Example Folder to Create,Example Volume and Volume Claim to Create,Default PVC Size,mountPath as seen by container

        IBM Content Navigator Liberty configuration,/configDropins/overrides,icn-cfgstore-pv,1Gi,/opt/ibm/wlp/usr/servers/defaultServer/configDropins/overrides
        ,,,,
        ,,icn-cfgstore,,
        IBM Content Navigator and Liberty logs,/logs,icn-logstore-pv,1Gi,/opt/ibm/wlp/usr/servers/defaultServer/logs
        ,,,,
        ,,icn-logstore,,
        Custom plug-ins for IBM Content Navigator,/plugins,icn-pluginstore-pv,1Gi,/opt/ibm/plugins
        ,,,,
        ,,icn-pluginstore,,
        IBM Content Navigator viewer logs for Daeja® ViewONE,/icnvwlogstore,icn-vw-logstore-pv,1Gi,/opt/ibm/viewerconfig/logs
        ,,,,
        ,,icn-vw-logstore,,
        IBM Content Navigator storage for the Daeja ViewONE cache,/icnvwcachestore,icn-vw-cachestore-pv,1Gi,/opt/ibm/viewerconfig/cache
        ,,,,
        ,,icn-vw-cachestore,,
        IBM Content Navigator storage for Aspera®,/icnasperastore,icn-asperastore-pv,1Gi,/opt/ibm/aspera
        ,,,,
        ,,icn-asperastore,,
        IBM Navigator Operator Storage ,/operator,operator-shared-pv,1Gi,/opt/ansible/share
        ,,,,
        ,,operator-shared-pvc,,

#. Run the following command to create the PV and PVC:

    .. code-block:: bash

        kubectl create -f <PV-File>.yaml -n <namespace-name>
        kubectl create -f <PVC-File>.yaml -n <namespace-name>

#. Verify that the PV and PVC are bound.

    .. code-block:: bash

        kubectl get pvc
        NAME                  STATUS      CAPACITY   ACCESS MODES
        icn-asperastore       Bound       1Gi        RWX
        icn-cfgstore          Bound       1Gi        RWX
        icn-logstore          Bound       1Gi        RWX
        icn-pluginstore       Bound       1Gi        RWX
        icn-vw-cachestore     Bound       1Gi        RWX
        icn-vw-logstore       Bound       1Gi        RWX
        operator-shared-pvc   Bound       1Gi        RWX

#. If you are chose different names for the PVC, than the above default. Add the following section to the CR:


    .. code-block:: yaml

        spec:
          var_operator_pvc: operator-shared-pvc
          navigator_configuration:
            datavolume:
              existing_pvc_for_icn_cfgstore:
                name: "icn-cfgstore"
                size: 1Gi
              existing_pvc_for_icn_logstore:
                name: "icn-logstore"
                size: 1Gi
              existing_pvc_for_icn_pluginstore:
                name: "icn-pluginstore"
                size: 1Gi
              existing_pvc_for_icnvw_cachestore:
                name: "icn-vw-cachestore"
                size: 1Gi
              existing_pvc_for_icnvw_logstore:
                name: "icn-vw-logstore"
                size: 1Gi
              existing_pvc_for_icn_aspera:
                name: "icn-asperastore"
                size: 1Gi


Configuring Ingress Creation
----------------------------

You can create an Ingress resource to control web access to your deployed containers.
This task does not apply if you are using Red Hat OpenShift Cloud Platform or ROKS for your deployment.

This task assumes that you have a type of Ingress controller as part of your certified Kubernetes environment and a mechanism to create TLS certificates.

.. note::
    For NGINX Ingress controller, you need to add enable-underscores-in-headers configuration option. For more information, see NGINX configuration option `enable-underscores-in-headers <https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#enable-underscores-in-headers>`_.

Complete the following steps to create an Ingress resource:

#. Enable automatic Ingress creation in your CR (Custom Resource)

    .. code-block:: yaml

        shared_configuration:
          sc_ingress_enable: true


#. Set the Service Type that the Operator creates to NodePort. NodePort is the type of service that is required for the Ingress Object to redirect traffic.

    .. code-block:: yaml

        shared_configuration:
          sc_service_type: NodePort

#. Set the hostname used for your Ingress Object.

    .. code-block:: yaml

        shared_configuration:
          sc_deployment_hostname_suffix: <custom-hostname>

#. Determine the correct annotations needed for your Ingress controller.These annotations control the behavior of the Ingress that is created by the operator. Follow the specific documentation for your Kubernetes Cloud Platform for the required annotations. Annotation must be added to your deployment CR (Custom Resource) under the following sections:

    .. code-block:: yaml

        shared_configuration:
          sc_ingress_annotations:
            - <annotation-key>: <annotation-value>

#. Optional:Add a TLS secret. If your TLS certificate is not supplied through annotations, you need to specify the secret name.

    .. code-block:: yaml

        shared_configuration:
            sc_ingress_tls_secret_name: "tls-secret"

#. Apply the CR in your cluster.

    .. code-block:: bash

        kubectl apply -f ibm_icn_cr_production.yaml -n <namespace>

    The Operator creates the Ingress resource with the specified annotations and TLS secret. This will take one Operator reconcile cycle to complete

#. Verify that the Ingress resource is created.

    .. code-block:: bash

        kubectl get ingress -n <namespace>
        NAME                      CLASS    HOSTS                                 ADDRESS                                                                   PORTS   AGE
        icndeploy-fncm-ingress   alb   <custom-hostname>         <generated-address>   80      22d

#. Retrieve your access info and product context routes

    .. code-block:: bash

        kubectl get cm icndeploy-fncm-access-info -n <namespace> -o yaml
        apiVersion: v1
        data:
          navigator-access-info: |-
            Business Automation Navigator for FNCM: <custom-hostname>/navigator/


