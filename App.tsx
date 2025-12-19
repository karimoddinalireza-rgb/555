import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import BOM from './components/BOM';
import Production from './components/Production';
import Costing from './components/Costing';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'orders':
        return <Orders />;
      case 'bom':
        return <BOM />;
      case 'production':
        return <Production />;
      case 'costing':
        return <Costing />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;