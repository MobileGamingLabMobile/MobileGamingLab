App.controller("selectGameController", function () {
	
//$(document).ready(function(){    $('#datatable').DataTable();});

	this.tab = 1;
	this.selectTab = function (setTab) {
		this.tab = setTab;
	};
	this.isSelected = function (checkTab) {
		return this.tab === checkTab;
	};
});