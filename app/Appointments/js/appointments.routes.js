(function () {
    'use strict'
    angular.module('ERemediumWebApp.appointments.routes')

            .config([
                '$stateProvider',
                function ($stateProvider) {
                    $stateProvider
                            .state('Appointments', {
                                url: '/book-appointment',
                                templateUrl: 'Appointments/partials/appointments.index.html',
                                controller: 'AppointmentsIndexCtrl',
                                ncyBreadcrumb: {
                                  label: 'Appointments',
                                  parent: 'PatientsList'
                                }
                            })
                            .state('PatientAppointments', {
                                url: 'patients/:patientId/book-appointment',
                                templateUrl: 'Appointments/partials/appointments.index.html',
                                controller: 'AppointmentsIndexCtrl',
                                ncyBreadcrumb: {
                                  label: 'Appointments',
                                  parent: 'PatientsList'
                                }
                            })
                }
            ]);
})();