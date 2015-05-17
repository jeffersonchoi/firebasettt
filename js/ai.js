/*AI winlogic

[0],[1],[2]
[3],[4],[5]
[6],[7],[8]

player clicks computer button to initiate whatever.aiHere = true, also initiate the aiCheckTurn function. 
*/












	//1. if even number, computer move.

     

        	

	            

            








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

	