(function() {
    'use strict';

    angular.module('ERemediumWebApp.reportinganalytics', [
        'ERemediumWebApp.reportinganalytics.routes',
        'ERemediumWebApp.reportinganalytics.controllers',
        'ERemediumWebApp.reportinganalytics.services',
    ]);

    angular.module('ERemediumWebApp.reportinganalytics.routes', ['ui.router']);
    angular.module('ERemediumWebApp.reportinganalytics.controllers', []);
    angular.module('ERemediumWebApp.reportinganalytics.services', []);
})();
