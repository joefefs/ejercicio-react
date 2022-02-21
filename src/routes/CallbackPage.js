import React, {useState, useEffect} from 'react'
import axios from 'axios';
import payloadOrder from '../data/payloadOrder';
import paymentPayload1 from '../paymentPayload1';
import paymentPayload2 from '../paymentPayload2';
import {Link, useNavigate} from 'react-router-dom'


const CallbackPage = (props) => {

  console.log('callback page')
  return(
    <div>
      <div>
          {/* {payment.error && <h3>{payment.message}</h3>} */}
      </div>
    </div>
  )
  }


export default CallbackPage