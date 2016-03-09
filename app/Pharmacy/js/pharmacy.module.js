(function() {
    'use strict';

    angular.module('ERemediumWebApp.pharmacy', [
        'ERemediumWebApp.pharmacy.routes',
        'ERemediumWebApp.pharmacy.controllers',
        'ERemediumWebApp.pharmacy.services',
    ]);

    angular.module('ERemediumWebApp.pharmacy.routes', ['ui.router']);
    angular.module('ERemediumWebApp.pharmacy.controllers', []);
    angular.module('ERemediumWebApp.pharmacy.services', []);
})();
