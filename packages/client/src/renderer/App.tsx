import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home: React.FC = () => (
  <div style={{ padding: 24, textAlign: 'center' }}>
    <h1>个人网盘</h1>
    <p>应用脚手架已就绪，功能模块将在后续任务中实现。</p>
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
