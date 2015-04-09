// Sets the require.js configuration for your application.

require.config( {
      // 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.8.2.min")
	  
      paths: {
            // Core Libraries
            jquery: "/public/libs/vendors/jquery",
            jquerymobile: "/public/libs/vendors/jquerymobile/jquerymobile",
            jqueryi18n: "/public/libs/vendors/jquery.i18n.properties-min-1.0.9",
            underscore: "/public/libs/vendors/lodash",
            Backbone: "/public/libs/vendors/backbone",
            text: "/public/libs/vendors/text",
            accounting:"/public/libs/vendors/accounting.min",
            simpledialog:"/public/libs/vendors/jquery.mobile.simpledialog",
            
            aes:"/public/libs/vendors/aes",
            iscroll:"/public/libs/vendors/iscroll",
            screen:"/public/libs/vendors/screen",
            repoint:"/public/libs/vendors/repoint",
            MCMi18n:"/mcm/locale/MCMi18n",
            
            models: "models",
            templates: '/mcm/assets/templates', 
            MCMView: "MCMView"
      },

      shim: {
               'Backbone': ['underscore', 'jquery']
            }
} );

require(['jquery','underscore','Backbone'], function($, _, Backbone) { 

    $(document).on("mobileinit",
            // Set up the "mobileinit" handler before requiring jQuery Mobile's module
                    function () {
                        // Prevents all anchor click handling including the addition of active button state and alternate link bluring.
                        $.mobile.linkBindingEnabled = false;
                        $.mobile.hashListeningEnabled = false;
                        $.mobile.ajaxEnabled = false;
                        $.mobile.pushStateEnabled = false;

                        //remove hide page to avoid duplication, very important.
                        $(document).bind('pagechange', function () {
                            $('div[data-role="page"]').bind('pagehide', function (event, ui)
                            {
                                 $(event.currentTarget).remove();
                            });
                        });
                    }
            );

      require(['jquerymobile','jqueryi18n','mainapp'], 
            function(jqm,jqi18n,mainapp) {
            // Instantiates a new Backbone.js Mobile Router
             mainapp.initialize();
      });
});

