(function () {
    'use strict'
    angular.module('ERemediumWebApp.doctor.routes')

            .config([
                '$stateProvider',
                function ($stateProvider) {
                    $stateProvider
                            .state('Doctor', {
                                url: '/doctor',
                                templateUrl: 'Doctor/partials/doctor.index.html',
                                controller: 'DoctorIndexCtrl',
                                ncyBreadcrumb: {
                                  label: 'Doctor Profile',
                                  parent: 'PatientsList'
                                }
                            })
                }
            ]);
})();
