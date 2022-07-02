import { useState } from 'react'

function useInput(initialState) {
    const [state,setState] = useState(initialState);
    const handleState = (e)=>{
        setState(e.target.value);
    }
  return (
    [state,handleState]
  )
}

export default useInput