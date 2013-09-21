define("jquery-plugin/jquery-noty/2.1.0/layouts/topCenter-debug", [ "$-debug" ], function(require, exports, module) {
    var jQuery = require("$-debug");
    (function($) {
        $.noty.layouts.topCenter = {
            name: "topCenter",
            options: {},
            container: {
                object: '<ul id="noty_topCenter_layout_container" />',
                selector: "ul#noty_topCenter_layout_container",
                style: function() {
                    $(this).css({
                        top: 20,
                        left: 0,
                        position: "fixed",
                        width: "310px",
                        height: "auto",
                        margin: 0,
                        padding: 0,
                        listStyleType: "none",
                        zIndex: 1e7
                    });
                    $(this).css({
                        left: ($(window).width() - $(this).outerWidth(false)) / 2 + "px"
                    });
                }
            },
            parent: {
                object: "<li />",
                selector: "li",
                css: {}
            },
            css: {
                display: "none",
                width: "310px"
            },
            addClass: ""
        };
    })(jQuery);
});