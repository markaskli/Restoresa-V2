import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid, Link } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup"

type Inputs = {
  email: string,
  password: string
}

const schema = yup
  .object()
  .shape({
    email: yup.string().email("Enter a valid email address").required("Field is required"),
    password: yup.string().required("Field is required")
  })


export default function SignIn() {
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
    console.log(data);
    reset();
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
                  error={!!errors.email}
                  helperText={errors.email?.message as string}
                  {...register("email")}
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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