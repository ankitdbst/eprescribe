(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
            .controller('PrescriptionListCtrl', PrescriptionListCtrl);

    PrescriptionListCtrl.$inject = ['$scope', '$state', '$rootScope'];

    function PrescriptionListCtrl($scope, $state, $rootScope) {
        //Initialize
        $rootScope.pageHeader = "Prescriptions";
        $scope.prescriptions = [{_id: "568e1b8d220e878faf3311b3", pid: 5, pDate: new Date("2015/11/04 10:32:31"), diagnosis: "Lab report showed above diseases, patient brought in critical time", patientComplaint: "Patient complaied of chest pain from last 10 days", pTime: 103231, medcines: [{name: "paracetomal"}], patient: {firstName: "Mohanish", lastName: "Singh", patientId: 1}, diseases: [{disease: "Headache", reportDate: 20151031, daysFrom: 10}, {disease: "Anemia", reportDate: 20151031, daysFrom: 10}]}, {_id: "568e1b8d220e878faf3311b3", pid: 4, pDate: new Date("2015/11/04 10:32:31"), pTime: 103231, medcines: [{name: "paracetomal"}], diseases: [{disease: "Headache", reportDate: 20151031, daysFrom: 10}, {disease: "Anemia", reportDate: 20151031, daysFrom: 10}]}, {_id: "568e1b8d220e878faf3311b3", pid: 5, pDate: new Date("2015/11/04 10:32:31"), pTime: 103231, medcines: [{name: "paracetomal"}], diseases: [{disease: "Headache", reportDate: 20151031, daysFrom: 10}, {disease: "Anemia", reportDate: 20151031, daysFrom: 10}]}, {_id: "568e1b8d220e878faf3311b3", pid: 5, pDate: 20151104, pTime: 103231, medcines: [{name: "paracetomal"}], diseases: [{disease: "Headache", reportDate: 20151031, daysFrom: 10}, {disease: "Anemia", reportDate: 20151031, daysFrom: 10}]}];
        $scope.patientProfile = {};

        if ($scope.prescriptions.length > 0) {
          $scope.patientProfile = $scope.prescriptions[0].patient;
        }

        $scope.view = ViewPrescription;

        function ViewPrescription(pid) {
            $state.go('PrescriptionNewOrEdit', {
                id: pid
            });
        }
    }

})();