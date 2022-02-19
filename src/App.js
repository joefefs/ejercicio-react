import axios from 'axios';
import React, {useState, useEffect} from 'react'
import payloadOrder from './payloadOrder';
import paymentPayload1 from './paymentPayload1';
import './App.css';
import {BrowserRouter, Routes, Route, Link } from "react-router-dom"

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
 
  const handleClick = ()=> {
  axios.post('https://giftcardsapidev.azurewebsites.net/api/orders', payloadOrder)
      .then((res) => {
        setRespuesta(res.data.result)
        console.log(res.data.result)
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
          hadSuccess = (<iframe src={url.url} width="600px" height="500px"></iframe>)
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
  return (
    <div className="App">
      <header className="App-header">
      
      <button onClick={handleClick}> Crear orden </button>
      <br />
      {pago.error ? (<p>{pago.error}</p>): null }
      
      {respuesta === 'Success' ? (<div><br /><button onClick={handlePayment} >Pago</button></div>) : null}
      <br />
      {url.url && 
        <Link 
          to="/cart/callback"
          onClick={handleLink}>
          Cart
        </Link>}
      {cart && <div className='cerrar-pag'>
        <p>¿Deseas cerrar la página?</p>
        <button onClick={closePaymentWindow}>Cerrar</button>
        <button onClick={closeClosingWindow}>Cancelar</button>
      </div>}
      {hadSuccess}  
    
      </header>
    </div>
  );
}

export default App;
