(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
            .controller('PrescriptionOrderCtrl', PrescriptionOrderCtrl);

    PrescriptionOrderCtrl.$inject = ['$scope', '$state', '$stateParams', 'Prescription', 'Account'];

    function PrescriptionOrderCtrl($scope, $state, $stateParams, Prescription, Account) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }
        var user = Account.getAuthenticatedAccount();

        Initialize();

        //Functions
        $scope.order = Order;
        $scope.close = Close;

        function Initialize() {
            GetAddresses();
            GetPharmacies();
            GetLabs();
        }

        function GetAddresses() {
            var params = {
                user: user.mobile,
                sessionId: user.sessionId,
                pid: $stateParams.prescriptionId,
                columnsToGet: ""
            };

            $scope.prescription = Prescription.get(params);
            $scope.myPromise = $scope.prescription.$promise;

            $scope.prescription.$promise.then(function (prescription) {
                if (angular.isUndefined($scope.prescription.patient.alternateAddresses)) {
                    $scope.prescription.patient.alternateAddresses = [];
                }
                $scope.addresses = $scope.prescription.patient.alternateAddresses;
                $scope.addresses.push($scope.prescription.patient.address);
            });
        }


        function GetPharmacies() {
            Prescription.listPharma({
                user: user.userId,
                sessionId: user.sessionId,
                city: "Noida",//TODO: should always be default one i.e. Eremedium Pharmacy if patient is opening app, else if Doctor is opening then should display his configured pharmacies, if not configured any then should default one i.e. Eremedium Pharmacy..
                limit: 10,
                columnsToGet: ""
            }, function (response) {
                $scope.pharmacies = response;
            });
        }

        function GetLabs() {
            $scope.labs = [
                "Apollo Labs",
                "Dr Lal Labs",
                "Super Religare Labs"
            ];
        }

        function Order() {
            $state.go('PrescriptionOrderStatus', {
                patientId: $stateParams.patientId,
                prescriptionId: $stateParams.prescriptionId
            });
        }

        function Close() {
            $state.go('PatientNewOrEdit', {patientId: $stateParams.patientId});
        }
    }

})();