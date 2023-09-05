import Head from "next/head";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, title = "Jobbee - Find Your Job Now" }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Script strategy="beforeInteractive" src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></Script>
      <Script src="https://kit.fontawesome.com/9edb65c86a.js" crossOrigin="anonymous"></Script>
      <Script
        strategy="beforeInteractive"
        src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"
      ></Script>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />

      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
