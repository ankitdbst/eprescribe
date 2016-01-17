'use strict';

angular.module('ERemediumWebApp.reportinganalytics', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('reporting.index', {
    url: '/reportinganalytics',
    templateUrl: 'ReportingAnalytics/reportinganalytics.html',
    controller: 'ReportingAnalyticsCtrl'
  });
}])

.controller('ReportingAnalyticsCtrl', [function() {

}]);