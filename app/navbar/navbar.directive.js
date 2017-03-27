(function () {
    'use strict';

    angular
        .module('blogApp')
        .directive('navbarApp', ['$location', 'appConstants', function ($location, appConstants) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: './navbar/navbar.tmpl.html',
                link: function ($scope) {

                    $scope.CONST = appConstants;

                    // highlight active menu item
                    $scope.isActive = function (viewLocation) {
                        var active = (viewLocation === $location.path());
                        return active;
                    };
                }
            };
        }]);
})();