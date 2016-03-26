(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
            .controller('PrescriptionIndexCtrl', PrescriptionIndexCtrl);

    PrescriptionIndexCtrl.$inject = [
        '$scope',
        '$rootScope',
        '$state',
        'ngDialog',
        'Prescription',
        '$stateParams',
        'Account'
    ];

    function PrescriptionIndexCtrl($scope, $rootScope, $state, ngDialog, Prescription, $stateParams, Account) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        var patientId = $stateParams.patientId;
        var user = Account.getAuthenticatedAccount();

        $scope.prescription = new Prescription;
        Init();

        $scope.prescriptions = [];

        $scope.create = CreatePrescription;
        $scope.clone = ClonePrescription;
        $scope.minimized = false;

        function Init() {
            $scope.prescription.patientId = patientId;
            $scope.prescription.doctorId = user.userId;
            // Fill defaults from session object maybe
            $scope.prescription.isUpdate = false; // for edit we change this to true
            // Medications
            $scope.prescription.medcines = [];
            $scope.prescription.advises = [];

            var defaultDate = new Date();
            // Add 7 days
            defaultDate.setDate(defaultDate.getDate() + 7);
            $scope.prescription.nextVisit = {};
            $scope.prescription.nextVisit.date = moment(defaultDate).format("DD/MM/YYYY hh:mm A");
        }

        function CreatePrescription() {
            var callback = function (response) {
                var state = response.state;
                if (_.isEqual(state, "closed") &&
                        confirm('Are you sure you want to close without saving your changes?')) {
                    return true;
                }
                return _.isEqual(state, "saved") || _.isEqual(state, "minimized");
            };

            var prescriptionDialog = ngDialog.open({
                template: 'Prescriptions/partials/prescriptions.edit.html',
                className: 'ngdialog-theme-default custom-width',
                scope: $scope,
                showClose: false,
                preCloseCallback: callback,
                closeByEscape: false,
                closeByDocument: false,
                controller: 'PrescriptionNewOrEditCtrl'
            });

            var openHandler = function(e, $dialog) {
              if ($dialog.attr('id') === prescriptionDialog.id) {
                $('.palm-rejection--wrapper').on('touchstart touchmove', function(e) {
                  e.preventDefault();
                  if(e.stopPropagation) {
                    e.stopPropagation();
                  }
                });
              }
            };

            $rootScope.$on('ngDialog.opened', openHandler);

            prescriptionDialog.closePromise.then(function (data) {
                $('body').removeClass('stop-scrolling')
                var response = data.value;
                if (_.isEqual(response.state, "saved")) {
                    $state.go('PatientNewOrEdit.PrescriptionIndex.Detail', {
                        prescriptionId: response.data
                    });
                    $scope.minimized = false;
                } else if (_.isEqual(response.state, "closed")) {
                    $scope.prescription = new Prescription;
                    Init();
                    $scope.minimized = false;
                } else {
                    // minimize
                    $scope.minimized = true;
                }
            });
        }

        function ClonePrescription(pid) {
            if (_.isUndefined(pid))
                pid = $stateParams.prescriptionId;

            var params = {
                user: user.mobile,
                sessionId: user.sessionId,
                pid: pid,
                columnsToGet: ""
            };

            $scope.prescription = Prescription.get(params);
            $scope.prescription.$promise.then(function (response) {
                delete $scope.prescription.pid; // We do not want to send the pid;
                delete $scope.prescription._id;
                CreatePrescription();
            });
        }
    }

})();