import React from 'react'
import paymentPayload2 from '../paymentPayload2'
import {Link} from 'react-router-dom'

 const CloseCart = (props) => {
    const handleClickClose = (props) =>  {

        
    }
    return(
        <div className='cerrar-pag'>
        <p>¿Deseas cerrar la página?</p>
        <Link onClick={handleClickClose} to="./" >Cerrar</Link>
        <Link to="./">Cancelar</Link>
      </div>
    )
}


export default CloseCart