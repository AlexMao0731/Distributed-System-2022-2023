pragma solidity >=0.6.0 < 0.9.0;

contract voteing_system {
    address[] voter_list;
    address public owner = msg.sender;
    int winner = -1;
    struct Candidate {
      string name;
      uint ballot;
   }
   constructor()  {
        register("Imam Sudarshan");
        register("Samuil Markos");
        register("Ami Sergejs");
    }

   Candidate[] candidate_list;
   

   function register(string memory _name) public {
       candidate_list.push(Candidate({name: _name, ballot: 0}));
   }

   function vote(uint num) external {
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

   function show() external {
       require(owner == msg.sender);
       uint max = 0;
       for(uint i = 0; i < candidate_list.length; ++i) {
           if (candidate_list[i].ballot > max) {
               max = candidate_list[i].ballot;
               winner = int(i);
           }
           candidate_list[i].ballot = 0;
       }
       delete voter_list;

   }

   function get_winner() external view returns(int) {
       require(owner == msg.sender);
       return winner;
   }


   
   
}