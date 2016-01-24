(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientNewOrEditCtrl', PatientNewOrEditCtrl);

    PatientNewOrEditCtrl.$inject = ['$scope', '$stateParams', 'Patient', '$state', '$rootScope'];

    function PatientNewOrEditCtrl($scope, $stateParams, Patient, $state, $rootScope) {
        //Intialize
        $scope.genders = ["Male", "Female"];
        $scope.relationshiptypes = ["None", "Daughter", "Son", "Wife", "Father", "Mother", "Grand Father", "Grand Mother", "Brother", "Sister", "Others"];
        $rootScope.pageHeader = "Patient Profile";
        if ($stateParams.patientId == '') {
            //A new patient profile is being created!
            //Set empty object..
            $scope.patient = {};
            $scope.patient.isUpdate = false;
            $scope.patient.gender = "Male";//set default value..
            $scope.patient.relationshiptype = "None";
        } else {
            //Get Patient Details from server and populate patient object..
            $scope.patient = Patient.get($stateParams.patientId);
            $scope.patient.isUpdate = true;
        }

        $scope.savePatientProfile = SavePatientProfile;
        $scope.close = Close;
        // Store all relationships e.g. Father, Mother needed in case of childrens
        $scope.patient.relationships = [];

        function SavePatientProfile() {
            var params = {};
            Patient.upsert(params, $scope.patient);
            $state.go('PatientsList');
        }

        function Close() {
            $state.go('PatientsList');
        }
    }

})();