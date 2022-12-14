import Web3 from 'web3';
import configuration from '../build/contracts/voteing_system.json';
import 'bootstrap/dist/css/bootstrap.css';
import cowboy1 from './images/cowboy1.png';
import cowboy2 from './images/cowboy2.png';
import cowboy3 from './images/cowboy3.png';


const createElementFromString = (string) => {
  const el = document.createElement('div');
  el.innerHTML = string;
  return el.firstChild;
};


const CONTRACT_ADDRESS = configuration.networks[5777].address;
const CONTRACT_ABI = configuration.abi;


const web3 = new Web3(
  Web3.givenProvider || 'http://127.0.0.1:7545'
);
const contract = new web3.eth.Contract(
  CONTRACT_ABI,
  CONTRACT_ADDRESS
);


let account;

const accountEl = document.getElementById('account');
const candidatesEl = document.getElementById('tickets');


const Voting = async (num) => {
  await contract.methods.vote(num).send({from: account});
};

const all_candidates = async () => {
  candidatesEl.innerHTML = ''; 
  const candidates1 = createElementFromString(
    `<div class="ticket card" style="width: 18rem;">
      <img src="${cowboy1}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Imam Sudarshan</h5>
        <p class="card-text">${
          "Almost destory the world"
        } </p>
        <button class="btn btn-primary">Vote</button>
      </div>
    </div>`
  );
  candidates1.onclick = Voting.bind(null, 0);

  candidatesEl.appendChild(candidates1);
  const candidates2 = createElementFromString(
    `<div class="ticket card" style="width: 18rem;">
      <img src="${cowboy2}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Samuil Markos</h5>
        <p class="card-text">${
          "Save the world"
        } </p>
        <button class="btn btn-primary">Vote</button>
      </div>
    </div>`
  );
  candidates2.onclick = Voting.bind(null, 1);
  candidatesEl.appendChild(candidates2);
  const candidates3 = createElementFromString(
    `<div class="ticket card" style="width: 18rem;">
      <img src="${cowboy3}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Ami Sergejs</h5>
        <p class="card-text">${
          "Burger for lunch"
        } </p>
        <button class="btn btn-primary">Vote</button>
      </div>
    </div>`
  );
  candidates3.onclick = Voting.bind(null, 2);
  candidatesEl.appendChild(candidates3);
};


let btn = document.getElementById("result_button");
btn.onclick = async () => {
    await contract.methods.show().send({from: account});
    var winner = await contract.methods.get_winner().call();
    console.log(winner);
    if (winner == -1) {
      alert("Nobody vote");
    }
    else{
      alert("Winner is " + winner);
    }
    
};



const main = async () => {
  const accounts = await web3.eth.requestAccounts();
  account = accounts[0];
  accountEl.innerText = account;
  await all_candidates();
  
};

main();
