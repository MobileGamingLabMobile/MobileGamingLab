// create the module and name it App
// also include ngRoute for all our routing needs
var App = angular.module('App', ['ngRoute']);

// configure our routes
App.config(function ($routeProvider) {
    $routeProvider

        // route for the login page
        .when('/', {
            templateUrl: 'templates/login.html',
            controller: 'loginController'
        })

        .when('/gameselection/:token', {
            templateUrl: 'templates/selectgame.html',
            controller: 'selectGameController'
        })

        .when('/gameinfo/:token', {
            templateUrl: 'templates/gameinfo.html',
            controller: 'gameInfoController'
        })

        .when('/game/:token', {
            templateUrl: 'templates/game.html',
            controller: 'gameController'
        })

        .when('/profile/:token', {
            templateUrl: 'templates/profile.html',
            controller: 'profileController'
        })
        
        .when('/changeProfile/:token', {
            templateUrl: 'templates/changeProfile.html',
			controller: 'changeProfileController'
        })

        // route for the contact page
        .when('/signup', {
            templateUrl: 'templates/signup.html',
            controller: 'signUpController'
        });
});