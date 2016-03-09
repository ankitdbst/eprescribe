(function () {
    'use strict';

    angular.module('ERemediumWebApp.reportinganalytics.controllers')
            .controller('ReportingAnalyticsIndexCtrl', ReportingAnalyticsIndexCtrl);

    ReportingAnalyticsIndexCtrl.$inject = ['$scope', 'ReportingAnalytics', '$state', '$rootScope', 'Account', '$stateParams'];

    function ReportingAnalyticsIndexCtrl($scope, ReportingAnalytics, $state, $rootScope, Account, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('login');
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        initialize();


        function initialize() {
            $rootScope.pageHeader = "Reporting Analytics";
        }
    }
})();