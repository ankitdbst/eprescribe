(function() {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')

  .controller('MedicinesIndexCtrl', MedicinesIndexCtrl);

  MedicinesIndexCtrl.$inject = ['$scope'];

  function MedicinesIndexCtrl($scope) {
    activate();

    function activate() {
      $scope.frequencies = ['Daily', 'Weekly', 'Monthly'];
      $scope.quantities = ['1 Tablet', '1 Spoon'];
    }
  }

}) ();