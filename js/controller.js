angular
    .module('firettt')
    .controller("MainController", mainController)

    mainController.$inject = ['$firebaseObject'];

    function mainController($firebaseObject) {

        var self = this;

        self.decidePlayerMove = decidePlayerMove;
        /* Player 1 is decided to be X, Player 2 is decided to be O.
        relate to css ng-class to switch Image */
        self.p1 = "x";
		self.p2 = "o";
		/*local variable for player one and player two's existence
		when playerone clicks, playerone becomes true and playertwo remains false*/
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
        self.resetButton = resetButton;

        /* Firebase Function which is used to create a separate variable,
        in order to track if both player One and Two is Inside the Room. */
        function whatsoever() {
            var ref = new Firebase("https://jeffersonttt.firebaseio.com/game2");
            var whatso = $firebaseObject(ref);
            return whatso;   
        }
        /*If player One and Two have entered their names, the bollean will become
        true.*/
        	self.whatsoever.$loaded( function() {
        		self.whatsoever.playerOneHere = false;
        		self.whatsoever.playerTwoHere = false;
        		self.whatsoever.$save();
        	})

        	
 		//Function to connect with firebase
        function whatever() {
            var ref = new Firebase("https://jeffersonttt.firebaseio.com/game");
            var what = $firebaseObject(ref);
            return what;   
        }
        

        /*The if statement determines if player one and two are in the house,
        if they exist, the inital load function will not run, so that the third
        logins will not clear the page*/
        if (self.whatsoever.playerOneHere == false && self.whatsoever.playerTwoHere == false){
        	// initial function when the page is loaded
	        self.whatever.$loaded(function() {


	        	self.whatever.playerOne = "Player 1";
	        	self.whatever.playerTwo = "Player 2";

	        	self.whatever.playerOneScore = 0;
	        	self.whatever.playerTwoScore = 0;
	        	self.whatever.winner = "winner";
	        	self.whatever.counter = 1;
	        	self.whatever.showPlayerOneName = true;
	        	self.whatever.showPlayerTwoName = true;
	        	self.whatever.showWinner = false;
	        	self.whatever.playerNameAlert = true;

				self.whatever.playerTurn = self.whatever.playerTwo + " Let's get started!!!";

	   			//Create the board
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


		// function checkP1AndP2Name() {
		// 	if (player)
		// }

        /*
        Function to decide player turns
        Odd number to determine Player 1 's move = "o"
        Even number to determine Player 2 's move = "x"
        */
        function decidePlayerMove($index) {      
        	// If a winner is announced, players can no longer click the board.
        	if (self.whatever.winner !== "winner") {
        		return;
        	}
        	// conditions for player one to move
            if (
            	self.playerOneHere == true
                && self.whatever.counter % 2 == 1
                && self.whatever.gridList[$index].value == "" 
            ) {

	            console.log(self.whatever.gridList[$index].id)
	            self.whatever.counter++;
	            self.whatever.gridList[$index].value = self.p1;
	            console.log(self.whatever.gridList[$index].value);
	            self.whatever.playerTurn = self.whatever.playerTwo + " 's Turn Now!!";
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
                self.whatever.playerTurn = self.whatever.playerOne + " 's Turn Now!";
            }
            self.getWinner();
            self.whatever.$save();

        }
        /* function to get the winner*/
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
					
					self.whatever.showWinner = true;
					self.whatever.playerNameAlert = false;
					self.whatever.$save();
				} 
			//deciding tie game
				else if (self.whatever.counter == 10) {	
					console.log("tie")
					self.whatever.winner = "It is a tie!";
					self.whatever.showWinner = true;
					self.whatever.playerNameAlert = false;
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
        	self.whatever.playerNameAlert = true;
        	self.whatever.playerTurn = "Register Name and Player 1 Goes First!";
            self.whatever.$save();

		}
		//newGameButton allows player one and player two to start a new game;
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
        //resetButton allows 3rd people to restart a new game;
        function resetButton() {
        	self.clearButton();
        	self.newGameButton();
        	self.whatsoever.playerOneHere = false;
        	self.whatsoever.playerTwoHere = false;
        	self.whatever.$save;

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