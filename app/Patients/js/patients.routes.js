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
                                controller: 'PatientsListCtrl',
                                ncyBreadcrumb: {
                                  label: 'Home'
                                }
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
                                    },
                                    'documents@PatientNewOrEdit': {
                                        templateUrl: 'Patients/partials/patients.documents.html',
                                        controller: 'PatientsDocumentsCtrl'
                                    }
                                },
                                ncyBreadcrumb: {
                                  label: 'Patient Profile',
                                  parent: 'PatientsList'
                                }
                            });
                }
            ]);
})();
