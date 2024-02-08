# Daeja ViewONE annotation engine

This project provides a custom Content Manager annotation engine that can be used to support loading and saving Daeja ViewONE annotations.
It also allows Content Manager annotations to be migrated to Daeja ViewONE annotations.
Refer to the unit tests in this project to see how the annotation engine can be used to load, save, and migrate annotations.

## Prerequisite

* Content Manager Java viewer toolkit (cmbview81.jar)

JAR files needed to run unit tests:

* Content Manager SDK (cmbicmsdk81.jar)
* Content Manager bean (cmb81.jar)

## Building the annotation engine

1. Clone or download the project from [GitHub](https://github.com/ibm-ecm/cm-daeja-viewer-annotation-engine).
2. Copy all JAR files to the **lib** directory under the project's root directory.
3. Build the project JAR file by running 'mvn package'.

## Using the annotation engine

1. Put the built project JAR file to the classpath of the application.
2. Define the annotation engine in a Properties object used to instantiate a CMBAnnotationServices object.

## Additional references

* [Working with the Java document viewer toolkit](https://www.ibm.com/docs/en/content-manager/8.6.0?topic=applications-working-java-document-viewer-toolkit)
