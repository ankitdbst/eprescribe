(function() {
    'use strict';
    angular.module('ERemediumWebApp.patients.services')

    .factory('Patient', ['$resource', function($resource) {
      var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
      var paramDefaults = {}; // Currently no param defaults

      var actions = {
        upsert: {
          method: 'POST',
          url: '/ERService/patient/UpsertPatient'
        },
        list: {
          method: 'GET',
          url: '/ERService/patient/ListPatient'
        },
        get: {
          method: 'GET',
          url: '/ERService/patient/GetPatient'
        },
        query: {
          method: 'GET',
          url: '/ERService/patient/SearchPatient'
        }
      };

      return $resource(resourceUrl, paramDefaults, actions);
    }]);
})();