import React, {useEffect, useState} from "react";
import '../styles/firstbody.css';
import Navbar from "./Navbar";
import { ethers, BigNumber } from 'ethers';
import cyberknights from '../cyberknights.json';
import cbk from '../assets/249.png';
import cbk1 from '../assets/322.png';
import cbk2 from '../assets/248.png';
import { Tilt } from "react-tilt";
import { Audio } from "react-loader-spinner";


const photos = [cbk, cbk1, cbk2];

const Connected = () => {
    const contractAddress = "0x4CbE83D9F8966F55c77Bcd60E715E05D7316D971"
    let provider;
    if (typeof window.ethereum !== 'undefined') {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    } else {
      provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/86b3413b9eb14208a976db6620ac9f9a');
    }
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, cyberknights.abi, signer);


    const [quantity, setquantity] = useState(1);
    const [totalMinted, setTotalMinted] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const maxMinted = 500;
    const latin = 'ABCDEFGHIJK&!{}[]?';
    const nums = '0123456789';
    const alphabetString = latin + nums;

    const [currentPhoto, setCurrentPhoto] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        
        setCurrentPhoto((prevPhoto) => (prevPhoto + 1) % photos.length);
      }, 5000); 
  
      return () => {
        clearInterval(interval); 
      };
    }, []);

    function getSumma() {
        const result = (0.005 * quantity).toFixed(4);

        if (result === 0.005) {
          return result
        }

        if (result.endsWith('00')) {
          return result.slice(0, -2);
        } else if (result.endsWith('0')) {
          return result.slice(0, -1);
        }
      }

        async function getTotalTokensMinted() {
          const totalTokensMinted = await contract.getTotalTokensMinted();
          return totalTokensMinted.toNumber();
        }

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

        const mintToken = async () => {
          try {
            setLoading(true);
            const connection = contract.connect(signer);
            const addr = connection.address;
            const response = await contract.mint(BigNumber.from(quantity), {
              value: ethers.utils.parseEther(('0.005' * quantity).toString()),
            });
            console.log("response: ", response);
        
          } catch (error) {
            const errorMessage = error.message || '';
            if (errorMessage.includes("user rejected transaction")) {
              setError("You rejected transaction");
            } else {
              const match = errorMessage.match(/reason="execution reverted: ([^"]*)"/);
              if (match && match[1]) {
                setError(match[1]);
              } else {
                setError('Something went wrong...');
              }
            }
          } finally {
            setLoading(false);
          }
        }

        const handleDecrement = () => {
          if (quantity <= 1) return;
          setquantity(quantity - 1);
        };
      
        const handleIncrement = () => {
          if (quantity >= 50) return;
          setquantity(quantity + 1);
        };
    
        const displayTotalTokens = `${totalMinted}/${maxMinted}`;
        const displayStatus = totalMinted === maxMinted ? "Sold Out" : displayTotalTokens
    
        useEffect(() => {
          const intervalId = setInterval(async () => {
            const newTotalMinted = await getTotalTokensMinted();
            setTotalMinted(newTotalMinted);
          }, 3000);
          return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
        <div className="center_body_connected">
            <div className="words">
              <div className="connected_img">
              <p className="main_text_sign_connected">New history of the blockchain paradigm is being created</p>

             
                <Tilt
                  className="tilt-effect"
                  options={{
                    max: 25,
                    scale: 1.0099,
                    speed: 1000,
                  }}
                >
                  <img 
                  key={currentPhoto}
                  src={photos[currentPhoto]} 
                  alt="cbk" 
                  className="cbk_img" />
                </Tilt>
                </div>
            </div>

            <div className="connected_sec">

            <div className='connected_text'>Total Minted: {displayStatus}</div> 

              <div className="connected_text">Price: {getSumma()}</div>

              <div className="buttons">
              <button className="incre" onClick={handleDecrement}>-</button>
              <input readOnly className='inputread' type="number" value={quantity} />
              <button className="incre" onClick={handleIncrement}>+</button>
              </div>

              {loading ? (
                <div className="loading"></div>
            ) : (
              <button
                onMouseOver={e => handleMouseOver(e, 0)}
                onMouseOut={e => handleMouseOut(e, 0)}
                className="mint_button"
                data-value='MINT KNIGHT'
                onClick={mintToken}
              >
                MINT KNIGHT
              </button>
            )}

              <div className="connected_text">You can Mint 30 per wallet</div>
              <div className="error">{error}</div>

            </div>
 
          </div>
        </div>
    )
}

export default Connected