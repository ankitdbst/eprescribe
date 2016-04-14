(function () {
    'use strict'
    angular.module('ERemediumWebApp.pharmacy.routes')

            .config([
                '$stateProvider',
                function ($stateProvider) {
                    $stateProvider
                            .state('Pharmacy', {
                                url: '/pharmacy',
                                templateUrl: 'Pharmacy/partials/pharmacy.index.html',
                                controller: 'PharmacyIndexCtrl',
                                ncyBreadcrumb: {
                                  label: 'Pharmacy',
                                  parent: 'PatientsList'
                                }
                            })
                }
            ]);
})();
