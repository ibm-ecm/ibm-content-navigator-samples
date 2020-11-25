# Add additional language resource bundles to ICN

This guide includes the configuration steps to make ICN support additional languages for both client side and server side.

The Gradle build script can be used to build localized resource bundles in the ICN client, for additional languages other than the ones that come with ICN.


## Building and deploying the localized resource bundles

1. Clone or download this repository.
2. Update the path to the Dojo toolkit full source archive file in the [gradle.properties](/icn-dojo-nls/gradle.properties) file.
3. Copy file ecm.js.jgz from the 'IBM/ECMClient/configure/explodedformat/navigator/ecm' directory to the 'ecm' directory.
4. Copy the root resource bundle file of ICN, navigator/ecm/nls/messages.js, to the 'ecm/nls' directory.
5. Copy localized resource bundles to the 'ecn/nls' directory. Each resource bundle needs to be in a directory named as the ISO language code of the language as below.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ecm/<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ecm.js<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nls/<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messages.js (root resource bundle)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sr/ (ISO language code for Serbian)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messages.js (Serbian resource bundle)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mn/ (ISO language code for Mongolian)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messages.js (Mongolian resource bundle)<br/>

6. Add the additional languages to the ISO language code list at the bottom of the copied root resource bundle.
7. Add the ISO language code list for the addtional languages as value of the 'localeList' property in the [nls.profile.js](/icn-dojo-nls/nls.profile.js) file and the 'extraLocales' property in the [gradle.properties](/icn-dojo-nls/gradle.properties) file.
8. Build localized resource bundles by running './gradlew buildBundles' / 'gradlew.bat buildBundles'.
9. Copy the built and compressed resource bundle files for the additional languages, ecm_[language code].js.jgz, in the 'build' directory to the 'IBM/ECMClient/configure/explodedformat/navigator/ecm/nls' directory.
10. Copy the root resource bundle, messages.js, and additional language resource bundles, [language code]/messages.js, in the 'ecm/nls' directory to the 'IBM/ECMClient/configure/explodedformat/navigator/ecm/nls' directory. These resources are used when ICN client is browsed with debug=true parameter in URL.
11. Copy file ecm.js.jgz in the 'build' directory to the 'IBM/ECMClient/configure/explodedformat/navigator/ecm' directory. If ecm/ecm.js.jgz is hashed resource defined by the hashed-resource-names.properties file in the 'IBM/ECMClient/configure/explodedformat/navigator/WEB-INF/classes' directory, also replace the hashed file with ecm.js.jgz.
12. Additional language resource bundle files, ServicesMessages_[language code].properties, that are used in the ICN server need to be copied to the 'IBM/ECMClient/configure/explodedformat/navigator/WEB-INF/classes/com/ibm/ecm/nls' directory. Note ServicesMessages_[language code].properties files of ICN are in file icnnls.jar in the 'IBM/ECMClient/configure/explodedformat/navigator/WEB-INF/lib' directory. 
13. Add the additional language locales to the JVM arguments of the ICN application server.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-Dapplication.navigator=locales=en,sr,mn

14. Rebuild and redeploy the ICN web application.
15. Restart the ICN application server.
16. Delete browser cache.
17. Configure ICN client to use browser language setting.


## Additional references

* [Dojo Toolkit download page](https://dojotoolkit.org/download/)

