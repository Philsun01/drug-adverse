import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {

  const API = 'https://api.fda.gov/drug/event.json';
  const [data, setData] = useState([]);
  
  const fetchData = ()=> {
    const field = 'reactionmeddrapt';
    const limit = 5;
    const url = `${API}?limit=${limit}`;
    axios.get(url)
      .then(res => {
        setData(res.data.results);
        console.log(res.data.results);
      })
  }

  return (
    <div>
      <h1>Practice calling API</h1>
      <button onClick = {()=> fetchData()}>Fetch Data</button>
      {
        data.map( event => {
          return (
            <div key = {event.safetyreportid}>
              Drug Name: {event.patient.drug[0].medicinalproduct}
              <br />
              Patient Age: {event.patient.patientonsetage}
                <ul>
                {
                  event.patient.reaction.map( (reaction, idx) => {
                    return (
                      <li key = {idx}>
                        {reaction.reactionmeddrapt}
                      </li>
                    )
                  } )
                }
                </ul>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
