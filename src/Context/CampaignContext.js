import React, { createContext, useState, useEffect } from 'react';
import moment from 'moment';

export const CampaignContext = createContext();

export const CampaignProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        const userMap = data.reduce((acc, user) => {
          acc[user.id] = user.name;
          return acc;
        }, {});
        setUsers(userMap);
      })
      .catch(() => setError('Error fetching users'));

    const campaignData = [
      { id: 1, name: "Divavu", startDate: "9/19/2017", endDate: "3/9/2018", Budget: 88377, userId: 3 },
      { id: 2, name: "Jaxspan", startDate: "11/21/2017", endDate: "2/21/2018", Budget: 608715, userId: 6 },
      { id: 3, name: "Miboo", startDate: "11/1/2017", endDate: "6/20/2017", Budget: 239507, userId: 7 },
      { id: 4, name: "Trilith", startDate: "10/19/2024", endDate: "10/25/2024", Budget: 179838, userId: 1 },
      { id: 5, name: "Layo", startDate: "11/28/2019", endDate: "3/10/2018", Budget: 837850, userId: 9 },
      { id: 6, name: "Photojam", startDate: "7/25/2017", endDate: "6/23/2017", Budget: 858131, userId: 3 },
      { id: 7, name: "Blogtag", startDate: "6/27/2017", endDate: "1/15/2018", Budget: 109078, userId: 2 },
      { id: 8, name: "Rhyzio", startDate: "10/13/2017", endDate: "1/25/2018", Budget: 272552, userId: 4 },
      { id: 9, name: "Zoomcast", startDate: "9/6/2017", endDate: "11/10/2017", Budget: 301919, userId: 8 },
      { id: 10, name: "Realbridge", startDate: "3/5/2018", endDate: "10/2/2017", Budget: 505602, userId: 5 },
      { id: 11, name: "Realbridge", startDate: "3/5/2018", endDate: "10/2/2017", Budget: 505602, userId: 12 }
    ];

    const updatedCampaigns = campaignData.map(campaign => {
      const userName = users[campaign.userId] || 'Unknown User';
      return {
        ...campaign,
        userName 
      };
    });

    setCampaigns(updatedCampaigns);
    setFilteredCampaigns(updatedCampaigns);
    setLoading(false);
  }, [users]);

  const filterCampaigns = (searchTerm, startDate, endDate) => {
    let filtered = campaigns.filter(campaign => campaign.name.toLowerCase().includes(searchTerm.toLowerCase()));
   console.log(searchTerm,filtered)
    if (startDate && endDate) {
      filtered = filtered.filter(campaign => {
        const start = moment(campaign.startDate);
        const end = moment(campaign.endDate);
        return start.isBetween(startDate, endDate, undefined, '[]') || end.isBetween(startDate, endDate, undefined, '[]');
      });
    }
    setFilteredCampaigns(filtered);
  };

  return (
    <CampaignContext.Provider value={{ campaigns: filteredCampaigns, users, loading, error, filterCampaigns }}>
      {children}
    </CampaignContext.Provider>
  );
};
