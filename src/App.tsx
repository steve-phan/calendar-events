import React from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

import Calendar from "components/Calendar";

import store from "./stores/index";
import "./App.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Calendar />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
