import { TablePage } from "@/pages/TablePage";

import { ReactQueryProvider } from "./ReactQueryProvider";

import "./App.css";

export const App = () => {
  return (
    <ReactQueryProvider>
      <TablePage />
    </ReactQueryProvider>
  );
};
