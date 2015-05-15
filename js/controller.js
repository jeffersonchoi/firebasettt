angular
    .module('firettt')
    .controller("MainController", mainController)

    mainController.$inject = ['$firebaseObject'];

    function mainController($firebaseObject) {

        var self = this;
        // self.counter = 1;
        self.decidePlayerMove = decidePlayerMove;
        self.nameChange = nameChange;

        self.p1 = "x";
		self.p2 = "o";

        self.getWinner = getWinner;
        self.clearButton = clearButton;
        
        self.whatever = whatever();

         //Function to connect with firebase
        function whatever() {
            var ref = new Firebase("https://jeffersonttt.firebaseio.com/");
            var what = $firebaseObject(ref);
            return what;   
        }
        self.whatever.$loaded(function() {
        	self.whatever.playerOne = "Player 1";
        	self.whatever.playerTwo = "Player 2";
        	self.whatever.playerOneScore = 0;
        	self.whatever.playerTwoScore = 0;
        	self.whatever.winner = "winner";
        	self.whatever.counter = 1;
        	self.whatever.showName = true;
        	self.whatever.showWinner = false;

            self.whatever.gridList = [
            	{
                    id: 0, 
                    value: ""
                } , {
                    id: 1, 
                    value: ""
                } , {
                    id: 2, 
                    value: ""
                } , {
                    id: 3, 
                    value: ""
                } , {
                    id: 4, 
                    value: ""
                } , {
                    id: 5, 
                    value: ""
                } , {
                    id: 6, 
                    value: ""
                } , {
                    id: 7, 
                    value: ""
                } , {
                    id: 8, 
                    value: "" 
                }
                ];
                self.whatever.$save();
            });

        //Function to show/hide the playerName/playerScore class
        function nameChange() {
            self.whatever.showName = !self.whatever.showName;
            self.whatever.$save();
        }

        // /*
        // Function to decide player turns
        // Odd number to determine Player 1 's move = "o"
        // Even number to determine Player 2 's move = "x"
        // */
        function decidePlayerMove($index) {      

        	if (self.whatever.winner !== "winner") {
        		return;
        	}

            if (
                self.whatever.counter % 2 == 1
                && self.whatever.gridList[$index].value == "" 
            ) {

	            console.log(self.whatever.gridList[$index].id)
	            self.whatever.counter++;
	            self.whatever.gridList[$index].value = self.p1;
	            console.log(self.whatever.gridList[$index].value)
            } 
            else if (
                self.whatever.counter % 2 == 0 
                && self.whatever.gridList[$index].value == ""
            ) {
            	console.log(self.whatever.gridList[$index].id)
                self.whatever.counter++;
                self.whatever.gridList[$index].value = self.p2;
                console.log(self.whatever.gridList[$index].value)
                self.whatever.$save();
            }
            self.getWinner();
            self.whatever.$save();

        }

        function getWinner() {
        	var tokens = [self.p1, self.p2];
				for (var i = 0; i < tokens.length; i++) {
				var t = tokens[i];

					if (
					((self.whatever.gridList[0].value == t ) && (self.whatever.gridList[1].value == t ) && (self.whatever.gridList[2].value == t )) || 
				    ((self.whatever.gridList[3].value == t ) && (self.whatever.gridList[4].value == t ) && (self.whatever.gridList[5].value == t )) ||
			        ((self.whatever.gridList[6].value == t ) && (self.whatever.gridList[7].value == t ) && (self.whatever.gridList[8].value == t )) ||
		 		    ((self.whatever.gridList[0].value == t ) && (self.whatever.gridList[3].value == t ) && (self.whatever.gridList[6].value == t )) ||
		 	  	    ((self.whatever.gridList[1].value == t ) && (self.whatever.gridList[4].value == t ) && (self.whatever.gridList[7].value == t )) ||
				    ((self.whatever.gridList[2].value == t ) && (self.whatever.gridList[5].value == t ) && (self.whatever.gridList[8].value == t )) ||
				    ((self.whatever.gridList[0].value == t ) && (self.whatever.gridList[4].value == t ) && (self.whatever.gridList[8].value == t )) ||
				    ((self.whatever.gridList[2].value == t ) && (self.whatever.gridList[4].value == t ) && (self.whatever.gridList[6].value == t )) 
					){ 	
						if (t == self.p1) {
							console.log("p1")
							self.whatever.playerOneScore++;
							self.whatever.winner = self.whatever.playerOne + " wins";
						} else if (t == self.p2) {
							console.log("p2")
							self.whatever.playerTwoScore++;
							self.whatever.winner = self.whatever.playerTwo + " wins";		
						}
						self.whatever.$save();
						self.whatever.showWinner = true;
					} 
				//deciding tie game
					else if (self.whatever.counter == 9) {	
						console.log("tie")
						self.whatever.winner = "It is a tie!";
						self.whatever.showWinner=true;
				}

			}
			self.whatever.$save();
		}


		function clearButton() {
			self.whatever.counter = 1;
            self.whatever.gridList = [
            	{
                    id: 0, 
                    value: ""
                } , {
                    id: 1, 
                    value: ""
                } , {
                    id: 2, 
                    value: ""
                } , {
                    id: 3, 
                    value: ""
                } , {
                    id: 4, 
                    value: ""
                } , {
                    id: 5, 
                    value: ""
                } , {
                    id: 6, 
                    value: ""
                } , {
                    id: 7, 
                    value: ""
                } , {
                    id: 8, 
                    value: "" 
                }
             ];
            self.whatever.winner = "winner";
        	self.whatever.showWinner = false;
            self.whatever.$save();
		}











}