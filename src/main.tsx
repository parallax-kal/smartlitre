import ReactDOM from "react-dom/client";
import "./index.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import DashLayout from "./components/layout/DashLayout";
import SplashPage from "./pages/Spash";
import { Suspense } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <DashLayout>
      <Suspense fallback={<SplashPage />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </DashLayout>
  </RecoilRoot>
);
