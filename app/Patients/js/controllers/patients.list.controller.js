(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientsListCtrl', PatientsListCtrl);

    PatientsListCtrl.$inject = ['$scope', 'Patient', '$state', '$rootScope'];

    function PatientsListCtrl($scope, Patient, $state, $rootScope) {

        //Initialize
        $rootScope.pageHeader = "Patients";
        $scope.patient = {};
        searchParameterReset();

        //Bound to Patient List Table
        //$scope.patientList = Patient.list();
        $scope.patientList = [{id: 101, name: 'Mohanish Singh', dateofbirth: '09/05/1984', gender: 'M', mobilenumber: 9910430979, emailid: 'mohanish.singh@gmail.com', address: 'B202, Civitech Sampriti, Sector 77, Noida, 201301'},
            {id: 102, name: 'Sujeet Chaudhary', dateofbirth: '07/06/1982', gender: 'M', mobilenumber: 9910431943, emailid: '', address: 'F1404, Civitech Sampriti, Sector 77, Noida, 201301'},
            {id: 103, name: 'Arka Chakraborty', dateofbirth: '09/04/1970', gender: 'M', mobilenumber: 9543430639, emailid: '', address: 'Deshbandhu Apartments, Kalkaji, 110019'},
            {id: 104, name: 'Ankit Gupta', dateofbirth: '12/11/1989', gender: 'M', mobilenumber: 9810430469, emailid: 'ankit.gupta@yahoo.com', address: 'Mahagun Maple, Sector 50, Noida, 201301'},
            {id: 105, name: 'Manoj Saini', dateofbirth: '12/11/1987', gender: 'M', mobilenumber: 9780430984, emailid: 'drmax.india@gmail.com', address: 'Gurgaon, 470002'},
            {id: 106, name: 'Ankita Sen', dateofbirth: '07/06/1982', gender: 'F', mobilenumber: 9910431944, emailid: '', address: 'F1404, Civitech Sampriti, Sector 77, Noida, 201301'},
            {id: 107, name: 'Nitin Raj', dateofbirth: '09/05/1970', gender: 'M', mobilenumber: 9543445639, emailid: '', address: 'Deshbandhu Apartments, Kalkaji, 110019'},
            {id: 108, name: 'Santosh Gupta', dateofbirth: '04/11/1989', gender: 'M', mobilenumber: 9810423469, emailid: 'santosh.gupta@yahoo.com', address: 'Mahagun Moderne, Sector 78, Noida, 201301'},
            {id: 109, name: 'Gauri Saini', dateofbirth: '12/11/1987', gender: 'F', mobilenumber: 9780424984, emailid: 'gauri.saini@gmail.com', address: 'Gurgaon, 470002'}
        ];

        //Functions
        $scope.searchByMobileNumber = SearchByMobileNumber;
        $scope.createPatientProfile = CreatePatientProfile;

        function CreatePatientProfile() {

            $state.go('PatientNewOrEdit');
        }

        function searchParameterReset() {
            $scope.patient.search = {mobilenumber: ''};
        }


        function SearchByMobileNumber() {
            $scope.patient = Patient.query($scope.patient.search.mobilenumber);
            //If found go to Profile Page else throw alert!
            if (angular.isUndefined($scope.patient))
            {
                alert('Patient not found!');
            } else
            {
                //Navigate to Profile Page using patient Id!
            }
            searchParameterReset();
        }
    }
})();