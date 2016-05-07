(function () {
    'use strict';
    angular.module('ERemediumWebApp.patients.services')

            .factory('Patient', ['$resource', 'API_ENDPOINT', function ($resource, API_ENDPOINT) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        upsert: {
                            method: 'POST',
                            url: API_ENDPOINT + '/userservice/UpsertUser'
                        },
                        upsertPeripheralDetails: {
                            method: 'POST',
                            url: API_ENDPOINT + '/userservice/InsertUserHistory'
                        },
                        search: {
                            method: 'POST',
                            url: API_ENDPOINT + '/userservice/SearchUser',
                            isArray: true
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
                        },
                        getPeripheralDetails: {
                            method: 'POST',
                            url: API_ENDPOINT + '/userservice/GetUserHistory',
                            isArray: true
                        },
                        getPeripheralDetailsById: {
                            method: 'POST',
                            url: API_ENDPOINT + '/userservice/GetUserHistoryById',
                            isArray: false
                        },
                        getDocuments: {
                            method: 'POST',
                            url: API_ENDPOINT + '/userservice/GetUserDocument',
                            isArray: true
                        },
                        upsertDocument: {
                            method: 'POST',
                            url: API_ENDPOINT + '/userservice/InsertUserDocument'
                        },
                        getDocumentById: {
                            method: 'POST',
                            url: API_ENDPOINT + '/userservice/GetUserDocumentById',
                            isArray: false
                        },
                        generateOTP: {
                            method: 'POST',
                            url: API_ENDPOINT + '/communicationservice/GenerateOTP',
                            isArray: false
                        },
                        verifyOTP: {
                            method: 'POST',
                            url: API_ENDPOINT + '/communicationservice/VerifyOTP',
                            isArray: false
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();
