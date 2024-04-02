import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "./stores/store";
import LoadingComponent from "./components/LoadingComponent";
import { fetchBasketItemsAsync } from "./stores/slices/basketSlice";
import { ToastContainer } from "react-toastify";
import { Container, CssBaseline } from "@mui/material";
import Homepage from "./features/Homepage/Homepage";
import { fetchCurrentUser } from "./stores/slices/userSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const initApp = useCallback(async () => {
    try {
      dispatch(fetchBasketItemsAsync())
      dispatch(fetchCurrentUser())
    }
    catch (error) {
      console.log(error)
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false))
  }, [initApp])


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

  if (loading) return <LoadingComponent message="Initializing app.." />

  return (
    <ThemeProvider theme={themeSelect}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header />
      {loading ? (
        <LoadingComponent message="Initializing app.." />
      ) : location.pathname === "/" ? (
        <Homepage />
      ) : (
        <Container>
          <Outlet />
        </Container>
      )}
      <Footer />
    </ThemeProvider>
  );
}

export default App;
