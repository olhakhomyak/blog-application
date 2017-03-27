(function () {
    "use strict";

    angular
        .module('blogApp')
        .factory('messageService', ['$http', '$localStorage', function ($http, $localStorage) {

            return {
                getDefaultMessage: getDefaultMessage,
                findById:           findById
            };

            /**
             * Get default messages from local file
             * @returns array
             */
            function getDefaultMessage () {
              return $http.get('../data/messages.json').then(function (response) {
                    return response.data;
                });
            }

            /**
             * Find message in localStorage
             * @param item
             * @returns {*}
             */
            function findById (item) {
                for (var i = 0; i < $localStorage.allMsg.length; i++) {
                    if (item.uniqueId == $localStorage.allMsg[i].uniqueId) {
                        var result = $localStorage.allMsg[i];
                        return result;
                    }
                }
            }


        }])
        /**
         * Set up notification messages
         */
        .config(function(NotificationProvider) {
            NotificationProvider.setOptions({
                delay: 5000,
                startTop: 20,
                startRight: 10,
                verticalSpacing: 20,
                horizontalSpacing: 20,
                positionX: 'right',
                positionY: 'top'
            })
        });
})();