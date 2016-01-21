(function() {
    angular.module('ERemediumWebApp.utils.filters')
    .filter('datetime', datetime);

    datetime.$inject = ['$filter'];

    function datetime($filter) {
        return function(date, format, timezone) {
          if(angular.isDefined(date)) {
            var myDate = new Date(date);
            return $filter('date')(myDate, format, timezone)
          }
        };
    };
}) ();