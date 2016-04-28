(function () {
    'use strict';
    angular.module('ERemediumWebApp.login.services')

            .factory('Login', ['$resource', function ($resource) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        validateCredentials: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/ValidateCredentials'
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }])

            .factory('Account', ['Login', '$cookies', '$rootScope', function (Login, $cookies, $rootScope) {

                    function login(params, loginHandler) {
                        return Login.validateCredentials(params).$promise.then(function (response) {
                            if (response.respCode == 1) {
                                delete response['response'];
                                delete response['respCode'];
                                var account = angular.forEach(response, function (value, key) {
                                    if (key.startsWith('$')) { // Backend service fails if we have these params in the request
                                        delete response[key];
                                    }
                                });
                                //Store once in cookies..and use everywhere..
                                account.baseURL = "http://52.76.165.4/ERService/"
                                setAuthenticatedAccount(account);
                            }
                            if (angular.isDefined(loginHandler)) {
                                loginHandler(response);
                            }
                        });
                    }

                    function getAuthenticatedAccount() {
                        setBaseConfiguration();
                        return $cookies.getObject('eremediumaccount');
                    }

                    function setBaseConfiguration() {
                        //This is needed when user tries to refresh and is already authenticated!
                        $rootScope.showMenu = true;
                        $('#wrapper').removeClass('hero-unit');
                    }

                    function isAuthenticated() {
                        return !!$cookies.get('eremediumaccount');
                    }

                    function setAuthenticatedAccount(account, expireDate) {
                        $cookies.putObject('eremediumaccount', account, {'expires': expireDate});
                    }

                    function logout() {
                        $cookies.remove('eremediumaccount');
                    }

                    return {
                        'login': login,
                        'logout': logout,
                        'getAuthenticatedAccount': getAuthenticatedAccount,
                        'setAuthenticatedAccount': setAuthenticatedAccount,
                        'isAuthenticated': isAuthenticated
                    };
                }]);
})();