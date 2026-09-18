define([
	"dojo/_base/declare",
	"aps/load",
	"aps/nav/ViewPlugin",
	"aps/Tile",
	"aps/Status"
], function (declare, load, ViewPlugin, Tile, Status) {
	var myID = "ZonesConnectTile";
	return declare(ViewPlugin, {
		init: function (mediator) {
			var self = this;
			var widget = new Tile({
				id: self.genId(myID)
			});

			mediator.getWidget = function () {
				return widget;
			};
		},
		onContext: function (context) {
			var self = this;
			var model = context.vars.tile_settings;
			var redirect_link = ("" !== model.target_url) ? model.target_url : "https://www.zones.com/site/standard_page/index.html";

			self.byId(myID).set({
				title: "" !== model.tile_title ? _(model.tile_title, self) : _("ZonesConnect", self),
				serviceDescription: "" !== model.tile_text ? _(model.tile_text, self) : _("Access the Zones partner portal", self),
				hint: _(model.tile_hint, self),
				gridSize: "md-4 xs-12",
				iconName: "" !== model.tile_icon ? model.tile_icon : self.buildStaticURL("img/desktop.png"),
				fontColor: model.tile_font_color,
				backgroundColor: model.tile_background_color,
				backgroundImage: model.tile_background_image,
				state: 'inactive',
				buttons: [{
					title: "" !== model.tile_button_text ? _(model.tile_button_text, self) : _("Open ZonesConnect", self),
					autoBusy: false,
					onClick: function () {
						window.open(redirect_link, "_blank");
					}
				}]
			});
			if ("" !== model.tile_label_text) {
				self.byId(myID).set({
					info: new Status({
						status: "label",
						statusInfo: {
							label: {
								label: _(model.tile_label_text, self),
								type: 'warning'
							}
						}
					})
				});
			}
		}
	});
});
