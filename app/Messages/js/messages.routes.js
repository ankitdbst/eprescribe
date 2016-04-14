(function () {
    'use strict'
    angular.module('ERemediumWebApp.messages.routes')

            .config([
                '$stateProvider',
                function ($stateProvider) {
                    $stateProvider
                            .state('Messages', {
                                url: '/messages',
                                templateUrl: 'Messages/partials/messages.index.html',
                                controller: 'MessagesIndexCtrl',
                                ncyBreadcrumb: {
                                  label: 'Messages',
                                  parent: 'PatientsList'
                                }
                            })
                }
            ]);
})();
