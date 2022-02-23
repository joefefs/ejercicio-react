import React, { useEffect } from "react";

const CallbackPage = () => {
  useEffect(() => {
    window.top.postMessage("3DS-authentication-complete");
  }, []);

  setTimeout(() => window.close(), 2000);

  return (
    <div className="App">
      <h2 className="callback-page">This is the callbackpage.</h2>
    </div>
  );
};

export default CallbackPage;
