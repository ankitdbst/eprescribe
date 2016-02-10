(function () {
    'use strict';
    angular.module('ERemediumWebApp.patients.services')

            .factory('Patient', ['$resource', function ($resource) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        upsert: {
                            method: 'POST',
                            url: 'http://52.74.177.118/ERService/userservice/UpsertUser'
                        },
                        searchByMobile: {
                            method: 'POST',
                            url: 'http://52.74.177.118/ERService/userservice/GetUserByMobile',
                            isArray: true
                        },
                        get: {
                            method: 'POST',
                            url: 'http://52.74.177.118/ERService/userservice/GetUserById',
                            isArray: false
                        },
                        query: {
                            method: 'POST',
                            url: 'http://52.74.177.118/ERService/userservice/GetUsersForDoctor',
                            isArray: true
                        },
                        getVitals: {
                            method: 'POST',
                            url: 'http://52.74.177.118/ERService/userservice/GetVitalsForPatient',
                            isArray: true
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();