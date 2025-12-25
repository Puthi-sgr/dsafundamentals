import { useEffect, useState } from "react";
import { BrowserHistoryComponent } from "./components/BrowserHistoryComponent";
import { InfiniteImageCarouselComponent } from "./components/InfiniteImageCarouselComponent";
import { LRUCacheComponent } from "./components/LRUCacheComponent";
import { SocialMediaActivityFeedComponent } from "./components/SocialMediaActivityFeedComponent";
import { getRouteFromHash, setRoute, type RouteId } from "./routes";

function App() {
  const [route, setRouteState] = useState<RouteId>(() => getRouteFromHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRouteState(getRouteFromHash(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const content =
    route === "browser-history" ? (
      <BrowserHistoryComponent />
    ) : route === "infinite-carousel" ? (
      <InfiniteImageCarouselComponent />
    ) : route === "activity-feed" ? (
      <SocialMediaActivityFeedComponent />
    ) : (
      <LRUCacheComponent />
    );

  return (
    <div className="layout">
      <nav className="nav">
        <a
          className="nav-link"
          href="#/browser-history"
          aria-current={route === "browser-history" ? "page" : undefined}
          onClick={(e) => {
            e.preventDefault();
            setRoute("browser-history");
          }}
        >
          Browser History
        </a>
        <a
          className="nav-link"
          href="#/infinite-carousel"
          aria-current={route === "infinite-carousel" ? "page" : undefined}
          onClick={(e) => {
            e.preventDefault();
            setRoute("infinite-carousel");
          }}
        >
          Infinite Carousel
        </a>
        <a
          className="nav-link"
          href="#/lru-cache"
          aria-current={route === "lru-cache" ? "page" : undefined}
          onClick={(e) => {
            e.preventDefault();
            setRoute("lru-cache");
          }}
        >
          LRU Cache
        </a>
        <a
          className="nav-link"
          href="#/activity-feed"
          aria-current={route === "activity-feed" ? "page" : undefined}
          onClick={(e) => {
            e.preventDefault();
            setRoute("activity-feed");
          }}
        >
          Activity Feed
        </a>
      </nav>
      {content}
    </div>
  );
}

export default App;
