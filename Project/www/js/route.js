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

                        // route for the gameselection page
			.when('/gameselection', {
				templateUrl: 'templates/selectgame.html',
				controller: 'selectGameController'
			})

                        // route for the gameinfo page
			.when('/gameinfo', {
				templateUrl: 'templates/gameinfo.html',
				controller: 'gameInfoController'
			})

                        // route for the game page
			.when('/game', {
				templateUrl: 'templates/game.html',
				controller: 'gameController'
			})

                        // route for the profile page
			.when('/profile', {
				templateUrl: 'templates/profile.html',
				controller: 'profileController'
			})

                        // route for the change profile page
			.when('/changeProfile', {
				templateUrl: 'templates/changeProfile.html',
				controller: 'changeProfileController'
			})

			// route for the sign up page
			.when('/signup', {
				templateUrl: 'templates/signup.html',
				controller: 'signUpController'
			})
                        
                        // route for the faq/about page
                        .when('/impressum', {
				templateUrl: 'templates/impressum.html',
				controller: 'impressumController'
			})
                        
                        // in case an invalid adress will be loaded the login page will be call
			.otherwise({
				redirectTo: "/"
			});
	;
});

