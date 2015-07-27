// create the module and name it App
// also include ngRoute for all our routing needs
var App = angular.module('App', ['ngRoute']);

// configure our routes
App.config(function ($routeProvider) {
	$routeProvider

			// route for the login page
			.when('/', {
				templateUrl: 'mTemplates/login.html',
				controller: 'loginController'
			})
			// route for the gameselection page
			.when('/gameselection', {
				templateUrl: 'mTemplates/selectGame.html',
				controller: 'selectGameController'
			})
			// route for the gameinfo page
			.when('/gameinfo', {
				templateUrl: 'mTemplates/gameinfo.html',
				controller: 'gameInfoController'
			})
			// route for the game page
			.when('/game', {
				templateUrl: 'mTemplates/game.html',
				controller: 'gameController'
			})
			// route for the profile page
			.when('/profile', {
				templateUrl: 'mTemplates/profile.html',
				controller: 'profileController'
			})
			// route for the change profile page
			.when('/changeProfile', {
				templateUrl: 'mTemplates/changeProfile.html',
				controller: 'changeProfileController'
			})

			// route for the sign up page
			.when('/signup', {
				templateUrl: 'mTemplates/signUp.html',
				controller: 'signUpController'
			})
                        // route for the help page
			.when('/impressum', {
				templateUrl: 'mTemplates/impressum.html',
				controller: 'impressumController'
			})
                        // route for the wrong URL. Forewarding to the login page
			.otherwise({
				redirectTo: "/"
			});
	;
});

