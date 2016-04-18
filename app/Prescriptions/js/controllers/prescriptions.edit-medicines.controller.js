(function () {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
      .controller('PrescriptionEditMedicinesCtrl', PrescriptionEditMedicinesCtrl);

  PrescriptionEditMedicinesCtrl.$inject = [
    '$scope',
    'Prescription',
    '$stateParams',
    'Account',
    'ngDialog'
  ];

  function PrescriptionEditMedicinesCtrl($scope, Prescription, $stateParams, Account, ngDialog) {
    $scope.prescription = $stateParams.prescription;
    var user = Account.getAuthenticatedAccount();
    $scope.save = UpsertPrescription;
    // $scope.saveAsTemplate = UpsertPrescriptionAsTemplate;
    $scope.templateNameDialog = TemplateNameDialog;

    // ['medcines', 'advises'].forEach(function (itemsStr) {
    //   var len = $scope.prescription[itemsStr].length;
    //   if (len == 0 || (!_.isEmpty($scope.prescription[itemsStr][len - 1]) &&
    //       Object.keys($scope.prescription[itemsStr][len - 1]).length !== 1)) {
    //     $scope.prescription[itemsStr].push({});
    //   }
    // });
    console.log("Prescription: ", $scope.prescription);
    var params = {
      user: user.mobile,
      sessionId: user.sessionId,
      doctorId: user.userId,
      columnsToGet: "",
      limit:1000
    };

    $scope.templates = {};
    // $scope.myPromise = Prescription.getTemplates(params).$promise;
    $scope.templateList = Prescription.getTemplates(params);
    // console.log($scope.templateList);
    $scope.getTemplateName = function(template) {
      return template.templateName;
    };
    $scope.templateAdded = function(item) {
      // console.log($scope.templates.selected);
      //Add item.medcines to prescription.medcines
      ['medcines','advises'].forEach(function(itemStr) {
        var len = $scope.prescription[itemStr].length;
        //Since last entry is empty object we start adding item's medcines from len-1
        var i = 0;
        for(i = 0;i<item[itemStr].length;i++) {
          $scope.prescription[itemStr][len-1+i] = item[itemStr][i];
        }
        //Insert an empty object at the end now
        //If item has no medcines then no point adding another empty object at the end as it is already there
        if(item[itemStr].length>0) {
          $scope.prescription[itemStr].push({});
        }
      });
    };
    $scope.templateRemoved = function(item) {
      //Need to remove whatever added in templateAdded function
      //Starting with medcines
      //Using Brute force method as of now using nested loops because n will be very low
      ['medcines','advises'].forEach(function(itemStr) {
        var itemCounter, prescriptionCounter;
        for (itemCounter = 0; itemCounter<item[itemStr].length;itemCounter++) {
          for(prescriptionCounter = 0; prescriptionCounter < $scope.prescription[itemStr].length;prescriptionCounter++) {
            if(item[itemStr][itemCounter] == $scope.prescription[itemStr][prescriptionCounter]) {
              $scope.prescription[itemStr].splice(prescriptionCounter,1);
            }
          }
        }
      });
    };
    function UpsertPrescription() {
      //TODO change user to user.mobile
      var params = {
        user: '101',
        sessionId: user.sessionId,
        prescription: $scope.prescription
      };

      ['medcines', 'advises'].forEach(function (itemStr) {
        var len = $scope.prescription[itemStr].length;
        if (_.isEmpty($scope.prescription[itemStr][len - 1]) ||
            Object.keys($scope.prescription[itemStr][len - 1]).length == 1) {
          $scope.prescription[itemStr].pop();
        }
      });

      $scope.myPromise = Prescription.upsert(params, function (response) {
        if (_.isEqual(response.respCode, 1)) {
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

    function TemplateNameDialog() {
      var templateNameDialog = ngDialog.open({
        template: 'Prescriptions/partials/prescriptions.template-name-dialog.html',
        className: 'ngdialog-theme-default',
        scope: $scope,
        showClose: true,
        closeByEscape: false,
        closeByDocument: false,
        controller: function($scope, $stateParams, Prescription, Account) {
          // $scope.prescription = $scope.parent.prescription;
          var user = Account.getAuthenticatedAccount();
          $scope.saveAsTemplate = UpsertPrescriptionAsTemplate;

          function UpsertPrescriptionAsTemplate() {
            var params = {
              user: '101',
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
            } else {
              // Show Error
              console.log(response);
              }
            });
          }
        }
      });
    }  
  }
})();
