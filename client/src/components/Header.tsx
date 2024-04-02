import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../stores/store";
import { signOut } from "../stores/slices/userSlice";

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "rgb(250, 87, 41)",
  },
};

export default function Header() {
  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.user);
  const [isReviewButtonDisabled, setIsReviewButtonDisabled] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (basket) {
      if (basket.items.length > 0) {
        setIsReviewButtonDisabled(false);
      } else {
        setIsReviewButtonDisabled(true);
      }
    } else {
      setIsReviewButtonDisabled(true);
    }
  }, [basket]);

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{
              color: "inherit",
              textDecoration: "none",
              typography: "h6",
            }}
          >
            Restoresa
          </Typography>
        </Box>
        <List sx={{ display: "flex" }}>
          <ListItem component={NavLink} to="/restaurants" sx={navStyles}>
            Restaurants
          </ListItem>
        </List>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"45px"}
        >
          <Box
            component={Link}
            to={"/order"}
            sx={{
              backgroundColor: "rgb(254, 206, 82)",
              borderRadius: "15px",
              padding: "6px 12px",
              border: "none",
              color: "rgb(35, 33, 43)",
              textDecoration: "none",
            }}
            display={isReviewButtonDisabled ? "none" : ""}
          >
            <Typography color={"rgb(35, 33, 43)"}>Review order</Typography>
          </Box>

          {user && (
            <Link to={"/profile"}>
              <Avatar />
            </Link>
          )}

          {user ? (
            <Button color="secondary" variant="contained" onClick={() => dispatch(signOut())}>Sign Out</Button>
          ) : (
            <Button color="secondary" variant="contained" onClick={() => navigate('/sign-in')}>Sign In</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
