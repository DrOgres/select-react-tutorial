
import SelectList from "./ui/SelectList";
import './App.css'

function App() {

  return (
    <div className="App">
      <SelectList>
        <select id="format" onChange={(e) => console.log(e)} placeholder={"Choose One"}>
          <option value="1" selected>First Option</option>
          <option value="2">Second Option</option>
          <option value="3">Third Option</option>
        </select>
      </SelectList>

      {" "}
      <select id="format" onChange={(e) => console.log(e)} placeholder={"Choose One"}>
          <option value="1" selected>First Option</option>
          <option value="2">Second Option</option>
          <option value="3">Third Option</option>
        </select>
    </div>
  )
}

export default App
