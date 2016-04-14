(function () {
    'use strict'
    angular.module('ERemediumWebApp.reportinganalytics.routes')

            .config([
                '$stateProvider',
                function ($stateProvider) {
                    $stateProvider
                            .state('ReportingAnalytics', {
                                url: '/reportinganalytics',
                                templateUrl: 'ReportingAnalytics/partials/reportinganalytics.index.html',
                                controller: 'ReportingAnalyticsIndexCtrl',
                                ncyBreadcrumb: {
                                  label: 'Reporting & Analytics',
                                  parent: 'PatientsList'
                                }
                            })
                }
            ]);
})();
