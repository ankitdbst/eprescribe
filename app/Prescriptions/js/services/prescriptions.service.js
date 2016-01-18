(function() {
    'use strict';
    angular.module('ERemediumWebApp.prescriptions.services')

    .factory('Prescription', ['$resource', function($resource) {
      var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
      var paramDefaults = {}; // Currently no param defaults

      var actions = {
        upsert: {
          method: 'POST',
          url: '/ERService/prescription/UpsertPrescription'
        },
        list: {
          method: 'GET',
          url: '/ERService/prescription/ListPrescription'
        },
        get: {
          method: 'GET',
          url: '/ERService/prescription/GetPrescription'
        },
        query: {
          method: 'GET',
          url: '/ERService/prescription/SearchPrescription'
        }
      };

      return $resource(resourceUrl, paramDefaults, actions);
    }]);
})();