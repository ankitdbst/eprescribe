(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
    .controller('PrescriptionDetailCtrl', PrescriptionDetailCtrl);

    PrescriptionDetailCtrl.$inject = ['$scope', '$state', '$stateParams', '$rootScope'];

    function PrescriptionDetailCtrl($scope, $state, $stateParams, $rootScope) {
        //Initialize
        $rootScope.pageHeader = "Prescription Detail";
        var prescriptions = [{creationDate: new Date("2015/11/04 10:32:31"), _id: "568e1b8d220e878faf3311b3", pid: 5, pDate: new Date("2015/11/04 10:32:31"), diagnosis: "Lab report showed above diseases, patient brought in critical time", patientComplaint: "Patient complaied of chest pain from last 10 days", pTime: 103231, medcines: [{dispenseQty: 20, dispenseUnit: 'Strip', name: "paracetomal", frequency: {freq: 'Weekly', intakeTime: {morning: 1, noon: 0, night: 0}, daose: "5", dType:"tablet", comments: "After Food", intakeDays: ["Mon", "Tue"]}}], patient: {firstName: "Mohanish", lastName: "Singh", patientId: 1, mobile: 8860614611}, doctor: {firstName: 'Manoj', lastName: 'Saini', mobile: 8860614611}, diseases: [{disease: "Headache", reportDate: 20151031, daysFrom: 10}, {disease: "Anemia", reportDate: 20151031, daysFrom: 10}]}, {_id: "568e1b8d220e878faf3311b3", pid: 4, pDate: new Date("2015/11/04 10:32:31"), pTime: 103231, medcines: [{name: "paracetomal"}], diseases: [{disease: "Headache", reportDate: 20151031, daysFrom: 10}, {disease: "Anemia", reportDate: 20151031, daysFrom: 10}]}, {_id: "568e1b8d220e878faf3311b3", pid: 5, pDate: new Date("2015/11/04 10:32:31"), pTime: 103231, medcines: [{name: "paracetomal"}], diseases: [{disease: "Headache", reportDate: 20151031, daysFrom: 10}, {disease: "Anemia", reportDate: 20151031, daysFrom: 10}]}, {_id: "568e1b8d220e878faf3311b3", pid: 5, pDate: 20151104, pTime: 103231, medcines: [{name: "paracetomal"}], diseases: [{disease: "Headache", reportDate: 20151031, daysFrom: 10}, {disease: "Anemia", reportDate: 20151031, daysFrom: 10}]}];

        $scope.prescription = prescriptions[0];
    }

})();