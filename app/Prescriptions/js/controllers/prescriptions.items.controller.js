(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
    .controller('PrescriptionItemsCtrl', PrescriptionItemsCtrl);

    PrescriptionItemsCtrl.$inject = ['$scope', 'Prescription', 'Account'];

    function PrescriptionItemsCtrl($scope, Prescription, Account) {
        var user = Account.getAuthenticatedAccount();

        //Initialize
        $scope.frequencies = ['Hours', 'Daily', 'Weekly', 'Monthly'];
        $scope.dispenseUnits = ['Tablet', 'Bottle', 'Injection'];
        $scope.dosageUnits = ['tablet', 'ml', 'mg'];
        $scope.instructions = [
          'After Breakfast',
          'After Defecation',
          'After Dinner',
          'After Lunch',
          'After Meals',
          'At Bed Time',
          'Before Breakfast',
          'Before Dinner',
          'Before Lunch',
          'Before Meals',
          'In Between Food',
          'On Empty Stomach',
          'With Hot Water',
          'With Milk',
          'With Warm Water',
          'With Water'
        ];
        $scope.days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
        $scope.times = ['Morning', 'Afternoon', 'Night'];

        $scope.favorites = [
          'Crocin',
          'Glycomed',
          'Disprin',
          'Combiflam',
          'Asprin',
          'Zandu Bam',
          'Digene'
        ];

        $scope.dosages = [
          "0 - 0 - 1",
          "0 - 0 - 11",
          "0 - 0 - 111",
          "0 - 1 - 0",
          "0 - 1 - 1",
          "0 - 11 - 11",
          "0 - 111 - 111",
          "1 - 0 - 0",
          "1 - 0 - 1",
          "1 - 1 - 0",
          "1 - 1 - 1",
          "1 - 1 - 1 - 1",
          "11 - 0 - 11",
          "11 - 11 - 0",
          "11 - 11 - 11",
          "11 - 11 - 11 - 11",
          "111 - 0 - 0",
          "111 - 0 - 111",
          "111 - 111 - 0",
          "111 - 111 - 111",
          "111 - 111 - 111 - 111"
        ];

        $scope.advises = [
          'Absolute Eosinophil Count',
          'ACTH Stimulation Test',
          'Alpha Fetoprotien (Adult)',
          'Amlicor MTB Test',
          'Anti-LA Antibody',
          'Anti-Double Stranded DNA AntiBody'
        ];

        $scope.delete = Delete;
        $scope.add = _.once(AddItem);
        $scope.search = SearchMedicine;

        // Move to constants service
        $scope.days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
        $scope.times = ['Morning', 'Afternoon', 'Night'];

        function AddItem() {
          var itemsStr = $scope.type + 's';
          $scope.prescription[itemsStr].push({});
        }

        function SearchMedicine(searchText) {
          var params = {
            user        : user.mobile,
            sessionId   : user.sessionId,
            doctorId    : user.userId,
            searchText  : searchText,
            limit       : 5,
            columnsToGet: ""
          };
          $scope.myPromise = Prescription.searchMed(params).$promise;
          return Prescription.searchMed(params).$promise;
        }

        function Delete(index) {
          var itemsStr = $scope.type + 's';
          $scope.prescription[itemsStr].splice(index, 1);
        }
    }

})();