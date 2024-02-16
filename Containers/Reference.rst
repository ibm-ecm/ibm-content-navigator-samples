IBM Content Navigator Container Deployment for CMOD & CM8 Custom Resource Reference
=====================================================

This document provides a reference for the custom resources that are used to deploy IBM Content Navigator in a containerized environment.
The custom resources are defined in the `ibm_icn_cr_production_FC.yaml` and `ibm_icn_cr_production.yaml` file.

Spec Parameters
---------------

    .. csv-table:: Spec Parameters
       :header: "Parameter", "Description", "Example", "Required"

        "content_optional_components","Specify which component to include (true) or omit (false).",,"No"
        "license.accept","Must exist to accept the IBM license. The only valid value is ""true"".","true","Yes"
        "appVersion", "The version of the current release.", "23.0.2", "Yes"

Shared Parameters
----------------

    .. csv-table:: Shared Parameters
       :header: "Parameter", "Description", "Example", "Required"

        enable_fips,Enable/disable FIPS mode for the deployment.,False,No
        external_tls_certificate_secret,"Shared custom TLS secret which will be used to sign all external routes if defined. If this is not defined, all external routes will be signed with root_ca_secret",,No
        image_pull_secrets,List of shared image pull secrets.,ibm-entitlement-key,No
        root_ca_secret,"If you provide your own root certificate, enter the value.",icn-root-ca,No
        sc_deployment_context,Do not change this default setting.,FNCM,Yes
        sc_deployment_platform,Enter your certified Kubernetes platform type,OCP,Yes
        ,,"Use ""OCP"" for Red Hat OpenShift Container Platform",
        ,,"Use ""ROKS"" if the platform is Red Hat OpenShift on IBM Cloud®.",
        ,,"Use "" other"" for to deploy on non-OCP Kubernetes based platforms.",
        ,,,
        sc_deployment_profile_size,"For a production deployment type, the default is small. You can change the profile to medium or large, as required. For more information, see Identifying the infrastructure requirements.",small,No
        sc_deployment_type,Do not change this default setting.,production,Yes
        sc_ecm_ltpa_secret_name,"If creating using a custom ltpa-secret name, specify the name here. The value is required for deploying geographically dispersed FNCM clusters.",{{ meta.name }}-ecm-ltpa,No
        sc_egress_configuration,To enable or disable egress access to external systems. The default is to restrict access to external systems.,"The default for sc_restricted_internet_access is true, if not defined.",No
        sc_restricted_internet_access,,"The default for sc_api_namespace is ""openshift-kube-apiserver"", ""openshift-apiserver"". Use a comma separated list of namespaces or ""{}"" can also be used as a value when you see ""(\""dial tcp XXX.XX.X.X:443: i/o timeout\"")"" error in the operator log. It is equivalent to all namespaces (namespaceSelector:{}).",
        sc_api_namespace,"Set the value of sc_restricted_internet_access to false to provide all pods access to external systems. You can customize your network policy or use specific policies with 'matchLabels' to set exceptions. For more information, see Configuring cluster security.","The default for sc_api_port is 443,6443.",
        sc_api_port,,"The default for sc_dns_namespace is ""openshift-dns"". It can be a comma separated list of namespaces or ""{}"" can also be used as a value. It is equivalent to all namespaces (namespaceSelector:{}).",
        sc_dns_namespace,"If set to false, all the pods have unrestricted network access to external systems.","The default for sc_dns_port is 53,5353.",
        sc_dns_port,,,
        ,"Important: When the value of sc_restricted_internet_access is true, none of the pods can access any external system other than the known addresses for databases, LDAPs, and federated systems. For more information, see Configuring cluster security.",,
        sc_image_repository,"All components must use the same docker image repository. For a local docker image repository, set the parameter to the value of the URL, for example, myimageregistry.com/project_name. For an air gap installation, make sure that the parameter is set to the default value.",icr.io/cpopen/icn,No
        images.keytool_init_container.repository,Image name for TLS init container,icr.io/cpopen/icn/dba-keytool-initcontainer,No
        images.keytool_init_container.tag,Image tag for TLS init container,23.0.2,No
        sc_ingress_enable,"For ROKS and CNCF clusters, this is used to enable Ingress. The default value is ""false"" which creates routes instead of Ingress.",False,No
        sc_ingress_tls_secret_name,This secret provides TLS for the Ingress controller.,Empty,Yes
        sc_run_as_user,Optional and only applicable for non-Open Shift Cloud Platform installations. Specify a RunAs user for the security of the pod. This is usually a numerical ID.,,No
        sc_seccomp_profile.localhost_profile,"Specify the local path of the seccomp profile file. This parameter is required if sc_seccomp_profile.type is set to Localhost. The value of sc_seccomp_profile.localhost_profile is ignored if sc_seccomp_profile.type is set to anything other than Localhost. For more information, see Configuring seccomp profiles.",Example: profiles/audit.json,Only if sc_seccomp_profile.type is set to Localhost
        sc_seccomp_profile.type,"Specify the type of seccomp profile to be used by the pods. Possible values are: Unconfined, RuntimeDefault, Localhost. For more information about seccomp profile, see the Restrict a Container's Syscalls with seccomp.",Default value:,No
        ,,RuntimeDefault on OCP 4.11 and later,
        ,,empty on other platforms,
        ,,,
        ,,Example: Localhost,
        storage_configuration,"Three storage classes are needed for slow, medium, and fast storage. If one storage class is defined, then you can use that one storage class for all three parameters.",None,Yes
        sc_fast_file_storage_classname,,,
        sc_medium_file_storage_classname,,,
        sc_slow_file_storage_classname,,,
        ,,,
        trusted_certificate_list,"If connecting to an external service over SSL, use the certificate file to create a secret and then add the secret name for this parameter.",[],

