(function() {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions', [
        'ERemediumWebApp.prescriptions.routes',
        'ERemediumWebApp.prescriptions.controllers'
    ]);

    angular.module('ERemediumWebApp.prescriptions.routes', ['ui.router']);
    angular.module('ERemediumWebApp.prescriptions.controllers', []);
})();
