import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Homepage() {
    return (
        <Container sx={{width: "100$", marginTop: "80px"}}> 
            <Grid container justifyContent={"center"} alignContent={"center"} gap={"15px"}>
                <Grid item xs={4} >
                    <Typography
                        variant="h1"
                        fontWeight={800}
                        fontSize={44}
                        width={"44ch"}
                    >
                        Drink, Food & <br/>
                        <span style={{color: "rgb(250, 87, 41)"}}>Enjoy</span> With <span style={{color: "rgb(250, 87, 41)"}}>Your <br/>
                        family</span>
                    </Typography>
                    <Typography
                        width={"30ch"}
                        fontWeight={400}
                        fontSize={18}
                        marginTop={"10px"}
                    >
                        Food tastes better when you eat it with your family and friends
                    </Typography>
                    <Button variant="contained" color="secondary" size="large"><Link style={{textDecoration: "none", color: "rgb(35, 33, 43)"}} to={"restaurants"}>Browse restaurants</Link></Button>
                </Grid>
                <Grid item xs={4}>
                    <img width={"100%"} src={require('../../../images/chef.png')} alt="chef" />
                </Grid>
            </Grid>
            <Stack direction={"row"} spacing={2} useFlexGap justifyContent={"center"} alignItems={"center"} marginTop={"100px"} >
                <Stack direction={"column"} alignItems={"center"}>
                    <Grid item><img style={{display: "block", width: "100%"}} src={require('../../../images/reservation.png')} alt="reservation" /></Grid>
                    <Typography variant="h5"><span style={{color: "rgb(148, 0, 211)"}}>Make</span> a reservation</Typography>
                </Stack>
                <Stack direction={"column"} alignItems={"center"}>
                    <Grid item><img style={{display: "block", width: "100%"}} src={require('../../../images/order.png')} alt="order" /></Grid>
                    <Typography variant="h5"><span style={{color: "rgb(148, 0, 211)"}}>Order</span> food</Typography>
                    </Stack>
                <Stack direction={"column"} alignItems={"center"}>
                    <Grid item><img style={{display: "block", width: "100%"}} src={require('../../../images/appointment.png')} alt="appointment" /></Grid>
                    <Typography variant="h5"><span style={{color: "rgb(148, 0, 211)"}}>Make</span> an appointment</Typography>
                </Stack>
            </Stack>

        </Container>

    )
}