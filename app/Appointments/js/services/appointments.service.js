(function () {
    'use strict';
    angular.module('ERemediumWebApp.appointments.services')

            .factory('Appointments', ['$resource', 'API_ENDPOINT', function ($resource, API_ENDPOINT) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        upsert: {
                            method: 'POST',
                            url: API_ENDPOINT + '/userservice/UpsertUser'
                        },
                        get: {
                            method: 'POST',
                            url: API_ENDPOINT + '/userservice/GetUserById',
                            isArray: false
                        },
                        getProfile: {
                            method: 'POST',
                            url: API_ENDPOINT + '/userservice/GetUserById',
                            isArray: false
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();
