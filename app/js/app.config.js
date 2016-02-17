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
        });
        return data;
      }

      $httpProvider.defaults.transformRequest.unshift(transformRequest);
    }
  ]);
}) ();
