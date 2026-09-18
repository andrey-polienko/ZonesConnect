define([
    "dojo/_base/declare",
    "aps/View"
], function (declare, View) {

    var TARGET_URL = "https://www.zones.com/site/standard_page/index.html";

    return declare(View, {

        _opened: false,

        postCreate: function () {
            this.inherited(arguments);
            this._renderMessage("Opening ZonesConnect\u2026");
        },

        // Fires once the bound "services" var resolves - this is our signal
        // that the view is actually active/visible, so we trigger the
        // redirect here (postCreate can fire before that).
        onContext: function () {
            if (this.inherited) {
                this.inherited(arguments);
            }
            this._redirect();
        },

        _redirect: function () {
            if (this._opened) {
                return;
            }
            this._opened = true;

            var win = window.open(TARGET_URL, "_blank");
            this._renderMessage(
                win
                    ? "ZonesConnect opened in a new tab."
                    : "Your browser blocked the popup \u2014 click below to continue:"
            );
        },

        _renderMessage: function (message) {
            this.domNode.innerHTML =
                '<div style="padding:32px;text-align:center;font-family:Arial,Helvetica,sans-serif;">' +
                '  <p>' + message + '</p>' +
                '  <a href="' + TARGET_URL + '" target="_blank" rel="noopener noreferrer" ' +
                '     style="display:inline-block;margin-top:12px;padding:10px 22px;' +
                '     background:#0072CE;color:#fff;text-decoration:none;border-radius:4px;">' +
                '    Open ZonesConnect' +
                '  </a>' +
                '</div>';
        }

    });

});
