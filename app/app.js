(function () {
    'use strict';

    angular
        .module('blogApp', [
        'ngRoute',
        'ngStorage',
        'ui-notification'
    ])
        .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

        $locationProvider.html5Mode(false).hashPrefix('');

        $routeProvider
            .when('/main', {
                template: '<message-item></message-item>'
            })
            .when('/new-message', {
                template: '<new-message-form></new-message-form>'
            });

        $routeProvider.otherwise({redirectTo: '/main'});
    }]);
})();