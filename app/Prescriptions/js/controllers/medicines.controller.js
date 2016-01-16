(function() {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')

  .controller('MedicinesIndexCtrl', MedicinesIndexCtrl);

  MedicinesIndexCtrl.$inject = ['$scope'];

  function MedicinesIndexCtrl($scope) {
    activate();

    function activate() {
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
  }

}) ();