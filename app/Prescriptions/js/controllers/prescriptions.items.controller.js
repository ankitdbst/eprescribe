(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
    .controller('PrescriptionItemsCtrl', PrescriptionItemsCtrl);

    PrescriptionItemsCtrl.$inject = ['$scope'];

    function PrescriptionItemsCtrl($scope) {
        //Initialize
        $scope.edit = Edit;
        $scope.delete = Delete;

        // Move to constants service
        $scope.days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
        $scope.times = ['Morning', 'Afternoon', 'Night'];

        function Delete(index) {
          var itemsStr = $scope.type + 's';
          $scope.prescription[itemsStr].splice(index, 1);
        }

        function Edit(index) {
          $scope.$parent.upsertItem($scope.type, index);
        }
    }

})();