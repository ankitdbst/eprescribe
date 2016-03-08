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
                            .state('PatientVerifyOTP', {
                                url: '/patients/verifyotp/:patientId',
                                templateUrl: 'Patients/partials/patients.verify-otp.html',
                                controller: 'PatientsVerifyOTPCtrl'
                            })
                            .state('PatientNewOrEdit', {
                                url: '/patients/edit/:patientId',
                                views: {
                                    '': {
                                        templateUrl: 'Patients/partials/patients.edit.html',
                                        controller: 'PatientNewOrEditCtrl'
                                    },
                                    'vitals@PatientNewOrEdit': {
                                        templateUrl: 'Patients/partials/patients.vitals.html',
                                        controller: 'PatientsVitalsCtrl'
                                    },
                                    'clinicalNotes@PatientNewOrEdit': {
                                        templateUrl: 'Patients/partials/patients.clinical-notes.html',
                                        controller: 'PatientsClinicalNotesCtrl'
                                    }
                                },
                                params: {
                                    autoActivateChild: 'PatientNewOrEdit.PrescriptionIndex'
                                }
                            })
                            .state('PatientNewOrEdit.PrescriptionIndex', {
                                url: '/prescriptions',
                                templateUrl: 'Prescriptions/partials/prescriptions.index.html',
                                controller: 'PrescriptionIndexCtrl',
                                params: {
                                    autoActivateChild: 'PatientNewOrEdit.PrescriptionIndex.List'
                                }
                            })
                            .state('PatientNewOrEdit.PrescriptionIndex.List', {
                                templateUrl: 'Prescriptions/partials/prescriptions.list.html',
                                controller: 'PrescriptionListCtrl'
                            })
                            .state('PatientNewOrEdit.PrescriptionIndex.Detail', {
                                url: '/:prescriptionId',
                                templateUrl: 'Prescriptions/partials/prescriptions.detail.html',
                                controller: 'PrescriptionDetailCtrl'
                            })
                }
            ]);
})();