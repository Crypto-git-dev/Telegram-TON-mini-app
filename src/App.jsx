import React, { useState } from 'react';
import './App.css'; // Подключите ваш файл CSS

const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe.user;

async function GetApp(userid){
  let url = "http//mew//govno//ya//pisun//" + userid
  let response = await fetch(url);

  if (response.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    let json = await response.json();
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
  return json
}

function App() {
  const [activeMenu, setActiveMenu] = useState('home');
  const [showProfileMenu, setShowProfileMenu] = useState(false);  
  const [contentAnimation, setContentAnimation] = useState('');

  const renderContent = () => {
    switch (activeMenu) {
      case 'home':
        return <HomeMenu />;
      case 'details':
        return <DetailsMenu />;
      case 'nft':
        return <NFTMenu />;
      case 'other':
        return <OtherMenu />;
      case 'profile':
        return <ProfileMenu show={showProfileMenu} toggleMenu={() => setShowProfileMenu(!showProfileMenu)} />;
      default:
        return <HomeMenu />;
    }
  };

  const handleMenuChange = (menu) => {
    if (activeMenu !== menu) {
      setContentAnimation('hide');
      setTimeout(() => {
        setActiveMenu(menu);
        setContentAnimation('');
      }, 200); // Задержка должна быть равна длительности анимации slideOut
    }
  };

  return (
    <div className="App">
      <div className={`content ${contentAnimation}`}>
        {renderContent()}
      </div>
      <div className="bottom-bar">
        <button onClick={() => handleMenuChange('home')}>
          <img src="imgs/icon.png" alt="Home" />
        </button>
        <button onClick={() => handleMenuChange('details')}>
          <img src="imgs/icon.png" alt="Details" />
        </button>
        <button onClick={() => handleMenuChange('nft')}>
          <img src="imgs/icon.png" alt="NFT" />
        </button>
        <button onClick={() => handleMenuChange('other')}>
          <img src="imgs/icon.png" alt="Other" />
        </button>
        <button onClick={() => handleMenuChange('profile')}>
          <img src="/imgs/icon.png" alt="Profile" />
        </button>
      </div>
    </div>
  );
}

function HomeMenu() {
  return (
    <div>
      <h1>Home Menu</h1>
      {/* Вставьте ваш контент здесь */}
    </div>
  );
}

function DetailsMenu() {
  return (
    <div>
      <h1>Details Menu</h1>
      {/* Вставьте ваш контент здесь */}
    </div>
  );
}

function NFTMenu() {
  return (
    <div>
      <h1>NFT Menu</h1>
      {/* Вставьте ваш контент здесь */}
    </div>
  );
}

function OtherMenu() {
  return (
    <div>
      <h1>Other Menu</h1>
      {/* Вставьте ваш контент здесь */}
    </div>
  );
}

function ProfileMenu({ show, toggleMenu }) {
  return (
    <div className={`profile-menu ${show ? 'show' : ''}`}>
      <h1>Профиль</h1>
      <p>Firstname: {user.first_name}</p>
      <p>User ID: {user.id}</p>
      <p>Username: {user.username}</p>
      <p>language_code: {GetApp(user.id)}</p>
    </div>
  );
}

export default App;
