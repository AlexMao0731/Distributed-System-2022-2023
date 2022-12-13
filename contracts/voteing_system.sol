pragma solidity >=0.6.0 < 0.9.0;

contract voteing_system {
    address[] public voter_list;
    address public owner = msg.sender;
    struct Candidate {
      string name;
      uint ballot;
   }
   constructor()  {
        register("Imam Sudarshan");
        register("Samuil Markos");
        register("Ami Sergejs");
    }

   Candidate[] public candidate_list;
   

   function register(string memory _name) public {
       candidate_list.push(Candidate({name: _name, ballot: 0}));
   }

   function vote(uint num) public {
       require(check(msg.sender)!= true);
       voter_list.push(msg.sender);
       candidate_list[num].ballot += 1;
   }

   function check(address _voter) internal view returns(bool){
       for (uint i=0; i < voter_list.length; ++i) {
           if (voter_list[i] == _voter) {
               return true;
           }
       }
       return false;
   }

   function show() external payable returns(uint){
       require(owner == msg.sender);
       uint max = 0;
       uint winner = 0;
       for(uint i = 0; i < candidate_list.length; ++i) {
           if (candidate_list[i].ballot > max) {
               max = candidate_list[i].ballot;
               winner = i;
           }
           candidate_list[i].ballot = 0;
       }
       delete voter_list;

       return winner;

    

   }


   
   
}