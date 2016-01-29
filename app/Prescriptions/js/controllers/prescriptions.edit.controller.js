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
            $scope.myPromise = $scope.prescription.$promise;
            $scope.prescription.isUpdate = true; // for edit we change this to true
        } else {
            $rootScope.pageHeader = "Create Prescription";

            $scope.prescription = new Prescription();
            // Fill defaults from session object maybe
            $scope.prescription.isUpdate = false; // for edit we change this to true
            // Medications
            $scope.prescription.medcines = [];

            var defaultDate = new Date();
            // Add 7 days
            defaultDate.setDate(defaultDate.getDate() + 7);
            $scope.prescription.nextVisit = {};
            $scope.prescription.nextVisit.date = moment(defaultDate).format("DD/MM/YYYY hh:mm A");
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

            $scope.myPromise = Prescription.upsert(params, function(response) {
              $state.go('PrescriptionDetail', {
                id: response.pid
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