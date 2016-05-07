(function () {
    'use strict';
    angular.module('ERemediumWebApp.doctor.services')

            .factory('Doctor', ['$resource', function ($resource) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        getProfile: {
                            method: 'POST',
                            url: 'http://eremedium.com/ERService/userservice/GetUserById',
                            isArray: false
                        },
                        saveProfile: {
                            method: 'POST',
                            url: 'http://eremedium.com/ERService/userservice/UpsertUser'
                        },
                        changePassword: {
                            method: 'POST',
                            url: 'http://eremedium.com/ERService/userservice/SetPassword'
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();