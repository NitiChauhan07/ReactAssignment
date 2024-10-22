import React, { useContext, useState } from 'react';
import { CampaignContext } from '../Context/CampaignContext';
import moment from 'moment';

const CampaignList = () => {
  const { campaigns, users, loading, error } = useContext(CampaignContext);
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const isActive = (startDate, endDate) => {
    const now = moment();
    return now.isBetween(moment(startDate), moment(endDate));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by campaign name..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Budget</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {campaigns
            .filter(campaign => {
              const start = moment(campaign.startDate);
              const end = moment(campaign.endDate);
              return (
                start.isSameOrBefore(end) &&
                campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
              );
            })
            .map(campaign => (
              <tr key={campaign.id}>
                <td>{campaign.name}</td>
                <td>{moment(campaign.startDate).format('DD/MM/YYYY')}</td>
                <td>{moment(campaign.endDate).format('DD/MM/YYYY')}</td>
                <td className={isActive(campaign.startDate, campaign.endDate) ? 'status-active' : 'status-inactive'}>
                  {isActive(campaign.startDate, campaign.endDate) ? 'Active' : 'Inactive'}
                </td>
                <td>${((campaign.Budget)/1000).toFixed(2) + 'K USD'}</td>
                <td>{users[campaign.userId] || 'Unknown User'}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignList;
