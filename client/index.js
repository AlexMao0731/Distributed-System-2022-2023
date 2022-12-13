import Web3 from 'web3';
// import configuration from '../build/contracts/Tickets.json';
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
const test = configuration.networks;

// const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ADDRESS = "0xc0c4aaBf7D42c81ab8Dc4ae9D801c08494F06566";
const CONTRACT_ABI = configuration.abi;
// console.log(test);

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
// var button = document.getElementById("button");

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

// const Show_result = async () => {
//   const winner = await contract.methods.show().call();
//   alert("Winner is " + winner);

// };
// let btn = document.createElement("button");
// btn.innerHTML = "Save";
// btn.onclick = function () {
//   alert("Button is clicked");
// };
// document.body.appendChild(btn);


const main = async () => {
  const accounts = await web3.eth.requestAccounts();
  account = accounts[0];
  accountEl.innerText = account;
  await all_candidates();
  
};

main();
