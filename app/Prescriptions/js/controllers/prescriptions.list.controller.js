(function() {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
  .controller('PrescriptionListCtrl', PrescriptionListCtrl);

  PrescriptionListCtrl.$inject = ['$scope', '$state'];

  function PrescriptionListCtrl($scope, $state) {
    $scope.prescriptions = [{_id:"568e1b8d220e878faf3311b3",pid:5,pDate:new Date("2015/11/04 10:32:31"),pTime:103231,medcines:[{name:"paracetomal"}],diseases:[{disease:"Headache",reportDate:20151031,daysFrom:10},{disease:"Anemia",reportDate:20151031,daysFrom:10}]},{_id:"568e1b8d220e878faf3311b3",pid:4,pDate:new Date("2015/11/04 10:32:31"),pTime:103231,medcines:[{name:"paracetomal"}],diseases:[{disease:"Headache",reportDate:20151031,daysFrom:10},{disease:"Anemia",reportDate:20151031,daysFrom:10}]},{_id:"568e1b8d220e878faf3311b3",pid:5,pDate:new Date("2015/11/04 10:32:31"),pTime:103231,medcines:[{name:"paracetomal"}],diseases:[{disease:"Headache",reportDate:20151031,daysFrom:10},{disease:"Anemia",reportDate:20151031,daysFrom:10}]},{_id:"568e1b8d220e878faf3311b3",pid:5,pDate:20151104,pTime:103231,medcines:[{name:"paracetomal"}],diseases:[{disease:"Headache",reportDate:20151031,daysFrom:10},{disease:"Anemia",reportDate:20151031,daysFrom:10}]}];;

    $scope.view = ViewPrescription;

    function ViewPrescription(pid) {
      $state.go('PrescriptionNewOrEdit', {
        id: pid
      });
    }
  }

}) ();