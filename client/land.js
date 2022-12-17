import Web3 from 'web3';
import configuration from '../build/contracts/voting_system.json';
import 'bootstrap/dist/css/bootstrap.css';

const createElementFromString = (string) => {
    const el = document.createElement('div');
    el.innerHTML = string;
    return el.firstChild;
  };

const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;


const web3 = new Web3(
  Web3.givenProvider || 'http://127.0.0.1:7545'
);
const contract = new web3.eth.Contract(
  CONTRACT_ABI,
  CONTRACT_ADDRESS
);

let account;

const registerEl = document.getElementById('register');

const registerVoterElement = async () => {
    registerEl.innerHTML = ''; 
    const registerElement = createElementFromString(
      `<form name="register" method="post" >  
      Voter Name: <input type="text" name="name"><br/>
      <input type="submit" value="register">  
      </form> `
    );
    registerElement.onclick = voterRegistration.bind(null);
  
    registerEl.appendChild(registerElement);
        }


const Register = async (name) => {
    await contract.methods.voter_registration(name).send({from: account});
  };


const voterRegistration = async () => {
    var name=document.register.name.value;
    alert(name);
    if (name==null || name==""){  
      alert("Name can't be blank");  
      return false;  
    }
  await Register(name);
}

  const validateForm = async () => {   
    
  };

  const main = async () => {
    const accounts = await web3.eth.requestAccounts();
    account = accounts[0];
    await registerVoterElement();
  };
  
  main();
