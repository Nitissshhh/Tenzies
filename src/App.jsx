import { nanoid } from 'nanoid';
import { useState } from 'react'
import './App.css'
import Die from './components/die.jsx'  

export default function App() {
  const [dice, setDice] = useState(generateNewDie())

  
function generateNewDie() {
      return new Array(10)
        .fill(0)
        .map(() => ({
          Value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id:nanoid()
        }))
}
function hold(id){
  setDice(oldDice=> oldDice.map(Die=>{
    if (Die.id === id) {
        return { ...Die, isHeld: !Die.isHeld };
      } else {
        return Die;
      }
  }))

}
function Rolldice() {
     setDice(oldDice =>
     oldDice.map(die => {
      if (die.isHeld) {
        return die;
      } else {
        return { ...die, Value: Math.ceil(Math.random() * 6) }
      }
    })
  )
}

const diceElements = dice.map(dieObj =>
  <Die 
  isHeld={dieObj.isHeld} 
  key={dieObj.id} 
  value={dieObj.Value}
  hold={() => hold(dieObj.id)}
  />
)

  return ( <main>
     <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    <div className='dice-container'>
      {diceElements}
    </div>
    <button className='roll-dice' onClick={Rolldice}>Roll</button>
  </main>

  )

 
  
}
