import { Outlet } from "react-router-dom";
import Header from "./features/app/layout/Header";
import Footer from "./features/app/layout/Footer";
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {


  const themeSelect = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: 'rgb(35, 33, 43)',
      },
      secondary: {
        main: 'rgb(254, 206, 82)',
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={themeSelect}>
        <Header />
        <Outlet />
        <Footer />

      </ThemeProvider>

    </>

  );
}

export default App;
