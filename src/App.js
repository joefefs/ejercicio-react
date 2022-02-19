import axios from 'axios';
import React, {useState, useEffect} from 'react'
import payloadOrder from './payloadOrder';
import paymentPayload1 from './paymentPayload1';
import './App.css';

function App() {
 
  const [respuesta, setRespuesta] = useState()
  const [pasarPago, setPasarPago] = useState()
 
  const handleClick = ()=> {
  const place = axios.post('https://giftcardsapidev.azurewebsites.net/api/orders', payloadOrder)
      .then((res) => {
        setRespuesta(res.data.result)
        console.log(res.data.result)
      })
      // .catch((err) => {
      //   setRespuesta(err.data.result)
      //   console.log(err)
      // })
  }
  
  // const handlePayment = () => {
  //   const place2 = axios.post('https://giftcardsapidev.azurewebsites.net/api/payment', JSON.parse(paymentPayload1.orderId))
  //   .then((res) => {
  //     setPasarPago(res)
  //     console.log(JSON.stringify(pasarPago.orderId) + " clicked")
  //   })
  // }

  return (
    <div className="App">
      <header className="App-header">
      <button onClick={handleClick}> Crear orden </button>
      <br />
      {JSON.stringify(respuesta)}
      
      {respuesta === 'Success' ? (<div><br /><button >Pago</button></div>) : null}
  
      </header>
    </div>
  );
}

export default App;
