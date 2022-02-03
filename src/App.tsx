import React from 'react';
import { Routes, Route } from "react-router-dom";
import Edit from 'pages/Edit';
import List from 'pages/List';
import New from 'pages/New';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="new" element={<New />} />
        <Route path="edit" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
