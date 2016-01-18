(function() {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')

  .controller('PrescriptionAddMedicineCtrl', PrescriptionAddMedicineCtrl);

  PrescriptionAddMedicineCtrl.$inject = ['$scope'];

  function PrescriptionAddMedicineCtrl($scope) {
    activate();

    function activate() {
      // Need to retrieve these from the server as well!
      $scope.frequencies = ['Daily', 'Weekly', 'Monthly'];
      $scope.quantities = ['1 tablet', '1 spoon', '5 ml'];
      $scope.medicines = ['Brufen', 'D-Cold', 'Paracetamol', 'Vicks', 'Crocin'];
      $scope.fComments = ['Every 2 hours',
                          'Every 8 hours',
                          'Morning-AfterNoon-Evening',
                          'Morning-Afternoon',
                          'After Lunch',
                          'After Meal',
                          'After Dinner',
                          'Before Lunch',
                          'Before Meal',
                          'Before Dinner',
                          'As Required(ex: if fever or pain)',
                          'On pain',
                          'On Fever'];

      $scope.intakeComms = ["Don't eat anything after this medicine",
                            "Take after morning bowl"];
      $scope.units = ["Tablet", "Strip"];
    }

    $scope.medcine = {};
    $scope.save = AddMedicine;
    $scope.close = Close;

    function AddMedicine() {
      $scope.$parent.prescription.medcines.push($scope.medcine);
      $scope.medcine = {};
    }

    function Close() {
      // Close
    }
  }

}) ();