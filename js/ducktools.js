const Web3 = require('web3')

    const ethereumButton = document.querySelector('.enableEthereumButton');

    ethereumButton.addEventListener('click', () => {
      //Will Start the metamask extension
      ethereum.request({ method: 'eth_requestAccounts' });
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
          userAccount = await ethereum.request({ method: 'eth_accounts' })
          // Call some function to update the UI with the new account
          getDucksByOwner().then(displayDucks);
        
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



