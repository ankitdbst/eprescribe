(function () {
    'use strict'

    angular.module('ERemediumWebApp.tasks.routes')

            .config([
                '$stateProvider',
                function ($stateProvider) {
                    $stateProvider
                            .state('TasksList', {
                                url: '/tasks',
                                templateUrl: 'Tasks/partials/tasks.list.html',
                                controller: 'TasksListCtrl',
                                ncyBreadcrumb: {
                                    label: 'Tasks',
                                    parent: 'PatientsList'
                                }
                            })
                }
            ]);
})();