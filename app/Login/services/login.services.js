(function() {
    'use strict';
    angular.module('ERemediumWebApp.login.services')

    .factory('Login', ['$resource', function($resource) {
      var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
      var paramDefaults = {}; // Currently no param defaults

      var actions = {
        validateCredentials: {
          method: 'POST',
          url: 'http://52.74.177.118/ERService/userservice/ValidateCredentials'
        }
      };

      return $resource(resourceUrl, paramDefaults, actions);
    }])

    .factory('Account', ['Login', '$cookies', function(Login, $cookies) {

      function login(params, loginHandler) {
        return Login.validateCredentials(params).$promise.then(function(response) {
          if (response.respCode == 1) {
            delete response['response'];
            delete response['respCode'];
            var account = angular.forEach(response, function(value, key) {
              if (key.startsWith('$')) { // Backend service fails if we have these params in the request
                delete response[key];
              }
            });
            setAuthenticatedAccount(account);
          }
          if(angular.isDefined(loginHandler)) {
            loginHandler(response);
          }
        });
      }

      function getAuthenticatedAccount() {
          if (!$cookies.authenticatedAccount) {
              return;
          }
          return JSON.parse($cookies.authenticatedAccount)
      }

      function isAuthenticated() {
          return !!$cookies.authenticatedAccount;
      }

      function setAuthenticatedAccount(account) {
          $cookies.authenticatedAccount = JSON.stringify(account);
      }

      return {
        'login': login,
        'getAuthenticatedAccount': getAuthenticatedAccount,
        'setAuthenticatedAccount': setAuthenticatedAccount,
        'isAuthenticated': isAuthenticated
      };
    }]);
})();