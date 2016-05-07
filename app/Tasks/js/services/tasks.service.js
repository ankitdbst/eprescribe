(function () {
    'use strict';
    angular.module('ERemediumWebApp.tasks.services')

            .factory('Task', ['$resource', function ($resource) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        upsert: {
                            method: 'POST',
                            url: 'http://eremedium.com/ERService/userservice/UpsertUser'
                        },
                        get: {
                            method: 'POST',
                            url: 'http://eremedium.com/ERService/userservice/GetUserById',
                            isArray: false
                        },
                        query: {
                            method: 'POST',
                            url: 'http://eremedium.com/ERService/userservice/GetUsersForDoctor',
                            isArray: true
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();