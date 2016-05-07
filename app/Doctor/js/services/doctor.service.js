(function () {
    'use strict';
    angular.module('ERemediumWebApp.doctor.services')

            .factory('Doctor', ['$resource', 'API_ENDPOINT', function ($resource, API_ENDPOINT) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        getProfile: {
                            method: 'POST',
                            url: API_ENDPOINT + '/userservice/GetUserById',
                            isArray: false
                        },
                        saveProfile: {
                            method: 'POST',
                            url: API_ENDPOINT + '/userservice/UpsertUser'
                        },
                        changePassword: {
                            method: 'POST',
                            url: API_ENDPOINT + '/userservice/SetPassword'
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();
