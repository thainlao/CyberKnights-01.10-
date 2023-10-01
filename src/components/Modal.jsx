import React, {useState} from "react";

const Modal = () => {
    const latin = 'ABCDEFGHIJK&!{}[]?';
    const nums = '0123456789';
    const alphabetString = latin + nums;
    const [loading, setLoading] = useState(false);

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

    return (
        <div>
            <div className="modal">
                <div className="modal_content">
                  <div className="modal_section_left">
                    <p onMouseOver={e => handleMouseOver(e, 2)} onMouseOut={e => handleMouseOut(e, 2)} data-value='VERY SOON' className="modal_text">VERY SOON</p>
                    <p onMouseOver={e => handleMouseOver(e, 3)} onMouseOut={e => handleMouseOut(e, 3)} data-value='CYBERKNIGHTS' className="modal_text">CYBERKNIGHTS</p>
                    <p onMouseOver={e => handleMouseOver(e, 4)} onMouseOut={e => handleMouseOut(e, 4)} data-value='WILL CHANGE NFT WORLD' className="modal_text">WILL CHANGE</p>
                    <p onMouseOver={e => handleMouseOver(e, 4)} onMouseOut={e => handleMouseOut(e, 5)} data-value='NFT WORLD' className="modal_text">NFT WORLD</p>
                    <p className="modal_text_colored">STORE</p>
                    <p className="modal_text_colored">TREASURE</p>
                    <p className="modal_text_colored">STACKING</p>
                    <p className="modal_text_colored">MARKETPLACE</p>
                  </div>

                  <div className="right_section">
                  <div className="modal_section_right">
                    <p className="modal_text_right_title">CBK</p>
                    <p className="modal_text_right">ABOUT</p>
                    <p className="modal_text_right">FAQS</p>
                    <p className="modal_text_right">RESOURCES</p>
                    <p className="modal_text_right">CAREERS</p>
                    <p className="modal_text_right">MECH_STYLES</p>
                    <p className="modal_text_right">MECH INFO</p>
                    <p className="modal_text_right">LORE</p>
                    <p className="modal_text_right">GUIDE</p>
                  </div>

                  <div className="modal_section_right_social">
                    <p className="modal_text_right_title">SOCIAL</p>
                    <p className="modal_text_right">DISCORD</p>
                    <p className="modal_text_right">TWITTER</p>
                    <p className="modal_text_right">YOUTUBE</p>
                    <p className="modal_text_right">INSTAGRAM</p>
                    <p className="modal_text_right">SUBSTACK</p>
                  </div>

                    <button 
                    onMouseOver={e => handleMouseOver(e, 9)}
                    onMouseOut={e => handleMouseOut(e, 9)} 
                    data-value='SUBSCRIBE ON SUBSTACK'
                    className="sub">SUBSCRIBE ON SUBSTACK</button>
                    <p className="modal_text_right_title">MARKETPLACE</p>
                    <button 
                    onMouseOver={e => handleMouseOver(e, 1)}
                    onMouseOut={e => handleMouseOut(e, 1)} 
                    className="body_button"
                    data-value='CYBERKNIGHTS ON OPENSEA'
                    >CYBERKNIGHTS ON OPENSEA
                </button>
                  </div>
                </div>
              </div>
        </div>
    )
}

export default Modal;