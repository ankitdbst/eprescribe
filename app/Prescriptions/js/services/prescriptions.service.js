(function () {
  'use strict';
  angular.module('ERemediumWebApp.prescriptions.services')
      .factory('Prescription', ['$resource', function ($resource) {
          var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
          var paramDefaults = {}; // Currently no param defaults

          var actions = {
            upsert: {
              method: 'POST',
              url: 'http://52.76.165.4/ERService/prescription/UpsertPrescription'
            },
            list: {
              method: 'POST',
              url: 'http://52.76.165.4/ERService/prescription/ListPrescription',
              isArray: true
            },
            get: {
              method: 'POST',
              url: 'http://52.76.165.4/ERService/prescription/GetPrescription'
            },
            query: {
              method: 'GET',
              url: 'http://52.76.165.4/ERService/prescription/SearchPrescription'
            },
            searchMed: {
              method: 'POST',
              url: 'http://52.76.165.4/ERService/medcineservice/MedAutocomplete',
              isArray: true
            },
            listPharma: {
              method: 'POST',
              url: 'http://52.76.165.4/ERService/pharmaservice/ListPharma',
              isArray: true
            },
            placeOrder: {
              method: 'POST',
              url: 'http://52.76.165.4/ERService/orderservice/Order',
              isArray: false
            },
            getTemplates: {
              method: 'POST',
              url: 'http://52.76.165.4/ERService/prescription/ListTemplate',
              isArray: true
            },
            getTemplateById: {
              method: 'POST',
              url: 'http://52.76.165.4/ERService/prescription/GetTemplateById',
              isArray: false
            }
          };

          return $resource(resourceUrl, paramDefaults, actions);
        }]);
})();
