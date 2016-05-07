(function () {
    'use strict';

    angular.module('ERemediumWebApp.appointments.controllers')
            .controller('AppointmentsDetailCtrl', AppointmentsDetailCtrl);

    AppointmentsDetailCtrl.$inject = ['$scope', '$stateParams', 'Appointments', 'Account'];

    function AppointmentsDetailCtrl($scope, $stateParams, Appointments, Account) {
      // $scope.prescription = $scope.parent.prescription;
      var user = Account.getAuthenticatedAccount();
      $scope.selectStopTime = function(item) {
        console.log(item);
        if(item == "15 minutes") {
            $scope.dateTo = $scope.originalDate.add(15*60*1000).format();
        }
        else if(item == "30 minutes") {
            $scope.dateTo = date.add(30*60*1000).format();
        }
        else if(item == "45 minutes") {
            $scope.dateTo = date.add(45*60*1000).format();
        }
        else {
            $scope.dateTo = date.add(15*60*1000).format();
        }
      }
      $scope.saveAppointment = function() {
        $scope.eventSources[0].events.push({
        title: $scope.patient.firstName+' '+$scope.patient.lastName,
        start: $scope.dateFrom,
        end: $scope.dateTo,
        stick: true
      });
        //closeDialog
        ngDialog.close();
      }
      // $scope.eventSources[0].events.push({
      //   title: 'FCB-5555',
      //   start: '2016-05-01T09:30:00',
      //   end: '2016-05-01T10:30:00',
      //   stick: true
      // });
      // $scope.saveAsTemplate = UpsertPrescriptionAsTemplate;
      // Prescription.getTemplateById({sessionId: user.sessionId,doctorId: '101',templateId:'7575027259136053',columnsToGet:''},function(response){console.log(response);});

      // $scope.myPromise = Prescription.upsert(params, function (response) {
      //   if (_.isEqual(response.respCode, 1)) {
      //     $scope.closeThisDialog({
      //       state: 'saved',
      //       data: response.pid
      //     });
      //     $state.go('PrescriptionIndex.Detail', {
      //       prescriptionId: response.pid,
      //       patientId: $stateParams.patientId
      //     });
      //   } else {
      //     // Show Error
      //     console.log(response);
      //     }
      //   });
    }
}) ();
