import { useState } from "react";
import { BrowserHistory } from "./excercise/BrowserHistory";

const BrowserHistoryComponent = () => {
  const [history] = useState(() => new BrowserHistory());
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  const visitPage = () => {
    const newPage = `Page ${Math.floor(Math.random() * 100)}`;
    history.visitPage(newPage);
    setCurrentPage(history.getCurrentPage());
  };

  const goBack = () => {
    setCurrentPage(history.goBack());
  };

  const goForward = () => {
    setCurrentPage(history.goForward());
  };

  return (
    <div className="card">
      <h2 className="title">Custom Browser History</h2>
      <div>
        <p className="label">Current Page:</p>
        <p className="value">{currentPage || "No Page Yet"}</p>
      </div>
      <div className="row">
        <button onClick={visitPage} className="button button-primary" type="button">
          Visit New Page
        </button>
        <button onClick={goBack} className="button" type="button">
          Back
        </button>
        <button onClick={goForward} className="button" type="button">
          Forward
        </button>
      </div>
    </div>
  );
};

function App() {
  return <BrowserHistoryComponent />;
}

export default App;
