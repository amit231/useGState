import * as React from 'react';
import useGState from 'usegstate'

import {gState,GStateProvider} from 'usegstate'

const nameGState = gState('G')
const ageGState = gState(12)
const isMaleGState = gState(false)

const Test = () => {
  return (
    <GStateProvider>
      <Client />
    </GStateProvider>
  )
}

export {Test}
const Client = () => {
  return (
    <div style={{display:'grid',placeItems:'center',height:'100vh',background:'grey'}}>

   <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Name />
    <Age />
    <Gender />
   </div>
    </div>
  )
}
const Name = () => {
  const [getter, setter] = useGState(nameGState)
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'10px',border:'1px solid black',borderRadius:'4px',margin:'auto'}}>
      <input
      style={{color:'black'}}
        value={getter}
        onChange={(e) => {
          setter(e.target.value)
        }}
        autoFocus={true}
      ></input>
     <NameGetter />
     <AgeGetter />
    </div>
  )
}
const Age = () => {
  const [getter, setter] = useGState(ageGState)
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'10px',border:'1px solid black',borderRadius:'4px',margin:'auto'}}>
      <input
      style={{color:'black'}}
        value={getter}
        type="number"
        onChange={(e) => {
          setter(e.target.value)
        }}
      ></input>
      <AgeGetter />
      <GenderGetter />
        {/* <Gender /> */}
    </div>
  )
}


const Gender = () => {
  const [getter, setter] = useGState(isMaleGState)
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'10px',border:'1px solid black',borderRadius:'4px',margin:'auto'}}>
      Are you a mail?<input
      style={{color:'black'}}
        value={getter}
        type="radio"
        onChange={(e) => {
          setter(e.target.value)
        }}
      ></input>
      <GenderGetter />
      <NameGetter />
        {/* <Name/> */}
    </div>
  )
}

const GenderGetter = () => {
  const [getter] = useGState(isMaleGState)
  return (
    <div>You are a "{getter?'male':'female'}"</div>
  )
}
const AgeGetter = () => {
  const [getter] = useGState(ageGState)
  return (
    <div>Your age is "{getter}"</div>
    )
}
const NameGetter = () => {
  const [getter] = useGState(nameGState)
  return (
    <div>Your name is "{getter}"</div>
    )
}


