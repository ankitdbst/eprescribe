(function() {
    'use strict';

    angular.module('ERemediumWebApp.doctor', [
        'ERemediumWebApp.doctor.routes',
        'ERemediumWebApp.doctor.controllers',
        'ERemediumWebApp.doctor.services',
    ]);

    angular.module('ERemediumWebApp.doctor.routes', ['ui.router']);
    angular.module('ERemediumWebApp.doctor.controllers', []);
    angular.module('ERemediumWebApp.doctor.services', []);
})();
