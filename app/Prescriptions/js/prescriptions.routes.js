(function() {
  'use strict'

  angular.module('ERemediumWebApp.prescriptions.routes')

  .config([
    '$stateProvider',

    function($stateProvider) {
      $stateProvider
      .state('PrescriptionList', {
        url: '/prescriptions/:patientId',
        templateUrl: 'Prescriptions/partials/prescriptions.list.html',
        controller: 'PrescriptionListCtrl'
      })
      .state('PrescriptionNewOrEdit', {
        url: '/prescriptions/:patientId/edit/:pId',
        templateUrl: 'Prescriptions/partials/prescriptions.edit.html',
        controller: 'PrescriptionNewOrEditCtrl'
      })
      .state('PrescriptionNewOrEdit.UpsertMedicine', {
        url: '/medicines/:mId',
        templateUrl: 'Prescriptions/partials/prescriptions.upsert-medicine.html',
        controller: 'PrescriptionUpsertMedicineCtrl'
      })
      .state('PrescriptionDetail', {
        url: '/prescriptions/view/:id',
        templateUrl: 'Prescriptions/partials/prescriptions.detail.html',
        controller: 'PrescriptionDetailCtrl'
      })
      .state('PrescriptionOrder', {
        url: '/prescriptions/order/:pId',
        templateUrl: 'Prescriptions/partials/prescriptions.order.html',
        controller: 'PrescriptionOrderCtrl'
      })
      .state('PrescriptionOrderStatus', {
        url: '/prescriptions/order/status/:pId',
        templateUrl: 'Prescriptions/partials/prescriptions.order-status.html'
      })
      .state('PrescriptionOrder.PatientNewOrEditAddress', {
        url: '',
        templateUrl: 'Patients/partials/patients.edit-address.html',
        controller: 'PatientNewOrEditAddressCtrl'
      });
    }
  ]);
}) ();