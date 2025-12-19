import { useState } from "react";
import { LRUCache } from "../datastructure/List/LRUCache/LRUCache";

export const LRUCacheComponent = () => {
    const [cache] = useState(() => new LRUCache<string, string>(3));
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const [lastGet, setLastGet] = useState<string | null>(null);
    const [, refresh] = useState(0);

    const doPut = () => {
        if (!key) return;
        cache.put(key, value);
        refresh((n) => n + 1);
    };

    const doGet = () => {
        if (!key) return;
        const v = cache.get(key);
        setLastGet(v === null ? null : String(v));
        refresh((n) => n + 1);
    };

    const clearInputs = () => {
        setKey("");
        setValue("");
    };

    const entries = cache.entries();

    return (
        <div className="card">
            <h2 className="title">LRU Cache (simple UI)</h2>

            <div>
                <label className="label">Key</label>
                <input className="input" value={key} onChange={(e) => setKey(e.target.value)} />
            </div>
            <div>
                <label className="label">Value</label>
                <input className="input" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>

            <div className="row">
                <button onClick={doPut} className="button button-primary">
                    Put
                </button>
                <button onClick={doGet} className="button">
                    Get
                </button>
                <button onClick={clearInputs} className="button">
                    Clear
                </button>
            </div>

            <div>
                <p className="label">Last Get:</p>
                <p className="value">{lastGet ?? "(null)"}</p>
            </div>

            <div>
                <p className="label">Cache size:</p>
                <p className="value">{cache.getSize()}</p>
            </div>

            <div>
                <p className="label">Entries (MRU → LRU):</p>
                <ul>
                    {entries.map((e) => (
                        <li key={String(e.key)}>
                            {String(e.key)}: {String(e.value)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
