import { useState } from 'react'
import Clicker from './clicker'
import Users from './Users'
import Trainings from './Trainings'
import Navigation from './Navigation'
import Other from './Other'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
function App() {
  return(
    <Router>
      <Navigation />
      <div className="container">
        <Routes>
          <Route path='/' element={<Users />}/>
          <Route path='/trainings' element={<Trainings />}/>
          <Route path='/other' element={<Other />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
