App.controller("selectGameController", function ($scope, $http, $routeParams) {

	this.tab = 1;
	this.selectTab = function (setTab) {
		this.tab = setTab;
	};
	this.isSelected = function (checkTab) {
		return this.tab === checkTab;
	};
        
        $scope.token = $routeParams.token;
});