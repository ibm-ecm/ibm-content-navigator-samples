<div class="ecmLayout">
	<div data-dojo-type="dijit/layout/BorderContainer" data-dojo-attach-point="mainContainer" data-dojo-props="gutters:false" class="contentPane">
		<div data-dojo-type="ecm/widget/Banner" data-dojo-attach-point="banner" data-dojo-props="region:'top',showApplicationMenu:true"></div>
		
		<div data-dojo-type="dijit/layout/StackContainer" 
			 data-dojo-attach-point="mainStackContainer"
			 data-dojo-props="region:'center'" 
			 class="stackContainer">	 
			<div data-dojo-type="ecm/widget/LoginPane" data-dojo-attach-point="loginPane" id="${id}_LoginPane"></div>

			<div data-dojo-type="dijit/layout/BorderContainer" data-dojo-attach-point="mainPane" data-dojo-props="gutters:false">
				<!-- Add your main application layout here -->
			</div>
		</div>
	</div>
</div>