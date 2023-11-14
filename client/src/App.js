import './App.css';
import { ethers } from 'ethers';
import Upload from './artifacts/contracts/Upload.sol/Upload.json';
import {useState,useEffect} from "react";
import Modal from './components/Modal';
import FileUpload from './components/fileupload';
import Display from './components/display';
function App() {
  const [account,setAccount] = useState("");
  const [provider,setProvider] = useState(null);
  const [contract,setContract] = useState(null);
  const [modalOpen,setModalOpen] =useState(false);
  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    const loadProvider=async()=>{
      if (provider){
        window.ethereum.on('chainChanged', () => window.location.reload());
        window.ethereum.on('accountsChanged', () => window.location.reload());
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        console.log(signer);
        const account =await signer.getAddress();
        console.log(account);
        setAccount(account);
        let contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
        // let key = contractAddres s.privateKey();
        // console.log(key);
        const contract = new ethers.Contract(contractAddress,Upload.abi,signer);
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      }else{
        console.error("metamask is not installed");
      }
    }
    provider && loadProvider();
  },[]);
  return (<>
    {!modalOpen && (
      <button className="share" onClick={() => setModalOpen(true)}>
        Share
      </button>
    )}

    {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}
    <div className="App">
      <h1 style={{color:"white"}}>G Drive</h1>
      <div class='bg'></div>
      <div class='bg bg2'></div>
      <div class='bg bg3'></div>
      <p style={{color:"white"}}>
        Account : {account?account:"not connected"}
      </p>
      <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
      <Display account={account} contract={contract}></Display>
    </div>
    </>
  );
}

export default App;
