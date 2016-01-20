(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientNewOrEditCtrl', PatientNewOrEditCtrl);

    PatientNewOrEditCtrl.$inject = ['$scope', '$stateParams', 'Patient', '$state'];

    function PatientNewOrEditCtrl($scope, $stateParams, Patient, $state) {
        //Intialize
        $scope.genders = ["Male", "Female"];

        if ($stateParams.patientId == '') {
            //A new patient profile is being created!
            //Set empty object..
            $scope.patient = {};
            $scope.patient.isUpdate = false;
            $scope.patient.gender = "Male";//set default value..
        } else {
            //Get Patient Details from server and populate patient object..
            $scope.patient = Patient.get($stateParams.patientId);
            $scope.patient.isUpdate = true;
        }

        $scope.savePatientProfile = SavePatientProfile;
        $scope.close              = Close;
        // Store all relationships e.g. Father, Mother needed in case of childrens
        $scope.patient.relationships = [];

        function SavePatientProfile() {
            var params = {};
            Patient.upsert(params, $scope.patient);
            $state.go('PatientsList');
        }
        
        function Close(){
            $state.go('PatientsList');
        }
    }

})();