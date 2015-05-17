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
		self.aiHere = false;

        self.getWinner = getWinner;
        self.clearButton = clearButton;
        // self.playerList = "Player 1", "Player 2";
        self.playerOneNameChange = playerOneNameChange;
        self.playerTwoNameChange = playerTwoNameChange;
        self.newGameButton = newGameButton;
        self.whatever = whatever();
        self.whatsoever = whatsoever();
        self.resetButton = resetButton;


        self.dangerAlert = dangerAlert;
		self.aiMove = aiMove;
		self.ai = "v";
		self.aiMovePattern = aiMovePattern;
		self.letAiMove = letAiMove;

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
        		self.whatsoever.aiHere = false;
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

				self.whatever.aiScore = 0;


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
   //          else if (
			//   		self.aiHere == true
			//         && self.whatever.counter % 2 == 0
			//     ) {
   //          	console.log("check if this is running")
		 //    	self.aiMove();
		 //    	self.whatever.$save();
			// } 
            self.getWinner();
            self.whatever.$save();

        }

        //adding new stuff


        function letAiMove() {
        	if (
			  		self.aiHere == true
			        && self.whatever.counter % 2 == 0
			    ) {
            	console.log("check if this is running")
		    	self.aiMove();
		    	self.whatever.$save();
			} 
            self.getWinner();
            self.whatever.$save();

        }


        function aiMove() {
        	console.log("aiMove")
        	self.dangerAlert();
	        self.whatever.counter++;
	        self.whatever.playerTurn = self.whatever.playerOne + " 's Turn Now!!";
	        self.whatever.$save();
        }






		//2. detect danger, if no dangerous situations, place according to priority.

	
		// ([3],[6]) or ([1],[2]) or ([4],[8]) == "x", [0] == "o";
		// ([0],[2]) or ([4],[7]) == "x", [1] == "o" ;
		// ([0],[1]) or ([5],[8]) or ([4],[6]) == "x", [2] == "o";
		// ([0],[6]) or ([4],[5]) == "x", [3] == "o";
		// ([3],[5]) or ([1],[7]) or ([0],[8]) or ([2],[6])  == "x" , [4] == "o";
		// ([2],[8]) or ([3],[4]) == "x", [5] == "o";
		// ([0],[3]) or ([7],[8]) or ([2],[4]) == "x", [6] == "o";
		// ([1],[4]) or ([6],[8]) == "x", [7] == "o";
		// ([2],[5]) or ([6],[7]) or ([0],[4]) == "x", [8] == "o";

	


        function dangerAlert() {
        	console.log("dangerAlert");
		if (
			 (self.whatever.gridList[3].value == "x" && self.whatever.gridList[6].value == "x") && self.whatever.gridList[0].value == ""|| 
			 (self.whatever.gridList[1].value == "x" && self.whatever.gridList[2].value == "x") && self.whatever.gridList[0].value == ""|| 
			 (self.whatever.gridList[4].value == "x" && self.whatever.gridList[8].value == "x") && self.whatever.gridList[0].value == ""
			) {
					self.whatever.gridList[0].value = "v"
			}
		else if (
			 (self.whatever.gridList[0].value == "x" && self.whatever.gridList[2].value == "x") && self.whatever.gridList[1].value == ""|| 
			 (self.whatever.gridList[4].value == "x" && self.whatever.gridList[7].value == "x") && self.whatever.gridList[1].value == ""
			) {
					self.whatever.gridList[1].value = "v"
			}
		else if (
			 (self.whatever.gridList[0].value == "x" && self.whatever.gridList[1].value == "x") && self.whatever.gridList[2].value == ""|| 
			 (self.whatever.gridList[5].value == "x" && self.whatever.gridList[8].value == "x") && self.whatever.gridList[2].value == ""|| 
			 (self.whatever.gridList[4].value == "x" && self.whatever.gridList[6].value == "x") && self.whatever.gridList[2].value == ""
			) {
					self.whatever.gridList[2].value = "v";
					console.log("ai dangeralert grid 2")
			}
		else if (
			 (self.whatever.gridList[0].value == "x" && self.whatever.gridList[6].value == "x") && self.whatever.gridList[3].value == ""|| 
			 (self.whatever.gridList[4].value == "x" && self.whatever.gridList[5].value == "x") && self.whatever.gridList[3].value == ""
			) {
					self.whatever.gridList[3].value = "v"
			}
		else if (
			 (self.whatever.gridList[3].value == "x" && self.whatever.gridList[5].value == "x") && self.whatever.gridList[4].value == ""|| 
			 (self.whatever.gridList[1].value == "x" && self.whatever.gridList[7].value == "x") && self.whatever.gridList[4].value == ""|| 
			 (self.whatever.gridList[0].value == "x" && self.whatever.gridList[8].value == "x") && self.whatever.gridList[4].value == ""||
			 (self.whatever.gridList[2].value == "x" && self.whatever.gridList[6].value == "x") && self.whatever.gridList[4].value == ""
			) {
					self.whatever.gridList[4].value = "v"
			}
		else if (
			 (self.whatever.gridList[2].value == "x" && self.whatever.gridList[8].value == "x") && self.whatever.gridList[5].value == ""|| 
			 (self.whatever.gridList[3].value == "x" && self.whatever.gridList[4].value == "x") && self.whatever.gridList[5].value == ""
			) {
					self.whatever.gridList[5].value = "v"
			}
		else if (
			 (self.whatever.gridList[0].value == "x" && self.whatever.gridList[3].value == "x") && self.whatever.gridList[6].value == ""|| 
			 (self.whatever.gridList[7].value == "x" && self.whatever.gridList[8].value == "x") && self.whatever.gridList[6].value == ""|| 
			 (self.whatever.gridList[2].value == "x" && self.whatever.gridList[4].value == "x") && self.whatever.gridList[6].value == ""
			) {
					self.whatever.gridList[6].value = "v"
			}
		else if (
			 (self.whatever.gridList[1].value == "x" && self.whatever.gridList[4].value == "x") && self.whatever.gridList[7].value == ""|| 
			 (self.whatever.gridList[6].value == "x" && self.whatever.gridList[8].value == "x") && self.whatever.gridList[7].value == ""
			) {
					self.whatever.gridList[7].value = "v"
			}
	    else if (
			 (self.whatever.gridList[2].value == "x" && self.whatever.gridList[5].value == "x") && self.whatever.gridList[8].value == ""|| 
			 (self.whatever.gridList[6].value == "x" && self.whatever.gridList[7].value == "x") && self.whatever.gridList[8].value == ""|| 
			 (self.whatever.gridList[0].value == "x" && self.whatever.gridList[4].value == "x") && self.whatever.gridList[8].value == ""
			) {
					self.whatever.gridList[8].value = "v"
			}
		else {
			aiMovePattern();
			
		}
		self.whatever.$save();
		}



		function aiMovePattern() {
			console.log("aiMovePattern")
			if (self.whatever.gridList[4].value == "") {
				self.whatever.gridList[4].value = "v";
				console.log("ai grid 4")
			}
			else if (self.whatever.gridList[0].value == "") {
				self.whatever.gridList[0].value = "v"
			}
			else if (self.whatever.gridList[2].value == "") {
				self.whatever.gridList[2].value = "v"
			}
			else if (self.whatever.gridList[6].value == "") {
				self.whatever.gridList[6].value = "v"
			}
			else if (self.whatever.gridList[8].value == "") {
				self.whatever.gridList[8].value = "v"
			}
			else if (self.whatever.gridList[1].value == "") {
				self.whatever.gridList[1].value = "v"
			}
			else if (self.whatever.gridList[3].value == "") {
				self.whatever.gridList[3].value = "v"
			}
			else if (self.whatever.gridList[5].value == "") {
				self.whatever.gridList[5].value = "v"
			}
			else if (self.whatever.gridList[7].value == "") {
				self.whatever.gridList[7].value = "v"
			}
			else {
				console.log("aiMovePatternEnding")
			}
			self.whatever.$save();
		}

	/*check empty, if 
	check if [4] is empty, if empty, click it.
	if [4] is not empty, check [0],[2],[6],[8] is empty.
	if [0] is empty, click it, if not, click [2], [6], [8] respectively
	if [0], [2], [4], [6], [8] is not empty, put it [1],[3],[5],[7].
		*/






















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
					
					} else if (t == "v") {
						console.log("ai")
						self.whatever.aiScore++;
						self.whatever.winner = "AI wins";	
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
	        	self.whatever.playerTurn = self.whatever.playerOne + " 's Turn Now!!";
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
	        	self.whatever.playerTurn = "Register Name and Player 1 Goes First!";
	        	self.whatever.$save();
	        }
        //resetButton allows 3rd people to restart a new game;
        function resetButton() {
        	self.clearButton();
        	self.newGameButton();
        	self.whatsoever.playerOneHere = false;
        	self.whatsoever.playerTwoHere = false;
        	self.whatever.aiHere = false;
        	self.whatever.$save;

        }
        //function to hide the playerone name button after button is clicked.
		function playerOneNameChange() {
           
            self.whatever.showPlayerOneName = !self.whatever.showPlayerOneName;
            self.whatever.$save();
        }
        //function to hide the playertwo name button after button is clicked.
        function playerTwoNameChange() {
          
            self.whatever.showPlayerTwoName = !self.whatever.showPlayerTwoName;
            self.whatever.$save();
        }










}