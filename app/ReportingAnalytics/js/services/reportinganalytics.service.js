(function () {
    'use strict';
    angular.module('ERemediumWebApp.reportinganalytics.services')

            .factory('ReportingAnalytics', ['$resource', 'API_ENDPOINT', function ($resource, API_ENDPOINT) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        upsert: {
                            method: 'POST',
                            url: API_ENDPOINT + '/userservice/UpsertUser'
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();
