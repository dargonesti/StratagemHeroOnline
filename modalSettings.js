function toggleSettingsPopup() {
  let popupCurrentState = SETTINGS_MODALE.classList.contains("active");

  if (popupCurrentState == true) {
    SETTINGS_MODALE.classList.remove("active");
    addMainGameListener();
    removeConfigPopupListener();
  } else {
    SETTINGS_MODALE.classList.add("active");
    initaliseConfigPopupInputs();
    removeMainGameListener();
    addConfigPopupListener();
    TEMPARROWKEYS = Object.assign({}, CONFIG.arrowKeys);
  }
}

function usePersistantState(key, initialValue) {
   const [state, setInternalState] = React.useState(initialValue);

   React.useEffect(() => {
       const value = localStorage.getItem(key);

       if (!value) return;

       setInternalState(JSON.parse(value));
   }, [key]);

   const setState = (value: T) => {
       localStorage.setItem(key, JSON.stringify(value));
       setInternalState(value);
   };

   return [state, setState];
};

const SettingsModal = () => {  
  const [loadout, setLoadout] = usePersistantState("stratagemsLoadout", []);
  const [timescale, setTimescale] = usePersistantState("timescale", 1);

  React.useEffect(() => {
    if(timescale <= 0)
      setTimescale(1);
    if(loadout.length === 0 && stratagems.length > 0)
    {
      setLoadout(stratagems);
    }
  }, [loadout, timescale]);

  const onSave = () =>{
    toggleSettingsPopup();
  };

  return (
      <div className="game-config-popup-container" id="game-settings-popup">
        <div className="game-config-popup">
          <p className="game-config-popup__title">Settings</p>
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
              onClick={onSave}
              className="button save-button"
            >
              save
            </button>
            <button
              role="button"
              onClick={toggleSettingsPopup} 
              className="button close-button"
            >
              close
            </button>
          </div>
        </div>
      </div>
  );
};