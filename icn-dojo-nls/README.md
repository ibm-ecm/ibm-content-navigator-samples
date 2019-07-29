# ICN Dojo NLS Build

This Gradle build script can be used to build localized resource bundles for additional languages other than the ones that come with ICN.

## Building and deploying the localized resource bundles

1. Clone or download this repository.
2. Update the path to the Dojo toolkit full source archive file in the **gradle.properties** file.
3. Copy the root resource bundle file of ICN, navigator/ecm/nls/messages.js, to the 'ecm/nls' directory.
4. Copy localized resource bundles for the additional languages to the 'ecn/nls' directory. Each resource bundle needs to be in a directory named as the ISO language code of the language as below.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ecm/<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ecm.js<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nls/<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messages.js (root resource bundle)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ko/ (ISO language code for Korean)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messages.js (Korean resource bundle)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;zh/ (ISO language code for Chinese)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messages.js (Chinese resource bundle)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ja/ (ISO language code for Japanese)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messages.js (Japanese resource bundle)<br/>

5. Replace the ISO language code list at the bottom of the copied root resource bundle with the ISO language code list for the addtional languages.
6. Add the ISO language code list for the addtional languages as value of the 'localeList' property in the nls.profile.js file.
7. Build localized resource bundles by running './gradlew buildBundles' / 'gradlew.bat buildBundles'.
8. Copy the built and compressed resource bundle files, ecm_[language code].js.jgz, in the 'build' directory to the 'ecm/nls' directory in the 'IBM/ECMClient/configure/explodedformat/navigator' directory.
9. Rebuild and redeploy the ICN web application.

Note: This build script builds resource bundles that are used in the ICN client. Localized resource bundle files, ServicesMessages_[language code].properties, that are used in the ICN server need to be copied to the 'WEB-INF/classes/com/ibm/ecm/nls' directory in the 'IBM/ECMClient/configure/explodedformat/navigator' directory before rebuilding and redeploying the ICN web application.

## Additional references

* [Dojo Toolkit download page](https://dojotoolkit.org/download/)

