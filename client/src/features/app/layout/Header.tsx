import { AppBar, Box, List, ListItem, MenuItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const midLinks = [

]



const navStyles = {
    color: 'inherit', 
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'white'
    }
}

export default function Header() {
    return (
        <AppBar position="sticky">
            <Toolbar sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                    <Typography variant='h6' component={NavLink}
                        to='/'
                        sx={navStyles}
                    >
                        Restoresa V2
                    </Typography>
                </Box>
                <List sx={{ display: 'flex' }}>
                    <ListItem component={NavLink} to="/restaurants" sx={navStyles}>
                        Restaurants
                    </ListItem>

                </List>
            </Toolbar>
        </AppBar>
    )
}