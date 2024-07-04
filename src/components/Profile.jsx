import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <div className="profile">
      <div className="profile-icon"></div>
      <div className="profile-info">
        <div className="profile-name">Name</div>
        <div className="profile-level">7 lvl</div>
      </div>
    </div>
  );
}

export default Profile;