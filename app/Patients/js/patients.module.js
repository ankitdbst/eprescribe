(function() {
    'use strict';

    angular.module('ERemediumWebApp.patients', [
        'ERemediumWebApp.patients.routes',
        'ERemediumWebApp.patients.controllers',
        'ERemediumWebApp.patients.services',
    ]);

    angular.module('ERemediumWebApp.patients.routes', ['ui.router']);
    angular.module('ERemediumWebApp.patients.controllers', []);
    angular.module('ERemediumWebApp.patients.services', []);
})();
