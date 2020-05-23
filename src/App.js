import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Logo from './images/logo75.png'

function App() {

  const [installPrompt, setInstallPrompt] = useState(null); 
  const [showPwa, setShowPwa] = useState(false); // state to decide whether to show the PWA banner or not
  const [overWriteInstallPrompt, setOverWriteInstallPrompt] = useState(true);

  useEffect(()=>{
    window.addEventListener('beforeinstallprompt',e=>{

      // For older browsers
      e.preventDefault();
      console.log("Install Prompt fired");
      setInstallPrompt(e);
      
      console.log(e);
      // See if the app is already installed, in that case, do nothing
      if((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true){
        return false;
      }
      // Set the state variable to make button visible
      setShowPwa(true);

    })
  },[])

  const installApp = async () => {
    if(!installPrompt) return false;
    
    installPrompt.prompt();
    let outcome = await installPrompt.userChoice;    
    if(outcome.outcome === 'accepted'){
      console.log("App Installed")
    }
    else{
      console.log("App not installed");
    }
    // Hide the button
    setOverWriteInstallPrompt(false);
    
  };

  return (
    <div className="App">
      <header className="App-header">
        <img href="https://www.decrew.in/" target="_blank"  src={Logo} className="App-logo" alt="logo" />
        <p>
        Do you want a team to develop and support your technological innovation and  processes? </p>
        <p>
        <a
          className="App-link"
          href="https://www.decrew.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Decrew
        </a> is your one stop solution to all your tech queries.
        </p>
      </header>
      {
          showPwa && overWriteInstallPrompt ?
            <span id="pwa-banner" className="pwa-banner">
              <button className="pwa-prompt-button" onClick={installApp} >Add DeCrew-PWA to Home Screen</button>
              <span onClick={()=>{document.getElementById("pwa-banner").style.display="none"}} className="pwa-prompt-close">&#10005;</span>
            </span>
            :
            null
        } 
    </div>
  );
}

export default App;
