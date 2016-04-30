(function () {
    'use strict';

    angular.module('ERemediumWebApp.appointments.controllers')
            .controller('AppointmentsIndexCtrl', AppointmentsIndexCtrl);

    AppointmentsIndexCtrl.$inject = ['$scope', 'Appointments', '$state', '$rootScope', 'Account', '$stateParams','ngDialog'];

    function AppointmentsIndexCtrl($scope, Appointments, $state, $rootScope, Account, $stateParams, ngDialog) {
        if (!Account.isAuthenticated()) {
            $state.go('Appointments', {signIn: true});
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();
        $scope.patientId = $stateParams.patientId;
        //Initialize
        initialize();
        $scope.alertEventOnClick = function(item) {
            // alert("alert event on click");
            //Show a dialog to create a new Event
            if(item._ambigTime === false) {
                //Show a dialog to create a new Event
                var templateNameDialog = ngDialog.open({
                    template: 'Appointments/partials/appointments.appointment-details-dialog.html',
                    className: 'ngdialog-theme-default',
                    scope: $scope,
                    showClose: true,
                    closeByEscape: false,
                    controller: function($scope, $stateParams, Appointments, Account) {
                      // $scope.prescription = $scope.parent.prescription;
                      var user = Account.getAuthenticatedAccount();
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
                });
            }
        };
        $scope.alertOnDrop = function() {
            alert("alert on drop");
            console.log("alert on drop");
        };
        $scope.alertOnResize = function() {
            alert("alert on resize");
        };
        $scope.eventOnClick = function(event) {
            alert("evemt clicked");
        };
        $scope.eventSources = {
                                    events: [
                                        {
                                            title: 'Event1',
                                            start: '2016-04-04'
                                        },
                                        {
                                            title: 'Event2',
                                            start: '2016-04-23'
                                        },
                                        {
                                            title: 'Event33',
                                            start: '2016-04-27T03:30:00'
                                        }
                                        // etc...
                                    ],
                                    color: 'yellow',   // an option!
                                    textColor: 'black' // an option!
                                };

        /* config object */
        $scope.uiConfig = {
          calendar:{
            defaultView: 'agendaDay',
            height: "100%",
            slotDuration: '00:15:00',
            defaultTimedEventDuration: '00:15:00',
            nowIndicator: true,
            eventDurationEditable: false,
            editable: true,
            header:{
              left: 'month agendaWeek agendaDay',
              center: 'title',
              right: 'today prev,next'
            },
            dayClick: $scope.fillAppointment,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventClick: $scope.eventOnClick
          }
        };

        function initialize() {
            $rootScope.pageHeader = "Appointments";
            GetUserProfile();
            GetDoctorProfile();
        }

        function GetUserProfile() {
            if($stateParams.patientId !== undefined) {
                $scope.myPromise = Appointments.get({
                    user: $stateParams.patientId,
                    sessionId: $scope.account.sessionId,
                    isDoctor: false,
                    mobile: "",
                    columnsToGet: ""
                }, function (response) {
                    $scope.patient = response;
                });
            }
        }

        function GetDoctorProfile() {
            //Get Doctor Profile Details and populate..
            $scope.myPromise = Appointments.getProfile({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                isDoctor: true,
                mobile: "",
                columnsToGet: ""
            }, function (response) {
                $scope.doctor = response;
            });
        }
    }
})();