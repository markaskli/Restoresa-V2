import { AppBar, MenuItem, Toolbar, Typography } from "@mui/material";

export default function Header() {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6">Restoresa V2</Typography>
            </Toolbar>
        </AppBar>
    )
}