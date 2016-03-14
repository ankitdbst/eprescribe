(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientsVerifyOTPCtrl', PatientsVerifyOTPCtrl);

    PatientsVerifyOTPCtrl.$inject = ['$scope', 'Patient', '$state', '$rootScope', 'Account', '$stateParams'];

    function PatientsVerifyOTPCtrl($scope, Patient, $state, $rootScope, Account, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        initialize();

        //Functions..
        $scope.verifyOTP = verifyOTP;
        $scope.close = close;

        function initialize() {
            $rootScope.pageHeader = "";
            $('#verifyOTPModal').modal('show');
        }

        function verifyOTP() {
            //TODO: make a service call, if successfull navigate to patient profile else remain on same page..
            postProcessing();
            $state.go('PatientNewOrEdit', { patientId: $stateParams.patientId });
            /* When successfully verified, this should be set at back end
            patient.isNew = false;
            patient.hasAllPrescriptionsAccess = true; */
        }
        
        function close(){
            postProcessing();
            $state.go('PatientsList');
        }
        
        function postProcessing() {
            //start showing menu items
            $('#verifyOTPModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
    }
})();