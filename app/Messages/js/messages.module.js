(function() {
    'use strict';

    angular.module('ERemediumWebApp.messages', [
        'ERemediumWebApp.messages.routes',
        'ERemediumWebApp.messages.controllers',
        'ERemediumWebApp.messages.services',
    ]);

    angular.module('ERemediumWebApp.messages.routes', ['ui.router']);
    angular.module('ERemediumWebApp.messages.controllers', []);
    angular.module('ERemediumWebApp.messages.services', []);
})();
