(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
            .controller('PrescriptionDetailCtrl', PrescriptionDetailCtrl);

    PrescriptionDetailCtrl.$inject = [
        '$scope',
        '$stateParams',
        'Prescription',
        'Account',
        '$state',
        '$rootScope',
        'Patient'
    ];

    function PrescriptionDetailCtrl($scope, $stateParams, Prescription, Account, $state, $rootScope, Patient) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        var user = Account.getAuthenticatedAccount();

        Initialize();

        function Initialize() {
            $scope.canvasEnabled = user.loggedInUser.settings.canvasEnabled;
            $scope.$parent.detailView = $stateParams.prescriptionId;
            $scope.patient = {};
            GetPrescription();
            GetVitals();
            GetHistory();
            GetAllergies();
        }

        function GetPrescription() {
            var params = {
                user: user.loggedInUser.mobile,
                sessionId: user.sessionId,
                pid: $stateParams.prescriptionId,
                columnsToGet: ""
            };
            $scope.prescription = Prescription.get(params);
            $scope.myPromise = $scope.prescription.$promise;
        }

        function GetVitals() {
            Patient.getPeripheralDetails({
                user: user.userId,
                sessionId: user.sessionId,
                doctorId: user.userId,
                patientId: $stateParams.patientId,
                detailType: 'userVitals',
                columnsToGet: ""
            }, function (response) {
                $scope.patient.vital = response[0];
            });
        }

        function GetHistory() {
            Patient.getPeripheralDetails({
                user: user.userId,
                sessionId: user.sessionId,
                doctorId: user.userId,
                patientId: $stateParams.patientId,
                detailType: 'userHistory',
                columnsToGet: ""
            }, function (response) {
                $scope.patient.history = response[0];
            });
        }

        function GetAllergies() {
            Patient.getPeripheralDetails({
                user: user.userId,
                sessionId: user.sessionId,
                doctorId: user.userId,
                patientId: $stateParams.patientId,
                detailType: 'userAllergy',
                columnsToGet: ""
            }, function (response) {
                $scope.patient.alergy = response[0];
            });
        }
    }
})();
