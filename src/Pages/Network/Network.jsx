import React, { useEffect, useState } from 'react';
import './Network.scss';

/* ========= Original Manage My Network Component (Renamed to ManageMyNetwork) ========= */
const ManageMyNetwork = () => {
  const [connections, setConnections] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [activeTab, setActiveTab] = useState('connections');

  // Additional states for Connections controls
  const [searchConnections, setSearchConnections] = useState('');
  const [sortConnections, setSortConnections] = useState('name');
  const [showConnectionFilters, setShowConnectionFilters] = useState(false);

  // Additional states for Contacts controls
  const [searchContacts, setSearchContacts] = useState('');
  const [sortContacts, setSortContacts] = useState('name');

  useEffect(() => {
    // Fetch data for each category from the backend
    fetchData('connections', setConnections);
    fetchData('contacts', setContacts);
    fetchData('followers', setFollowers);
    fetchData('groups', setGroups);
  }, []);

  const fetchData = (endpoint, setState) => {
    fetch(`https://backl-main.vercel.app/api/${endpoint}`)
      .then((res) => res.json())
      .then((data) => setState(data))
      .catch((err) => console.error(`Error fetching ${endpoint}:`, err));
  };

  // Handlers for Connections controls
  const handleSortConnections = (e) => {
    setSortConnections(e.target.value);
  };

  const handleSearchConnections = (e) => {
    setSearchConnections(e.target.value);
  };

  const toggleConnectionFilters = () => {
    setShowConnectionFilters(!showConnectionFilters);
  };

  // Handlers for Contacts controls
  const handleSortContacts = (e) => {
    setSortContacts(e.target.value);
  };

  const handleSearchContacts = (e) => {
    setSearchContacts(e.target.value);
  };

  const handleExportContacts = () => {
    alert('Exporting contacts...');
  };

  const handleManageSynced = () => {
    alert('Managing synced contacts...');
  };

  // Utility: Filter and sort data based on current search and sort values
  const getSortedAndFiltered = (data, type) => {
    let filteredData = [...data];
    if (type === 'connections') {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(searchConnections.toLowerCase())
      );
      if (sortConnections === 'name') {
        filteredData.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortConnections === 'date') {
        // Assumes connectedAt is a date string; sorts newest first
        filteredData.sort(
          (a, b) => new Date(b.connectedAt) - new Date(a.connectedAt)
        );
      } else if (sortConnections === 'position') {
        filteredData.sort((a, b) =>
          (a.position || '').localeCompare(b.position || '')
        );
      }
    } else if (type === 'contacts') {
      filteredData = filteredData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchContacts.toLowerCase()) ||
          (item.company &&
            item.company.toLowerCase().includes(searchContacts.toLowerCase()))
      );
      if (sortContacts === 'name') {
        filteredData.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortContacts === 'company') {
        filteredData.sort((a, b) =>
          (a.company || '').localeCompare(b.company || '')
        );
      }
    }
    return filteredData;
  };

  // Render functions that adjust the displayed info based on tab type
  const renderList = (data) => {
    if (activeTab === 'connections') {
      return data.map((item) => (
        <div key={item.id} className="network-item">
          <img src={item.avatar} alt={item.name} className="avatar" />
          <div className="details">
            <h3>{item.name}</h3>
            <p>{item.position || item.title}</p>
            <small>Connected on {item.connectedAt || 'N/A'}</small>
          </div>
        </div>
      ));
    } else if (activeTab === 'contacts') {
      return data.map((item) => (
        <div key={item.id} className="network-item">
          <img src={item.avatar} alt={item.name} className="avatar" />
          <div className="details">
            <h3>{item.name}</h3>
            <p>{item.company || item.title}</p>
          </div>
        </div>
      ));
    } else if (activeTab === 'followers') {
      return data.map((item) => (
        <div key={item.id} className="network-item">
          <img src={item.avatar} alt={item.name} className="avatar" />
          <div className="details">
            <h3>{item.name}</h3>
            <p>{item.title}</p>
          </div>
        </div>
      ));
    } else if (activeTab === 'groups') {
      return data.map((item) => (
        <div key={item.id} className="network-item">
          <img src={item.avatar} alt={item.name} className="avatar" />
          <div className="details">
            <h3>{item.name}</h3>
            <p>{item.title}</p>
          </div>
        </div>
      ));
    }
  };

  // Define tabs for Manage My Network
  const tabs = [
    { id: 'connections', label: 'Connections' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'followers', label: 'Followers' },
    { id: 'groups', label: 'Groups' },
  ];

  return (
    <div className="network-container">
      <h1>Manage My Network</h1>
      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Controls Row for Connections */}
      {activeTab === 'connections' && (
        <div className="controls-row">
          <div className="control sort-control">
            <label>Sort by:</label>
            <select value={sortConnections} onChange={handleSortConnections}>
              <option value="name">Name</option>
              <option value="date">Connected Date</option>
              <option value="position">Position</option>
            </select>
          </div>
          <div className="control search-control">
            <input
              type="text"
              placeholder="Search by name"
              value={searchConnections}
              onChange={handleSearchConnections}
            />
          </div>
          <div className="control filter-control">
            <button onClick={toggleConnectionFilters}>Filters</button>
            {showConnectionFilters && (
              <div className="filters-dropdown">
                {/* Additional filter options can be added here */}
                <p>Additional filter options...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Controls Row for Contacts */}
      {activeTab === 'contacts' && (
        <div className="controls-row">
          <div className="control sort-control">
            <label>Sort by:</label>
            <select value={sortContacts} onChange={handleSortContacts}>
              <option value="name">Name</option>
              <option value="company">Company</option>
            </select>
          </div>
          <div className="control search-control">
            <input
              type="text"
              placeholder="Search by name or company"
              value={searchContacts}
              onChange={handleSearchContacts}
            />
          </div>
          <div className="control actions-control">
            <button onClick={handleExportContacts}>Export Contacts</button>
            <button onClick={handleManageSynced}>
              Manage Synced Contacts
            </button>
          </div>
        </div>
      )}

      <div className="list-container">
        {activeTab === 'connections' &&
          renderList(getSortedAndFiltered(connections, 'connections'))}
        {activeTab === 'contacts' &&
          renderList(getSortedAndFiltered(contacts, 'contacts'))}
        {activeTab === 'followers' && renderList(followers)}
        {activeTab === 'groups' && renderList(groups)}
      </div>
    </div>
  );
};

/* ========= New Grow Component ========= */
const Grow = () => {
  const [activeGrowTab, setActiveGrowTab] = useState('invitations');
  const [invitations, setInvitations] = useState([]);
  const [getHired, setGetHired] = useState([]);
  const [peopleYouMayKnow, setPeopleYouMayKnow] = useState([]);

  useEffect(() => {
    fetchData('invitations', setInvitations);
    fetchData('get-hired', setGetHired);
    fetchData('people-you-may-know', setPeopleYouMayKnow);
  }, []);

  const fetchData = (endpoint, setState) => {
    fetch(`https://backl-main.vercel.app/api/${endpoint}`)
      .then((res) => res.json())
      .then((data) => setState(data))
      .catch((err) =>
        console.error(`Error fetching ${endpoint} in Grow:`, err)
      );
  };

  const renderList = (data) =>
    data.map((item) => (
      <div key={item.id} className="grow-item">
        <img src={item.avatar} alt={item.name} className="avatar" />
        <div className="details">
          <h3>{item.name}</h3>
          <p>{item.title}</p>
        </div>
      </div>
    ));

  const growTabs = [
    { id: 'invitations', label: 'Invitations' },
    { id: 'getHired', label: 'Get Hired Faster' },
    { id: 'peopleYouMayKnow', label: 'People You May Know' },
  ];

  return (
    <div className="grow-container">
      <h1>Grow</h1>
      <div className="tabs">
        {growTabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeGrowTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveGrowTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="list-container">
        {activeGrowTab === 'invitations' && renderList(invitations)}
        {activeGrowTab === 'getHired' && renderList(getHired)}
        {activeGrowTab === 'peopleYouMayKnow' && renderList(peopleYouMayKnow)}
      </div>
    </div>
  );
};

/* ========= New Catch Up Component ========= */
const CatchUp = () => {
  const [activeCatchUpTab, setActiveCatchUpTab] = useState('all');
  const [all, setAll] = useState([]);
  const [birthdays, setBirthdays] = useState([]);
  const [jobChanges, setJobChanges] = useState([]);
  const [workAnniversaries, setWorkAnniversaries] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    fetchData('catchup-all', setAll);
    fetchData('birthdays', setBirthdays);
    fetchData('job-changes', setJobChanges);
    fetchData('work-anniversaries', setWorkAnniversaries);
    fetchData('education', setEducation);
  }, []);

  const fetchData = (endpoint, setState) => {
    fetch(`https://backl-main.vercel.app/api/${endpoint}`)
      .then((res) => res.json())
      .then((data) => setState(data))
      .catch((err) =>
        console.error(`Error fetching ${endpoint} in Catch Up:`, err)
      );
  };

  const renderList = (data) =>
    data.map((item) => (
      <div key={item.id} className="catchup-item">
        <img src={item.avatar} alt={item.name} className="avatar" />
        <div className="details">
          <h3>{item.name}</h3>
          <p>{item.activity}</p>
        </div>
      </div>
    ));

  const catchUpTabs = [
    { id: 'all', label: 'All' },
    { id: 'birthdays', label: 'Birthdays' },
    { id: 'jobChanges', label: 'Job Changes' },
    { id: 'workAnniversaries', label: 'Work Anniversaries' },
    { id: 'education', label: 'Education' },
  ];

  return (
    <div className="catchup-container">
      <h1>Catch Up</h1>
      <div className="tabs">
        {catchUpTabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeCatchUpTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveCatchUpTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="list-container">
        {activeCatchUpTab === 'all' && renderList(all)}
        {activeCatchUpTab === 'birthdays' && renderList(birthdays)}
        {activeCatchUpTab === 'jobChanges' && renderList(jobChanges)}
        {activeCatchUpTab === 'workAnniversaries' && renderList(workAnniversaries)}
        {activeCatchUpTab === 'education' && renderList(education)}
      </div>
    </div>
  );
};

/* ========= Combined Parent Component (Named Network) ========= */
const Network = () => {
  return (
    <div className="linkedin-network-page">
      {/* Original Manage My Network Section */}
      <ManageMyNetwork />
      {/* Grow Section */}
      <Grow />
      {/* Catch Up Section */}
      <CatchUp />
    </div>
  );
};

export default Network;
