(function () {
    'use strict'
    angular.module('ERemediumWebApp.labs.routes')

            .config([
                '$stateProvider',
                function ($stateProvider) {
                    $stateProvider
                            .state('Labs', {
                                url: '/labs',
                                templateUrl: 'Labs/partials/labs.index.html',
                                controller: 'LabsIndexCtrl'
                            })
                }
            ]);
})();