OIDC Parameters
---------------

    .. csv-table:: OIDC Parameters
       :header: "Parameter", "Description", "Example", "Required"

        authn_session_disabled,An authentication session cookie will not be created for inbound propagation. The client is expected to send a valid OAuth token for every request.,(true or false),No
        authorization_endpoint_url,Specifies an Authorization endpoint URL.,(string),No
        client_oidc_secret.cpe,Enter the secret name that you created for your Content Platform Engine credentials.,(string),No
        client_oidc_secret.nav,Enter the secret name that you created for your Navigator credentials.,(string),No
        disable_ltpa_cookie,Do not create an LTPA Token during processing of the OAuth token. Create a cookie of the specific Service Provider instead.,(true or false),No
        disables_iss_checking,Require the issuer claim to be absent when validating the json response for inbound token propagation.,(true or false),No
        discovery_endpoint_url,Specifies a discovery endpoint URL for an OpenID Connect provider.,(string),No
        display_name,Set a display name for the log in button in Navigator.,Single Sign On,No
        https_required,Require SSL communication between the OpenID relying party and provider service.,(true or false),No
        inbound_propagation,Controls the operation of the token inbound propagation of the OpenID relying party.,none,No
        ,,required,
        ,none,supported,
        ,Do not support inbound token propagation,,
        ,required,,
        ,Require inbound token propagation,,
        ,supported,,
        ,Support inbound token propagation,,
        ,,,
        issuer_identifier,,(string),No
        jwk_client_oidc_secret.cpe,Specifies the client id and password for Content Platform Engine to include in the basic authentication scheme of the JWK request.,(string),No
        jwk_client_oidc_secret.nav,Specifies the client id and password for Navigator to include in the basic authentication scheme of the JWK request.,(string),No
        map_identity_to_registry_user,"Specifies whether to map the identity to a registry user. If this is set to false, then the user registry is not used to create the user subject.",true or false,No
        oidc_ud_param,Use this parameter to include additional user defined parameters for your identity provider. You can use this section to define key value pairs separated by the delimeter `:`.,(string),No
        ,,,
        ,"If you want to change the default delimeter, add `DELIM=<NEW_DELIMETER>` in front of your key value pair, for example, ‘DELIM=;myKey;myValue'. In this example, the new delimeter is `;` and the key value pair is set to `myKey;myValue` instead of `myKey:myValue`.",,
        ,,,
        ,"For IBMVerify, add the following user defined parameters:",,
        ,,,
        ,introspectEndpointUrl : The URL of the introspect endpoint of the OAuth provider. It is mandatory when the OIDC flow is used.,,
        ,,,
        ,revokeEndpointUrl : The URL of the revoke endpoint of the OAuth provider. It is mandatory when the OIDC flow is used.,,
        ,,,
        provider_name,Set a name for referring to the identity provider. This name is used in the redirect URL.,(string),No
        ,,,
        ,The value you specify becomes the realm name for your environment.,,
        ,,,
        ,"Note: If you plan to use this realm as part of an integration with an application that is hosted on a traditional WebSphere Application Server instance, you must provide a value for this parameter that matches the realm name for the application in that WebSphere Application Server instance.",,
        ,,,
        ,,,
        ,,,
        response_type,"Specifies the response requested from the provider, either an authorization code or implicit flow tokens.",code,No
        ,,id_token,
        ,code,id_token_token,
        ,Authorization code,token,
        ,id_token,,
        ,ID token,,
        ,id_token token,,
        ,ID token and access token,,
        ,token,,
        ,Access token,,
        ,,,
        scope,OpenID Connect scope (as detailed in the OpenID Connect specification) that is allowed for the provider.,openid email profile,No
        signature_algorithm,Specifies the signature algorithm that will be used to verify the signature of the ID token.,HS256,No
        ,,RS256,
        ,HS256,none,
        ,Use the HS256 signature algorithm to sign and verify tokens,,
        ,RS256,,
        ,Use the RS256 signature algorithm to sign and verify tokens,,
        ,none,,
        ,Tokens are not required to be signed,,
        ,,,
        token_endpoint_url,Specifies a token endpoint URL.,(string),No
        token_reuse,Specifies whether JSON web tokens can be reused. Tokens must contain a jti claim for this attribute to be effective. The jti claim is a token identifier that is used along with the iss claim to uniquely identify a token and associate it with a specific issuer. A request is rejected when this attribute is set to false and the request contains a JWT with a jti and iss value combination that has already been used within the lifetime of the token.,(true or false),No
        trust_alias_name,Key alias name to locate public key for signature validation with asymmetric algorithm.,(string),No
        unique_user_identifier,Specifies a JSON attribute in the ID token that is used as the unique user name as it applies to the WSCredential in the subject.,(string),No
        user_identifier,"Specifies a JSON attribute in the ID token that is used as the user principal name in the subject. If no value is specified, the JSON attribute ""sub"" is used.",(string),No
        user_identity_to_create_subject,Specifies a user identity in the ID token used to create the user subject.,(string),No
        validation_endpoint_url,The endpoint URL for validating the token inbound propagation. The type of endpoint is decided by the validationMethod.,(string),No
        validation_method,The method of validation on the token inbound propagation.,introspect,No
        ,,userinfo,
        ,introspect,,
        ,Validate inbound tokens using token introspection,,
        ,userinfo,,
        ,Validate inbound tokens using the userinfo endpoint,,



