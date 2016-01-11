'use strict';

angular.module('ERemediumWebApp.reportinganalytics', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/reportinganalytics', {
    templateUrl: 'ReportingAnalytics/reportinganalytics.html',
    controller: 'ReportingAnalyticsCtrl'
  });
}])

.controller('ReportingAnalyticsCtrl', [function() {

}]);