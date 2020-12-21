import React from 'react'
import Playfield from './components/Playfield'
import './App.css'
import './stylesheets/Card.css'
import './stylesheets/Playfield.css'

function App() {
  return (
    <div className="App">
      <Playfield pairs={10} />
    </div>
  );
}

export default App