Monitoring and Logging Parameters
---------------------------------

    .. csv-table:: Monitoring Parameters
       :header: "Parameter", "Description", "Example", "Required"

        mon_metrics_writer_option,Provide the monitoring metrics option.,4,No
        ,,,
        ,Specify 0 for Graphite and 4 for Prometheus.,,
        mon_enable_plugin_pch,Performance metrics for FileNet® Content Manager components.,False,No
        mon_enable_plugin_mbean,Performance metrics for JMX.,False,No
        collectd_plugin_write-graphite_host,The hostname for the Graphite service.,localhost,No
        collectd_plugin_write_graphite_port,The port for the Graphite service.,2003,No
        collectd_interval,"The interval seconds in which to query the read plugins. If set, will use the specified interval for collectd and plugins.",10,No
        collectd_disable_host_monitoring,"If set to true, disables the collectd cpu, interface, load, memory, and prometheus plugins.",False,No
        collectd_plugin_write_prometheus_port,The port of the collectd embedded webserver should listen on that can be scraped by using Prometheus.,9103,No

    .. csv-table:: Logging Parameters
       :header: "Parameter", "Description", "Example", "Required"

        mon_log_parse,"Set this parameter to ""true"" to enable log parsing. This allows you to filter and query logs using parsed parameters.",True,No
        mon_log_service_endpoint,"This is the endpoint to the Elasticsearch server. For example, <elastic_search_server_host>:9200",<hostname>:9200,No
        private_logging_enabled,"Specify whether to use private logging. Setting to true (for Filebeat) writes the console log, message log, trace log, and ffdc log to the folder /logs/application.",False,No
        ,,,
        ,"Setting to false (for Red Hat OpenShift) writes the console log, message log, trace log, and ffdc log to the folder stdout.",,
        logging_type,"default, enable logging at the DBA container as backend service.",default,No
        ,"sidecar, enable logging as the DBA container's sidecar.",,
        ,"node-logging, enable logging as DaemonSet to collect Kubernetes node logging.",,
        ,,,
        mon_log_path,"Colon (:) separated list of paths to logs that Filebeat should forward. By default, the principle logs for the IBM components, including Liberty and the containerized applications, are forwarded automatically when logging is enabled for a component. To have Filebeat forward other logs, use the MON_LOG_PATH parameter can be used to provide the list of file paths as seen by Filebeat from inside the container.",/path_to_extra_log,

