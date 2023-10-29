import React from 'react';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import { SearchButton } from '../buttons/commonButtons';
import { Avatar, ListItemAvatar, ListItemButton, Typography, Divider } from '@mui/material';
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

const SearchCard: React.FC<SearchCardProps> = (props) => {
    const {
        results
    } = props
    const classes = useStyles();

    const listItems = results.data.map((el: any) => {
        return <ListItem className={classes.listItem} key={el.id} disableGutters>
            <ListItemAvatar>
                <Avatar alt={el.title} src="a" />
            </ListItemAvatar>
            <ListItemText className={classes.listItemText} primary={el.title} />
            <ListItemText sx={{marginRight: "3rem"}}>
                <Typography sx={{fontSize : "1.5rem"}}>Depart</Typography>
                <Typography component="data">{el.departDate}</Typography>
                <Typography sx={{fontSize : "1.5rem"}}>Budget</Typography>
                <Typography component="data">{"$" + el.budget}</Typography>
            </ListItemText>
            <Divider orientation='vertical' flexItem />
            <ListItemButton sx={{backgroundColor: "transparent", ":hover": {backgroundColor: 'transparent'}}}>
                <Link to='/vacation' state={{ vacationData: el}}>
                    <SearchButton color='neutral' variant='contained'>View</SearchButton>
                </Link>
            </ListItemButton>
        </ListItem>
    })
    return (
        <List className={classes.list}>
            {listItems}
        </List>
    )
}

export default SearchCard;