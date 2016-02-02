(function() {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions', [
        'pw.canvas-painter',
        'ERemediumWebApp.prescriptions.routes',
        'ERemediumWebApp.prescriptions.controllers',
        'ERemediumWebApp.prescriptions.services',
        'ERemediumWebApp.prescriptions.directives',
    ]);

    angular.module('ERemediumWebApp.prescriptions.routes', ['ui.router']);
    angular.module('ERemediumWebApp.prescriptions.controllers', []);
    angular.module('ERemediumWebApp.prescriptions.services', []);
    angular.module('ERemediumWebApp.prescriptions.directives', []);
})();
