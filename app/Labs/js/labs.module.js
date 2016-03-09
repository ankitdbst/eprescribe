(function() {
    'use strict';

    angular.module('ERemediumWebApp.labs', [
        'ERemediumWebApp.labs.routes',
        'ERemediumWebApp.labs.controllers',
        'ERemediumWebApp.labs.services',
    ]);

    angular.module('ERemediumWebApp.labs.routes', ['ui.router']);
    angular.module('ERemediumWebApp.labs.controllers', []);
    angular.module('ERemediumWebApp.labs.services', []);
})();
