pragma solidity >=0.6.0 <0.9.0;

contract voting_system {
    address[] voter_list;
    address public owner = msg.sender;
    int256 winner = -1;

    struct Candidate {
        string name;
        uint256 ballot;
    }

    struct Voter {
        string name;
        bool voted;
        address voter_address;
    }

    constructor() {
        register("Imam Sudarshan");
        register("Samuil Markos");
        register("Ami Sergejs");
    }

    Candidate[] candidate_list;
    Voter[] public voter_roll;

    function register(string memory _name) public {
        candidate_list.push(Candidate({name: _name, ballot: 0}));
    }

    function voter_registration(string memory _name) public {
        require(check(msg.sender) == true);
        voter_roll.push(
            Voter({name: _name, voted: false, voter_address: msg.sender})
        );
    }

    function vote(uint256 num) external {
        require(check(msg.sender) == true);
        voter_list.push(msg.sender);
        candidate_list[num].ballot += 1;
    }

    function check(address _voter) internal view returns (bool) {
        bool _in_voter_roll = false;
        bool _has_voted = false;

        for (uint256 i = 0; i < voter_roll.length; i++) {
            if (voter_roll[i].voter_address == _voter) {
                _in_voter_roll = true;
            }
        }

        for (uint256 j = 0; j < voter_list.length; j++) {
            if (voter_list[j] == _voter) {
                _has_voted = true;
            }
        }
        if(_in_voter_roll && !_has_voted)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function show() external {
        require(0 < voter_list.length);
        require(owner == msg.sender);
        uint256 max = 0;
        for (uint256 i = 0; i < candidate_list.length; ++i) {
            if (candidate_list[i].ballot > max) {
                max = candidate_list[i].ballot;
                winner = int256(i);
            }
            candidate_list[i].ballot = 0;
        }
        delete voter_list;
    }

    function get_winner() external view returns (int256) {
        require(owner == msg.sender);
}
}