(function() {
    'use strict';

    angular.module('ERemediumWebApp.tasks', [
        'ERemediumWebApp.tasks.routes',
        'ERemediumWebApp.tasks.controllers',
        'ERemediumWebApp.tasks.services',
    ]);

    angular.module('ERemediumWebApp.tasks.routes', ['ui.router']);
    angular.module('ERemediumWebApp.tasks.controllers', []);
    angular.module('ERemediumWebApp.tasks.services', []);
})();
