angular
    .module('firettt')
    .controller("MainController", mainController)

    mainController.$inject = ['$firebaseObject'];

    function mainController($firebaseObject) {

        var self = this;

        self.decidePlayerMove = decidePlayerMove;

        self.p1 = "x";
		self.p2 = "o";
		// self.playerOneNameChange = playerOneNameChange;
		// self.playerTwoNameChange = playerTwoNameChange;
		self.playerOneHere = false;
		self.playerTwoHere = false;

        self.getWinner = getWinner;
        self.clearButton = clearButton;
        // self.playerList = "Player 1", "Player 2";
        self.playerOneNameChange = playerOneNameChange;
        self.playerTwoNameChange = playerTwoNameChange;
        self.newGameButton = newGameButton;
        self.whatever = whatever();
        self.whatsoever = whatsoever();


        function whatsoever() {
            var ref = new Firebase("https://jeffersonttt.firebaseio.com/game2");
            var whatso = $firebaseObject(ref);
            return whatso;   
        }

        	self.whatsoever.$loaded( function() {
        		self.whatsoever.playerOneHere = false;
        		self.whatsoever.playerTwoHere = false;
        		self.whatsoever.$save();
        	})

        	
  // //        //Function to connect with firebase
        function whatever() {
            var ref = new Firebase("https://jeffersonttt.firebaseio.com/game");
            var what = $firebaseObject(ref);
            return what;   
        }
        
        if (self.whatsoever.playerOneHere == false && self.whatsoever.playerTwoHere == false){
	        self.whatever.$loaded(function() {
	        	self.whatever.playerOne = "Player 1";
	        	self.whatever.playerTwo = "Player 2";
	        	// self.whatever.playerOneExist = false;
	        	// self.whatever.playerTwoExist = false;
	        	self.whatever.playerOneScore = 0;
	        	self.whatever.playerTwoScore = 0;
	        	self.whatever.winner = "winner";
	        	self.whatever.counter = 1;
	        	self.whatever.showPlayerOneName = true;
	        	self.whatever.showPlayerTwoName = true;
	        	self.whatever.showWinner = false;


	        	self.whatever.playerTurn = "Let's start!";

	        	// if (self.whatever.counter % 2 == 1) {
	        	// 	self.whatever.playerTurn = self.whatever.playerOne + " 's Turn!";
	        	// } else self.whatever.playerTurn = self.whatever.playerTwo + " 's Turn!";

	            self.whatever.gridList = [
	            	{
	                    id: "box0", 
	                    value: ""
	                } , {
	                    id: "box1", 
	                    value: ""
	                } , {
	                    id: "box2", 
	                    value: ""
	                } , {
	                    id: "box3", 
	                    value: ""
	                } , {
	                    id: "box4", 
	                    value: ""
	                } , {
	                    id: "box5", 
	                    value: ""
	                } , {
	                    id: "box6", 
	                    value: ""
	                } , {
	                    id: "box7", 
	                    value: ""
	                } , {
	                    id: "box8", 
	                    value: "" 
	                }
	                ];
	                self.whatever.$save();
	            });
		}


        // function playerOneHere() {
        // 	self.whatever.playerOneExist = !self.whatever.playerOneExist;
        // 	self.whatever.showPlayerOneName = !self.whatever.showPlayerOneName
        // 	self.whatever.$save();
        // }
        // function playerTwoHere() {
        // 	self.whatever.playerTwoExist = !self.whatever.playerTwoExist;
        // 	 self.whatever.showPlayerTwoName = !self.whatever.showPlayerTwoName
        // 	self.whatever.$save();
        // }

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
            	self.playerOneHere == true
                && self.whatever.counter % 2 == 1
                && self.whatever.gridList[$index].value == "" 
            ) {

	            console.log(self.whatever.gridList[$index].id)
	            self.whatever.counter++;
	            self.whatever.gridList[$index].value = self.p1;
	            console.log(self.whatever.gridList[$index].value)
            } 
            else if (
            	self.playerTwoHere == true
                && self.whatever.counter % 2 == 0 
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
				else if (self.whatever.counter == 10) {	
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
                    id: "box0", 
                    value: ""
                } , {
                    id: "box1", 
                    value: ""
                } , {
                    id: "box2", 
                    value: ""
                } , {
                    id: "box3", 
                    value: ""
                } , {
                    id: "box4", 
                    value: ""
                } , {
                    id: "box5", 
                    value: ""
                } , {
                    id: "box6", 
                    value: ""
                } , {
                    id: "box7", 
                    value: ""
                } , {
                    id: "box8", 
                    value: "" 
                }
                ];
            self.whatever.winner = "winner";
        	self.whatever.showWinner = false;
            self.whatever.$save();
            self.whatsoever.playerOneHere = false;
        	self.whatsoever.playerTwoHere = false;
		}

		function newGameButton() {
        	self.clearButton();
        	self.whatever.playerOneScore = 0;
        	self.whatever.playerTwoScore = 0;
        	self.whatever.counter = 1;
        	self.whatever.showPlayerOneName = true;
        	self.whatever.showPlayerTwoName = true;
      		self.whatever.playerOne = "Player 1";
        	self.whatever.playerTwo = "Player 2";
        	self.whatever.$save();
        }



		function playerOneNameChange() {
           
            self.whatever.showPlayerOneName = !self.whatever.showPlayerOneName;
            self.whatever.$save();
        }
        function playerTwoNameChange() {
           
            self.whatever.showPlayerTwoName = !self.whatever.showPlayerTwoName;
            self.whatever.$save();
        }










}