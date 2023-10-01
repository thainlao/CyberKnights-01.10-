import React, {useEffect, useState} from "react";
import '../styles/firstbody.css';
import Navbar from "./Navbar";
import { ethers, BigNumber } from 'ethers';
import cyberknights from '../cyberknights.json';
import cbk from '../assets/249.png';
import { Tilt } from "react-tilt";
import Modal from "./Modal";
import Connected from "./Connected";
import Loader from "react-loader-spinner";


const Firstbody = () => {
    const latin = 'ABCDEFGHIJK&!{}[]?';
    const nums = '0123456789';
    const alphabetString = latin + nums;

    const handleMouseOver = (event, index) => {
        if (!animationComplete[index]) return;
    
        let iteration = 0;
        setAnimationComplete(prevState => ({ ...prevState, [index]: false }));
    
        const interval = setInterval(() => {
          event.target.innerText = event.target.innerText
            .split("")
            .map((letter, idx) => {
              if (idx < iteration) {
                return event.target.dataset.value[idx];
              }
    
              return alphabetString.charAt(Math.floor(Math.random() * alphabetString.length));
            })
            .join("");
    
          if (iteration >= event.target.dataset.value.length) {
            clearInterval(interval);
            setAnimationComplete(prevState => ({ ...prevState, [index]: true }));
          }
    
          iteration += 1 / 3;
        }, 15);
      };
    
      const handleMouseOut = (event, index) => {
        if (!animationComplete[index]) return;
        event.target.innerText = event.target.dataset.value;
      };
    
      const [animationComplete, setAnimationComplete] = useState({
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true,
        10: true,
      });
      
      const [modalOpen, setIsModalOpen] = useState(false);
      const [isButtonPressed, setIsButtonPressed] = useState(false);
      const [loading, setLoading] = useState(false);

      const handeModalOpen = () => {
        setIsModalOpen(!modalOpen);
        setIsButtonPressed(!isButtonPressed);
      }

      /* MINTING SECTION*/

      const contractAddress = "0x4CbE83D9F8966F55c77Bcd60E715E05D7316D971"
      let provider;
      if (typeof window.ethereum !== 'undefined') {
        provider = new ethers.providers.Web3Provider(window.ethereum);
      } else {
        provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/86b3413b9eb14208a976db6620ac9f9a');
      }
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, cyberknights.abi, signer);

      const [connected, setConnected] = useState(false);
      const [walletAddress, setWalletAddress] = useState("");

      async function connectWallet() {
        try {
          setLoading(true); // Устанавливаем loading в true перед началом операции
      
          if (window.ethereum) {
            const accounts = await window.ethereum.request({
              method: 'eth_requestAccounts',
            });
            const walletAddress = accounts[0];
            const formattedWalletAddress = `${walletAddress.substring(0, 4)}...${walletAddress.substring(walletAddress.length - 4)}`;
            setConnected(true);
            setWalletAddress(formattedWalletAddress);
          } else {
            console.error("Ethereum provider is not available");
          }
        } catch (error) {
          console.error("Error connecting wallet:", error);
          // Обработка ошибок
        } finally {
          setLoading(false); // Устанавливаем loading в false после завершения операции (успешной или с ошибкой)
        }
      }

    return (
        <div className="main_body">
          <div className="bluebox"></div>
          <div className="anotherbox"></div>
        <Navbar walletAddress={walletAddress} connected={connected} setConnected={setConnected} handeModalOpen={handeModalOpen} isButtonPressed={isButtonPressed}/>
        {connected ? (
           <Connected />
          ) : (
            <div className="center_body">
              <p className="main_text_sign">New history of the blockchain paradigm is being created</p>
              <div className="words">
                <h1 className="main_text">CYBER</h1>
                <h2 className="main_text_word">KNIGHTS</h2>

              </div>
              <div className="buttons">
                <button
                  onMouseOver={e => handleMouseOver(e, 0)}
                  onMouseOut={e => handleMouseOut(e, 0)}
                  className="connect_wallet_button"
                  data-value='CONNECT WALLET'
                  onClick={connectWallet}
                >
                  CONNECT WALLET
                </button>
              </div>
            </div>
          )}

            {modalOpen && (
              <Modal />
            )}
        </div>
    );
}

export default Firstbody;