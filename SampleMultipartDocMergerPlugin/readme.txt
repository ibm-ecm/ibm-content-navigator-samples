1. This plugin will just convert all parts are images IBM Content Manager multi-part document.
2. This plugin is filtering cm/getDocument action of IBM Content Navigator.
3. This plugin only effect multi base part documents
4. This plugin is using iText. After plugin deployment, the itext-13.2.jar needs to be copied to ICN deployment lib folder in WAS, like  navigator.war/WEB-INF/lib
5. This plugin is a server side plugin, so all clients download documents action will be effected, including web browser. The requests can be filtered by user-agent in request header if specific client needs to be restricted.
6. This plugin is a server side pluign, so just add it into ICN, copy itext jar file into ICN lib path as #4, it will work without other configurations.