import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import { DeleteButton, SearchButton } from '../buttons/commonButtons';
import { Avatar, ListItemAvatar, ListItemButton, Typography, Divider, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { palette } from '../../../../theme/pallete';

export interface SearchCardProps {
    results: AxiosResponse<any, any>
}

const useStyles = makeStyles(() => ({
    list: {
        maxHeight: '90vh',
        overflow: 'auto',
        scrollbars: 'none'
    },
    listItem: {
        marginTop: "1rem",
        background: palette.babyBlue,
        border: 'solid',
        borderWidth: '1px',
        borderColor: palette.taupeGray,
        borderRadius: "25px",
        padding: "20px"
    },
    listItemText: {
        width: '100%',
        minWidth: '500',
        maxWidth: '700'
    }
}))

const EventCard: React.FC<SearchCardProps> = (props) => {
    const {
        results
    } = props
    const classes = useStyles();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const url = "https://23c6-35-229-53-249.ngrok-free.ap"


    const handleDelete = useCallback(async (id: string) => {
        const deleteVacation = async () => {
            await axios.delete(
                url + "/vacation/Vacation/events/" + id
            ).then(() => {
                navigate(0);
            })
        }
        deleteVacation();
    }, [navigate])

    const handleSubmit = useCallback(async (event: any) => {
        const updateBalance = async () => {
            const data = {
                "id": event.id,
                "vacationId": event.vacationId,
                "userUid": event.userUid,
                "title": (document.getElementById('title') as HTMLInputElement).value,
                "cost": (document.getElementById('cost') as HTMLInputElement).value,
                "timeOfEvent": (document.getElementById('timeOfEvent') as HTMLInputElement).value,
            }
            await axios.put(
                url + "/vacation/Vacation/events/" + event.id,
                data
            ).then(() => {
                handleClose();
                navigate(0);
            })
        }
        updateBalance();
    }, [navigate])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const listItems = results.data.map((el: any) => {
        return <ListItem className={classes.listItem} key={el.id} disableGutters>
            <ListItemAvatar>
                <Avatar alt={el.title} src="a" />
            </ListItemAvatar>
            <ListItemText className={classes.listItemText} primary={el.title} />
            <ListItemText sx={{ marginRight: "3rem" }}>
                <Typography sx={{ fontSize: "1.5rem" }}>T aa</Typography>
                <Typography component="data">{el.timeOfEvent}</Typography>
                <Typography sx={{ fontSize: "1.5rem" }}>Cost</Typography>
                <Typography component="data">{"$" + el.cost}</Typography>
            </ListItemText>
            <Divider orientation='vertical' flexItem />
            <ListItemButton sx={{ backgroundColor: "transparent", ":hover": { backgroundColor: 'transparent' } }}>
                <SearchButton color='neutral' variant='contained' onClick={handleClickOpen}>Edit</SearchButton>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>New Vacation</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Name this event"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="cost"
                            label="Cost"
                            type='number'
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="timeOfEvent"
                            label="Time of Event (MM/DD/YYYY/HH:MM)"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <SearchButton onClick={handleClose}>Cancel</SearchButton>
                        <SearchButton onClick={(e: any) => (handleSubmit(el))}>Submit</SearchButton>
                    </DialogActions>
                </Dialog>
            </ListItemButton>
            <ListItemButton sx={{ backgroundColor: "transparent", ":hover": { backgroundColor: 'transparent' } }}>
                <DeleteButton onClick={(e: any) => (handleDelete(el.id))}>Delete</DeleteButton>
            </ListItemButton>
        </ListItem>

    })
    return (
        <List className={classes.list}>
            {listItems}
        </List>
    )
}

export default EventCard;