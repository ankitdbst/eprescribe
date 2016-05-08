(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
            .controller('PrescriptionTemplateCtrl', PrescriptionTemplateCtrl);

    PrescriptionTemplateCtrl.$inject = ['$scope', '$stateParams', 'Prescription', 'Account', '$state'];

    function PrescriptionTemplateCtrl($scope, $stateParams, Prescription, Account, $state) {
      // $scope.prescription = $scope.parent.prescription;
      var user = Account.getAuthenticatedAccount();
      $scope.saveAsTemplate = UpsertPrescriptionAsTemplate;

      function UpsertPrescriptionAsTemplate() {
          var params = {
              user: user.userId,
              sessionId: user.sessionId,
              isTemplate: "true",
              templateName: $scope.template_name,
              prescription: $scope.prescription
          };

          ['medcines', 'advises'].forEach(function (itemStr) {
              var len = $scope.prescription[itemStr].length;
              if (_.isEmpty($scope.prescription[itemStr][len - 1]) ||
                      Object.keys($scope.prescription[itemStr][len - 1]).length == 1) {
                  $scope.prescription[itemStr].pop();
              }
          });
          // Prescription.getTemplateById({sessionId: user.sessionId,doctorId: '101',templateId:'7575027259136053',columnsToGet:''},function(response){console.log(response);});
          $scope.myPromise = Prescription.upsert(params, function (response) {
              if (_.isEqual(response.respCode, 1)) {
                  $scope.closeThisDialog({
                      state: 'saved',
                      data: response.pid
                  });
                  $state.go('PrescriptionIndex.Detail', {
                      prescriptionId: response.pid,
                      patientId: $stateParams.patientId
                  });
              } else {
                  // Show Error
                  console.log(response);
              }
          });
      }
    }
}) ();
