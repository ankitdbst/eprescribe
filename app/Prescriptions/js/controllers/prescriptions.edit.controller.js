(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
    .controller('PrescriptionNewOrEditCtrl', PrescriptionNewOrEditCtrl);

    PrescriptionNewOrEditCtrl.$inject = ['$scope', 'Prescription', '$stateParams', '$state', '$rootScope'];

    function PrescriptionNewOrEditCtrl($scope, Prescription, $stateParams, $state, $rootScope) {
        //Intialize
        var pid = $stateParams.pId;

        if (pid !== undefined && pid.length !== 0) {
            $rootScope.pageHeader = "Update Prescription";

            $scope.prescription = Prescription.get({
                user: 'sujeet',
                sessionId: $rootScope.sessionId,
                pid: pid
            });
            $scope.prescription.isUpdate = true; // for edit we change this to true
        } else {
            $rootScope.pageHeader = "Create Prescription";

            $scope.prescription = new Prescription();
            // Fill defaults from session object maybe
            $scope.prescription.isUpdate = false; // for edit we change this to true
            // Medications
            $scope.prescription.medcines = [];
        }

        // Methods
        $scope.save = UpsertPrescription;
        $scope.close = Close;

        function UpsertPrescription() {
            var params = {
                user: 'sujeet',
                sessionId: $rootScope.sessionId,
                prescription: $scope.prescription
            };
            $scope.prescription = Prescription.upsert(params);

            $scope.prescription.$promise.then(function(prescription) {
              $state.go('PrescriptionDetail', {
                pId: prescription.pid
              });
            });
        }

        function Close() {
            $state.go('PrescriptionList', {
              patientId: prescription.patient.patientId
            });
        }
    }
})();