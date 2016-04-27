(function() {
  'use strict';

  angular.module('ERemediumWebApp.appointments', [
    'ERemediumWebApp.appointments.routes',
    'ERemediumWebApp.appointments.controllers',
    'ERemediumWebApp.appointments.services',
  ]);

  angular.module('ERemediumWebApp.appointments.routes', ['ui.router']);
  angular.module('ERemediumWebApp.appointments.controllers', []);
  angular.module('ERemediumWebApp.appointments.services', []);
})();
