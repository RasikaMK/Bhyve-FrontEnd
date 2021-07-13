import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const UserProfile = (props) => {
    console.log('sdfwe', props)
    return (
        <div className='profileContainer'>
        <div style={{ display: 'flex', justifyContent: 'center',margin:'200px' }}>
            <Card >
                <CardContent>
                    <List >
                        <ListItem >
                            <ListItemText primary={`FirstName: ${props.userInformation.data.firstName}`} />
                        </ListItem>
                        <Divider />
                        <ListItem >
                            <ListItemText primary={`LastName: ${props.userInformation.data.lastName}`} />
                        </ListItem>
                        <Divider />
                        <ListItem >
                            <ListItemText primary={`Email: ${props.userInformation.data.username}`} />
                        </ListItem>
                        <Divider />
                        <ListItem >
                            Skills: {props.userInformation.data.skills.map((item) => { return <Chip style={{marginRight:'15px'}} label={item} /> })}
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </div>
        </div>
    )
}

export default UserProfile