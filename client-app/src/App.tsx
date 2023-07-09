import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { Button, Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]); //in order to cause a side effect we use hooks 


  useEffect(() => {
    axios.get('http://localhost:5000/api/activities') //returns a promise
    .then(response => {
      setActivities(response.data);
    })
    .catch(e => console.log(e));
  }, [])

  return (
    <div >
      <Header as='h2' icon='users' content ='Reactivities'/>
      <List>
        {activities.map((activity : any) =>(
        <List.Item key={activity.id}>
          {activity.title}
        </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
