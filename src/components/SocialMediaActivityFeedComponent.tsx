import { useMemo, useState } from "react";
import { SocialMediaActivityFeed } from "../datastructure/List/SocialMediaActivityFeed/SocialMediaActivityFeed";

export const SocialMediaActivityFeedComponent = () => {
  const feed = useMemo(() => new SocialMediaActivityFeed(), []);
  const [newActivity, setNewActivity] = useState("");
  const [activities, setActivities] = useState<string[]>(() => feed.showActivities());
  const [current, setCurrent] = useState<string | null>(() => feed.getCurrent());
  const [deleteIndex, setDeleteIndex] = useState<number>(0);

  const sync = () => {
    setActivities(feed.showActivities());
    setCurrent(feed.getCurrent());
  };

  const addActivity = () => {
    feed.addActivity(newActivity);
    setNewActivity("");
    feed.resetToHead();
    sync();
  };

  const deleteByIndex = () => {
    feed.deleteActivity(deleteIndex);
    feed.resetToHead();
    sync();
  };

  const resetToHead = () => {
    feed.resetToHead();
    sync();
  };

  const next = () => {
    feed.next();
    sync();
  };

  const prev = () => {
    feed.prev();
    sync();
  };

  const isEmpty = feed.getSize() === 0;
  const canPrev = feed.current?.prev != null;
  const canNext = feed.current?.next != null;

  return (
    <div className="card">
      <h2 className="title">Social Media Activity Feed</h2>

      <div>
        <p className="label">Current Activity:</p>
        <p className="value">{current || "No Activity Yet"}</p>
      </div>

      <div className="row">
        <input
          className="input"
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
          placeholder="Type an activity (like, comment, follow...)"
        />
        <button
          onClick={addActivity}
          className="button button-primary"
          type="button"
          disabled={newActivity.trim() === ""}
        >
          Add
        </button>
      </div>

      <div className="row">
        <button onClick={resetToHead} className="button" type="button" disabled={isEmpty}>
          Reset
        </button>
        <button onClick={prev} className="button" type="button" disabled={isEmpty || !canPrev}>
          Prev
        </button>
        <button onClick={next} className="button" type="button" disabled={isEmpty || !canNext}>
          Next
        </button>
      </div>

      <div className="row">
        <input
          className="input"
          type="number"
          min={0}
          max={Math.max(0, activities.length - 1)}
          value={deleteIndex}
          onChange={(e) => setDeleteIndex(Number(e.target.value))}
          disabled={isEmpty}
        />
        <button onClick={deleteByIndex} className="button" type="button" disabled={isEmpty}>
          Delete Index
        </button>
      </div>

      <div>
        <p className="label">Activities (most recent first):</p>
        {activities.length === 0 ? (
          <p className="value">(empty)</p>
        ) : (
          <div className="list">
            {activities.map((activity, index) => (
              <div className="list-item" key={`${index}-${activity}`}>
                <span className="list-index">{index}.</span>
                <span className="list-text">{activity}</span>
                <button
                  className="button"
                  type="button"
                  onClick={() => {
                    feed.deleteActivity(index);
                    feed.resetToHead();
                    sync();
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

