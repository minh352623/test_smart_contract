const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { interface, bytecode } = require('./compile');

//updated web3 and hdwallet-provider imports added for convenience

// deploy code will go here

const provider = new HDWalletProvider(
    'sheriff luxury reform brush just oyster heavy code talk market weird mail',
    // remember to change this to your own phrase!
    'https://sepolia.infura.io/v3/f9b06b6119c74aff9346da7a39863aa6'
    // remember to change this to your own endpoint!
  );
  const web3 = new Web3(provider);
  
  const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
  
    console.log('Attempting to deploy from account', accounts[0]);
  
    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: ['Hi there!'] })
      .send({ gas: '1000000', from: accounts[0] });
  
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
  };
  deploy();
