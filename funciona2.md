import axios from 'axios';
import React, {useState, useEffect} from 'react'
import payloadOrder from './payloadOrder';
import paymentPayload1 from './paymentPayload1';
import './App.css';
import {BrowserRouter, Routes, Route, Link } from "react-router-dom"
import paymentPayload2 from './paymentPayload2';
import PaymentFrame from './components/PaymentFrame';

function App() {
 
  const [respuesta, setRespuesta] = useState()
  const [pago, setPago] = useState(paymentPayload1)
  const [url, setUrl] = useState({
    url: "",
    status: "",
    hasSucceed: null,
    error: ""
  })
  const [cart, setCart] = useState(false)
  let isVissible = true
  const handleClick = ()=> {
    isVissible = false
  axios.post('https://giftcardsapidev.azurewebsites.net/api/orders', payloadOrder)
      .then((res) => {
        setRespuesta(res.data.result)
        console.log(JSON.stringify(res.data.result) + " respuesta")
     
       setPago(prevPago =>({
         ...prevPago,
         orderId: res.data.object.id

       }))
        console.log(res.data.object.id)
      })
     
      .catch(() => {
        setPago(prevPago => ({
          ...prevPago,
          error: 'Hubo un error: 400 - Bad request.'
        }))
       })
  }
  
  const handlePayment = () => {
      axios.post('https://giftcardsapidev.azurewebsites.net/api/payment', pago)
      .then((res) => {
       
        setUrl(prevUrl => {
          if(res.data.url){ 
             return ({
               ...prevUrl,
                url: res.data.url,
                status: res.status,
                hasSucceed: true
              })
      } 
      console.log(prevUrl)
      })
      
    })
    .catch((err) =>{
      setUrl(prevUrl => {
        return ({
          ...prevUrl,
          hasSucceed: false,
          error: "Hubo un error: 400 - Bad request."
        })
      })
      console.log(err)
      
    })
  }

    let hadSuccess
    if(url.hasSucceed === true) {
          hadSuccess = (<PaymentFrame url={url}/>)
         
        } else if (url.error) {
          hadSuccess = (
            

          <p>{url.error}</p>
          )
        }
  
  const handleLink = () => {
    setCart(prevCart => !prevCart)
    console.log("cliked")
  }

  const closeClosingWindow = () => {
    console.log("click continue")
    setCart(prevCart => !prevCart)

  }
  const closePaymentWindow = () => {
    console.log("close Pay")
    setUrl({
      url: "",
    status: "",
    hasSucceed: null,
    error: ""
    })
    setCart(prevCart => !prevCart)
  }

  const pagoUpdate = () => {
    setPago(prevPago => {
      return ({
        ...prevPago,
        orderId: paymentPayload2.orderId
      })
    })
  }
  return (
    <div className="App">
    
      {isVissible && <button className="create-order" onClick={handleClick}> Crear orden </button>}
      <br />
      {pago.error ? (<p>{pago.error}</p>): null }
      
      {respuesta === 'Success' ? (<div><br /><button className="create-order" onClick={handlePayment} >Pago</button></div>) : null}
      <br />
      {url.url && 
        <Link 
          to="/cart/callback"
          > Cart
        </Link>}
      
      {hadSuccess}  
    </div>
  );
}

export default App;
