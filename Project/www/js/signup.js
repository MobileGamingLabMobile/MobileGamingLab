App.controller('signUpController', function ($scope, $http) {
	

	$scope.submit = function(){
			$http.post("http://giv-mgl.uni-muenster.de:8080/signup",{email: $scope.email , password: $scope.password})
			.success(function (data) {
				console.log(data);
				if (data.success){
					//this.token = data.token;
					window.sessionStorage.setItem("token", data.token);
					window.sessionStorage.setItem("userID", null);
					window.location.href = "#changeProfile";
				}
				else{
					console.log(data.message);
					$scope.message = data.message;
					$scope.error = true;
				};				
			});
	};
	
	$scope.notsame = function(){
		return ($scope.password !== $scope.password2);
	};
	
});