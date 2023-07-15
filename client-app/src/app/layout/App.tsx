import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]); //in order to cause a side effect we use hooks 
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities') //returns a promise
    .then(response => {
      setActivities(response.data);
    })
    .catch(e => console.log(e));
  }, [])

  function selectActivityHandler (id: string) {
      setSelectedActivity(activities.find(x =>x.id === id));
  }

  function cancelSelectedActivityHandler () {
      setSelectedActivity(undefined); 
  }

  function openFormHandler (id? : string) {
      id ? selectActivityHandler(id) : cancelSelectedActivityHandler();
      setEditMode(true);
  }

  function closeFormHandler() {
    setEditMode(false);
  }

  function createOrEditActivityHandler(activity : Activity) {
    activity.id 
    ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    : setActivities([...activities, {...activity, id : uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function deleteActivityHandler(id : string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }
  return (
    <div >
      <NavBar openForm = {openFormHandler} />
      <Container style={{marginTop : '7em'}}>
      <ActivityDashboard 
      activities = {activities}
      selectedActivity = {selectedActivity}
      selectActivity = {selectActivityHandler}
      cancelSelectedActivity = {cancelSelectedActivityHandler}
      editMode = {editMode}
      openForm = {openFormHandler}
      closeForm = {closeFormHandler}
      createOrEdit = {createOrEditActivityHandler}
      deleteActivity = {deleteActivityHandler}
      />
      </Container>

    </div>
  );
}

export default App;
