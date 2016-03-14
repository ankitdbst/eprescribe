(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientsClinicalNotesCtrl', PatientsClinicalNotesCtrl);

    PatientsClinicalNotesCtrl.$inject = ['$scope', 'Patient', '$state', '$rootScope', 'Account', 'ngDialog'];

    function PatientsClinicalNotesCtrl($scope, Patient, $state, $rootScope, Account, ngDialog) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        initialize();

//        $scope.vitalList = Patient.getVitals({
//            user: "",
//            sessionId: $scope.account.sessionId,
//            doctorId: $scope.account.userId,
//            limit: 50,
//            columnsToGet: ""
//        }, function (response) {
//            $scope.vitalList = response;
//        }
//        );
//      $scope.myPromise = $scope.patientList.$promise;

        $scope.clinicalNotesList = [{datetime: new Date()}, {datetime: new Date()}, {datetime: new Date()}];

        $scope.delete = Delete;
        $scope.upsertClinicalNotes = UpsertClinicalNotes;

        function initialize() {
            $scope.sortType = ''; // set the default sort type
            $scope.sortReverse = false;  // set the default sort order
        }

        function Delete(index) {
            $scope.clinicalNotesList.splice(index, 1);
            // No vital delete API as yet. But we need to call here.
        }

        function UpsertClinicalNotes(index) {
            $scope.clinicalNotes = _.isUndefined(index) ? {} : _.clone($scope.clinicalNotesList[index]);

            var upsertNoteDialog = ngDialog.open({
                template: 'Patients/partials/patients.upsert-clinical-note.html',
                className: 'ngdialog-theme-default custom-width-1',
                scope: $scope,
                showClose: false,
                closeByEscape: false,
                closeByDocument: false,
                controller: 'PatientUpsertClinicalNotesCtrl'
            });

            upsertNoteDialog.closePromise.then(function (data) {
                //Add a timestamp
                $scope.clinicalNotes.datetime = new Date();
                if (data.value == "Add") {
                    $scope.clinicalNotesList.push($scope.clinicalNotes);
                    //TODO: Call API
                } else if (data.value == "Update") {
                    $scope.clinicalNotesList[index] = $scope.clinicalNotes;
                    //TODO: Call API
                }
            });
        }
    }
})();