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

			.when('/gameselection', {
				templateUrl: 'mTemplates/selectGame.html',
				controller: 'selectGameController'
			})

			.when('/gameinfo', {
				templateUrl: 'mTemplates/gameinfo.html',
				controller: 'gameInfoController'
			})

			.when('/game', {
				templateUrl: 'mTemplates/game.html',
				controller: 'gameController'
			})

			.when('/profile', {
				templateUrl: 'mTemplates/profile.html',
				controller: 'profileController'
			})

			.when('/changeProfile', {
				templateUrl: 'mTemplates/changeProfile.html',
				controller: 'changeProfileController'
			})

			// route for the contact page
			.when('/signup', {
				templateUrl: 'mTemplates/signup.html',
				controller: 'signUpController'
			})
			.when('/impressum', {
				templateUrl: 'mTemplates/impressum.html',
				controller: 'impressumController'
			})
			//.otherwise({
			//	redirectTo: "/"
			//});
	;
});

