App.controller("impressumController", function ($http, $scope, $routeParams) {

	$scope.token = $routeParams.token;
	
	this.tab = 1; // 1 = FAQ, 2 = Über uns
	
	this.isSelected = function (checkTab) {
		return this.tab === checkTab;
	};
	// show 'FAQ' tab
	this.showFAQ = function(){
		this.tab = 1;
	};

	// show 'Über uns' tab
	this.showOverUs = function(){
		this.tab = 2;
	};
});
