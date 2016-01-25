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
        get: {
          method: 'GET',
          url: '/ERService/patient/GetPatient'
        },
        query: {
          method: 'POST',
          url: 'http://52.74.177.118/ERService/userservice/GetUsersForDoctor',
          isArray: true
        }
      };

      return $resource(resourceUrl, paramDefaults, actions);
    }]);
})();