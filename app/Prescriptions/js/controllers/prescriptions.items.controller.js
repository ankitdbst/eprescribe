(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
            .controller('PrescriptionItemsCtrl', PrescriptionItemsCtrl);

    PrescriptionItemsCtrl.$inject = ['$scope', 'Prescription', 'Account', '$state'];

    function PrescriptionItemsCtrl($scope, Prescription, Account, $state) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        var user = Account.getAuthenticatedAccount();

        Initialize();

        function Initialize() {
            $scope.instructions = [
                'SOS',
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
            $scope.dosages = [
                "N/A",
                "0 - 0 - 1",
                "0 - 0 - 2",
                "0 - 0 - 3",
                "0 - 1 - 0",
                "0 - 1 - 1",
                "0 - 2 - 2",
                "0 - 3 - 3",
                "1 - 0 - 0",
                "1 - 0 - 1",
                "1 - 1 - 0",
                "1 - 1 - 1",
                "1 - 1 - 1 - 1",
                "2 - 0 - 2",
                "2 - 2 - 0",
                "2 - 2 - 2",
                "2 - 2 - 2 - 2",
                "3 - 0 - 0",
                "3 - 0 - 3",
                "3 - 3 - 0",
                "3 - 3 - 3",
                "3 - 3 - 3 - 3"
            ];
            $scope.flag = 1;
            //TODO: Move to constants service
            $scope.days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
            $scope.times = ['Morning', 'Afternoon', 'Night'];

            GetAdviseInstructions();
        }


        //Function Assignment..
        $scope.delete = Delete;
        $scope.add = AddItem;
        $scope.search = SearchMedicine;
        $scope.searchAdvises = SearchAdvises;

        var typeWatch = $scope.$watch('type', function (val) {
            console.log("Item str: " + val);
            if (_.isUndefined(val))
                return;
            var watchExpr = 'prescription.' + val + 's';
            var itemsWatch = $scope.$watch(watchExpr, function (newVal, oldVal) {
                if (newVal !== undefined && oldVal !== undefined) {
                    var newLen = newVal.length;
                    var oldLen = oldVal.length;
                    if (newLen == oldLen - 1 && Object.keys(oldVal[oldLen - 1]).length == 0) {
                        //Time to unbind listener
                        itemsWatch();
                        return;
                    }
                    if (Object.keys(newVal[newLen - 1]).length > 1) {
                        AddItem();
                    }
                }
            }, true);
            typeWatch();
        });

        function AddItem() {
            var itemsStr = $scope.type + 's';
            $scope.prescription[itemsStr].push({});
        }

        function GetAdviseInstructions() {
            $scope.adviseInstructions = Prescription.getAdvisesInstruction({
                user: user.userId,
                sessionId: user.sessionId,
                doctorId: user.userId,
                columnsToGet: ""
            }, function (response) {
                $scope.adviseInstructions = response;
            }
            );
            $scope.myPromise = $scope.adviseInstructions.$promise;
        }

        function SearchAdvises(searchText) {
            if (searchText == undefined || searchText == "") {
                //Just return Favourite Advises only. This is onClick only
                var params = {
                    user: user.userId,
                    sessionId: user.sessionId,
                    doctorId: user.userId,
                    limit: 10,
                    columnsToGet: ""
                };
                $scope.myPromise = Prescription.getFavouriteAdvises(params).$promise;
                return Prescription.getFavouriteAdvises(params).$promise;
            }
            var params = {
                user: user.userId,
                sessionId: user.sessionId,
                doctorId: user.userId,
                searchText: searchText,
                limit: 10,
                columnsToGet: ""
            };
            $scope.myPromise = Prescription.searchAdvises(params).$promise;
            return Prescription.searchAdvises(params).$promise;
        }

        function SearchMedicine(searchText) {
            if (searchText == undefined || searchText == "") {
                //TODO: Back button causing data deletion
                //Just return Favourite Meds only. This is onClick only
                var params = {
                    user: user.loggedInUser.mobile,
                    sessionId: user.sessionId,
                    doctorId: user.userId,
                    limit: 10,
                    columnsToGet: ""
                };
                $scope.myPromise = Prescription.getFavouriteMed(params).$promise;
                return Prescription.getFavouriteMed(params).$promise;
            }
            var params = {
                user: user.loggedInUser.mobile,
                sessionId: user.sessionId,
                doctorId: user.userId,
                searchText: searchText,
                limit: 10,
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
