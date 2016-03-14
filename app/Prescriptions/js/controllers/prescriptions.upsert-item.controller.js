(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
            .controller('PrescriptionUpsertItemCtrl', PrescriptionUpsertItemCtrl);

    PrescriptionUpsertItemCtrl.$inject = ['$scope', '$stateParams', '$state', 'Prescription', 'Account'];

    function PrescriptionUpsertItemCtrl($scope, $stateParams, $state, Prescription, Account) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }
        var user = Account.getAuthenticatedAccount();
        // Move to constants
        $scope.frequencies = ['Daily', 'Weekly', 'Monthly', 'Custom'];
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

        $scope.advises = [
            'Absolute Eosinophil Count',
            'ACTH Stimulation Test',
            'Alpha Fetoprotien (Adult)',
            'Amlicor MTB Test',
            'Anti-LA Antibody',
            'Anti-Double Stranded DNA AntiBody'
        ];

        var itemStr = $scope.$parent.itemStr;
        var itemsStr = $scope.$parent.itemsStr;

        $scope.saveBtnName = _.isEmpty($scope[itemStr]) ? 'Add' : 'Update';
        // Limitation as the API has a mis-spelled medicine (else we can directly capitalize the first letter)
        $scope.dialogTitle = $scope.saveBtnName + ' ' + ((itemStr === 'medcine') ? 'Medicine' : 'Advise');

        Init();

        function Init() {
            $scope[itemStr] = $scope.$parent[itemStr];
            if (itemStr === 'medcine') {
                $scope.medcine.frequency = $scope.medcine.frequency || {};
                $scope.medcine.frequency.freq = $scope.medcine.frequency.freq || $scope.frequencies[0];
                $scope.medcine.frequency.dType = $scope.medcine.frequency.dType || $scope.dosageUnits[0];
            } else if (itemStr === 'advise') {
                // To fill defaults
            }
        }

        $scope.search = SearchMedicine;
        $scope.next = AddNext;

        function SearchMedicine(searchText) {
            var params = {
                user: user.mobile,
                sessionId: user.sessionId,
                doctorId: user.userId,
                searchText: searchText,
                limit: 5,
                columnsToGet: ""
            };
            $scope.myPromise = Prescription.searchMed(params).$promise;
            return Prescription.searchMed(params).$promise;
        }

        function AddNext() {
            $scope.$parent.prescription[itemsStr].push($scope[itemStr]);
            $scope.$parent[itemStr] = {};
            Init();
        }
    }

})();