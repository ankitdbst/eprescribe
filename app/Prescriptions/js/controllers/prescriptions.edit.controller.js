(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
            .controller('PrescriptionNewOrEditCtrl', PrescriptionNewOrEditCtrl);

    PrescriptionNewOrEditCtrl.$inject = [
        '$scope',
        'Prescription',
        '$stateParams',
        'Account',
        'ngDialog',
        '$state'
    ];

    function PrescriptionNewOrEditCtrl($scope, Prescription, $stateParams, Account, ngDialog, $state) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        var patientId = $stateParams.patientId;
        var user = Account.getAuthenticatedAccount();

        $scope.prescription = $scope.$parent.prescription;
        $scope.dialogTitle = "New Prescription";
        $scope.canvasEnabled = user.settings.canvasEnabled;

        // Prescription
        $scope.save = UpsertPrescription;
        $scope.close = ClosePrescription;
        $scope.minimize = Minimize;

        // Medicine/Advises
        $scope.upsertItem = UpsertItem;

        // Canvas | free write
        $scope.closeCanvas = CloseCanvas;

        function UpsertPrescription() {
            var params = {
                user: user.mobile,
                sessionId: user.sessionId,
                prescription: $scope.prescription
            };

            ['medcines', 'advises'].forEach(function (itemStr) {
                var len = $scope.prescription[itemStr].length;
                if (_.isEmpty($scope.prescription[itemStr][len - 1]) ||
                        Object.keys($scope.prescription[itemStr][len - 1]).length == 1) {
                    $scope.prescription[itemStr].pop();
                }
            });

            $scope.myPromise = Prescription.upsert(params, function (response) {
                if (_.isEqual(response.respCode, 1)) {
                    $scope.closeThisDialog({
                        state: 'saved',
                        data: response.pid
                    });
                } else {
                    // Show Error
                    console.log(response);
                }
            });
        }

        ['medcines', 'advises'].forEach(function (itemsStr) {
            var len = $scope.prescription[itemsStr].length;
            if (len == 0 || (!_.isEmpty($scope.prescription[itemsStr][len - 1]) &&
                    Object.keys($scope.prescription[itemsStr][len - 1]).length !== 1)) {
                $scope.prescription[itemsStr].push({});
            }
        });

        function UpsertItem(item, index) {
            var itemStr, itemsStr;
            $scope.itemStr = itemStr = item;
            $scope.itemsStr = itemsStr = item + 's';

            $scope[itemStr] = {};
            $scope.editMode = !_.isUndefined(index);
            if ($scope.editMode)
                angular.copy($scope.prescription[itemsStr][index], $scope[itemStr]);

            var upsertDialog = ngDialog.open({
                template: 'Prescriptions/partials/prescriptions.upsert-' + itemStr + '.html',
                className: 'ngdialog-theme-default custom-width-2',
                scope: $scope,
                showClose: false,
                closeByEscape: false,
                closeByDocument: false,
                controller: 'PrescriptionUpsertItemCtrl'
            });

            upsertDialog.closePromise.then(function (data) {
                if (data.value == "Add") {
                    $scope.prescription[itemsStr].push($scope[itemStr]);
                } else if (data.value == "Update") {
                    $scope.prescription[itemsStr][index] = $scope[itemStr];
                }
            });
        }

        function Minimize() {
            $scope.closeThisDialog({state: 'minimized'});
        }

        function ClosePrescription() {
            $scope.closeThisDialog({state: 'closed'});
        }

        function CloseCanvas() {
            $scope.canvasEditable = false;
        }
    }
})();