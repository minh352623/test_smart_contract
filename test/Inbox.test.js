const ganache = require('ganache');
const { Web3 } = require('web3');
const assert = require('assert');
const  {interface,bytecode} = require('../compile');
// updated ganache and web3 imports added for convenience

// contract test code will go here

const web3 = new Web3(ganache.provider());


let inbox;
let accounts;


beforeEach(async ()=>{
    // car = new Car();

    //lấy tất cả accounts

     accounts =await  web3.eth.getAccounts();
    console.log("🚀 ~ file: Inbox.test.js:29 ~ beforeEach ~ accounts:", accounts)
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data:bytecode,arguments:['Hi there!']})
        .send({from: accounts[0],gas:'1000000'})
})

describe('Inbox', ()=>{
    it('deploy a contract',()=>{
        assert.ok(inbox.options.address);
    })

    it('has a default message',async ()=>{
       const message = await inbox.methods.message().call();
       assert.equal(message,'Hi there!')
    })
    it('change message',async ()=>{
         await inbox.methods.setMessage('bye').send({from : accounts[0]});
         const message = await inbox.methods.message().call();
         assert.equal(message,'bye')
     })

})
