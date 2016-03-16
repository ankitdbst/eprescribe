(function() {
  'use strict';

  angular.module('ERemediumWebApp.config')

  .config([
    '$httpProvider',

    function($httpProvider) {
      function transformRequest(data) {
        if (data == undefined) {
          return data;
        }

        angular.forEach(data, function(value, key) {
          if (key.startsWith('$') || key === '_id') { // Backend service fails if we have these params in the request
            delete data[key];
          }
          if(!angular.isUndefined(value) && value["$cgBusyFulfilled"]) {
              delete value["$cgBusyFulfilled"];
          }
        });
        return data;
      }

      $httpProvider.defaults.transformRequest.unshift(transformRequest);
      //Enable cross domain calls
      $httpProvider.defaults.useXDomain = true;

      //Remove the header used to identify ajax call  that would prevent CORS from working
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
  ]);
}) ();
