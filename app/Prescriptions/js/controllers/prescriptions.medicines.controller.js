(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
    .controller('PrescriptionMedicinesCtrl', PrescriptionMedicinesCtrl);

    PrescriptionMedicinesCtrl.$inject = ['$scope', '$state', '$rootScope'];

    function PrescriptionMedicinesCtrl($scope, $state, $rootScope) {
        //Initialize
        $scope.edit = EditMedicine;
        $scope.delete = Delete;

        $scope.days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
        $scope.times = ['Morning', 'Afternoon', 'Night'];

        function Delete(index) {
          $scope.prescription.medcines.splice(index, 1);
        }

        function EditMedicine(index) {
          $scope.upsertMed(index);
        }
    }

})();