(function () {
    'use strict';
    angular.module('ERemediumWebApp.pharmacy.services')

            .factory('Pharmacy', ['$resource', function ($resource) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        upsert: {
                            method: 'POST',
                            url: 'http://eremedium.com/ERService/userservice/UpsertUser'
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();