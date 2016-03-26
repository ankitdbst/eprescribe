(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives').
    directive('palmReject', palmReject);

    palmReject.$inject = [];

    function palmReject() {
      function link(scope, elm, attrs) {
        elm.on('touchstart touchmove', function(e) {
          e.preventDefault();
        });
      }

      return {
        link: link,
        restrict: 'E'
      }
    }
}) ();