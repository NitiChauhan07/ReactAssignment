import React from 'react';
import { CampaignProvider } from './Context/CampaignContext';
import CampaignList from './Components/CampaignList';
import DateRange from './Components/DateRange';
import './App.css';

function App() {
  return (
    <CampaignProvider>
      <div className="App">
        <h1>Campaign Manager</h1>
        <DateRange />
        <CampaignList />
      </div>
    </CampaignProvider>
  );
}

export default App;