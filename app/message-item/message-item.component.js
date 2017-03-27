(function () {
    'use strict';

    angular
        .module('blogApp')
        .component('messageItem', {
            templateUrl: '../message-item/message-item.tmpl.html',
            controller: messageItemCtrl
        });

    function messageItemCtrl(messageService, $localStorage, appConstants, $scope, Notification) {

        $scope.CONST = appConstants;
        $scope.icon = "fa-chevron-down";
        $scope.sortByDate = false;


        /**
         * Set asc and desc rows direction for date sorting
         */
        $scope.sortMsg = function () {
            $scope.sortByDate=!$scope.sortByDate;

            if($scope.sortByDate) {
                $scope.icon = "fa-chevron-up"
            } else {
                $scope.icon = "fa-chevron-down"
            }
        };


        /**
         * Return all existed messages to display
         * @param array
         */
        messageService.getDefaultMessage().then(function (response) {
            $scope.defaultData = response;
            if ($localStorage.allMsg == undefined) {
                $scope.allMsg = $scope.defaultData;
            } else {
                $scope.allMsg = $scope.defaultData.concat($localStorage.allMsg);
            }
        });


        /**
         * Find selected item in localStorage and remove it from the array
         * @param item
         */
        $scope.removeMsg = function (item) {
            if (item.uniqueId) {
                var itemToRemove = messageService.findById(item);
                delete $localStorage.allMsg.splice($localStorage.allMsg.indexOf(itemToRemove), 1);
                $scope.allMsg.splice($scope.allMsg.indexOf(itemToRemove), 1);
            } else {
                Notification({message: 'Default message can not be deleted'}, 'warning');
            }
        };

    }
})();