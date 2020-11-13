import React from "react";
import { Provider } from "react-redux";
import store from "../../store";
import TodoPage from "../TodoPage";

const App = () => (
  <Provider store={store}>
    <TodoPage />
  </Provider>
);

export default App;
