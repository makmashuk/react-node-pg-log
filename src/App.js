
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [start_time, setStartTime] = useState('');
  const [end_time, setEndTime] = useState('');
  const [description, setDescripotion] = useState('');
  const [logList, setLogList] = useState([]);


  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('http://localhost:3001/logs')
      .then(response => response.json())
      .then(data => setLogList(data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);



  const handleSubmit = async(e) =>  {


    e.preventDefault();
    let log = {
      "start_time": start_time,
      "end_time": end_time,
      "description": description,
    };
   
   

    axios.post(`http://localhost:3001/create-log`, { log })
    .then(res => {

      setLogList([...logList, log]);
      setDescripotion('');
      
    })
  
  }

  const handleInputChange = (e) => {
    setDescripotion(e.target.value);
    const logEndTime = (new Date(Date.now())).toUTCString();
    setEndTime(logEndTime);
  }

  const handleStartTimeChange = (e) => {
    const logStartTime = (new Date(Date.now())).toUTCString();
    setStartTime(logStartTime);
  }

  return (
    <div className="App">
      <div className="Form">
        <form>
          <label>
            Please type Log Description: <br />
            <input type="text" value={description} onChange={handleInputChange} onFocus={handleStartTimeChange} />
          </label>
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
      <div className="List">
        <ul>
          {logList.map((item, index) => {
            return <li key={index}>{item.start_time} - {item.description} - {item.end_time}</li>
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
