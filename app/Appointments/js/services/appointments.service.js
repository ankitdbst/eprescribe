(function () {
    'use strict';
    angular.module('ERemediumWebApp.appointments.services')

            .factory('Appointments', ['$resource', function ($resource) {
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
                        getProfile: {
                            method: 'POST',
                            url: 'http://eremedium.com/ERService/userservice/GetUserById',
                            isArray: false
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();