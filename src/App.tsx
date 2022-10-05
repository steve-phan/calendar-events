import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";
import Calendar from "components/Calendar";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Calendar />
      </div>
    </QueryClientProvider>
  );
}

export default App;
