(function() {
  'use strict'

  angular.module('ERemediumWebApp.prescriptions.routes')

  .config([
    '$stateProvider',

    function($stateProvider) {
      $stateProvider

      .state('PrescriptionIndex', {
        url: '/patients/:patientId/prescriptions',
        templateUrl: 'Prescriptions/partials/prescriptions.index.html',
        controller: 'PrescriptionIndexCtrl',
        params: {
            autoActivateChild: 'PrescriptionIndex.List'
        }
      })
      .state('PrescriptionIndex.List', {
        templateUrl: 'Prescriptions/partials/prescriptions.list.html',
        controller: 'PrescriptionListCtrl',
        ncyBreadcrumb: {
          label: 'Prescriptions',
          parent: 'PatientNewOrEdit'
        }
      })
      .state('PrescriptionIndex.Detail', {
        url: '/{prescriptionId:[0-9]*}',
        templateUrl: 'Prescriptions/partials/prescriptions.detail.html',
        controller: 'PrescriptionDetailCtrl',
        ncyBreadcrumb: {
          label: 'View',
          parent: 'PrescriptionIndex.List'
        }
      })
      .state('PrescriptionNewOrEdit', {
        url: '/patients/:patientId/prescriptions/new',
        templateUrl: 'Prescriptions/partials/prescriptions.edit.html',
        controller: 'PrescriptionNewOrEditCtrl',
        ncyBreadcrumb: {
          label: 'New',
          parent: 'PrescriptionIndex.List'
        }
      })
      .state('PrescriptionOrder', {
        url: '/patients/:patientId/prescriptions/order/:prescriptionId',
        templateUrl: 'Prescriptions/partials/prescriptions.order.html',
        controller: 'PrescriptionOrderCtrl',
        ncyBreadcrumb: {
          label: 'Place Order',
          parent: 'PatientNewOrEdit'
        }
      })
      .state('PrescriptionOrder.PatientNewOrEditAddress', {
        url: '/new-address',
        templateUrl: 'Patients/partials/patients.edit-address.html',
        controller: 'PatientNewOrEditAddressCtrl'
      })
      .state('PrescriptionOrderStatus', {
        url: '/patients/:patientId/prescriptions/order/status/:prescriptionId',
        templateUrl: 'Prescriptions/partials/prescriptions.order-status.html',
        controller: 'PrescriptionOrderStatusCtrl',
        ncyBreadcrumb: {
          label: 'Order Status',
          parent: 'PatientNewOrEdit'
        }
      });
    }
  ]);
}) ();
