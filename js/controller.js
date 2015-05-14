angular
	.module('firettt')
	.controller("MainController", mainController)

	mainController.$inject = ['$firebaseObject']


	function mainController($firebaseObject) {
		var self = this;
		self.counter = 1;
		self.p1move=false;
		self.p2move=false;
		self.decidePlayerMove=decidePlayerMove;
		self.ttt=whatever();



		self.game={gridList: ["","","","","","","","",""]}



		function whatever() {
			var ref = new Firebase("https://jeffersonttt.firebaseio.com/");
			var whatever = $firebaseObject(ref);
			return whatever;

		}













		function decidePlayerMove($index) {
			if (self.counter % 2 !== 0) {
				self.p1move = !self.p1move;
				self.counter++;
				switchBoxValue($index);
			} else if (self.counter % 2 == 0) {
				self.p2move = !self.p2move;
				self.counter++;
				switchBoxValue($index);
			}
		}

		function switchBoxValue($index) {
			if (self.p1move == true) {
				self.game.gridList[$index] = "o";
				self.p1move = !self.p1move;
			} else if (self.p2move == true) {
				self.game.gridList[$index] = "x";
				self.p2move = !self.p2move;
			}
		}








}