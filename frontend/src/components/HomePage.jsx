import { useState } from 'react';
import '../App.css';
import ApiExample from './ApiExample.jsx';
import { useNavigate, Link } from 'react-router-dom';
import aniAideLogo from './icon/Ani-Aide_logo.webp';
import aniAideIcon from './icon/Ani-Aide.webp';

function HomePage() {
  const [showApiExample, setShowApiExample] = useState(false);
  const navigate = useNavigate();

  const handleButtonShiensyaClick = () => {
    navigate('/supporter/login');
  };

  const handleButtonAdminClick = () => {
    navigate('/admin/login');
  };

  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="homepage-header">
      </header>

      {/* Main Content */}
      <main className="homepage-main">
        <div className="hero-section">
          <div className="hero-content">
            <img src={aniAideIcon} alt="Pet Care" className="hero-image" />
            <h1 className="app-title">Ani-Aide</h1>
            <div className="hero-text">
              <h2>災害時のペット支援をサポート</h2>
              <p>被災者と支援者をつなぐ安心のプラットフォーム</p>
            </div>
          </div>
        </div>

        {/* User Type Selection */}
        <div className="user-selection">
          <h3>ユーザータイプを選択してください</h3>
          <div className="button-group">
            <Link to="/victim/login" className="user-button victim-button">
              <div className="button-content">
                <span className="button-icon">🏠</span>
                <span className="button-text">被災者</span>
                <span className="button-description">支援を求める</span>
              </div>
            </Link>
            <button onClick={handleButtonShiensyaClick} className="user-button supporter-button">
              <div className="button-content">
                <span className="button-icon">🤝</span>
                <span className="button-text">支援者</span>
                <span className="button-description">支援を提供する</span>
              </div>
            </button>
            <button onClick={handleButtonAdminClick} className="user-button admin-button">
              <div className="button-content">
                <span className="button-icon">⚙️</span>
                <span className="button-text">管理者</span>
                <span className="button-description">システム管理</span>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* API Example Button - Bottom Right */}
      <button
        onClick={() => setShowApiExample(!showApiExample)}
        className="api-example-button"
      >
        {showApiExample ? 'Hide' : 'Show'} Axios API Example
      </button>

      {/* API Example Modal */}
      {showApiExample && (
        <div className="api-example-modal">
          <div className="api-example-content">
            <button 
              onClick={() => setShowApiExample(false)}
              className="close-button"
            >
              ×
            </button>
            <ApiExample />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="homepage-footer">
        <p>&copy; 2025 Ani-Aide. ペットと家族の安心をサポートします。</p>
      </footer>
    </div>
  );
}

export default HomePage;