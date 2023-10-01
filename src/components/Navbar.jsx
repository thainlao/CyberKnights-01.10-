import React, {useState} from "react";
import '../styles/firstbody.css';
import '../styles/modal.css';

const Navbar = ({handeModalOpen, isButtonPressed, connected, walletAddress}) => {
      const [animationComplete, setAnimationComplete] = useState({
        0: true,
        1: true,
        2: true,
      });

    return (
        <header className="main_header">
            <div className="header_menu">
                <div 
                onClick={handeModalOpen}
                className={`main_open_button ${isButtonPressed ? "pressed" : ""}`}>
                {isButtonPressed ? (
                  <>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </>
                ) : (
                  <>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </>
                )}
                </div>
                <p className="main_header_sub_text">{isButtonPressed ? 'CLOSE MENU' : 'MENU'}</p>
            </div>
            <h1 className="header_text">C <span className="nav">y</span> B <span className="nav">er</span> K<span className="nav">nights</span></h1>

            <div className="connected">
              {connected ? <p className="wallet">{walletAddress}</p> : <p>YOU ARE NOT CONNECTED</p>}
            </div>
            
        </header>
    )
}

export default Navbar