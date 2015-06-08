App.controller("changeProfileController", function ($http, $scope, $routeParams) {

	$scope.token = $routeParams.token;
	
	$scope.submitLogin = function () {
		$http.post('http://giv-mgl.uni-muenster.de:8080/profile', {
			operation: "login",
			access_token: $scope.token,
			email: $scope.newEmail,
			old_password: $scope.oldPassword,
			new_password: $scope.newPassword
		}).success(function (data) {
			console.log(data);
			if (data.success) {
				$scope.users = data.user;
				window.location.href = "#profile/" + $scope.token;
			}
			else {
				$scope.message = data.message;
				$scope.error = true;
			}
			;
		});
	};

	$scope.submitProfile = function () {
		$http.post('http://giv-mgl.uni-muenster.de:8080/profile', {
			operation: "profile",
			access_token: $scope.token,
			name: $scope.newName,
			profession: $scope.newProfession,
			country: $scope.newCountry,
			city: $scope.newCity
		}).success(function (data) {
			console.log(data);
			if (data.success) {
				$scope.users = data.user;
				window.location.href = "#profile/" + $scope.token;
			}
			else {
				$scope.message = data.message;
				$scope.error = true;
			}
			;
		});
	};

	this.notsame = function () {
		return ($scope.newPassword !== $scope.newPassword2);
	};

});