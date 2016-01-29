(function() {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
  .controller('PrescriptionOrderCtrl', PrescriptionOrderCtrl);

  PrescriptionOrderCtrl.$inject = ['$scope', '$state', '$stateParams', '$rootScope', 'Prescription'];

  function PrescriptionOrderCtrl($scope, $state, $stateParams, $rootScope, Prescription) {
//    $scope.prescription = Prescription.get({patientId: })
    var pid = $stateParams.pId;

    if(angular.isUndefined(pid) && pid.length === 0) {
      $state.go('PatientList');
    }

    $rootScope.pageHeader = "Prescription Order";

    var params = {
        user: "sujeet",
        sessionId: $rootScope.sessionId,
        pid: pid,
        columnsToGet: ""
    };

    $scope.prescription = Prescription.get(params);
    $scope.prescription.$promise.then(function(prescription) {
      if (angular.isUndefined($scope.prescription.patient.alternateAddresses)) {
        $scope.prescription.patient.alternateAddresses = [];
      };
      $scope.addresses = $scope.prescription.patient.alternateAddresses;
      $scope.addresses.push($scope.prescription.patient.address);
    });

    var addresses = [];
//    $scope.prescription = {
//      patient: {
//        firstName: 'Ankit',
//        lastName: 'Gupta',
//        address: {
//          line1: '318, Mahagun Maestro',
//          line2: 'Sector 50',
//          city: 'NOIDA',
//          state: 'U.P.',
//          pincode: '201301'
//        },
//        alternateAddresses: [
//          {
//            line1: '318, Mahagun Maestro',
//            line2: 'Sector 50',
//            city: 'NOIDA',
//            state: 'U.P.',
//            pincode: '201301'
//          },
//          {
//            line1: '318, Mahagun Maestro',
//            line2: 'Sector 50',
//            city: 'NOIDA',
//            state: 'U.P.',
//            pincode: '201301'
//          }
//        ]
//      }
//    };

    $scope.pharmacies = [
      "A, Sector 50",
      "B, Sector 70",
      "C, Sector 77"
    ];

    $scope.order = Order;
    $scope.close = Close;

    function Order() {
      var params = {
          user: 'sujeet',
          sessionId: $rootScope.sessionId,
          pid: pid,
          patientId: '2',
          doctorId: '101'
      };
//      Prescription.order(params);
      $state.go('PrescriptionOrderStatus');
//      alert('Order Successfully placed!');
    }

    function Close() {
      $state.go('PrescriptionList');
    }
  }

}) ();