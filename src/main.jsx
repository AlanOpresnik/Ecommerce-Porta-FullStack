import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Navbar from "./components/navbar/Navbar.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createHashRouter,
  useLocation,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import Main from "./components/MainSection/Main.jsx";
import InfoDividerSection from "./components/InfoDivider/InfoDividerSection.jsx";
import ProductsSection from "./components/products/ProductsSection.jsx";
import NewsLettterSection from "./components/Newsletter/NewsLettterSection.jsx";
import InstagramDividerSection from "./components/IntagramDivider/InstagramDividerSection.jsx";
import Footer from "./components/footer/Footer.jsx";
import FooterSection from "./components/footer/FooterSection.jsx";
import AsideCategory from "./components/AsideCategory/AsideCategory.jsx";
import { NextUIProvider } from "@nextui-org/react";
import AsideCategoryDesktop from "./components/AsideCategory/AsideCategoryDesktop.jsx";
import AsideFilterSelect from "./components/AsideCategory/AsideFilterSelect.jsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  ProductsContext,
  ProductsProvider,
} from "./context/ProductsContext.jsx";
import ProductsCompraSection from "./components/products/ProductsCompra/ProductsCompraSection.jsx";
import ProductDetail from "./components/products/ProductsDetails/ProductDetail.jsx";
import CargarProdForm from "./pages/admin/AdminComponents/CargarProdForm.jsx";
import ProductsMatch from "./components/products/ProductsDetails/components/carruselProductsMatch/ProductsMatch.jsx";
import CartSection from "./pages/cart/components/CartSection.jsx";
import CheckoutSection from "./pages/checkout/components/CheckoutSection/CheckoutSection.jsx";
import toast, { Toaster } from 'react-hot-toast';
import LoginComponent from "./pages/login/LoginComponents/LoginComponent.jsx";
import AdminProductsSection from "./pages/admin/AdminComponents/AdminProductsSection.jsx";
import SideBar from "./pages/admin/AdminComponents/SideBar.jsx";
import ScrollToTop from "./components/Scroll/ScrollToTop.js";
import OrdenesSection from "./pages/admin/ordenes/OrdenesSection.jsx";
import ProductsFeatured from "./pages/admin/destacados/ProductsFeatured.jsx";
import FeaturedSection from "./pages/admin/destacados/FeaturedSection.jsx";
import CouponsSection from "./pages/admin/AdminComponents/CouponsSection.jsx";
import NewCuponSection from "./pages/admin/AdminComponents/coupons/NewCuponSection.jsx";
import CpSection from "./pages/admin/AdminComponents/cp/CpSection.jsx";
import NewCpForm from "./pages/admin/AdminComponents/cp/NewCpForm.jsx";
import ReactConfetti from "react-confetti";
import WspLogo from "./components/WspLogo/WspLogo.jsx";
import PaymentSuccess from "./pages/PaymentSucces/PaymentSuccess.jsx";
import NosotrosSection from "./pages/nosotros/NosotrosSection.jsx";



