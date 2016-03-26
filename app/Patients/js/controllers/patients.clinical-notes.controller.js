(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientsClinicalNotesCtrl', PatientsClinicalNotesCtrl);

    PatientsClinicalNotesCtrl.$inject = ['$scope', 'Patient', '$state', '$rootScope', 'Account', 'ngDialog', '$stateParams'];

    function PatientsClinicalNotesCtrl($scope, Patient, $state, $rootScope, Account, ngDialog, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        initialize();

        $scope.upsertClinicalNotes = UpsertClinicalNotes;
        $scope.openClinicalNote = OpenClinicalNote;

        function initialize() {
            $scope.sortType = ''; // set the default sort type
            $scope.sortReverse = false;  // set the default sort order
            GetClinicalNotes();
        }

        function UpsertClinicalNotes(index) {
            $scope.clinicalNote = {};
            $scope.clinicalNote.date = new Date();
            $scope.readOnly = false;//Show Save button as its editable view
            var upsertNoteDialog = ngDialog.open({
                template: 'Patients/partials/patients.upsert-clinical-note.html',
                className: 'ngdialog-theme-default custom-width-1',
                scope: $scope,
                showClose: false,
                closeByEscape: false,
                closeByDocument: false,
                controller: 'PatientUpsertClinicalNotesCtrl'
            });
//
            upsertNoteDialog.closePromise.then(function (data) {
                if (data.value == "Add" || data.value == "View") {
                    //Save the data..
                    SavePatientPeripheralDetails('ClinicalNote', "userClinicalNote");
                }
            });
        }

        function OpenClinicalNote(noteObj) {
            //Get Patient Details from server and populate patient object..
            Patient.getPeripheralDetailsById({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                patientId: $stateParams.patientId,
                detailType: 'userClinicalNote',
                did: noteObj.did,
                columnsToGet: ""
            }, function (response) {
                $scope.clinicalNote = response;
                $scope.readOnly = true;//Do Not Save button as its read only view
                ngDialog.open({
                    template: 'Patients/partials/patients.upsert-clinical-note.html',
                    className: 'ngdialog-theme-default custom-width-1',
                    scope: $scope,
                    showClose: false,
                    closeByEscape: false,
                    closeByDocument: false,
                    controller: 'PatientUpsertClinicalNotesCtrl'
                });
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
                userDetail: $scope.clinicalNote
            };

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
                    //Refresh the Clinical Notes section from backend only when success is there..
                    GetClinicalNotes();
                } else {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-danger";
                }
            });
        }

        function GetClinicalNotes() {
            //Get Patient Details from server and populate patient object..
            Patient.getPeripheralDetails({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                patientId: $stateParams.patientId,
                detailType: 'userClinicalNote',
                columnsToGet: "did,date"
            }, function (response) {
                $scope.clinicalNotesList = response;
            });
        }
    }
})();