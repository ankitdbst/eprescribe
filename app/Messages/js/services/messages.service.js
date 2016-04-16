(function () {
    'use strict';
    angular.module('ERemediumWebApp.messages.services')

            .factory('Messages', ['$resource', function ($resource) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        sendSMS: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/communicationservice/SendSMS'
                        },
                        getDeliveryReport: {
                            //TODO..
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/communicationservice/GetDeliveryReport',
                            isArray: true
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();