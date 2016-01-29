(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
            .controller('PrescriptionListCtrl', PrescriptionListCtrl);

    PrescriptionListCtrl.$inject = ['$scope', '$state', '$stateParams', '$rootScope', 'Prescription'];

    function PrescriptionListCtrl($scope, $state, $stateParams, $rootScope, Prescription) {
        //Initialize
        var patientId = $stateParams.patientId;
        $scope.sortSearchResultsReverse = false;// set the default sort order 
        $scope.sortSearchResultsType = ''// set the default sort type

        if (angular.isUndefined(patientId) && patientId.length === 0) {
          $state.go('PatientsList');// there needs to be home
        }

        $rootScope.pageHeader = "Prescriptions";
//        $scope.prescriptions = [{_id: "568e1b8d220e878faf3311b3", pid: 5, pDate: new Date("2015/11/04 10:32:31"), diagnosis: "Lab report showed above diseases, patient brought in critical time", patientComplaint: "Patient complaied of chest pain from last 10 days", pTime: 103231, medcines: [{name: "paracetomal"}], patient: {firstName: "Mohanish", lastName: "Singh", patientId: 1}, diseases: [{disease: "Headache", reportDate: 20151031, daysFrom: 10}, {disease: "Anemia", reportDate: 20151031, daysFrom: 10}]}, {_id: "568e1b8d220e878faf3311b3", pid: 4, pDate: new Date("2015/11/04 10:32:31"), pTime: 103231, medcines: [{name: "paracetomal"}], diseases: [{disease: "Headache", reportDate: 20151031, daysFrom: 10}, {disease: "Anemia", reportDate: 20151031, daysFrom: 10}]}, {_id: "568e1b8d220e878faf3311b3", pid: 5, pDate: new Date("2015/11/04 10:32:31"), pTime: 103231, medcines: [{name: "paracetomal"}], diseases: [{disease: "Headache", reportDate: 20151031, daysFrom: 10}, {disease: "Anemia", reportDate: 20151031, daysFrom: 10}]}, {_id: "568e1b8d220e878faf3311b3", pid: 5, pDate: 20151104, pTime: 103231, medcines: [{name: "paracetomal"}], diseases: [{disease: "Headache", reportDate: 20151031, daysFrom: 10}, {disease: "Anemia", reportDate: 20151031, daysFrom: 10}]}];
        $scope.patientProfile = {};

        var params = {
          user: "sujeet",
          sessionId: $rootScope.sessionId,
          doctorId: $rootScope.userId,
          ptientId: patientId,
          limit: 10,
          columnsToGet: ""
        };

        $scope.prescriptions = Prescription.list(params);
        $scope.prescriptions.$promise.then(function(prescriptions) {
          if (prescriptions.length > 0) {
            $scope.patientProfile = $scope.prescriptions[0].patient;
          }
        });

        $scope.view = ViewPrescription;

        function ViewPrescription(pid) {
            $state.go('PrescriptionDetail', {
                id: pid
            });
        }
    }

})();