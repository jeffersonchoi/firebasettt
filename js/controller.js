angular
    .module('firettt')
    .controller("MainController", mainController)

    mainController.$inject = ['$firebaseObject'];

    function mainController($firebaseObject) {

        var self = this;
        self.counter = 1;
        self.decidePlayerMove = decidePlayerMove;
        self.nameChange = nameChange;

        self.playerOne = "Player 1";
        self.playerTwo = "Player 2";
        self.showName = true;
        self.playerOneScore = 0;
        self.playerTwoScore = 0;
        
        self.whatever = whatever();

         //Function to connect with firebase
        function whatever() {
            var ref = new Firebase("https://jeffersonttt.firebaseio.com/");
            var what = $firebaseObject(ref);
            return what;
            
                
        }
        self.whatever.$loaded(function() {
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
            self.showName = !self.showName;
        }

        // /*
        // Function to decide player turns
        // Odd number to determine Player 1 's move = "o"
        // Even number to determine Player 2 's move = "x"
        // */
        function decidePlayerMove($index) { 
        	console.log(self.whatever.gridList[$index].value);                   
            if (
                self.counter % 2 !== 0  
                && self.whatever.gridList[$index].value == ""
            ) {
	            console.log(self.whatever.gridList[$index])
	            self.counter++;
	            self.whatever.gridList[$index].value = "o";
	            console.log(self.whatever.gridList[$index].value)
            } else if (
                self.counter % 2 == 0 
                && self.whatever.gridList[$index].value == ""
            ) {
            	console.log(self.whatever.gridList[$index])
                self.counter++;
                self.whatever.gridList[$index].value = "x";
               console.log(self.whatever.gridList[$index].value+"123a")
            }
            self.whatever.$save();
        }








}