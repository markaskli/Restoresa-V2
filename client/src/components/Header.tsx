import { AppBar, Avatar, Badge, Box, IconButton, List, ListItem, MenuItem, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";


const navStyles = {
    color: 'inherit', 
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: "rgb(250, 87, 41)"
    }
}

export default function Header() {
    return (
        <AppBar position="sticky">
            <Toolbar sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                    <Typography variant='h6' component={NavLink}
                        to='/'
                        sx={{
                            color: "inherit",
                            textDecoration: "none",
                            typography: 'h6'
                        }}
                    >
                        Restoresa
                    </Typography>
                </Box>
                <List sx={{ display: 'flex' }}>
                    <ListItem component={NavLink} to="/restaurants" sx={navStyles}>
                        Restaurants
                    </ListItem>

                </List>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"45px"}>
                    <Box component={Link} to={"/order"} sx={{backgroundColor: "rgb(254, 206, 82)", borderRadius: "15px", padding: "6px 12px", border: "none", color: "rgb(35, 33, 43)", textDecoration: "none"}} >
                        <Typography color={"rgb(35, 33, 43)"}>Review order</Typography>
                    </Box>

                    <Link to={"/profile"}>
                        <Avatar>
                        </Avatar>
                    </Link>

                    <Typography>
                        Sign in
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    )
}