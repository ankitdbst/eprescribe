(function() {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
  .controller('PrescriptionOrderCtrl', PrescriptionOrderCtrl);

  PrescriptionOrderCtrl.$inject = ['$scope', '$state', '$rootScope'];

  function PrescriptionOrderCtrl($scope, $state, $rootScope) {
//    $scope.prescription = Prescription.get({patientId: })

    $rootScope.pageHeader = "Prescription Order";

    var addresses = [];
    $scope.prescription = {
      patient: {
        firstName: 'Ankit',
        lastName: 'Gupta',
        address: {
          line1: '318, Mahagun Maestro',
          line2: 'Sector 50',
          city: 'NOIDA',
          state: 'U.P.',
          pincode: '201301'
        },
        alternateAddresses: [
          {
            line1: '318, Mahagun Maestro',
            line2: 'Sector 50',
            city: 'NOIDA',
            state: 'U.P.',
            pincode: '201301'
          },
          {
            line1: '318, Mahagun Maestro',
            line2: 'Sector 50',
            city: 'NOIDA',
            state: 'U.P.',
            pincode: '201301'
          }
        ]
      }
    };

    $scope.addresses = $scope.prescription.patient.alternateAddresses;
    $scope.addresses.push($scope.prescription.patient.address);

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
          sessionId: '78131321',
          pid: 1
      };
      Prescription.order(params, $scope.order);

    }

    function Close() {
      $state.go('PrescriptionList');
    }
  }

}) ();