import logo from "./logo.svg";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsCondition from "./pages/TermsCondition";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ErrorPage from "./pages/ErrorPage";


const AppLayout = () => {
    return (
        <div className="app">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}


function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children:[
        {
          path:'/',
          element:<Home />
        },
        {
          path:'/about',
          element:<AboutUs />
        },
        {
          path:'/contact',
          element:<ContactUs />
        },
        {
          path:'/privacy',
          element:<PrivacyPolicy />
        },
        {
          path:'/terms',
          element:<TermsCondition />
        },
      ],
      errorElement: <ErrorPage />
    },
    
  ]);
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
