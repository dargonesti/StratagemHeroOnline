// Logo component
const Logo = () => (
  <div className="logo-container">
    <img className="logo" src="../data/Images/Helldivers_2_logo.webp" alt="Helldivers 2 logo" />
  </div>
);

// Title component
const Title = () => (
  <h1 className="title">
    STRATAGEM HERO ONLINE
  </h1>
);

// GameArea component
const GameArea = () => (
  <div className="interactable-center-container" id="interactable-center-container">
    <h2 className="stratagem-name" id="stratagem-name">
      HI :) You shouldn't see this
    </h2>
    {/* Other game area content */}
  </div>
);

// GameOverPopup component
const GameOverPopup = ({ score, completedStrategems, onPlayAgain }) => (
  <div className="game-over-popup" id="game-over-popup">
    <h1 className="title" id="score-readout">SCORE: {score}</h1>
    <p id="completed-strategems-readout">{completedStrategems}</p>
    {/* Other popup content */}
  </div>
);

// Main App component
const App = () => (
  <React.Fragment>
    <Logo />
    <Title />
    <GameArea />
  </React.Fragment>
);

// Render components using createRoot
const root = document.getElementById('root');
if (root) {
  const reactRoot = ReactDOM.createRoot(root);
  reactRoot.render(<App />);
}

// Function to update GameOverPopup
window.showGameOverPopup = (score, completedStrategems) => {
  const gameOverPopupContainer = document.getElementById('game-over-popup');
  if (gameOverPopupContainer) {
    const popupRoot = ReactDOM.createRoot(gameOverPopupContainer);
    popupRoot.render(
      <GameOverPopup 
        score={score} 
        completedStrategems={completedStrategems} 
        onPlayAgain={() => window.location.reload()} 
      />
    );
    gameOverPopupContainer.hidden = false;
  }
};
