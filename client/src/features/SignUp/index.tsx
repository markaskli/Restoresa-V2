import { Container, CssBaseline, Box, Avatar, Typography, Grid, TextField, Button, Link } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup"
import requests from "../../API/requests";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

type Inputs = {
  name: string,
  surname: string,
  username: string,
  phoneNumber: string,
  email: string,
  password: string
}

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Field is required"),
    surname: yup.string().required("Field is required"),
    username: yup.string().matches(/^[a-z0-9_-]{3,15}$/, 'Invalid username').required("Field is required"),
    phoneNumber: yup.string().required("Field is required"),
    email: yup.string().email("Enter valid email address").required("Field is required"),
    password: yup.string().matches(/(?=^.{6,16}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/, "Password does not meet complexity requirements").required("Field is required")
  })

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting, },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: "onTouched"
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    try {
      await requests.User.registerUser({...data, isEmployee: false})
      .then(() => toast.success("Registered successfully"))
      navigate('/sign-in')
    }
    catch (error) {
      console.log(error)
      reset()
    }

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors.name}
                helperText={errors.name?.message as string}
                {...register("name")}
                autoComplete="given-name"
                name="name"
                fullWidth
                id="name"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors.surname}
                helperText={errors.surname?.message as string}
                {...register("surname")}
                fullWidth
                id="surname"
                label="Last Name"
                name="surname"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.username}
                helperText={errors.username?.message as string}
                {...register("username")}
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message as string}
                {...register("phoneNumber")}
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.email}
                helperText={errors.email?.message as string}
                {...register("email")}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.password}
                helperText={errors.password?.message as string}
                {...register("password")}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12} textAlign={"center"}>
              <Typography>This is a fake website.</Typography>
            </Grid>
          </Grid>
          <Button
            disabled={!isValid || isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}