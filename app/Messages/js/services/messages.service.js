(function () {
    'use strict';
    angular.module('ERemediumWebApp.messages.services')

            .factory('Messages', ['$resource', 'API_ENDPOINT', function ($resource, API_ENDPOINT) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        sendSMS: {
                            method: 'POST',
                            url: API_ENDPOINT + '/communicationservice/SendSMS'
                        },
                        getDeliveryReport: {
                            //TODO..
                            method: 'POST',
                            url: API_ENDPOINT + '/communicationservice/GetDeliveryReport',
                            isArray: true
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();
