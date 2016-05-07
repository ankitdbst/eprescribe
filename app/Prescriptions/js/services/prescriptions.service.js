(function () {
  'use strict';
  angular.module('ERemediumWebApp.prescriptions.services')
      .factory('Prescription', ['$resource', 'API_ENDPOINT', function ($resource, API_ENDPOINT) {
          var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
          var paramDefaults = {}; // Currently no param defaults

          var actions = {
            upsert: {
              method: 'POST',
              url: API_ENDPOINT + '/prescription/UpsertPrescription'
            },
            list: {
              method: 'POST',
              url: API_ENDPOINT + '/prescription/ListPrescription',
              isArray: true
            },
            get: {
              method: 'POST',
              url: API_ENDPOINT + '/prescription/GetPrescription'
            },
            query: {
              method: 'GET',
              url: API_ENDPOINT + '/prescription/SearchPrescription'
            },
            searchMed: {
              method: 'POST',
              url: API_ENDPOINT + '/medcineservice/MedAutocomplete',
              isArray: true
            },
            listPharma: {
              method: 'POST',
              url: API_ENDPOINT + '/pharmaservice/ListPharma',
              isArray: true
            },
            listLabs: {
              method: 'POST',
              url: API_ENDPOINT + '/labservice/ListLab',
              isArray: true
            },
            placeOrder: {
              method: 'POST',
              url: API_ENDPOINT + '/orderservice/Order',
              isArray: false
            },
            getTemplates: {
              method: 'POST',
              url: API_ENDPOINT + '/prescription/ListTemplate',
              isArray: true
            },
            getTemplateById: {
              method: 'POST',
              url: API_ENDPOINT + '/prescription/GetTemplateById',
              isArray: false
            },
            getFavouriteMed: {
              method: 'POST',
              url: API_ENDPOINT + '/medcineservice/GetFavouriteMed',
              isArray: true
            },
            getFavouriteAdvises: {
              method: 'POST',
              url: API_ENDPOINT + '/labservice/GetFavouriteTest',
              isArray: true
            },
            searchAdvises: {
              method: 'POST',
              url: API_ENDPOINT + '/labservice/LabTestAutocomplete',
              isArray: true
            },
            getAdvisesInstruction: {
              method: 'POST',
              url: API_ENDPOINT + '/labservice/GetAdvisesInstruction',
              isArray: true
            },
            getMedicineInstruction: {
              method: 'POST',
              url: API_ENDPOINT + '/medcineservice/GetIntakeInstruction',
              isArray: true
            },
            getInstruction: {
              method: 'POST',
              url: API_ENDPOINT + '/prescription/ListInstruction',
              isArray: true
            }
          };

          return $resource(resourceUrl, paramDefaults, actions);
        }]);
})();