const router = createHashRouter([
  {
    path: "/",

    element: (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Lorecunas</title>
          <meta name="description" />
          <meta
            name="description"
            content="Lorecunas- Lore Cunas se dedica a la elaboración de muebles Infanto Juveniles con los mejores precios del mercado,              confeccionando nuestros productos en maderas de Pino-guatambu-MDF-Melamina. Con un gran equilibrio Precio-Calidad.
       Contamos con Showroom, disponemos de gran variedad en modelos-colores y terminaciones en forma artesanal."
          />
        </Helmet>
        <ProductsProvider>
          <Navbar />
          <Toaster />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-2">
              <Main />
              <InfoDividerSection />
              <WspLogo/>
              <div className="max-w-[1280px]  flex-col items-center justify-center mx-auto">
                <ProductsSection />
              </div>
            </div>
            <div className="w-full mt-12">
              <NewsLettterSection />
            </div>

            <div className="w-full mt-12">
              <InstagramDividerSection />
              <FooterSection />
            </div>
            <ScrollToTop />
          </motion.div>
        </ProductsProvider>
      </>
    ),
  },
  {
    path: "/products/:category/:subcategory?",

    element: (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Lorecunas</title>
          <meta name="description" />
          <meta
            name="description"
            content="Lorecunas- Lore Cunas se dedica a la elaboración de muebles Infanto Juveniles con los mejores precios del mercado,              confeccionando nuestros productos en maderas de Pino-guatambu-MDF-Melamina. Con un gran equilibrio Precio-Calidad.
       Contamos con Showroom, disponemos de gran variedad en modelos-colores y terminaciones en forma artesanal."
          />
        </Helmet>
        <ProductsProvider>
          <Navbar />
          <Toaster />
          <WspLogo/>
          <div className="px-2 md:hidden ml-5">
            <AsideCategory />
          </div>
          <div className="hidden md:flex sticky top-[152px] justify-end mt-16 pt-2 px-12 mb-2 bg-white pb-2 z-10">
            <div className="w-[170px]">
              <AsideFilterSelect />
            </div>
          </div>
          <div className="flex justify-center px-2  md:gap-12  max-w-[1260px] mx-auto">
            <div className="hidden md:block">
              <AsideCategoryDesktop />
            </div>
            <ProductsCompraSection />
          </div>
          <div className="w-full mt-24 ">
            <FooterSection />
          </div>
          <ScrollToTop />
        </ProductsProvider>
      </>
    ),
  },
  {
    path: "/products/:category/:name/:subcategory/:id",

    element: (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Lorecunas</title>
          <meta name="description" />
          <meta
            name="description"
            content="Lorecunas- Lore Cunas se dedica a la elaboración de muebles Infanto Juveniles con los mejores precios del mercado,              confeccionando nuestros productos en maderas de Pino-guatambu-MDF-Melamina. Con un gran equilibrio Precio-Calidad.
       Contamos con Showroom, disponemos de gran variedad en modelos-colores y terminaciones en forma artesanal."
          />
        </Helmet>
        <ProductsProvider>
          <Navbar />
          <WspLogo/>
          <Toaster position="top-right" />
          <ProductDetail />
          <div className="max-w-[1380px] mb-12 mx-auto">
            <ProductsMatch />
          </div>
          <FooterSection />
          <ScrollToTop />
        </ProductsProvider>
      </>
    ),
  },
  {
    path: "/cart",

    element: (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Lorecunas</title>
          <meta name="description" />
          <meta
            name="description"
            content="Lorecunas- Lore Cunas se dedica a la elaboración de muebles Infanto Juveniles con los mejores precios del mercado,              confeccionando nuestros productos en maderas de Pino-guatambu-MDF-Melamina. Con un gran equilibrio Precio-Calidad.
            Contamos con Showroom, disponemos de gran variedad en modelos-colores y terminaciones en forma artesanal."
          />
        </Helmet>
        <ProductsProvider>
          <Navbar />
          <WspLogo/>
          <div className="max-w-[1380px] px-4 mx-auto">
            <CartSection />
          </div>
          <FooterSection />
          <ScrollToTop />
        </ProductsProvider>
      </>
    ),
  }, {
    path: "/checkout/:coupon?",

    element: (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Lorecunas</title>
          <meta name="description" />
          <meta
            name="description"
            content="Lorecunas- Lore Cunas se dedica a la elaboración de muebles Infanto Juveniles con los mejores precios del mercado,              confeccionando nuestros productos en maderas de Pino-guatambu-MDF-Melamina. Con un gran equilibrio Precio-Calidad.
            Contamos con Showroom, disponemos de gran variedad en modelos-colores y terminaciones en forma artesanal."
          />
        </Helmet>
        <ProductsProvider>
          <Navbar />
          <WspLogo/>
          <div>
            <CheckoutSection />
          </div>
          <FooterSection />
          <ScrollToTop />
        </ProductsProvider>
      </>
    ),
  },
  {
    path: "/paymentSuccess",

    element: (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Lorecunas</title>
          <meta name="description" />
          <meta
            name="description"
            content="Lorecunas- Lore Cunas se dedica a la elaboración de muebles Infanto Juveniles con los mejores precios del mercado,              confeccionando nuestros productos en maderas de Pino-guatambu-MDF-Melamina. Con un gran equilibrio Precio-Calidad.
            Contamos con Showroom, disponemos de gran variedad en modelos-colores y terminaciones en forma artesanal."
          />
        </Helmet>
        <ProductsProvider>
          <Navbar />
          <WspLogo/>
          <div className="max-w-[1380px] px-4 mx-auto">
            <PaymentSuccess/>
          </div>
          <FooterSection />
          <ScrollToTop />
        </ProductsProvider>
      </>
    ),
  },
  {
    path: "/nosotros",

    element: (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Lorecunas</title>
          <meta name="description" />
          <meta
            name="description"
            content="Lorecunas- Lore Cunas se dedica a la elaboración de muebles Infanto Juveniles con los mejores precios del mercado,              confeccionando nuestros productos en maderas de Pino-guatambu-MDF-Melamina. Con un gran equilibrio Precio-Calidad.
            Contamos con Showroom, disponemos de gran variedad en modelos-colores y terminaciones en forma artesanal."
          />
        </Helmet>
        <ProductsProvider>
          <Navbar />
          <WspLogo/>
          <div className="max-w-[1380px] px-4 mx-auto">
            <NosotrosSection/>
          </div>
          <FooterSection />
          <ScrollToTop />
        </ProductsProvider>
      </>
    ),
  },
  {
    path: "/admin/login",

    element: (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Lorecunas</title>
          <meta name="description" />
          <meta
            name="description"
            content="Lorecunas- Lore Cunas se dedica a la elaboración de muebles Infanto Juveniles con los mejores precios del mercado,              confeccionando nuestros productos en maderas de Pino-guatambu-MDF-Melamina. Con un gran equilibrio Precio-Calidad.
            Contamos con Showroom, disponemos de gran variedad en modelos-colores y terminaciones en forma artesanal."
          />
        </Helmet>
        <ProductsProvider>
          <Navbar />
          <div className={`flex px-2 flex-col items-center w-full`}>
            <LoginComponent />
          </div>
          <ScrollToTop />
        </ProductsProvider>
      </>
    ),
  },
  {
    path: "/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712",

    element: (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Lorecunas</title>
          <meta name="description" />
          <meta
            name="description"
            content="Lorecunas- Lore Cunas se dedica a la elaboración de muebles Infanto Juveniles con los mejores precios del mercado,              confeccionando nuestros productos en maderas de Pino-guatambu-MDF-Melamina. Con un gran equilibrio Precio-Calidad.
            Contamos con Showroom, disponemos de gran variedad en modelos-colores y terminaciones en forma artesanal."
          />
        </Helmet>
        <ProductsProvider>
          <div className="h-screen flex flex-1 ">
            <SideBar />
            <div className="w-[80%]  md:w-[1280px] mx-auto">

              <AdminProductsSection />
            </div>
          </div>
          <ScrollToTop />
        </ProductsProvider>
      </>
    ),
  },
  {
    path: "/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/ordenes",

    element: (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Lorecunas</title>
          <meta name="description" />
          <meta
            name="description"
            content="Lorecunas- Lore Cunas se dedica a la elaboración de muebles Infanto Juveniles con los mejores precios del mercado,              confeccionando nuestros productos en maderas de Pino-guatambu-MDF-Melamina. Con un gran equilibrio Precio-Calidad.
            Contamos con Showroom, disponemos de gran variedad en modelos-colores y terminaciones en forma artesanal."
          />
        </Helmet>
        <ProductsProvider>
          <div className="h-full relative  flex flex-1 ">
            <div className="relative">
              <SideBar />
            </div> 
            <div className="w-[80%] h-full   md:w-[1280px] mx-auto">
              <OrdenesSection />
            </div>
          </div>
          <ScrollToTop />
        </ProductsProvider>
      </>
    ),
  },
  {
    path: "/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/upload",

    element: (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Lorecunas</title>
          <meta name="description" />
          <meta
            name="description"
            content="Lorecunas- Lore Cunas se dedica a la elaboración de muebles Infanto Juveniles con los mejores precios del mercado,              confeccionando nuestros productos en maderas de Pino-guatambu-MDF-Melamina. Con un gran equilibrio Precio-Calidad.
       Contamos con Showroom, disponemos de gran variedad en modelos-colores y terminaciones en forma artesanal."
          />
        </Helmet>
        <ProductsProvider>
          <div className="h-[100vh] flex flex-1 ">
            <SideBar />
            <CargarProdForm />
          </div>
          <ScrollToTop />
        </ProductsProvider>
      </>
    ),
  },
  {
    path: "/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/destacados",

    element: (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Lorecunas</title>
          <meta name="description" />
          <meta
            name="description"
            content="Lorecunas- Lore Cunas se dedica a la elaboración de muebles Infanto Juveniles con los mejores precios del mercado,              confeccionando nuestros productos en maderas de Pino-guatambu-MDF-Melamina. Con un gran equilibrio Precio-Calidad.
       Contamos con Showroom, disponemos de gran variedad en modelos-colores y terminaciones en forma artesanal."
          />
        </Helmet>
        <ProductsProvider>
          <div className="h-[100vh] flex flex-1 ">
            <SideBar />
            <FeaturedSection />
          </div>
          <ScrollToTop />
        </ProductsProvider>
      </>
    ),
  },
  {
    path: "/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/coupons",

    element: (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Lorecunas</title>
          <meta name="description" />
          <meta
            name="description"
            content="Lorecunas- Lore Cunas se dedica a la elaboración de muebles Infanto Juveniles con los mejores precios del mercado,              confeccionando nuestros productos en maderas de Pino-guatambu-MDF-Melamina. Con un gran equilibrio Precio-Calidad.
       Contamos con Showroom, disponemos de gran variedad en modelos-colores y terminaciones en forma artesanal."
          />
        </Helmet>
        <ProductsProvider>
          <div className="h-[100vh] flex flex-1 ">
            <SideBar />
            <CouponsSection />
          </div>
          <ScrollToTop />
        </ProductsProvider>
      </>
    ),
  },
  {
    path: "/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/newcupon",

    element: (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Lorecunas</title>
          <meta name="description" />
          <meta
            name="description"
            content="Lorecunas- Lore Cunas se dedica a la elaboración de muebles Infanto Juveniles con los mejores precios del mercado,              confeccionando nuestros productos en maderas de Pino-guatambu-MDF-Melamina. Con un gran equilibrio Precio-Calidad.
       Contamos con Showroom, disponemos de gran variedad en modelos-colores y terminaciones en forma artesanal."
          />
        </Helmet>
        <ProductsProvider>
          <div className="h-[100vh] flex flex-1 ">
            <SideBar />
            <NewCuponSection />
          </div>
          <ScrollToTop />
        </ProductsProvider>
      </>
    ),
  },
  {
    path: "/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/cp",

    element: (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Lorecunas</title>
          <meta name="description" />
          <meta
            name="description"
            content="Lorecunas- Lore Cunas se dedica a la elaboración de muebles Infanto Juveniles con los mejores precios del mercado,              confeccionando nuestros productos en maderas de Pino-guatambu-MDF-Melamina. Con un gran equilibrio Precio-Calidad.
       Contamos con Showroom, disponemos de gran variedad en modelos-colores y terminaciones en forma artesanal."
          />
        </Helmet>
        <ProductsProvider>
          <div className="h-[100vh] flex flex-1 ">
            <SideBar />
            <CpSection />
          </div>
          <ScrollToTop />
        </ProductsProvider>
      </>
    ),
  },
  {
    path: "/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/newcp",

    element: (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Lorecunas</title>
          <meta name="description" />
          <meta
            name="description"
            content="Lorecunas- Lore Cunas se dedica a la elaboración de muebles Infanto Juveniles con los mejores precios del mercado,              confeccionando nuestros productos en maderas de Pino-guatambu-MDF-Melamina. Con un gran equilibrio Precio-Calidad.
       Contamos con Showroom, disponemos de gran variedad en modelos-colores y terminaciones en forma artesanal."
          />
        </Helmet>
        <ProductsProvider>
          <div className="h-[100vh] flex flex-1 ">
            <SideBar />
            <NewCpForm />
          </div>
          <ScrollToTop />
        </ProductsProvider>
      </>
    ),
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>
    <RouterProvider router={router}>
      <NextUIProvider>

        <App />
      </NextUIProvider>
    </RouterProvider>
  </React.StrictMode>
);
