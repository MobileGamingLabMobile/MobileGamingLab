App.controller("selectGameController", function ($scope, $http, $routeParams) {

	this.tab = 3;
	this.isSelected = function (checkTab) {
		return this.tab === checkTab;
	};

	//$scope.token = $routeParams.token;
	$scope.token = window.sessionStorage.getItem("token");
	console.log($scope.token);
	
	//load all games
	this.loadAllgame = function () {
		$http.get("http://giv-mgl.uni-muenster.de:8080/games/published/?access_token=" + $scope.token).success(function (data) {
			console.log(data);
			if (data.success)
			{
				$scope.allgames = data.games;
				initialiseTable($scope.allgames, 'tab03');

			}
			;
		});
		this.tab = 3;
	};

	var initialiseTable = function (data, tabid) {
		//initialise table
		$table = $('<table class="display"></table>');
		$head = $('<thead></thead>');
		$body = $('<tbody></tbody>');
		$hline = $('<tr></tr>');
		$hline.append($('<th></th>').html('Spiel'));
		$hline.append($('<th></th>').html('Bewertung'));
		$head.append($hline);
		$table.append($head);

		var allgamesdata = [];
		$.each(data, function (i, item) {
			allgamesdata [i] = {
				"id": data[i]._id,
				"name": data[i].metadata.name,
				"rating": data[i].metadata.rating.toFixed(2)
			};
			//load table

			$bline = $('<tr></tr>');
			$bline.append($('<td></td>').html(allgamesdata[i].name));
			$bline.append($('<td></td>').html('<div id="'+tabid + allgamesdata[i].id + '"></div>'));
			$body.append($bline);
		});
		$table.append($body);
		$('#'+tabid).html('');
		$('#'+tabid).append($table);
		var table = $table.DataTable();
		table.draw();
		$body.on("click", "tr", function () {
			var index = table.row(this).index();
			console.log(index);
			window.sessionStorage.setItem("gameID", allgamesdata[index].id);
			window.location.href = "#gameinfo";
		});
		$.each(allgamesdata, function (i) {
			$('#'+tabid + allgamesdata[i].id).rateYo({
				rating: allgamesdata[i].rating,
				precision: 2,
				readOnly: true
			});
		});
	};

	// load subscribed games
	this.loadSgame = function () {
		$http.get("http://giv-mgl.uni-muenster.de:8080/user/games/subscribed/?access_token=" + $scope.token).success(function (data) {
			console.log(data);
			if (data.success)
			{
				$scope.sgames = data.games;
				initialiseTable($scope.sgames, 'tab01');
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
				initialiseTable($scope.ogames, 'tab02');
			}
			;
		});
		this.tab = 2;
	};

});