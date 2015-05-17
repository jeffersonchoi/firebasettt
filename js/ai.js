/*AI winlogic

[0],[1],[2]
[3],[4],[5]
[6],[7],[8]

player clicks computer button to initiate whatever.aiHere = true, also initiate the aiCheckTurn function. 
*/

self.dangerAlert = dangerAlert;
self.aiMove = aiMove;
self.aiCheckTurn = aiCheckTurn;
self.whatever.aiHere = false;
self.aiIsHere = aiIsHere;
self.ai = "v";
self.aiMove = aiMove;




	function aiIsHere() {
		self.whatever.aiHere = true;
	}


	//1. if even number, computer move.

	function aiCheckTurn() {
		    else if (
			  		self.aiIsHere == true
			        && self.whatever.counter % 2 == 0
			    ) {
		    		self.dangerAlert();
			        self.aiMove();
			        self.whatever.counter++;
			        self.whatever.playerTurn = self.whatever.playerOne + " 's Turn Now!!";
			    } 
		self.whatever.$save();
	}

	//&& self.whatever.gridList[$index].value == ""



	//2. detect danger, if no dangerous situations, place according to priority.

	function dangerAlert() {
		if (
			 (self.whatever.gridList[3].value == "x" && self.whatever.gridList[6].value == "x") && self.whatever.gridList[0].value == ""|| 
			 (self.whatever.gridList[1].value == "x" && self.whatever.gridList[2].value == "x") && self.whatever.gridList[0].value == ""|| 
			 (self.whatever.gridList[4].value == "x" && self.whatever.gridList[8].value == "x") && self.whatever.gridList[0].value == ""
			) {
					self.whatever.gridList[0].value == "v"
			}
		else if (
			 (self.whatever.gridList[0].value == "x" && self.whatever.gridList[2].value == "x") && self.whatever.gridList[1].value == ""|| 
			 (self.whatever.gridList[4].value == "x" && self.whatever.gridList[7].value == "x") && self.whatever.gridList[1].value == ""
			) {
					self.whatever.gridList[1].value == "v"
			}
		else if (
			 (self.whatever.gridList[0].value == "x" && self.whatever.gridList[1].value == "x") && self.whatever.gridList[2].value == ""|| 
			 (self.whatever.gridList[5].value == "x" && self.whatever.gridList[8].value == "x") && self.whatever.gridList[2].value == ""|| 
			 (self.whatever.gridList[4].value == "x" && self.whatever.gridList[6].value == "x") && self.whatever.gridList[2].value == ""
			) {
					self.whatever.gridList[2].value == "v"
			}
		else if (
			 (self.whatever.gridList[0].value == "x" && self.whatever.gridList[6].value == "x") && self.whatever.gridList[3].value == ""|| 
			 (self.whatever.gridList[4].value == "x" && self.whatever.gridList[5].value == "x") && self.whatever.gridList[3].value == ""
			) {
					self.whatever.gridList[3].value == "v"
			}
		else if (
			 (self.whatever.gridList[3].value == "x" && self.whatever.gridList[5].value == "x") && self.whatever.gridList[4].value == ""|| 
			 (self.whatever.gridList[1].value == "x" && self.whatever.gridList[7].value == "x") && self.whatever.gridList[4].value == ""|| 
			 (self.whatever.gridList[0].value == "x" && self.whatever.gridList[8].value == "x") && self.whatever.gridList[4].value == ""||
			 (self.whatever.gridList[2].value == "x" && self.whatever.gridList[6].value == "x") && self.whatever.gridList[4].value == ""
			) {
					self.whatever.gridList[4].value == "v"
			}
		else if (
			 (self.whatever.gridList[2].value == "x" && self.whatever.gridList[8].value == "x") && self.whatever.gridList[5].value == ""|| 
			 (self.whatever.gridList[3].value == "x" && self.whatever.gridList[4].value == "x") && self.whatever.gridList[5].value == ""
			) {
					self.whatever.gridList[5].value == "v"
			}
		else if (
			 (self.whatever.gridList[0].value == "x" && self.whatever.gridList[3].value == "x") && self.whatever.gridList[6].value == ""|| 
			 (self.whatever.gridList[7].value == "x" && self.whatever.gridList[8].value == "x") && self.whatever.gridList[6].value == ""|| 
			 (self.whatever.gridList[2].value == "x" && self.whatever.gridList[4].value == "x") && self.whatever.gridList[6].value == ""
			) {
					self.whatever.gridList[6].value == "v"
			}
		else if (
			 (self.whatever.gridList[1].value == "x" && self.whatever.gridList[4].value == "x") && self.whatever.gridList[7].value == ""|| 
			 (self.whatever.gridList[6].value == "x" && self.whatever.gridList[8].value == "x") && self.whatever.gridList[7].value == ""
			) {
					self.whatever.gridList[7].value == "v"
			}
	    else if (
			 (self.whatever.gridList[2].value == "x" && self.whatever.gridList[5].value == "x") && self.whatever.gridList[8].value == ""|| 
			 (self.whatever.gridList[6].value == "x" && self.whatever.gridList[7].value == "x") && self.whatever.gridList[8].value == ""|| 
			 (self.whatever.gridList[0].value == "x" && self.whatever.gridList[4].value == "x") && self.whatever.gridList[8].value == ""
			) {
					self.whatever.gridList[8].value == "v"
			}
		else {
			aiMove();
			
		}
		self.whatever.$save();
	}
	// ([3],[6]) or ([1],[2]) or ([4],[8]) == "x", [0] == "o";
	// ([0],[2]) or ([4],[7]) == "x", [1] == "o" ;
	// ([0],[1]) or ([5],[8]) or ([4],[6]) == "x", [2] == "o";
	// ([0],[6]) or ([4],[5]) == "x", [3] == "o";
	// ([3],[5]) or ([1],[7]) or ([0],[8]) or ([2],[6])  == "x" , [4] == "o";
	// ([2],[8]) or ([3],[4]) == "x", [5] == "o";
	// ([0],[3]) or ([7],[8]) or ([2],[4]) == "x", [6] == "o";
	// ([1],[4]) or ([6],[8]) == "x", [7] == "o";
	// ([2],[5]) or ([6],[7]) or ([0],[4]) == "x", [8] == "o";

	function aiMove() {
		if (self.whatever.gridList[4].value == "") {
			self.whatever.gridList[4].value == "o"
		}
		else if (self.whatever.gridList[0].value == "") {
			self.whatever.gridList[0].value == "o"
		}
		else if (self.whatever.gridList[2].value == "") {
			self.whatever.gridList[2].value == "o"
		}
		else if (self.whatever.gridList[6].value == "") {
			self.whatever.gridList[6].value == "o"
		}
		else if (self.whatever.gridList[8].value == "") {
			self.whatever.gridList[8].value == "o"
		}
		else if (self.whatever.gridList[1].value == "") {
			self.whatever.gridList[1].value == "o"
		}
		else if (self.whatever.gridList[3].value == "") {
			self.whatever.gridList[3].value == "o"
		}
		else if (self.whatever.gridList[5].value == "") {
			self.whatever.gridList[5].value == "o"
		}
		else if (self.whatever.gridList[7].value == "") {
			self.whatever.gridList[7].value == "o"
		}
		else {
			console.log("aiMove")
		}
		self.whatever.$save();
	}

	/*check empty, if 
	check if [4] is empty, if empty, click it.
	if [4] is not empty, check [0],[2],[6],[8] is empty.
	if [0] is empty, click it, if not, click [2], [6], [8] respectively
	if [0], [2], [4], [6], [8] is not empty, put it [1],[3],[5],[7].
		*/
