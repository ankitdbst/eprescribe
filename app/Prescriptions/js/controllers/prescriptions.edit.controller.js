(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
    .controller('PrescriptionNewOrEditCtrl', PrescriptionNewOrEditCtrl);

    PrescriptionNewOrEditCtrl.$inject = ['$scope', 'Prescription', '$stateParams', '$state', '$rootScope', 'Account', 'ngDialog'];

    function PrescriptionNewOrEditCtrl($scope, Prescription, $stateParams, $state, $rootScope, Account, ngDialog) {
        //Intialize
        if(!Account.isAuthenticated()) {
          $state.go('login'); return;
        }

        var account = Account.getAuthenticatedAccount();
        var pid = $stateParams.pId;
        var patientId = $stateParams.patientId;

        $scope.dialogTitle = $scope.$parent.patientProfile.firstName + "'s Prescription";

        if (pid !== undefined && pid.length !== 0) {
            $rootScope.pageHeader = "Update Prescription";
            $scope.prescription = Prescription.get({
                user: 'sujeet',
                sessionId: account.sessionId,
                pid: pid
            });
            $scope.myPromise = $scope.prescription.$promise;
            $scope.prescription.isUpdate = true; // for edit we change this to true
        } else {
            $rootScope.pageHeader = "Create Prescription";

//            $scope.canvas-editable = false;
            if($scope.$parent.prescriptionTmp !== undefined) {
              $scope.prescription = $scope.$parent.prescriptionTmp;
            } else {
            $scope.prescription = new Prescription();
            $scope.prescription.patientId = patientId;
            $scope.prescription.doctorId = account.userId;
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


        }

        // Methods
        $scope.save = UpsertPrescription;
        $scope.close = Close;
        $scope.open = Open;
        $scope.closeCanvas = CloseCanvas;

        function CloseCanvas() {
          $scope.canvasEditable = false;
        }

        function UpsertPrescription() {
            var params = {
                user: 'sujeet',
                sessionId: account.sessionId,
                prescription: $scope.prescription
            };

            $scope.$parent.prescriptions.push($scope.prescription);

            $scope.myPromise = Prescription.upsert(params, function(response) {
                $scope.closeThisDialog();
//              $state.go('PrescriptionDetail', {
//                id: response.pid
//              });
            });
        }

        $scope.minimize = Minimize;

        function Open() {
            ngDialog.open({
              template: 'Prescriptions/partials/prescriptions.upsert-medicine.html',
              className: 'ngdialog-theme-default custom-width-2',
              scope: $scope,
              showClose: false,
              closeByEscape: false,
              closeByDocument: false,
              controller: 'PrescriptionUpsertMedicineCtrl'
            });
        }

        function Close() {
            $scope.$parent.showMenu = false;
            $scope.closeThisDialog();
//            $state.go('PrescriptionList', {
//              patientId: prescription.patient.patientId
//            });
        }

        function Minimize() {
          $scope.$parent.showMenu = true;
          $scope.$parent.prescriptionTmp = $scope.prescription;
          $scope.closeThisDialog("minimize");
        }
    }
})();