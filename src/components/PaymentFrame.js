import React from 'react'

 const PaymentFrame = (props) => {
  
    return (
       <div>
          <iframe 
              id="payment-iframe" 
              title="payment-window" 
              src={props.url} 
              width="600px" 
              height="500px">
          </iframe>
        </div>
    )
}

export default PaymentFrame