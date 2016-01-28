(function() {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')

  .controller('PrescriptionUpsertMedicineCtrl', PrescriptionUpsertMedicineCtrl);

  PrescriptionUpsertMedicineCtrl.$inject = ['$scope', '$stateParams', '$state', 'Prescription'];

  function PrescriptionUpsertMedicineCtrl($scope, $stateParams, $state, Prescription) {
    activate();

    function activate() {
      // Need to retrieve these from the server as well!
//      $scope.frequencies = ['Daily', 'Weekly', 'Monthly'];
//      $scope.quantities = ['1 tablet', '1 spoon', '5 ml'];
//      $scope.medicines = ['Brufen', 'D-Cold', 'Paracetamol', 'Vicks', 'Crocin'];
//      $scope.fComments = ['Every 2 hours',
//                          'Every 8 hours',
//                          'Morning-AfterNoon-Evening',
//                          'Morning-Afternoon',
//                          'After Lunch',
//                          'After Meal',
//                          'After Dinner',
//                          'Before Lunch',
//                          'Before Meal',
//                          'Before Dinner',
//                          'As Required(ex: if fever or pain)',
//                          'On pain',
//                          'On Fever'];
//
//      $scope.intakeComms = ["Don't eat anything after this medicine",
//                            "Take after morning bowl"];
//      $scope.units = ["Tablet", "Strip"];
    }

    var mIndex = parseInt($stateParams.mId, 10);
    var operation = "save";

    $scope.medcine = {};
    if (!isNaN(mIndex)) {
      if(angular.isDefined($scope.prescription.medcines) && $scope.prescription.medcines.length > mIndex) {
        $scope.medcine = $scope.$parent.prescription.medcines[mIndex];
      } else {
        $state.go('PrescriptionNewOrEdit');
      }
      $scope.saveBtnName = "Update";
      operation = "update";
    } else {
      $scope.saveBtnName = "Add";
      $scope.reset = Reset;
    }

    $scope.save = UpsertMedicine;
    $scope.search = SearchMedicine;
    $scope.$watchCollection('$parent.prescription.medcines', function(newValue, oldValue) {
//      console.log(newValue, oldValue);
      if (oldValue.length !== 0 && newValue.length == 0) {
        $state.go('PrescriptionNewOrEdit');
      }
    });


    function SearchMedicine(searchText) {
      var params = {
        "user": "sujeet",
        "sessionId": "781363i3",
        "doctorId" : "101",
        "searchText" : searchText,
        "limit": 5,
        "columnsToGet": ""
      };
      return Prescription.searchMed(params).$promise;
    }

    function UpsertMedicine() {
      // Call Upsert API, not require right now
      if (operation === "save") {
        $scope.$parent.prescription.medcines.push($scope.medcine);
        $scope.medcine = {};
      }
    }

    function Reset() {
      $scope.medcine = {};
    }
  }

}) ();