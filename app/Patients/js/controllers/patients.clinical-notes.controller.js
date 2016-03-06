(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientsClinicalNotesCtrl', PatientsClinicalNotesCtrl);

    PatientsClinicalNotesCtrl.$inject = ['$scope', 'Patient', '$state', '$rootScope', 'Account', '$uibModal'];

    function PatientsClinicalNotesCtrl($scope, Patient, $state, $rootScope, Account, $uibModal) {
        if (!Account.isAuthenticated()) {
            $state.go('login');
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

            var upsertNoteDialog = $uibModal.open({
              templateUrl: 'Patients/partials/patients.upsert-clinical-note.html',
              controller: 'PatientUpsertClinicalNotesCtrl',
              backdrop: true,
              scope: $scope,
              keyboard: false
            });

//            var upsertNoteDialog = ngDialog.open({
//                template: 'Patients/partials/patients.upsert-clinical-note.html',
//                className: 'ngdialog-theme-default custom-width-1',
//                scope: $scope,
//                showClose: false,
//                closeByEscape: false,
//                closeByDocument: false,
//                controller: 'PatientUpsertClinicalNotesCtrl'
//            });

//            upsertNoteDialog.closePromise.then();
//            upsertNoteDialog.closed.then(OnClose);
            upsertNoteDialog.result.then(OnClose);

            function OnClose(op) {
                //Add a timestamp
                $scope.clinicalNotes.datetime = new Date();
                if (op == "Add") {
                    $scope.clinicalNotesList.push($scope.clinicalNotes);
                    //TODO: Call API
                } else if (op == "Update") {
                    $scope.clinicalNotesList[index] = $scope.clinicalNotes;
                    //TODO: Call API
                }
            }
        }
    }
})();