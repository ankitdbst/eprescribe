(function () {
  'use strict';
  angular.module('ERemediumWebApp.prescriptions.services')
      .factory('Prescription', ['$resource', function ($resource) {
          var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
          var paramDefaults = {}; // Currently no param defaults

          var actions = {
            upsert: {
              method: 'POST',
              url: 'http://eremedium.com/ERService/prescription/UpsertPrescription'
            },
            list: {
              method: 'POST',
              url: 'http://eremedium.com/ERService/prescription/ListPrescription',
              isArray: true
            },
            get: {
              method: 'POST',
              url: 'http://eremedium.com/ERService/prescription/GetPrescription'
            },
            query: {
              method: 'GET',
              url: 'http://eremedium.com/ERService/prescription/SearchPrescription'
            },
            searchMed: {
              method: 'POST',
              url: 'http://eremedium.com/ERService/medcineservice/MedAutocomplete',
              isArray: true
            },
            listPharma: {
              method: 'POST',
              url: 'http://eremedium.com/ERService/pharmaservice/ListPharma',
              isArray: true
            },
            listLabs: {
              method: 'POST',
              url: 'http://eremedium.com/ERService/labservice/ListLab',
              isArray: true
            },
            placeOrder: {
              method: 'POST',
              url: 'http://eremedium.com/ERService/orderservice/Order',
              isArray: false
            },
            getTemplates: {
              method: 'POST',
              url: 'http://eremedium.com/ERService/prescription/ListTemplate',
              isArray: true
            },
            getTemplateById: {
              method: 'POST',
              url: 'http://eremedium.com/ERService/prescription/GetTemplateById',
              isArray: false
            },
            getFavouriteMed: {
              method: 'POST',
              url: 'http://eremedium.com/ERService/medcineservice/GetFavouriteMed',
              isArray: true
            },
            getFavouriteAdvises: {
              method: 'POST',
              url: 'http://eremedium.com/ERService/labservice/GetFavouriteTest',
              isArray: true
            },
            searchAdvises: {
              method: 'POST',
              url: 'http://eremedium.com/ERService/labservice/LabTestAutocomplete',
              isArray: true
            },
            getAdvisesInstruction: {
              method: 'POST',
              url: 'http://eremedium.com/ERService/labservice/GetAdvisesInstruction',
              isArray: true
            },
            getMedicineInstruction: {
              method: 'POST',
              url: 'http://eremedium.com/ERService/medcineservice/GetIntakeInstruction',
              isArray: true
            },
            getInstruction: {
              method: 'POST',
              url: 'http://eremedium.com/ERService/prescription/ListInstruction',
              isArray: true
            }
          };

          return $resource(resourceUrl, paramDefaults, actions);
        }]);
})();
