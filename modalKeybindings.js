function toggleConfigPopup() {
  let popupCurrentState = CONFIGPOPUP.classList.contains("active");

  if (popupCurrentState == true) {
    CONFIGPOPUP.classList.remove("active");
    addMainGameListener();
    removeConfigPopupListener();
  } else {
    CONFIGPOPUP.classList.add("active");
    initaliseConfigPopupInputs();
    removeMainGameListener();
    addConfigPopupListener();
    TEMPARROWKEYS = Object.assign({}, CONFIG.arrowKeys);
  }
}

const SettingsModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [settings, setSettings] = React.useState({
    myName: localStorage.getItem("myName") || "",
    unwantedStratagems:
      JSON.parse(localStorage.getItem("unwantedStratagems")) || [],
  });

  const handleSettingsOpen = () => setIsOpen(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "unwantedStratagems") {
      setSettings((prev) => ({
        ...prev,
        [name]: value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      }));
    } else {
      setSettings((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    localStorage.setItem("myName", settings.myName);
    localStorage.setItem(
      "unwantedStratagems",
      JSON.stringify(settings.unwantedStratagems)
    );
    setIsOpen(false);
    // You might want to trigger a refresh of the main game component here
  };

  return (
    <div>
      <div className="game-config-popup-container" id="game-config-popup">
        <div className="game-config-popup">
          <p className="game-config-popup__title">Change Keybindings</p>
          <div className="game-config-popup__key-bindings">
            <div className="key-bind-container key-bind-container--up">
              <p>
                <img
                  className="arrow-image"
                  src="data/Images/Arrows/U - Copy.png"
                />
              </p>
              <input name="up" type="text" />
            </div>
            <div className="key-bind-container key-bind-container--left">
              <p>
                <img
                  className="arrow-image"
                  src="data/Images/Arrows/L - Copy.png"
                />
              </p>
              <input name="left" type="text" />
            </div>
            <div className="key-bind-container key-bind-container--down">
              <p>
                <img
                  className="arrow-image"
                  src="data/Images/Arrows/D - Copy.png"
                />
              </p>
              <input name="down" type="text" />
            </div>
            <div className="key-bind-container key-bind-container--right">
              <p>
                <img
                  className="arrow-image"
                  src="data/Images/Arrows/R - Copy.png"
                />
              </p>
              <input name="right" type="text" />
            </div>
          </div>
          <div className="game-config-popup__action-buttons">
            <button
              role="button"
              data-action-type="game-config--save"
              className="button save-button"
            >
              save
            </button>
            <button
              role="button"
              data-action-type="game-config--close"
              className="button close-button"
            >
              close
            </button>
          </div>
        </div>
      </div>

      <div className="info__config-actions-container">
        <button onClick={toggleConfigPopup} className="settings-button button">
          Bindings
        </button>
        <button onClick={handleSettingsOpen} className="settings-button button">
          Settings
        </button>
      </div>

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
                value={settings.unwantedStratagems.join(", ")}
                onChange={handleChange}
                placeholder="Enter stratagem names, separated by commas"
              />
            </div>
            <div className="settings-actions">
              <button onClick={handleSave} className="save-button">
                Save
              </button>
              <button onClick={handleClose} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Render the SettingsModal component
ReactDOM.render(<SettingsModal />, document.getElementById("react-settings"));
console.log("SettingsModal rendered");

CONFIGPOPUP = document.getElementById("game-config-popup");