Datasource Parameters
---------------------

    .. csv-table:: Shared Datasource Parameters
       :header: "Parameter", "Description", "Example", "Required"

        database_precheck,"Some databases, like Oracle OID, have a default format for the connection URL that can interfere with deployment by the operator. Setting database_precheck to false can prevent these deployment errors.",True,No
        dc_ssl_enabled,Used to support database connection over SSL for Db2 or Oracle.,True,No

    .. csv-table:: Datasource Parameters
       :header: "Parameter", "Description", "Example", "Required"

        dc_database_type,"Specify the type for your Business Automation Navigator database. The possible values are ""db2"" or ""db2HADR"" or ""oracle"". This setting must be the same as for the Global Configuration Database and the object store database types.","""db2""",Yes
        dc_common_icn_datasource_name,The JNDI name of the non-XA JDBC data source associated with the IBM Content Navigator table space or database. The name must be unique.,"""ECMClientDS""",Yes
        database_servername,The host name of the server where the database software is installed.,"""<hostname>""","Yes, but not applicable to database type of Oracle which requires a JDBC URL"
        database_port,"Provide the database port. For Db2, the default is ""50000"".","""50000""","Yes, but not applicable to database type of Oracle which requires a JDBC URL"
        database_name,Provide the database name.,"""ICNDB""","Yes, but not applicable to database type of Oracle which requires a JDBC URL"
        database_ssl_secret_name,The name of the secret that contains the Db2 SSL certificate.,"""<secret_name>""","Yes, if using SSL with Db2"
        dc_oracle_icn_jdbc_url,Oracle: Provide the URL for the IBM Content Navigator database.,"SSL URL: ""jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCPS)(HOST={host})(PORT={port}))('CONNECT_DATA=(SERVICE_NAME={ICNDB})))""","Yes, if the database type is Oracle"
        ,,"Non-SSL URL: ""jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST={host})(PORT={port}))('CONNECT_DATA=(SERVICE_NAME={ICNDB})))""",
        ,,,
        dc_hadr_standby_servername,Db2 HADR: Enter the standby server name.,"""<hostname>""",Yes
        dc_hadr_standby_port,Db2 HADR: Enter the standby database server port.,"""50000""",Yes
        dc_hadr_validation_timeout,Db2 HADR: Specify the validation timeout entry.,15,No
        dc_hadr_retry_interval_for_client_reroute,Db2 HADR: Specify the time in seconds between connection attempts made by the automatic client reroute if the primary connection to the server fails.,15,No
        dc_hadr_max_retries_for_client_reroute,Db2 HADR: The maximum number of connection retries attempted by automatic client reroute if the primary connection to the server fails. This property is used only if the Retry interval for client reroute property is set.,3,No
        connection_manager.min_pool_size,"Specifies the minimum number of physical connections to maintain. With the default setting of 0, no connections are created with the database starts.",0,No
        connection_manager.max_pool_size,Specifies the maximum number of physical connections that you can create in this pool. The maximum pool size for connections depends on the number of connections that are supported by your database driver.,50,No
        connection_manager.max_idle_time,Use this setting to specify how long to wait to clean up idle connections.,1m,No
        connection_manager.reap_time,"Specifies the interval, in seconds, between runs of the pool maintenance thread.",2m,No
        connection_manager.purge_policy,Specifies how to purge connections when a stale connection or fatal connection error is detected.,EntirePool,No

