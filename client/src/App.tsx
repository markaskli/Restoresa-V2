import { Outlet } from "react-router-dom";
import Header from "./features/app/layout/Header";
import Footer from "./features/app/layout/Footer";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "./features/app/store/store";
import { fetchBasketItemsAsync } from "./features/OrderPage/basketSlice";
import LoadingComponent from "./features/app/layout/LoadingComponent";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      
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
      <ThemeProvider theme={themeSelect}>
        <Header />
        <Outlet />
        <Footer />

      </ThemeProvider>

    </>

  );
}

export default App;
