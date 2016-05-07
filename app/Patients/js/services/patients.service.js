(function () {
    'use strict';
    angular.module('ERemediumWebApp.patients.services')

            .factory('Patient', ['$resource', function ($resource) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        upsert: {
                            method: 'POST',
                            url: 'http://eremedium.com/ERService/userservice/UpsertUser'
                        },
                        upsertPeripheralDetails: {
                            method: 'POST',
                            url: 'http://eremedium.com/ERService/userservice/InsertUserHistory'
                        },
                        search: {
                            method: 'POST',
                            url: 'http://eremedium.com/ERService/userservice/SearchUser',
                            isArray: true
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
                        },
                        getPeripheralDetails: {
                            method: 'POST',
                            url: 'http://eremedium.com/ERService/userservice/GetUserHistory',
                            isArray: true
                        },
                        getPeripheralDetailsById: {
                            method: 'POST',
                            url: 'http://eremedium.com/ERService/userservice/GetUserHistoryById',
                            isArray: false
                        },
                        getDocuments: {
                            method: 'POST',
                            url: 'http://eremedium.com/ERService/userservice/GetUserDocument',
                            isArray: true
                        },
                        upsertDocument: {
                            method: 'POST',
                            url: 'http://eremedium.com/ERService/userservice/InsertUserDocument'
                        },
                        getDocumentById: {
                            method: 'POST',
                            url: 'http://eremedium.com/ERService/userservice/GetUserDocumentById',
                            isArray: false
                        },
                        generateOTP: {
                            method: 'POST',
                            url: 'http://eremedium.com/ERService/communicationservice/GenerateOTP',
                            isArray: false
                        },
                        verifyOTP: {
                            method: 'POST',
                            url: 'http://eremedium.com/ERService/communicationservice/VerifyOTP',
                            isArray: false
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();