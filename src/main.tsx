import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ThemeProvider} from "./contexts/ThemeContext.tsx";
import {store} from "@/redux/store.ts";
import {Provider} from "react-redux";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <ThemeProvider>
              <App />
          </ThemeProvider>
      </Provider>

  </StrictMode>,
)
