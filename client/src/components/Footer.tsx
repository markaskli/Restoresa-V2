import { useTheme } from "@emotion/react";
import { Box, Container, CssBaseline, ThemeProvider, Typography } from "@mui/material";

export default function Footer() {
  const theme = useTheme();
    return (
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Box
              component="footer"
              sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: "rgb(35, 33, 43)"
              }}
            >
              <Container maxWidth="sm">
                <Typography variant="body1" color={"white"} display={"flex"} justifyContent={"center"}>
                  Restoresa V2
                </Typography>
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      );
    
}