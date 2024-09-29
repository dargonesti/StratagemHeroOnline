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

const ArrowIcons = ({arrowList}) => {
  return (
    <table className="arrows-table">
      <tbody>
      <tr>
      {arrowList.split("").map((arrow, index) => (
        <td key={Math.random()}>
            <img
              className="arrow-incomplete-filter "
              src={`data/Images/Arrows/${arrow.toUpperCase()} - Copy.png`}
            />
        </td>
      ))}
      </tr>
      </tbody>
    </table>
  );
};

const StratagemToggle = ({name, sequence, image, on, toggleStratagem})=>{

  return (
    <div className="stratagem-toggle">
      <img src={`data/Images/Stratagem Icons/hd2/${image}`} alt={name} className="stratagem-icon" />
      <div className="stratagem-name">{name}</div>
      <div className="stratagem-sequence"><ArrowIcons arrowList={sequence}/></div>
      <div className="stratagem-toggle-switch">
        <label className="switch">
          <input type="checkbox" checked={on} onChange={()=>toggleStratagem(name)} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>);
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

  const toggleStratagem = (stratagemName) => {
    let strat = stratagems.find(strat=>strat.name==stratagemName);
    if(loadout.some(strat=>strat.name==stratagemName))
    {
      setLoadout(loadout.filter(strat=>strat.name!=stratagemName));
    }else
    {
      setLoadout([...loadout, strat]);
    }
  };

  return (
      <div className="game-config-popup-container" id="game-settings-popup">
        <div className="game-config-popup">
          <p className="game-config-popup__title">Settings</p>
          <div className="game-config-popup__key-bindings">
            {stratagems.map((stratagem) => (
              <StratagemToggle key={stratagem.name} {...stratagem} 
              on={loadout.some(strat=>strat.name==stratagem.name)} toggleStratagem={toggleStratagem} />
            ))}
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