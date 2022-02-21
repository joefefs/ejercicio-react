import axios from 'axios';
import React, {useState} from 'react'
import payloadOrder from './data/payloadOrder';
import paymentPayload1 from './data/paymentPayload1';
import './App.css';
import paymentPayload2 from './data/paymentPayload2';
import PaymentFrame from './components/PaymentFrame'

function App() {
  const [respuesta, setRespuesta] = useState()
  const [isVissible, setIsVissible] = useState({
      createOrder: true,
      makePayment: false
    })
   
    const [payment, setPayment] = useState(paymentPayload1)
    
    const [iframe, setIFrame] = useState({
      url: "",
      status: "",
      hasSucceed: null,
      error: ""
    })

    const createOrder = ()=> {
      setIsVissible(prevIsVissible => ({
        ...prevIsVissible,
        createOrder: false,
        makePayment: true
      }))
    axios.post('https://giftcardsapidev.azurewebsites.net/api/orders', payloadOrder)
        .then((res) => {
          setRespuesta(res.data.result)
          console.log(JSON.stringify(res.data.result))
       
         setPayment(prevPayment =>({
           ...prevPayment,
           orderId: res.data.object.id
  
         }))
          console.log(res.data.object.id)
        })
       
        .catch(() => {
          setPayment(prevPayment => ({
            ...prevPayment,
            error: 'Error: Partner inválido.'
          }))
         })
    }  
    const makePayment = () => {
  
      setIsVissible(prevIsVissible => ({
        createOrder: false,
        makePayment: false
      }))
        axios.post('https://giftcardsapidev.azurewebsites.net/api/payment', payment)
        .then((res) => {
          setIFrame(prevIFrame => {
            if(res.data.url){ 
               return ({
                 ...prevIFrame,
                  url: res.data.url,
                  status: res.status,
                  hasSucceed: true
                })
        } 
        console.log(prevIFrame)
        })
      })
      .catch((err) =>{
        setIFrame(prevIFrame => {
          return ({
            ...prevIFrame,
            hasSucceed: false,
            error: "Error: Número de órden no disponible."
          })
        })
        console.log(err) 
      })
    }
      let hadSuccess
      if(iframe.hasSucceed === true) {
            console.log(iframe.url)
             hadSuccess =  (
               <PaymentFrame url={iframe.url} />
                )
           
          } else if (iframe.error) {
            hadSuccess = (
              
            <p>{iframe.error}</p>
            )
          }
    
    const passPayload2 = () => {
       setPayment(paymentPayload2)

        // Automáticamente arroja error porque la data de paymentPayload2 está incompleta
              
       console.log(payment)

       const removeIFrame = () => {
           document.getElementById("payment-iframe"). remove();
          }
       removeIFrame();

       axios.post('https://giftcardsapidev.azurewebsites.net/api/payment', payment)
        .then((res)=> {
            console.log(res)
            })
        .catch((err) => {
            setPayment(prevPayment => ({
                ...prevPayment,
                error: true,
                message: "Error al realizar pago con 3DSecure"
              }))
            })
          }
    let hidePaymentBtn
          payment.error 
            ? hidePaymentBtn='callback-page-btn oculto' 
            : hidePaymentBtn= 'callback-page-btn'

    return (
      <div>
      <div className="App">
          <img className={iframe.hasSucceed ? "img oculto" : "img"} src="https://picsum.photos/250" />
          {isVissible.createOrder && (<div>
        <br />
        <button className="create-order" onClick={createOrder}> Crear orden </button></div>)}
        
        {payment.error ? (<p>{payment.error}</p>): null }
        
        {respuesta === 'Success' ? 
          (<div>
              {isVissible.makePayment && 
              <button className="create-order" onClick={makePayment} >Pagar</button>}
          </div>) 
          : null}
        <br />
        <div className="link">
            {iframe.url && 
              <button 
                className={hidePaymentBtn}
                onClick={passPayload2}
              > 
                Callback page
              </button>}
              <div>
                {payment.error && <h3>{payment.message}</h3>}
              </div>
         </div>
          <div className="iframe-container">{hadSuccess}</div>      
      </div>   
      </div>
    );
  }
  
export default App;
