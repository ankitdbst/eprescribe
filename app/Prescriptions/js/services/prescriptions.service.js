(function() {
    'use strict';
    angular.module('ERemediumWebApp.prescriptions.services')

    .factory('Prescription', ['$resource', function($resource) {
      var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
      var paramDefaults = {}; // Currently no param defaults

      var actions = {
        upsert: {
          method: 'POST',
          url: 'http://52.74.177.118/ERService/prescription/UpsertPrescription'
        },
        list: {
          method: 'POST',
          url: 'http://52.74.177.118/ERService/prescription/ListPrescription',
          isArray: true
        },
        get: {
          method: 'POST',
          url: 'http://52.74.177.118/ERService/prescription/GetPrescription'
        },
        query: {
          method: 'GET',
          url: 'http://52.74.177.118/ERService/prescription/SearchPrescription'
        },
        searchMed: {
          method: 'POST',
          url: 'http://52.74.177.118/ERService/medcineservice/MedAutocomplete',
          isArray: true
        }
      };

      return $resource(resourceUrl, paramDefaults, actions);
    }]);
})();