Navigator Parameters
--------------------

    .. csv-table:: Navigator Parameters
       :header: "Parameter", "Description", "Example", "Required"

        resources.requests.ephemeral_storage,Specifies an ephemeral storage request for the container.,,No
        resources.limits.ephemeral_storage,Specifies an ephemeral storage limit for the container.,,No
        ban_secret_name,Contains the information about the LDAP user and password for components.,"""{{ meta.name }}-ban-ext-tls-secret""",Yes
        route_ingress_annotations,"By default all the components create ingress and routes with required annotations. In case any custom annotation is needed for the environment, use this parameter to specify the annotations.",- haproxy.router.openshift.io/balance: roundrobin,No
        ban_ext_tls_secret_name,"If you create a tls secret, use this parameter to specify it for IBM Content Navigator. Otherwise the operator creates one for you.","""{{ meta.name }}-ban-ext-tls-secret""",No
        ban_auth_ca_secret_name,"If you create a ca secret, use this parameter to specify it for IBM Content Navigator. Otherwise the operator creates one for you.","""{{ meta.name }}-ban-auth-ca-secret""",No
        arch.amd64,The architecture for your environment.,3 - Most preferred,"Yes, leave default"
        replica_count,How many Content Platform Engine replicas to deploy.,2,No
        image.repository,The repository to use.,cp.cir.io/cp/cp4a/ban/navigator-sso,No
        image.tag,The specific tag for your release.,ga-30x-icn,No
        image.pull_policy,The pull policy for the image.,IfNotPresent,No
        log.format,The format for workload logging.,json,No
        resources.requests.cpu,Specifies a CPU request for the container.,500m,No
        resource.requests.memory,Specify a memory request for the container.,512Mi,No
        resource.limits.cpu,Specify a CPU limit for the container.,1,No
        resource.limits.memory,Specify a memory limit for the container.,3072Mi,No
        auto_scaling.enabled,Specify whether to enable auto scaling.,False,No
        auto_scaling.max_replicas,The upper limit for the number of pods that can be set by the autoscaler. Required.,3,No
        auto_scaling.min_replicas,"The lower limit for the number of pods that can be set by the autoscaler. If it is not specified or negative, the server will apply a default value.",2,No
        auto_scaling.target_cpu_utilization_percentage,"The target average CPU utilization (represented as a percent of requested CPU) over all the pods. If it is not specified or negative, a default autoscaling policy is used.",80,No
        java_mail.host,Specify the host of the mail session.,fncm-exchange1.example.com,No
        node_affinity.custom_node_selector_match_expression,Added in node selector match expressions. It accepts array list inputs. You can assign multiple selector match expressions except (kubernetes.io/arch).,- key: kubernetes.io/hostname,No
        ,"Note: This can be overwritten by the component level definition, for example navigator_configuration.node_affinity.custom_node_selector_match_expression.",  operator: In,
        ,,  values:,
        ,,    - worker0,
        ,,    - worker1,
        ,,    - worker3,
        custom_annotations,Values in this field are used as annotations in all generated pods. They must be valid annotation key-value pairs.,customAnnotationKey: customAnnotationValue,No
        custom_labels,Values in this field are used as labels in all generated pods. They must be valid label key-value pairs.,customLabelKey: customLabelValue,No
        java_mail.port,Specify the port to use with the mail session host.,25,No
        java_mail.sender,"For sender, enter a user that has access to the email server to log on.",MailAdmin@fncmexchange.com,No
        java_mail.ssl_enabled,Specify whether SSL is enabled.,False,No
        probe.startup.initial_delay_seconds,The behavior of startup probes to know when the container is started.,120,No
        probe.startup.period_seconds,The period in seconds.,10,No
        probe.startup.timeout_seconds,The timeout setting in seconds.,10,No
        probe.startup.failure_threshold,The threshold number for failures.,6,No
        icn_production_setting.custom_env_var,Set the environment variables.,anyValue,No
        icn_production_setting.custom_configmap.name,The name of the custom configmap.,custom-navigator-config-files,Yes
        ,,,
        ,"Note that, a configmap can hold files or environment data but it cannot a mix of both. The volume_path is optional for a configmap that holds files as its data. If a volume_path is not specified, the files is mounted to the Liberty configuration (cfgstore) mapped location. If the configmap data holds environment variables then must set is_env to true.",,
        icn_production_setting.custom_configmap.volume_path,The location you want to hold files in.,,No
        icn_production_setting.custom_configmap.is_env,Specify whether the config map holds environment variables.,False,No
        icn_production_setting.timezone,The time zone for the container deployment.,Etc/UTC,No
        icn_production_setting.gdfontpath,Customized font path for multi-language support. You need to place all used font files into this path,/opt/ibm/java/jre/lib/fonts,No
        icn_production_setting.jvm_initial_heap_percentage,The initial use of available memory.,40,No
        icn_production_setting.jvm_max_heap_percentage,The maximum percentage of available memory to use.,66,No
        icn_production_setting.jvm_customize_options,Optionally specify JVM arguments using comma separation. For example:,None,No
        ,,,
        ,"jvm_customize_options=""-Dmy.test.jvm.arg1=123,-Dmy.test.jvm.arg2=abc,-XX:+SomeJVMSettings,XshowSettings:vm""",,
        ,,,
        ,"If needed, you can use DELIM to change the character that is used to separate multiple JVM arguments. In this example, a semi-colon is used to separate the JVM arguments:",,
        ,,,
        ,"jvm_customize_options=""DELIM=;-Dcom.filenet.authentication.wsi.AutoDetectAuthToken=true;-Dcom.filenet.authentication.providers=ExShareUmsInternal,ExShareIbmId,ExShareGID""",,
        icn_production_setting.icn_jndids_name,Name for the Navigator JNDI datasource.,ECMClientDS,No
        icn_production_setting.icn_schema,Schema for IBM Content Navigator.,ICNDB,No
        icn_production_setting.icn_table_space,Table space for IBM Content Navigator.,ICNDB,No
        icn_production_setting.allow_remote_plugins_via_http,It is recommended not to change this setting.,True,No
        monitor_enabled,Specify whether to use the built-in monitoring capability.,False,No
        logging_enabled,Specify whether to use the built-in logging capability.,False,No
        datavolume.existing _pvc_for_icn_cfgstore,The persistent volume claim for IBM Content Navigator configuration.,icn-cfgstore,"Yes, if you want to use existing PVC"
        name,,1Gi,No
        size,,,
        ,,,
        datavolume.existing _pvc_for_icn_logstore,The persistent volume claim for IBM Content Navigator logs.,icn-logstore,"Yes, if you want to use existing PVC"
        name,,1Gi,No
        size,,,
        ,,,
        datavolume.existing _pvc_for_icn_pluginstore,The persistent volume claim for the plug-ins.,icn-pluginstore,"Yes, if you want to use existing PVC"
        name,,1Gi,No
        size,,,
        ,,,
        datavolume.existing _pvc_for_icnvw_cachestore,The persistent volume claim for the viewer cache.,icn-vw-cachestore,"Yes, if you want to use existing PVC"
        name,,1Gi,No
        size,,,
        ,,,
        datavolume.existing _pvc_for_icnvw_logstore,The persistent volume claim for the viewer log.,icn-vw-logstore,"Yes, if you want to use existing PVC"
        name,,1Gi,No
        size,,,
        ,,,
        datavolume.existing _pvc_for_icn_aspera,The persistent volume claim for Aspera®.,icn-asperastore,"Yes, if you want to use existing PVC"
        name,,I Gi,No
        size,,,
        ,,,
        probe.readiness.period_seconds,The period in seconds.,10,No
        probe.readiness.timeout_seconds,The timeout setting in seconds.,10,No
        probe.readiness.failure_threshold,The threshold number for failures.,6,No
        probe.liveness.period_seconds,The period in seconds.,10,No
        probe.liveness.timeout_seconds,The timeout setting in seconds.,5,No
        probe.liveness.failure_threshold,The threshold number for failures.,6,No
        image_pull_secrets.name,The secrets to be able to pull images.,admin.registrykey,"Yes, only if you want to override the comparable setting in the shared configuration section."
        disable_fips,Set to false if your deployment requires FIPS enablement. The value of the parameter should be consistent with the value of ecm_configuration.disable_fips parameter.,True,No
        enable_ldap,Optional entry only if you have the open_id_connect_providers enabled. Enabling this will give the user the option to sign-in using the LDAP.,False,No
        custom_operator_pod_label,Custom Operator Label for Navigator,ibm-icn-operator,Yes
        disable_basic_auth,Create Basic Auth Login for Navigator,false,Yes





