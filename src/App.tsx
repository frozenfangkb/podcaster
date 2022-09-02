import React from "react";
import { MainPage } from "./views/MainPage";
import "./styles/index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { Header } from "./components/Header";
import { PodcastPage } from "./views/PodcastPage";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/podcast/:podcastId/*" element={<PodcastPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
