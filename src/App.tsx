import React from "react";
import { MainPage } from "./views/MainPage";
import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
