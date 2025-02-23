import React from 'react'
import { SpinnerDiamond} from 'spinners-react'
import "./Loader.scss"


const Loader = (props) => {
  return (
    <div className='loading'>

  <SpinnerDiamond size={50} thickness={100} speed={100} color="#800026" secondaryColor="rgba(0, 0, 0, 0.44)" />
  <h2>{props.title}</h2>
  <img src={props.src} alt={props.alt}/>
    </div>
  )
}

export default Loader