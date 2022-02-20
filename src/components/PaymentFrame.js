import React from 'react'

 const PaymentFrame =(props) => {
return(
    (<iframe src={props.url.url} width="600px" height="500px"></iframe>)
)
}

export default PaymentFrame