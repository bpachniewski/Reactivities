import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';



interface Props {
    activity : Activity | undefined;
    closeForm : () => void;
    createOrEdit : (activity : Activity) => void;
}

export default function ActivityForm ({activity : selectedActivity, closeForm, createOrEdit} : Props) {

    const initialState = selectedActivity ?? {
        id : '',
        title : '',
        category: '',
        description: '',
        date : '',
        city : '',
        venue : '',
    }

    const [activity, setActivity] = useState(initialState); 

    function sumbitHandler() {
        createOrEdit(activity);
    }

    function inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name] : value})
    }
    return (
        <Segment clearing>
            <Form onSubmit={sumbitHandler} autoComplete ='off'>
                <Form.Input placeholder ="Title" value ={activity.title} name ='title' onChange={inputChangeHandler}/>
                <Form.Input placeholder ="Description" value ={activity.description} name ='description' onChange={inputChangeHandler}/>
                <Form.Input placeholder ="Category" value ={activity.category} name ='category' onChange={inputChangeHandler}/>
                <Form.Input placeholder ="Date" value ={activity.date} name ='date' onChange={inputChangeHandler}/>
                <Form.Input placeholder ="City" value ={activity.city} name ='city' onChange={inputChangeHandler}/>
                <Form.Input placeholder ="Venue" value ={activity.venue} name ='venue' onChange={inputChangeHandler}/>
                <Button floated="right" positive type="submit" content="Submit" />
                <Button floated="right"  type="button" content="Cancel" onClick={closeForm} />

            </Form>
        </Segment>
    )
}