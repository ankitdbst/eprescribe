(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientUpsertDocumentsCtrl', PatientUpsertDocumentsCtrl);

    PatientUpsertDocumentsCtrl.$inject = ['$scope', '$stateParams', '$state', 'Patient', 'Account'];

    function PatientUpsertDocumentsCtrl($scope, $stateParams, $state, Patient, Account) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        var account = Account.getAuthenticatedAccount();

        Initialize();

        function Initialize() {
            $scope.document = $scope.$parent.document;
            $scope.saveBtnName = $scope.readonly ? 'View' : 'Add';
            $scope.dialogTitle = $scope.saveBtnName + " Document";
        }

        $scope.uploader = {};

        $scope.handleUpload = function ($files, $event, $flow) {
            angular.forEach($flow.files, function (flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function (event) {
                    var uri = event.target.result;
                    $scope.document.img = uri;
                };
                $scope.document.documentName = flowFile.name;
                fileReader.readAsDataURL(flowFile.file);
            });
        };
    }
})();