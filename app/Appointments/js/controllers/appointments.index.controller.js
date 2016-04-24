(function () {
    'use strict';

    angular.module('ERemediumWebApp.appointments.controllers')
            .controller('AppointmentsIndexCtrl', AppointmentsIndexCtrl);

    AppointmentsIndexCtrl.$inject = ['$scope', 'Appointments', '$state', '$rootScope', 'Account', '$stateParams'];

    function AppointmentsIndexCtrl($scope, Appointments, $state, $rootScope, Account, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('Appointments', {signIn: true});
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        initialize();
        $scope.alertEventOnClick = function(item) {
            alert("alert event on click");
            console.log("event click");
        };
        $scope.alertOnDrop = function() {
            alert("alert on drop");
            console.log("alert on drop");
        };
        $scope.alertOnResize = function() {
            alert("alert on resize");
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
                                            title: 'Event3',
                                            start: '2016-04-23:0100',
                                            end: '2016-04-23:1200'
                                        }
                                        // etc...
                                    ],
                                    color: 'yellow',   // an option!
                                    textColor: 'black' // an option!
                                };

        /* config object */
        $scope.uiConfig = {
          calendar:{
             height: "100%",
            editable: true,
            header:{
              left: 'month agendaWeek agendaDay bookAppointment',
              center: 'title',
              right: 'today prev,next'
            },
            dayClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
          }
        };


        function initialize() {
            $rootScope.pageHeader = "Appointments";
        }
    }
})();