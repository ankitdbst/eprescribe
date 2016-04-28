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

            .factory('Account', ['Login', '$cookies', '$rootScope', 'Patient', function (Login, $cookies, $rootScope, Patient) {

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
                                setAuthenticatedAccount(account);
                                //Fetch Doctor Profile here and store in Cookie..
                                GetDoctorProfile(account);
                            }
                            if (angular.isDefined(loginHandler)) {
                                loginHandler(response);
                            }
                        });
                    }

                    function GetDoctorProfile(account) {
                        Patient.get({
                            user: account.userId,
                            sessionId: account.sessionId,
                            isDoctor: true,
                            mobile: "",
                            columnsToGet: "settings,userType,userId,firstName,midlleName,lastName,mobile,"
                        }, function (response) {
                            account.loggedInUser = response;
                            setAuthenticatedAccount(account);
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

                    function setAuthenticatedAccount(account) {
                        // Find tomorrow's date.
                        var expireDate = new Date();
                        expireDate.setDate(expireDate.getDate() + 7);//Expires in 30 days..
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