App.controller("profileController", function ($http, $scope, $routeParams) {

	$scope.token = $routeParams.token;
	
	// select abboniert or erstellt tab
	this.tab = 1;// 1 = subscribed games and 2 = own games
	
	this.isSelected = function (checkTab) {
		return this.tab === checkTab;
	};
	// load subscribed games
	this.loadSgame = function () {
		$http.get("http://giv-mgl.uni-muenster.de:8080/user/games/subscribed/?access_token=" + $scope.token).success(function (data) {
			console.log(data);
			if (data.success)
			{
				$scope.sgames = data.games;
			}
			;
		});
		this.tab = 1;
	};

	//load own games
	this.loadOgame = function () {
		$http.get("http://giv-mgl.uni-muenster.de:8080/user/games/owned/?access_token=" + $scope.token).success(function (data) {
			console.log(data);
			if (data.success)
			{
				$scope.ogames = data.games;
			}
			;
		});
		this.tab = 2;
	};

	// Nutzerdaten Laden
	$http.get("http://giv-mgl.uni-muenster.de:8080/profile/?access_token=" + $scope.token).success(function (data) {
		if (data.success) {
			$scope.users = data.user;
			console.log(data.user);
		}
		;
	});

	//logout
	$scope.logout = function () {
		$http.post('http://giv-mgl.uni-muenster.de:8080/logout', {access_token: $scope.token}).success(function (data) {
			console.log(data);
			if (data.success) {
				window.location.href = "#";
				$scope.token = "";
			} else {
				$scope.message = data.message;
				$scope.error = true;
			}
			;
		});
	};
});
