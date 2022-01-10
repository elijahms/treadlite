import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { DateTime } from "luxon";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

const Note = ({content, setSelectedNote, id, created_at, setTriggerRerender, triggerRerender}) => {
    
    
    let dt = DateTime.fromISO(created_at).toLocaleString(DateTime.DATETIME_MED)

    function deleteNoteFunc(e) {
        fetch(`/api/notes/${id}`, { method: 'DELETE' })
        .then((message) => console.log(message));
        setTriggerRerender((triggerRerender) => !triggerRerender)
        alert('Your note was deleted')
    }

    return (
        <List>
            <ListItem
                secondaryAction={
                <IconButton 
                edge="end"
                aria-label="delete"
                onClick={deleteNoteFunc}
                >
                <DeleteIcon />
                </IconButton>
                }
            >
                <Fab
                color="secondary"
                onClick = {(e) => setSelectedNote({ content: content, id: id})}
                edge="start"
                size="small"
                aria-label="edit">
                  <EditIcon />
                </Fab>
            <ListItemText 
                sx={{ml: 2}}
                primary={JSON.parse(content).blocks[0].text}
                secondary={dt}
            />         
            </ListItem>
            <Divider />
        </List>
    )
}

export default Note
