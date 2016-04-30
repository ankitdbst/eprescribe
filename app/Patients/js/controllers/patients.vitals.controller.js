(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientsVitalsCtrl', PatientsVitalsCtrl);

    PatientsVitalsCtrl.$inject = ['$scope', 'Patient', '$state', '$rootScope', 'Account', 'ngDialog', '$stateParams'];

    function PatientsVitalsCtrl($scope, Patient, $state, $rootScope, Account, ngDialog, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        initialize();

        $scope.upsertVitals = UpsertVitals;

        function initialize() {
            $scope.sortType = ''; // set the default sort type
            $scope.sortReverse = false;  // set the default sort order
            GetVitals();
        }

        function UpsertVitals(index) {
            $scope.vital = _.isUndefined(index) ? {} : _.clone($scope.vitalList[index]);
            $scope.vital.dateTime = new Date();

            var upsertVitalDialog = ngDialog.open({
                template: 'Patients/partials/patients.upsert-vital.html',
                className: 'ngdialog-theme-default custom-width-1',
                scope: $scope,
                showClose: false,
                closeByEscape: false,
                closeByDocument: false,
                controller: 'PatientUpsertVitalCtrl'
            });

            upsertVitalDialog.closePromise.then(function (data) {
                if (data.value == "Add" || data.value == "Update") {
                    //Save the data..
                    SavePatientPeripheralDetails('Vitals', "userVitals");
                }
            });
        }

        function SavePatientPeripheralDetails(section, detailType) {
            if (angular.isUndefined($scope.patient.patientId)) {
                //if patient has not been created yet, then show an alert..
                $scope.showAlert = true;
                $scope.section = section;
                $scope.alertMessage = "Please create Patient before saving " + section + "!";
                $scope.alertClass = "alert-danger";
                return;
            }
            //Setup parameters.
            var params = {
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                patientId: $scope.patient.patientId,
                detailType: detailType,
                userDetail: $scope.vital
            };
            //Delete redundant properties
            delete $scope.patient["_id"];
            $scope.myPromise = Patient.upsertPeripheralDetails(params, function (response) {
                $scope.showAlert = true;
                $scope.section = section;
                //Show Proper Alert with option of going back.
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in saving Patient's " + section + ", Please try again!";
                    $scope.alertClass = "alert-danger";
                } else if (response.respCode == 1) {
                    $scope.alertMessage = "Patient's " + section + " Saved Successfully!";
                    $scope.alertClass = "alert-success";
                    //Refresh the vitals section from backend only when success is there..
                    GetVitals();
                } else {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-danger";
                }
            });
        }

        function GetVitals() {
            Patient.getPeripheralDetails({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                patientId: $stateParams.patientId,
                detailType: 'userVitals',
                columnsToGet: ""
            }, function (response) {
                $scope.vitalList = response;
            });
        }
    }
})();