App.controller("gameInfoController", function ($scope, $http, $routeParams) {

	//$scope.token = $routeParams.token;
	$scope.token = window.sessionStorage.getItem("token");
	//$scope.gameID = $routeParams.gameID;
	$scope.gameID = window.sessionStorage.getItem("gameID");
	
	this.tab = 1;
	this.selectTab = function (setTab) {
		this.tab = setTab;
	};
	this.isSelected = function (checkTab) {
		return this.tab === checkTab;
	};

	this.loadgame = function () {
		$http.get("http://giv-mgl.uni-muenster.de:8080/games/" + $scope.gameID + "/?access_token=" + $scope.token).success(function (data) {
			console.log(data);
			if (data.success)
			{
				$scope.game = data.game;
				console.log($scope.game);
				this.averageRating = $scope.game[0].metadata.rating.toFixed(2);
				console.log(this.averageRating);
				// star rating for displaying the average of the rating
				$("#averageRating").rateYo({
					rating: this.averageRating,
					precision: 2,
					readOnly: true
				});
				//window.sessionStorage.setItem(userID, data.game[0].metadata.owner);
			}
			;
		});
	};

	this.loadComments = function () {
		this.tab = 2;
		$http.post("http://giv-mgl.uni-muenster.de:8080/comment", {
			access_token: $scope.token,
			operation: "get",
			game_id: $scope.gameID
		}).success(function (data) {
			console.log(data);
			if (data.success)
			{
				$scope.comments = data.comments;
				console.log($scope.comments);
				initialiseComments($scope.comments);
			}
			;
		});
	};

	var initialiseComments = function (data) {
		$('#comments').append('');
		console.log($('#comments'));
		$.each(data, function (i, item) {
			$panel = $('<div class="panel"></div>');
			$head = $('<div class="row"><div>');
			$author = $('<div class="small-3 columns right"></div>').html(data[i].user.profile.name);
			$rating = $('<div class="small-3 columns left"></div>').html('<div id="' + data[i].id + '"></div>');
			$body = $('<div class="row"><div>');
			$text = $('<div class="panel"></div>').html(data[i].text);
			$body.append($text);
			$head.append($author);
			$head.append($rating);
			$panel.append($head);
			$panel.append($body);
			$('#comments').append($panel);
			console.log($('#comments'));
		});
		$.each(data, function (i, item) {
			$('#' + data[i].id).rateYo({
				rating: data[i].rating,
				precision: 2,
				readOnly: true
			});
		});
	};

	//star rating for making a comment
	$("#setRating").rateYo({
		precision: 2,
		onSet: function (rating) {
			$scope.rating = rating;
			console.log($scope.rating);
		}
	});

	// submit a new comment
	this.submitComment = function () {
		$('#alert').append('');
		console.log($scope.rating);
		if ($scope.rating === 0) {
			$alert=$('<div data-alert class="alert-box info radius"></div>').html('Bitte geben Sie eine Bewertung ein!');
			$('#alert').append($alert);
		}
		else {
			$http.post("http://giv-mgl.uni-muenster.de:8080/comment", {
				access_token: $scope.token,
				operation: "new",
				game_id: $scope.gameID,
				text: $scope.comment,
				rating: $scope.rating,
				time: Date.now()
			}).success(function (data) {
				console.log(data);
				if (data.success)
				{
					// gibt es eine bessere Lösung?
					window.location.href = "#gameinfo";
				}
				;
			});
		}
		;
	};

	//subscribe game
	// parameter play defines if your on a desktop or an mobile device... if play is true subscribe is also the play functionality
	// if play is false, this function only subscribes the user but he cannot play the game
	this.subscribe = function (play) {
		$http.post("http://giv-mgl.uni-muenster.de:8080/games/" + $scope.gameID, {
			access_token: $scope.token,
			operation: "subscribe",
			game_id: $scope.gameID
		}).success(function (data) {
			console.log(data);
			if (play) {
				//weiterleitung zum spiel
				window.location.href = "#game";
			}
			;

		});

	};

	//to unsubscribe the user from this game
	this.unsubscribe = function () {
		$http.post("http://giv-mgl.uni-muenster.de:8080/games/" + $scope.gameID, {
			access_token: $scope.token,
			operation: "unsubscribe",
			game_id: $scope.gameID
		}).success(function (data) {
			console.log(data);

		});

	};

	// returns true if the user has subscribed this game and false if not
	this.gamesubscribed = function () {
		$http.get("http://giv-mgl.uni-muenster.de:8080/user/games/subscribed/?access_token=" + $scope.token).success(function (data) {
			console.log(data);
			if (data.success)
			{
				$scope.sgames = data.games;
				var subscribed = false;
				$.each($scope.sgames, function (i) {
					if ($scope.gameID === $scope.sgames[i]._id)
					{
						console.log("GameinfoID:"+$scope.gameID+" Abonniertgame:"+$scope.sgames[i]._id);
						subscribed = true;
					}
					;
					console.log("hallp");
				});
				console.log(subscribed);
				this.subscribed = subscribed;
				console.log(this.subscribed);
			}
			;
		});
	};

	this.profile = function () {
		window.sessionStorage.setItem("userID", null);
		window.location.href = "#profile";
	};
});


