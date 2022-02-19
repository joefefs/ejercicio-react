import axios from 'axios';
import React, {useState, useEffect} from 'react'
import payloadOrder from './payloadOrder';
import paymentPayload1 from './paymentPayload1';
import './App.css';

function App() {
 
  const [respuesta, setRespuesta] = useState()
  const [pago, setPago] = useState(paymentPayload1)
  const [url, setUrl] = useState()
  const [paso, setPaso] = useState(false)
 
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
     
      // .catch((err) => {
      //   setRespuesta(err.data.result)
      //   console.log(err)
      // })
  }
  
  const handlePayment = () => {
   setPaso(!paso)
    axios.post('https://giftcardsapidev.azurewebsites.net/api/payment', (pago))
    .then((res) => {
      console.log(res.data.url)
      setUrl(res.data.url)
      console.log(url)
        }
      )
      
      
    }
  

  return (
    <div className="App">
      <header className="App-header">
      <button onClick={handleClick}> Crear orden </button>
      <br />
      {JSON.stringify(respuesta)}
      
      {respuesta === 'Success' ? (<div><br /><button onClick={handlePayment} >Pago</button></div>) : null}
      <br />
      {paso === true && <iframe src={url} width="600px" height="500px"></iframe>}
  
      </header>
    </div>
  );
}

export default App;
