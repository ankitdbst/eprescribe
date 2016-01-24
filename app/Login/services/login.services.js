(function() {
    'use strict';
    angular.module('ERemediumWebApp.login.services')

    .factory('Login', ['$resource', function($resource) {
      var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
      var paramDefaults = {}; // Currently no param defaults

      var actions = {
        validateCredentials: {
          method: 'POST',
          url: ' http://52.74.177.118/ERService/userservice/ValidateCredentials'
        }
      };

      return $resource(resourceUrl, paramDefaults, actions);
    }]);
})();