(function () {
    'use strict';

    angular
        .module('blogApp')
        .component('newMessageForm', {
            templateUrl: '../new-message/new-message-form.tmpl.html',
            controller: newMessageCtrl
        });

    function newMessageCtrl($scope, $localStorage, $location, appConstants) {

        var $ctrl = this;

        $scope.CONST = appConstants;

        /**
         * Define new array for messages
         */
        if ($localStorage.allMsg === undefined) {
            $localStorage.allMsg = [];
        }

        /**
         * Check if userName input contain 'admin'
         * @type {RegExp}
         */
        $scope.checkValue = /^((?!admin).)*$/;


        /**
         * @param isValid
         */
        $scope.submitForm = function (isValid) {
            if (isValid) {
                var newMsg = {
                    displayName: $scope.userName,
                    message: $scope.message,
                    createdAt: new Date(),
                    uniqueId: Math.floor(Math.random() * (1000))
                };

                $localStorage.allMsg.push(newMsg);
                $ctrl.resetForm();
            }
        };

        /**
         * Remove old data
         */
        $ctrl.resetForm = function () {
            $scope.userName = '';
            $scope.message = '';

            $location.path('#/main');
        };


    }
})();