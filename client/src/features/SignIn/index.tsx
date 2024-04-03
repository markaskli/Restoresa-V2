import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid, Link } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup"
import { useAppDispatch } from "../../stores/store";
import { signInUser } from "../../stores/slices/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

type Inputs = {
  username: string,
  password: string
}

const schema = yup
  .object()
  .shape({
    username: yup.string().required("Field is required"),
    password: yup.string().required("Field is required")
  })


export default function SignIn() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: "onTouched"
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      dispatch(signInUser(data))
      navigate(location.state?.from || '/')
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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                <TextField
                  error={!!errors.username}
                  helperText={errors.username?.message as string}
                  {...register("username")}
                  margin="normal"
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  error={!!errors.password}
                  helperText={errors.password?.message as string}
                  {...register("password")}
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!isValid || isSubmitting}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="sign-up" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
      );
}