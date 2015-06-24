App.controller('loginController', function ($scope, $http) {
	
	$scope.message = "";
	$scope.error = false;
	$scope.login = function () {
		$http.post("http://giv-mgl.uni-muenster.de:8080/login", {email: $scope.email, password: $scope.password})
				.success(function (data) {
					console.log(data);
					if (data.success){
					//this.token = data.token;
					window.sessionStorage.setItem("token", data.token);
					window.sessionStorage.setItem("userID", null);
					window.location.href = "#gameselection";
				}
				else{
					console.log(data.message);
					$scope.message = data.message;
					$scope.error = true;
				};
				});
	};
});
