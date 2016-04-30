(function () {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
      .controller('PrescriptionOrderCtrl', PrescriptionOrderCtrl);

  PrescriptionOrderCtrl.$inject = ['$scope', '$state', '$stateParams', 'Prescription', 'Account'];

  function PrescriptionOrderCtrl($scope, $state, $stateParams, Prescription, Account) {
    if (!Account.isAuthenticated()) {
      $state.go('login', {signIn: true});
      return;
    }
    var user = Account.getAuthenticatedAccount();

    Initialize();

    //Functions
    $scope.order = Order;
    $scope.close = Close;

    function Initialize() {
      GetAddresses();
      GetPharmacies();
      GetLabs();
    }

    function GetAddresses() {
      var params = {
        user: user.loggedInUser.mobile,
        sessionId: user.sessionId,
        pid: $stateParams.prescriptionId,
        columnsToGet: ""
      };

      $scope.prescription = Prescription.get(params);
      $scope.myPromise = $scope.prescription.$promise;

      $scope.prescription.$promise.then(function (prescription) {
        if (angular.isUndefined($scope.prescription.patient.alternateAddresses)) {
          $scope.prescription.patient.alternateAddresses = [];
        }
        $scope.addresses = $scope.prescription.patient.alternateAddresses;
        $scope.addresses.push($scope.prescription.patient.address);
        $scope.order.address = $scope.prescription.patient.address;//This is to checkbox checked..
      });
    }


    function GetPharmacies() {
      Prescription.listPharma({
        user: user.userId,
        sessionId: user.sessionId,
        city: "Noida", //TODO: should always be default one i.e. Eremedium Pharmacy if patient is opening app, else if Doctor is opening then should display his configured pharmacies, if not configured any then should default one i.e. Eremedium Pharmacy..
        limit: 10,
        columnsToGet: ""
      }, function (response) {
        $scope.pharmacies = response;
      });
    }

    function GetLabs() {
      $scope.labs = [
        "Apollo Labs",
        "Dr Lal Labs",
        "Super Religare Labs"
      ];
    }

    function Order() {
      var params = {
        user: user.userId,
        sessionId: user.sessionId,
        doctorId: user.userId,
        pid: $stateParams.prescriptionId,
        pharmaId: $scope.order.pharmacy.pharmaId,
        deliveryAddress: {
          addressLine1: $scope.order.address.addressLine1,
          addressLine2: $scope.order.address.addressLine2,
          city: $scope.order.address.city,
          state: $scope.order.address.state,
          pincode: $scope.order.address.pincode
        }
      };

      $scope.myPromise = Prescription.placeOrder(params, function (response) {
        $scope.showAlert = true;
        //Show Proper Alert with option of going back.
        if (angular.isUndefined(response)) {
          $scope.alertMessage = "Error in placing Order, Please try again!";
          $scope.alertClass = "alert-danger";
        } else if (response.respCode == 1) {
          //If all goes well, navigate to Order Status page..
          $state.go('PrescriptionOrderStatus', {
            patientId: $stateParams.patientId,
            prescriptionId: $stateParams.prescriptionId
          });
        } else {
          $scope.alertMessage = response.response;
          $scope.alertClass = "alert-danger";
        }
      });
    }

    function Close() {
      $state.go('PatientNewOrEdit', {patientId: $stateParams.patientId});
    }
  }
})();
