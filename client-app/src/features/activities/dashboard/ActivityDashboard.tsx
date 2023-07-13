import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
    activities : Activity[];
    selectedActivity : Activity | undefined;
    selectActivity : (id : string) => void;
    cancelSelectedActivity : () => void;
    editMode : boolean;
    openForm : (id: string) => void;
    closeForm: () => void;
}

export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelSelectedActivity, editMode, openForm, closeForm} : Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
            <ActivityList activities={activities} selectActivity ={selectActivity}/>
            </Grid.Column>
            <Grid.Column width = '6'>
                {selectedActivity && !editMode &&
                <ActivityDetails activity={selectedActivity} cancelSelectedActivity ={cancelSelectedActivity} openForm = {openForm} />}
                {editMode && 
                <ActivityForm closeForm={closeForm} activity={undefined}/>}
            </Grid.Column>
        </Grid>
    )
}