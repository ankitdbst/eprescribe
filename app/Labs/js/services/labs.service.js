(function () {
    'use strict';
    angular.module('ERemediumWebApp.labs.services')

            .factory('Labs', ['$resource', function ($resource) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        upsert: {
                            method: 'POST',
                            url: 'http://52.74.177.118/ERService/userservice/UpsertUser'
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();