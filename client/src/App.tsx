import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "./stores/store";
import LoadingComponent from "./components/LoadingComponent";
import { fetchBasketItemsAsync } from "./stores/slices/basketSlice";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      dispatch(fetchBasketItemsAsync())
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
    <>
      <ToastContainer position='bottom-right' hideProgressBar theme="colored" />
      <ThemeProvider theme={themeSelect}>
          <Header />
          <Outlet />
          <Footer />
      </ThemeProvider>

    </>

  );
}

export default App;
