import "@/styles/globals.scss";



import type { AppProps } from "next/app";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AutProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return( 
        <AutProvider>
           <Component {...pageProps} />
           <ToastContainer autoClose={5000} />
        </AutProvider>   
        );
}
