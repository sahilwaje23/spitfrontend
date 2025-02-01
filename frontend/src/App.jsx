import React from 'react'
import { ManagerSignin, UserSignin, UserSignup } from './Components'
import {Route, Routes} from 'react-router-dom'

const App = () => {
  return (
    <div className='bg-black text-white'>
      {/* <UserSignup/> */}
      {/* <UserSignin/> */}
      {/* <ManagerSignin/> */}
      <Routes>
        <Route></Route>
      </Routes>

    </div>
  )
}

export default App