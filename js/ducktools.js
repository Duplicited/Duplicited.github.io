const Web3 = require('web3')

window.addEventListener('load', () => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
     if (window.ethereum) {
       const web3 = new Web3(window.ethereum);
       try {
         // Request account access if needed
         await window.ethereum.enable();
         // Accounts now exposed
         return web3;
       } catch (error) {
         console.error(error);
       }
     }
     else if (window.web3) {
        // Use MetaMask/Mist's provider.
        const web3 = window.web3;
        console.log('Injected web3 detected.');
        return web3;
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
        const web3 = new Web3(provider);
        console.log('No web3 instance injected, using Local web3.');
        return web3;
      }

      startApp()
    });
  

var ducks;
var userAccount;

function startApp(){
    var DuckButtNFTAddress = "0xbeF875581A281EFB2FA893C9Eb01E1dB3bd8208A";
    ducks = new web3js.eth.Contract([
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "duckId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "dna",
                    "type": "uint256"
                }
            ],
            "name": "NewDuck",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "createFirstDuck",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "ducks",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "dna",
                    "type": "uint256"
                },
                {
                    "internalType": "uint32",
                    "name": "level",
                    "type": "uint32"
                },
                {
                    "internalType": "uint32",
                    "name": "readyTime",
                    "type": "uint32"
                },
                {
                    "internalType": "uint16",
                    "name": "winCount",
                    "type": "uint16"
                },
                {
                    "internalType": "uint16",
                    "name": "lossCount",
                    "type": "uint16"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ], DuckButtNFTAddress);

    var accountInterval = setInterval(function() {
        // Check if account has changed
        if (web3.eth.accounts[0] !== userAccount) {
          userAccount = web3.eth.accounts[0];
          // Call some function to update the UI with the new account
          updateInterface().then(displayDucks);
        }
    }, 100);
}

function displayDucks(ids) {
    $("#ducks").empty();
    for (id of ids) {
      // Look up zombie details from our contract. Returns a `zombie` object
      getDuckDetails(id).then(function(duck) {
        // Using ES6's "template literals" to inject variables into the HTML.
        // Append each one to our #zombies div
        $("#ducks").append(`<div class="duck">
          <ul>
            <li>Name: ${duck.name}</li>
            <li>DNA: ${duck.dna}</li>
            <li>Level: ${duck.level}</li>
            <li>Wins: ${duck.winCount}</li>
            <li>Losses: ${duck.lossCount}</li>
            <li>Ready Time: ${duck.readyTime}</li>
          </ul>
        </div>`);
      });
    }
  }

function getDuckDetails(id) {
    return DuckButtNFTAddress.methods.ducks(id).call()
}

function duckToOwner(id) {
    return DuckButtNFTAddress.methods.duckToOwner(id).call
}

function getDucksByOwner(owner) {
    return DuckButtNFTAddress.methods.getDucksByOwner(owner).call();
}



