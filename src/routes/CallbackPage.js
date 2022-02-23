import React, {useEffect} from 'react'

const CallbackPage = () => {
  useEffect(()=> {
    window.top.postMessage('3DS-authentication-complete');
  },[])

  return(
    <div className="App">
         <h2 className="callback-page">This is the callbackpage</h2>
        
    </div>
  )
  }

export default CallbackPage