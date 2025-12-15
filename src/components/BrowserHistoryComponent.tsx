import { useState } from "react";
import { BrowserHistory } from "../datastructure/List/DoublyLinkedList/excercise/BrowserHistory";

export const BrowserHistoryComponent = () => {
  const [history] = useState(() => new BrowserHistory());
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  const visitPage = () => {
    const newPage = `Page ${Math.floor(Math.random() * 100)}`;
    history.visitPage(newPage);
    setCurrentPage(history.getCurrentPage());
  };

  const goBack = () => {
    history.goBack();
    setCurrentPage(history.getCurrentPage());
  };

  const goForward = () => {
    history.goForward();
    setCurrentPage(history.getCurrentPage());
  };

  const canGoBack = history.canGoBack();
  const canGoForward = history.canGoForward();
  const isEmpty = history.isEmpty();

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
        <button onClick={goBack} className="button" type="button" disabled={isEmpty || !canGoBack}>
          Back
        </button>
        <button onClick={goForward} className="button" type="button" disabled={isEmpty || !canGoForward}>
          Forward
        </button>
      </div>
    </div>
  );
};
