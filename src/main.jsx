import React from "react";
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
import ProductCards from "./components/products/ProductCards.jsx";
import prod from "./assets/img/prod.webp";
import prod2 from "./assets/img/prod2.jpeg";
import prod3 from "./assets/img/prod3.jpeg";
import ProductCompraCard from "./components/products/ProductsCompra/ProductsCompraCard.jsx";
const prodItems = [
  {
    id: 1,
    img: prod2,
    title: "Silla para casa con tremendo color blanco",
    price: "125.000,00",
  },
  {
    id: 2,
    img: prod3,
    title: "Silla para casa con tremendo color blanco",
    price: "125.000,00",
  },
  {
    id: 3,
    img: prod3,
    title: "Silla para casa con tremendo color blanco",
    price: "125.000,00",
  },
  {
    id: 4,
    img: prod2,
    title: "Silla para casa con tremendo color blanco",
    price: "125.000,00",
  },
  {
    id: 2,
    img: prod3,
    title: "Silla para casa con tremendo color blanco",
    price: "125.000,00",
  },
  {
    id: 3,
    img: prod3,
    title: "Silla para casa con tremendo color blanco",
    price: "125.000,00",
  },
  {
    id: 4,
    img: prod2,
    title: "Silla para casa con tremendo color blanco",
    price: "125.000,00",
  },
];
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
        <Navbar />
        <div className="p-2">
          <Main />
          <InfoDividerSection />
          <div className="max-w-[1280px] flex flex-col items-center justify-center mx-auto">
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
      </>
    ),
  },
  {
    path: "/products/hogar",

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
        <Navbar />
        <div className="px-2 md:hidden">
          <AsideCategory />
        </div>
        <div className="hidden md:flex sticky top-[152px] justify-end mt-16 pt-2 px-12 mb-2 bg-white z-10">
          <div className="w-[170px]">
            <AsideFilterSelect />
          </div>
        </div>
        <div className="flex justify-center px-2 gap-12 max-w-[1260px] mx-auto">
          <div className="hidden md:block">
            <AsideCategoryDesktop />
          </div>
          <div className="grid grid-cols-2 mt-6 md:mt-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 justify-center items-center">
            {prodItems.map((item) => (
              <div key={item.id} className="w-full h-[490px] md:h-[530px]">
                <ProductCompraCard prod={item} />
              </div>
            ))}
          </div>
        </div>
      </>
    ),
  },
  {
    path: "/products/fabrica",

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
        <Navbar />
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