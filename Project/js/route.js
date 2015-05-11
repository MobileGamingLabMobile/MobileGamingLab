// script.js

    // create the module and name it scotchApp
        // also include ngRoute for all our routing needs
    var App = angular.module('App', ['ngRoute']);

    // configure our routes
    App.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'templates/login.html',
                controller  : 'loginController'
            })

            // route for the contact page
            .when('/signup', {
                templateUrl : 'templates/signUp.html',
                controller  : 'signupController'
            });
    });