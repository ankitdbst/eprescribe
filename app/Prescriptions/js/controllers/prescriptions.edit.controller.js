(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
    .controller('PrescriptionNewOrEditCtrl', PrescriptionNewOrEditCtrl);

    PrescriptionNewOrEditCtrl.$inject = [
      '$scope',
      'Prescription',
      '$stateParams',
      'Account',
      'ngDialog'
    ];

    function PrescriptionNewOrEditCtrl($scope, Prescription, $stateParams, Account, ngDialog) {
      var patientId = $stateParams.patientId;
      var user = Account.getAuthenticatedAccount();

      $scope.prescription = $scope.$parent.prescription;
      $scope.dialogTitle = "New Prescription";
      $scope.canvasEnabled = user.settings.canvasEnabled;

      // Prescription
      $scope.save = UpsertPrescription;
      $scope.close = ClosePrescription;
      $scope.minimize = Minimize;

      // Medicine
      $scope.upsert = UpsertMedicine;

      // Canvas | free write
      $scope.closeCanvas = CloseCanvas;

      function UpsertPrescription() {
        var params = {
          user        : user.mobile,
          sessionId   : user.sessionId,
          prescription: $scope.prescription
        };

        $scope.myPromise = Prescription.upsert(params, function(response) {
          if( _.isEqual(response.respCode, 1) ) {
            $scope.closeThisDialog({
              state: 'saved',
              data: response.pid
            });
          } else {
            // Show Error
            console.log(response);
          }
        });
      }

      function UpsertMedicine() {
        var dialog = ngDialog.open({
          template        : 'Prescriptions/partials/prescriptions.upsert-medicine.html',
          className       : 'ngdialog-theme-default custom-width-2',
          scope           : $scope,
          showClose       : false,
          closeByEscape   : false,
          closeByDocument : false,
          controller      : 'PrescriptionUpsertMedicineCtrl'
        });
      }

      function Minimize() {
        $scope.closeThisDialog({ state: 'minimized' });
      }

      function ClosePrescription() {
        $scope.closeThisDialog({ state: 'closed' });
      }

      function CloseCanvas() {
        $scope.canvasEditable = false;
      }
    }
})();