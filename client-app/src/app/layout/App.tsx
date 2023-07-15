import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]); //in order to cause a side effect we use hooks 
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list()
    .then(response => {
      let activities : Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities); 
      setLoading(false);
    })
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
    setSubmitting(true);
    //if its there then edit
    if(activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
      //create new one with use universal unique id
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function deleteActivityHandler(id : string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmitting(false);
    })
  }

  if (loading) return <LoadingComponent content='Loading app'/>
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
      submitting = {submitting}
      />
      </Container>

    </div>
  );
}

export default App;
