import React from 'react';
import { FaTasks, FaBell, FaChartBar, FaUsers, FaCog } from 'react-icons/fa';

const SideNavbar = () => {
  return (
    <div style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#2f3b4c',
      padding: '20px',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <div>
        <div style={{ marginBottom: '40px', fontSize: '24px' }}>Company</div>
        <div style={{ marginBottom: '20px' }}>
          <FaTasks style={{ marginRight: '10px' }} />
          Tasks
        </div>
        <div style={{ marginBottom: '20px' }}>
          <FaBell style={{ marginRight: '10px' }} />
          Notifications
        </div>
        <div style={{ marginBottom: '20px' }}>
          <FaChartBar style={{ marginRight: '10px' }} />
          Analytics
        </div>
        <div style={{ marginBottom: '20px' }}>
          <FaUsers style={{ marginRight: '10px' }} />
          Team
        </div>
      </div>
      <div>
        <FaCog style={{ marginRight: '10px' }} />
        Settings
      </div>
    </div>
  );
};

export default SideNavbar;
