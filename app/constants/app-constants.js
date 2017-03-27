(function () {
    "use strict";

    angular
        .module("blogApp")
        .constant("appConstants", {
            'GENERAL': {
                AT: 'At'
            },
            'NAV_MENU': {
                BLOG: 'BLOG',
                HOME: 'Home',
                NEW_MSG: 'New message'
            },
            'MSG_FORM': {
                NAME: 'Name',
                MSG: 'Message',
                SEND: 'Send Message'
            },
            'ALERT': {
                INVALID_NAME: 'Name Admin is not allowed',
                REQUIRED: 'All fields are required'
            },
            'MSG_SUBMITTED': {
                CREATED_BY: 'Created by:',
                SORT_BY_DATE: 'Sort by date'
            }
        });
})();