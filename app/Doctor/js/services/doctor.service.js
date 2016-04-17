(function () {
    'use strict';
    angular.module('ERemediumWebApp.doctor.services')

            .factory('Doctor', ['$resource', function ($resource) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        getProfile: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/GetUserById',
                            isArray: false
                        },
                        saveProfile: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/UpsertUser'
                        },
                        changePassword: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/SetPassword'
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();