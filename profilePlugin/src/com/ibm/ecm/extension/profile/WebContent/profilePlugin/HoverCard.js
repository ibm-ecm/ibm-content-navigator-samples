/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
/**
* @name profilePlugin.HoverCard
* @class HoverCard provides pop-up information that displays when users hover the mouse pointer over an help indicator.  
* HoverCard is implemented according to standard and specification of IBM One UI(tm) 
* <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y21&vsub=*&hsub=*&openpanes=1111111111">Hover Preview Card</a></b>, 
* <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y44&vsub=*&hsub=*&openpanes=1111111111">Hover Person Card</a></b>
* @augments dijit.TooltipDialog
* @example
* 
&lt;!--Preview content of HoverCard--&gt;
&lt;div data-dojo-type="idx.oneui._Preview" data-dojo-props='
	id: "preview",
	title: "Preview Card title",
	image: "../../themes/oneui/idx/oneui/images/objectImagePlaceholder90px.png",
	content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et purus lorem, eu semper massa. Phasellus rutrum, dui non ultrices convallis, nunc nunc dignissim neque, elementum imperdiet sapien massa ut risus&lt;br /&gt;&lt;br /&gt;"
'&gt;
&lt;/div&gt;
&lt;!--Declaration of Hover Preview Card--&gt;
&lt;div data-dojo-type="profilePlugin.HoverCard" 
	data-dojo-props='
		target:"anchor", 
		moreActions:[
			{label: "Item 1", onClick: fClick},
			{label: "Item 2", onClick: fClick},
			{label: "Item 3", onClick: fClick}
		],
		actions: [
			{iconClass: "placeHolderIcon", onClick: fClick, text:""},
			{iconClass: "placeHolderIcon", onClick: fClick, text:""},
			{iconClass: "placeHolderIcon", onClick: fClick, text:""}
		],
		content: "preview"
	'&gt;
&lt;/div&gt;
* <br>
* @example 
&lt;!--Declaration of Hover Person Card--&gt;
&lt;div dojoType="idx.widget.PersonCard" id="personInfo" query="{email: 'bcaceres@us.ibm.com'}"
url="https://w3-connections.ibm.com/profiles/json/profile.do" jsonp="callback"
spec="photo,fn,title,org,adr.work,tel.work,email.internet,sametime.awareness"
placeHolder="Sametime is not available on your client."&gt;&lt;/div&gt;

* @see dijit.TooltipDialog
**/
define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/keys", // keys
	"dijit/focus", 
	"dijit/a11y",
	"dojo/_base/event", // event.stop
	"dojo/_base/fx", // fx.fadeIn fx.fadeOut
	"dojo/_base/lang", // lang.hitch lang.isArrayLike
	"dojo/_base/html",
	"dojo/dom-geometry", // domGeometry.getMarginBox domGeometry.position
	"dijit/place",
	"dojo/dom",
	"dojo/dom-style", // domStyle.set, domStyle.get
	"dojo/dom-class",
	"dojo/dnd/Moveable", // Moveable
	"dojo/dnd/TimedMoveable", // TimedMoveable
	"dojo/_base/window", // win.body()
	"dojo/_base/connect",
	"dojo/_base/sniff", // has("ie")
	"dijit/_base/manager",	// manager.defaultDuration
	"dijit/BackgroundIframe",
	"dijit/TooltipDialog",
	"idx/widget/Menu",
	"dijit/MenuItem",
	"dijit/form/DropDownButton",
	"dijit/form/Button",
	"dojo/text!idx/widget/templates/HoverCard.html",
	"dijit/dijit",
	"dojo/i18n",
	"dojo/i18n!idx/widget/nls/HoverCard",
	"dojo/i18n!idx/widget/nls/Dialog"
], function(declare, array, keys, dijitfocus, a11y, event, fx, lang, html, domGeometry, place, dom, domStyle, domClass, Moveable, TimedMoveable, 
	win, connect, has, manager, BackgroundIframe, TooltipDialog, Menu, MenuItem, DropDownButton, Button, 
	template, dijit, i18n, hoverCardNls, dialogNls){

	var HoverCard = declare("profilePlugin.HoverCard", [TooltipDialog], {
	/** @lends profilePlugin.HoverCard.prototype */
		templateString: template,
		
		/**
		* target: String|HTML DOM
		*		Id of domNode or domNode to attach the HoverCard to.
		*		When user hovers over specified dom node, the HoverCard will appear.
		*		@type string
		**/	
		target: "",
		
		/**
		* draggable: Boolean
		*		Toggles the moveable aspect of the HoverCard. If true, HoverCard
		*		can be dragged by it's grippy bar. If false it will remain positioned 
		*		relative to the attached node
		*		@type boolean
		**/		
		draggable: true,
		
		/**
		 * The delay in milliseconds before the HoverCard displays
		 * @type integer
		 */
		showDelay: 500,		
		
		/**
		 * The delay in milliseconds before the HoverCard hides
		 * @type integer
		 */
		hideDelay: 800,	
		/**
		 * The items of "more action" menu at the bottom right of the HoverCard
		 * @type array
		*/
		moreActions: null,
		/**
		 * The items of "actions" listed at bottom left of HoverCard
		 * @type array
		 */
		actions: null,
		
		content: null,
		
		forceFocus: false,
		
		/**
		 * duration: Integer
		 * Milliseconds to fade in/fade out
		 * @type integer
		 */
		duration: manager.defaultDuration,
		
		postMixInProperties: function(){
			//this.moreActionsLabel = i18n.getLocalization("idx.oneui", "HoverCard", this.lang).moreActionsLabel;
			this.buttonClose = dialogNls.closeButtonLabel;
		},
		
		_setTargetAttr: function(/*String*/ target){
			// summary:
			//		Connect to specified node(s)

			var target = dom.byId(target);
			if(!target){return;}
			// Make connections
			this._connections = [
				this.connect(target, "onmouseenter", "_onHover"),
				this.connect(target, "onmouseleave", "_onUnHover"),				
				this.connect(target, "onkeypress", "_onConnectIdKey")
			];

			this._set("target", target);
		},
		_onConnectIdKey: function(/*Event*/evt){
            // summary:
            //		Handler for keyboard events
            // description:
            // tags:
            //		private
            var node = evt.target;
            
            if (evt.charOrCode == keys.ENTER || evt.charOrCode == keys.SPACE || evt.charOrCode == " ") {
                // Use setTimeout to avoid crash on IE, see #10396.
                 this._showTimer = setTimeout(lang.hitch(this, function(){
                    this.open(node)
                }), this.showDelay);
                
                event.stop(evt);     
            }
    	},
		
		_setActionsAttr: function(actions){
			if (actions && actions.length > 0) {
				array.forEach(actions, function(action){
					var button = new Button({
						label: action.label,
						onClick: action.onClick,
						baseClass: "idxOneuiHoverCardFooterButton"})
					html.place(button.domNode, this.actionIcons);
					
				}, this);
			}
		},
		
		_setMoreActionsAttr: function(actions){
			if (actions && actions.length > 0) {
				var menu = new Menu({});
				array.forEach(actions, function(action){
					menu.addChild(new MenuItem({label:action.label, href: action.href, onClick:action.onClick}));
				});
				menu.startup();
				var button = new DropDownButton({
					label: this.moreActionsLabel, 
					dropDown: menu,
					baseClass: "idxOneuiHoverCardMenu"}, this.moreActionsNode);
				this.moreActionsMenu = menu;
			}
		},	
	
		_setContentAttr: function(content){
			var innerWidget = dijit.byId(content);
			if(!innerWidget.declaredClass){
				this.inherited(arguments);
			}else{
				html.place(innerWidget.domNode, this.containerNode);
				domClass.toggle(this.containerNode, "idxOneuiHoverCardWithoutPreviewImg", !innerWidget.image)
			}
		},
		/**
		 * Despite the name of this method, it actually handles both hover and focus
		 * events on the target node, setting a timer to show the HoverCard.
		 * @private
		 */
		_onHover: function(/*Event*/ e){			
			if(!this._showTimer){
				var target = e.target;
				this._showTimer = setTimeout(lang.hitch(this, function(){this.open(target)}), this.showDelay);
			}
			if(this._hideTimer){
				clearTimeout(this._hideTimer);
				delete this._hideTimer;
			}
		},
		
		/**
		 * Despite the name of this method, it actually handles both mouseleave and blur
		 * events on the target node, hiding the HoverCard.
		 * @private
		 */
		_onUnHover: function(/*Event*/ /*===== e =====*/){
			// keep a HoverCard open if the associated element still has focus (even though the
			// mouse moved away)
			if(this._focus){ return; }

			if(this._showTimer){
				clearTimeout(this._showTimer);
				delete this._showTimer;
			}
			if(!this._hideTimer){
				this._hideTimer = setTimeout(lang.hitch(this, function(){this.close()}), this.hideDelay);
			}
		}, 
		
		onBlur: function(){
			this._hideTimer = setTimeout(lang.hitch(this, function(){this.close()}), this.hideDelay);
		},
		
		_showConnector: function(){
			var connector = this.connectorNode;	
			domStyle.set(connector, "visibility", "visible");
		},		
		
		postCreate: function(){
			win.body().appendChild(this.domNode);

			this.bgIframe = new BackgroundIframe(this.domNode);

			// Setup fade-in and fade-out functions.
			this.fadeIn = fx.fadeIn({ node: this.domNode, duration: this.duration, onEnd: lang.hitch(this, "_onShow")});
			this.fadeOut = fx.fadeOut({ node: this.domNode, duration: this.duration, onEnd: lang.hitch(this, "_onHide")});
			
			this.connect(this.gripNode, "onmouseenter", function(){domClass.add(this.gripNode,"idxOneuiHoverCardGripHover");});
			this.connect(this.gripNode, "onmouseleave", function(){domClass.remove(this.gripNode,"idxOneuiHoverCardGripHover");});			
			this.connect(this.domNode, "onkeypress", "_onKey");
			this.connect(this.domNode, "onmouseenter", function(){
				this._hovered = true;
				if(this._hideTimer){
					clearTimeout(this._hideTimer);
					delete this._hideTimer;
				}
			});
			this.connect(this.domNode, "onmouseleave", function(){
				this._hovered = false;
				this._onUnHover();
			});			
		},
		
		/**
		 * Display the HoverCard
		 * @public
		 */
		open: function(/*DomNode*/ target){
 			// summary:
			//		Display the HoverCard; usually not called directly.
			// tags:
			//		private
			if(this._showTimer){
				clearTimeout(this._showTimer);
				delete this._showTimer;
			}
			if(this.isShowingNow){
				if(this.forceFocus){
					this.focus();
				}
				return;}
			domClass.remove(this.domNode, "dijitHidden");
			if(dojo.isIE <= 7){
				domStyle.set(this.bodyNode, "width", domStyle.get(this.containerNode, "width") + 5 + "px");
			}
			this.show(this.domNode.innerHTML, target, this.position, !this.isLeftToRight(), this.textDir);
			if(this.forceFocus){
				this.focus();
			}
			this._connectNode = target;
			this.onShow(target, this.position);
		},
		/**
		 * Hide the HoverCard or cancel timer for show of HoverCard
		 */
		close: function(){
			if(this._connectNode && !this._hovered && !this._moved && 
				(!this.moreActionsMenu || !this.moreActionsMenu._hoveredChild)){
				this.hide(this._connectNode);
				delete this._connectNode;
				this.onHide();
			}
			if(this._showTimer){
				clearTimeout(this._showTimer);
				delete this._showTimer;
			}
		},
		
		focus: function(){
			this.inherited(arguments);
			this._focus = true;
		},
		
		/**
		 * Display HoverCard around given node with specified contents.
		 * @param {string} innerHTML
		 * Contents of the hoverCard
		 * @param {DOM | Object} aroundNode
		 * Specifies that hoverCard should be next to this node / area
		 * @param {string[]} position
		 * List of positions to try to position tooltip (ex: ["right", "above"])
		 * @param {boolean} rtl
		 * Corresponds to `WidgetBase.dir` attribute, where false means "ltr" and true
		 * means "rtl"; specifies GUI direction, not text direction.
		 * @param {string} textDir
		 * Corresponds to `WidgetBase.textdir` attribute; specifies direction of text.
		 */
		show:  function(innerHTML, aroundNode, position, rtl, textDir){
			
			this._showConnector();

			// reset width; it may have been set by orient() on a previous HoverCard show()
			this.domNode.width = "auto";

			if(this.fadeOut.status() == "playing"){
				// previous HoverCard is being hidden; wait until the hide completes then show new one
				this._onDeck=arguments;
				return;
			}
			
			
			this.set("textDir", textDir);
			this.containerNode.align = rtl? "right" : "left"; //fix the text alignment

			var pos = place.around(this.domNode, aroundNode,
				position && position.length ? position : HoverCard.defaultPosition, !rtl, lang.hitch(this, "orient"));

			// Position the HoverCard connector for middle alignment.
			// This could not have been done in orient() since the HoverCard wasn't positioned at that time.
			var aroundNodeCoords = pos.aroundNodePos;
			if(pos.corner.charAt(0) == 'M' && pos.aroundCorner.charAt(0) == 'M'){
				this.connectorNode.style.top = aroundNodeCoords.y + ((aroundNodeCoords.h - this.connectorNode.offsetHeight) >> 1) - pos.y + "px";
				this.connectorNode.style.left = "";
			}else if(pos.corner.charAt(1) == 'M' && pos.aroundCorner.charAt(1) == 'M'){
				this.connectorNode.style.left = aroundNodeCoords.x + ((aroundNodeCoords.w - this.connectorNode.offsetWidth) >> 1) - pos.x + "px";
			}

			
			var node = this.domNode,
				connector = this.connectorNode;
			if(this.gripNode && this.draggable){
				this._moveable = new ((has("ie") == 6) ? TimedMoveable // prevent overload, see #5285
					: Moveable)(node, { handle: this.gripNode });
				
				this.connect(this._moveable, "onFirstMove", function(){
					domStyle.set(connector, "visibility", "hidden");
					domClass.add(this.gripNode,"idxOneuiHoverCardGripActive");
					this._moved = true;
				});
				this.connect(this._moveable, "onMoveStop", function(){
					domClass.remove(this.gripNode,"idxOneuiHoverCardGripActive");
					domClass.add(this.gripNode,"idxOneuiHoverCardGrip");
				});

			}else{
				//domClass.add(node,"dijitDialogFixed");
			}
			
				// show it
			domStyle.set(this.domNode, {
				"opacity": 0,
				"position": "absolute"
			});
			this.fadeIn.play();
			this.isShowingNow = true;
			this.aroundNode = aroundNode;
		},
	
	
		orient: function(/*DomNode*/ node, /*String*/ aroundCorner, /*String*/ HoverCardCorner, /*Object*/ spaceAvailable, /*Object*/ aroundNodeCoords){
			// summary:
			//		Private function to set CSS for HoverCard node based on which position it's in.
			//		This is called by the dijit popup code.   It will also reduce the HoverCard's
			//		width to whatever width is available
			// tags:
			//		protected
			this.connectorNode.style.top = ""; //reset to default

			//Adjust the spaceAvailable width, without changing the spaceAvailable object
			var HoverCardSpaceAvaliableWidth = spaceAvailable.w - this.connectorNode.offsetWidth;

			node.className = "idxOneuiHoverCard " +
				{
					"MR-ML": "idxOneuiHoverCardRight",
					"ML-MR": "idxOneuiHoverCardLeft",
					"TM-BM": "idxOneuiHoverCardAbove",
					"BM-TM": "idxOneuiHoverCardBelow",
					"BL-TL": "idxOneuiHoverCardBelow idxOneuiHoverCardABLeft",
					"TL-BL": "idxOneuiHoverCardAbove idxOneuiHoverCardABLeft",
					"BR-TR": "idxOneuiHoverCardBelow idxOneuiHoverCardABRight",
					"TR-BR": "idxOneuiHoverCardAbove idxOneuiHoverCardABRight",
					"BR-BL": "idxOneuiHoverCardRight",
					"BL-BR": "idxOneuiHoverCardLeft",
					"TR-TL": "idxOneuiHoverCardRight"
					//"MR-ML": "idxOneuiHoverCardLeft"
				}[aroundCorner + "-" + HoverCardCorner];

			// reduce HoverCard's width to the amount of width available, so that it doesn't overflow screen
			this.domNode.style.width = "auto";
			var size = domGeometry.getContentBox(this.domNode);

			var width = Math.min((Math.max(HoverCardSpaceAvaliableWidth,1)), size.w);
			var widthWasReduced = width < size.w;

			this.domNode.style.width = width+"px";

			//Adjust width for HoverCards that have a really long word or a nowrap setting
			if(widthWasReduced){
				this.containerNode.style.overflow = "auto"; //temp change to overflow to detect if our HoverCard needs to be wider to support the content
				var scrollWidth = this.containerNode.scrollWidth;
				this.containerNode.style.overflow = "visible"; //change it back
				if(scrollWidth > width){
					scrollWidth = scrollWidth + domStyle.get(this.domNode,"paddingLeft") + domStyle.get(this.domNode,"paddingRight");
					this.domNode.style.width = scrollWidth + "px";
				}
			}

			// Reposition the HoverCard connector.
			if(HoverCardCorner.charAt(0) == 'B' && aroundCorner.charAt(0) == 'B'){
				var mb = domGeometry.getMarginBox(node);
				var HoverCardConnectorHeight = this.connectorNode.offsetHeight;
				if(mb.h > spaceAvailable.h){
					// The HoverCard starts at the top of the page and will extend past the aroundNode
					var aroundNodePlacement = spaceAvailable.h - ((aroundNodeCoords.h + HoverCardConnectorHeight) >> 1);
					this.connectorNode.style.top = aroundNodePlacement + "px";
					this.connectorNode.style.bottom = "";
				}else{
					// Align center of connector with center of aroundNode, except don't let bottom
					// of connector extend below bottom of HoverCard content, or top of connector
					// extend past top of HoverCard content
					this.connectorNode.style.bottom = Math.min(
						Math.max(aroundNodeCoords.h/2 - HoverCardConnectorHeight/2, 0),
						mb.h - HoverCardConnectorHeight) + "px";
					this.connectorNode.style.top = "";
				}
			}else{
				// reset the HoverCard back to the defaults
				this.connectorNode.style.top = "";
				this.connectorNode.style.bottom = "";
			}

			return Math.max(0, size.w - HoverCardSpaceAvaliableWidth);
		},
		
		/**
		 * Hide the HoverCard on specified node / area
		 * @param {DOM | Object} aroundNode
		 */
		hide: function(aroundNode){
			
			if(this._onDeck && this._onDeck[1] == aroundNode){
				// this hide request is for a show() that hasn't even started yet;
				// just cancel the pending show()
				this._onDeck=null;
			}else if(this.aroundNode === aroundNode || this.isShowingNow){
				// this hide request is for the currently displayed HoverCard
				this.fadeIn.stop();
				this.isShowingNow = false;
				this.aroundNode = null;
				
				this.fadeOut.play();
				this._focus = false;
				this._hovered = false;
				this._moved = false;
				dijitfocus.focus(this._connectNode);
				
			}else{
				// just ignore the call, it's for a HoverCard that has already been erased
			}
		},
		
		_onShow: function(){
			// summary:
			//		Called at end of fade-in operation
			// tags:
			//		protected
			if(has("ie")){
				// the arrow won't show up on a node w/an opacity filter
				this.domNode.style.filter="";
			}
		},
		
		_onHide: function(){
			// summary:
			//		Called at end of fade-out operation
			// tags:
			//		protected

			domClass.add(this.domNode, "dijitHidden");
			if(this._onDeck){
				// a show request has been queued up; do it now
				this.show.apply(this, this._onDeck);
				this._onDeck=null;
			}
		},
		_getFocusItems: function(){
            // summary:
            //		Finds focusable items in dialog,
            //		and sets this._firstFocusItem and this._lastFocusItem
            // tags:
            //		protected
            
            var elems = a11y._getTabNavigable(this.domNode);
            this._firstFocusItem = elems.lowest || elems.first || this.closeButtonNode || this.domNode;
            this._lastFocusItem = elems.last || elems.highest || this._firstFocusItem;
     },
		_onKey: function(/*Event*/ evt){
			// summary:
			//		Handler for keyboard events
			// description:
			//		Keep keyboard focus in dialog; close dialog on escape key
			// tags:
			//		private

			var node = evt.target;
			if(evt.charOrCode === keys.TAB){
				this._getFocusItems(this.domNode);
			}
			var singleFocusItem = (this._firstFocusItem == this._lastFocusItem);
			if(evt.charOrCode == keys.ESCAPE){
				// Use setTimeout to avoid crash on IE, see #10396.
				setTimeout(lang.hitch(this, "hide"), 0);
				event.stop(evt);
			}else if(node == this._firstFocusItem && evt.shiftKey && evt.charOrCode === keys.TAB){
				if(!singleFocusItem){
					dijitfocus.focus(this._lastFocusItem); // send focus to last item in dialog
				}
				event.stop(evt);
			}else if(node == this._lastFocusItem && evt.charOrCode === keys.TAB && !evt.shiftKey){
				if(!singleFocusItem){
					dijitfocus.focus(this._firstFocusItem); // send focus to first item in dialog
				}
				event.stop(evt);
			}else if(evt.charOrCode === keys.TAB){
				// we want the browser's default tab handling to move focus
				// but we don't want the tab to propagate upwards
				evt.stopPropagation();
			}
		}
		
	});
	
//	// summary:
//		//		Static method to display HoverCard w/specified contents in specified position.
//		//		See description of idx.oneui.HoverCard.defaultPosition for details on position parameter.
//		//		If position is not specified then idx.oneui.HoverCard.defaultPosition is used.
//		// innerHTML: String
//		//		Contents of the HoverCard
//		// aroundNode: dijit.__Rectangle
//		//		Specifies that HoverCard should be next to this node / area
//		// position: String[]?
//		//		List of positions to try to position HoverCard (ex: ["right", "above"])
//		// rtl: Boolean?
//		//		Corresponds to `WidgetBase.dir` attribute, where false means "ltr" and true
//		//		means "rtl"; specifies GUI direction, not text direction.
//		// textDir: String?
//		//		Corresponds to `WidgetBase.textdir` attribute; specifies direction of text.	
//	HoverCard.show = idx.oneui.showHoverCard = function(innerHTML, title, action, imgSrc, aroundNode, position, rtl, textDir){
//		
//		if(!HoverCard._masterTT){ idx.oneui._masterTT = HoverCard._masterTT = new MasterHoverCard(); }
//		return HoverCard._masterTT.show(innerHTML, title, action, imgSrc, aroundNode, position, rtl, textDir);
//	};
//
//	// summary:
//		//		Static method to hide the HoverCard displayed via showHoverCard()
//	HoverCard.hide = idx.oneui.hideHoverCard = function(aroundNode){
//		
//		return HoverCard._masterTT && HoverCard._masterTT.hide(aroundNode);
//	};
//	
	HoverCard.defaultPosition = ["after-centered", "before-centered", "below", "above"];
	
	return HoverCard;	
	
});
