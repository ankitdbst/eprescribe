(function () {
    'use strict';

    angular.module('ERemediumWebApp.appointments.controllers')
            .controller('AppointmentsIndexCtrl', AppointmentsIndexCtrl);

    AppointmentsIndexCtrl.$inject = ['$scope', 'Appointments', '$state', '$rootScope', 'Account', '$stateParams','ngDialog','uiCalendarConfig'];

    function AppointmentsIndexCtrl($scope, Appointments, $state, $rootScope, Account, $stateParams, ngDialog, uiCalendarConfig) {
        if (!Account.isAuthenticated()) {
            $state.go('Appointments', {signIn: true});
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();
        $scope.patientId = $stateParams.patientId;
        //Initialize
        initialize();
        $scope.intervals = [
            "15 minutes",
            "30 minutes",
            "45 minutes"
        ];
        $scope.fillAppointment = function(date, jsEvent, view) {
            // alert("alert event on click");
            //Show a dialog to create a new Event
            // uiCalendarConfig.calendars['myCalendar'].fullCalendar('refetchEvents');
            if(view.name == "agendaDay") {
                // var dateFrom = moment(date).format('YYYY-MM-DD');
                $scope.date = date;
                $scope.originalDate = date;
                $scope.dateFrom = date.format();
                $scope.startTime = date.format('hh:mm T')+'M';
                //var dateTo = date.add(5*60*1000).format();
                // $scope.eventSources[0].events.push({
                //         title: 'FCB-786',
                //         start: dateFrom,
                //         end: dateTo,
                //         stick: true
                //       });
            //     uiCalendarConfig.calendars.myCalendar.fullCalendar('renderEvent', {
            //     title: 'FCB-333',
            //     start: '2016-05-01T05:30:00',
            //     end: '2016-05-01T07:30:00',
            //     stick: true
            // });
            // $scope.eventSources[0].events.push({
            //             title: 'FCB-555',
            //             start: '2016-05-01T08:30:00',
            //             end: '2016-05-01T09:30:00',
            //             stick: true
            //           });
                //Show a dialog to create a new Event

                var templateNameDialog = ngDialog.open({
                    template: 'Appointments/partials/appointments.appointment-details-dialog.html',
                    className: 'ngdialog-theme-default',
                    scope: $scope,
                    showClose: true,
                    closeByEscape: false,
                    controller: 'AppointmentsDetailCtrl'
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
            //alert("evemt clicked");
        };
        $scope.eventSources = [
                                {
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
                                            start: '2016-04-30T03:30:00',
                                            end: '2016-04-30T04:30:00'
                                        }
                                        // etc...
                                    ],
                                    color: 'yellow',   // an option!
                                    textColor: 'black' // an option!
                                }
                            ];
        // $scope.eventSources[0].events.push({
        //                 title: 'FCB-1',
        //                 start: '2016-05-01T00:00:00',
        //                 end: '2016-05-01T01:30:00'
        //               });

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
                    user: $scope.account.userId,
                    sessionId: $scope.account.sessionId,
                    isDoctor: false,
                    userId: $stateParams.patientId,
                    doctorId: $scope.account.userId,
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
                userId: $scope.account.userId,
                doctorId: "",
                mobile: "",
                columnsToGet: ""
            }, function (response) {
                $scope.doctor = response;
            });
        }
    }
})();
