(function () {
    'use strict';
    angular.module('ERemediumWebApp.tasks.services')

            .factory('Task', ['$resource', 'API_ENDPOINT', function ($resource, API_ENDPOINT) {
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
                        query: {
                            method: 'POST',
                            url: API_ENDPOINT + '/userservice/GetUsersForDoctor',
                            isArray: true
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();
