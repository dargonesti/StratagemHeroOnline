const SettingsModal = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [settings, setSettings] = React.useState({
      myName: localStorage.getItem('myName') || '',
      unwantedStratagems: JSON.parse(localStorage.getItem('unwantedStratagems')) || [],
    });
  
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'unwantedStratagems') {
        setSettings(prev => ({
          ...prev,
          [name]: value.split(',').map(s => s.trim()).filter(Boolean)
        }));
      } else {
        setSettings(prev => ({ ...prev, [name]: value }));
      }
    };
  
    const handleSave = () => {
      localStorage.setItem('myName', settings.myName);
      localStorage.setItem('unwantedStratagems', JSON.stringify(settings.unwantedStratagems));
      handleClose();
      // You might want to trigger a refresh of the main game component here
    };
  
    return (
      <div className="settings-container">
        <button onClick={handleOpen} className="settings-button">Settings</button>
        {isOpen && (
          <div className="settings-modal">
            <div className="settings-content">
              <h2>Game Settings</h2>
              <div className="setting-item">
                <label htmlFor="myName">My Name:</label>
                <input
                  type="text"
                  id="myName"
                  name="myName"
                  value={settings.myName}
                  onChange={handleChange}
                />
              </div>
              <div className="setting-item">
                <label htmlFor="unwantedStratagems">Unwanted Stratagems:</label>
                <input
                  type="text"
                  id="unwantedStratagems"
                  name="unwantedStratagems"
                  value={settings.unwantedStratagems.join(', ')}
                  onChange={handleChange}
                  placeholder="Enter stratagem names, separated by commas"
                />
              </div>
              <div className="settings-actions">
                <button onClick={handleSave} className="save-button">Save</button>
                <button onClick={handleClose} className="cancel-button">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Render the SettingsModal component
  ReactDOM.render(<SettingsModal />, document.getElementById('react-settings'));
  console.log("SettingsModal rendered");