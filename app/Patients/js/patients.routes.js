(function () {
    'use strict'

    angular.module('ERemediumWebApp.patients.routes')

            .config([
                '$stateProvider',
                function ($stateProvider) {
                    $stateProvider
                            .state('PatientsList', {
                                url: '/patients',
                                templateUrl: 'Patients/partials/patients.list.html',
                                controller: 'PatientsListCtrl'
                            })
                            .state('PatientNewOrEdit', {
                                url: '/patients/edit/:patientId',
                                templateUrl: 'Patients/partials/patients.edit.html',
                                controller: 'PatientNewOrEditCtrl'
                            })
                            .state('PatientNewOrEdit.PrescriptionList', {
                                url: '/prescriptions/:patientId',
                                templateUrl: 'Prescriptions/partials/prescriptions.list.html',
                                controller: 'PrescriptionListCtrl'
                            });
                }
            ]);
})();