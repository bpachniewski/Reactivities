import React from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'




interface Props {
    activity: Activity;
    cancelSelectedActivity : () => void;
    openForm : (id: string) => void;
}


export default function ActivityDetails({activity, cancelSelectedActivity, openForm} : Props) {
    console.log(activity.category);
    return (
        <Card>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} /> 
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span >{activity.date}</span>
          </Card.Meta>
          <Card.Description>
            {activity.description}
          </Card.Description>   
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths={2}>
                <Button basic color='green' content='Edit' onClick={() =>openForm(activity.id)}/>
                <Button basic color='red' content='Cancel' onClick={cancelSelectedActivity} />

            </Button.Group>
        </Card.Content>
      </Card>
    )
}