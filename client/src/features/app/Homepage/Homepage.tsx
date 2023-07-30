import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Homepage() {
    return (
        <Box width={"min(80vw, 1200px)"} margin={"5% auto"}> 
            <Grid container justifyContent={"center"} gap={"15px"} alignItems={"center"}>
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
            <Box display={"grid"} gridTemplateColumns={"repeat(3, 1fr)"} justifyContent={"center"} alignContent={"center"} marginTop={"8%"} gap={"30px"} sx={{backgroundColor: "rgb(254, 206, 82)"}} borderRadius={"30px"}>
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"} padding={"20px"}>
                    <img style={{display: "block", width: "100%"}} src={require('../../../images/reservation.png')} alt="reservation" />
                    <Typography variant="h5"><span style={{color: "rgb(148, 0, 211)"}}>Make</span> a reservation</Typography>
                </Box>
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"} padding={"20px"}>
                    <img style={{display: "block", width: "100%"}} src={require('../../../images/order.png')} alt="order" />
                    <Typography variant="h5"><span style={{color: "rgb(148, 0, 211)"}}>Order</span> food</Typography>
                </Box>
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={"100%"} padding={"20px"}>
                    <img style={{display: "block", width: "100%"}} src={require('../../../images/appointment.png')} alt="appointment" />
                    <Typography variant="h5"><span style={{color: "rgb(148, 0, 211)"}}>Make</span> an appointment</Typography>
                </Box>
            </Box>

        </Box>

    )
}