import "./App.css";
import SelectList from "./ui/SelectList";

function App() {
  return (
    <div className='App'>
      <SelectList>
        <select
          name='test'
          id='format'
          onChange={(e) => console.log(e)}
          placeholder='Choose One'
        >
          <option value='1'>First Option</option>
          <option value='2'>Second Option</option>
          <option value='3'>Third Option</option>
        </select>
      </SelectList>
    </div>
  );
}

export default App;
