import React, {useState, useEffect} from 'react'
import axios from 'axios';
import payloadOrder from '../payloadOrder';
import paymentPayload1 from '../paymentPayload1';
import paymentPayload2 from '../paymentPayload2';
import {Link, useNavigate} from 'react-router-dom'


const CallbackPage = (props) => {
  const [pago2, setPago2] = useState({})
  useEffect(()=> {

  },[])
  console.log('callback page')
  return(
    <div>
      <h1>CallbackPage</h1>
    </div>
  )
  }


export default CallbackPage