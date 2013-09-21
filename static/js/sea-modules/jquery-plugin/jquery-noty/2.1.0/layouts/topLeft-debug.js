define("jquery-plugin/jquery-noty/2.1.0/layouts/topLeft-debug", [ "$-debug" ], function(require, exports, module) {
    var jQuery = require("$-debug");
    (function($) {
        $.noty.layouts.topLeft = {
            name: "topLeft",
            options: {},
            container: {
                object: '<ul id="noty_topLeft_layout_container" />',
                selector: "ul#noty_topLeft_layout_container",
                style: function() {
                    $(this).css({
                        top: 20,
                        left: 20,
                        position: "fixed",
                        width: "310px",
                        height: "auto",
                        margin: 0,
                        padding: 0,
                        listStyleType: "none",
                        zIndex: 1e7
                    });
                    if (window.innerWidth < 600) {
                        $(this).css({
                            left: 5
                        });
                    }
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