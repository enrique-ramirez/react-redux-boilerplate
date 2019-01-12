import React from 'react'

import {
  Route,
} from 'react-router-dom'

import ToDos from 'containers/ToDos'

import './styles.css'

function App() {
  return (
    <div>
      <Route component={ToDos} path="/:filter?" />
    </div>
  )
}

export default App
