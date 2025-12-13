import { BrowserHistory } from "../../src/excercise/BrowserHistory";

describe("BrowserHistory", () => {
    let history: BrowserHistory;

    beforeEach(() => {
        history = new BrowserHistory();
    });

    test("initial state returns nulls", () => {
        expect(history.getCurrentPage()).toBeNull();
        expect(history.goBack()).toBeNull();
        expect(history.goForward()).toBeNull();
    });

    test("visitPage sets current to the latest page", () => {
        history.visitPage("a.com");
        expect(history.getCurrentPage()).toBe("a.com");

        history.visitPage("b.com");
        expect(history.getCurrentPage()).toBe("b.com");
    });

    test("goBack and goForward traverse history", () => {
        history.visitPage("a.com");
        history.visitPage("b.com");
        history.visitPage("c.com");

        expect(history.goBack()).toBe("b.com");
        expect(history.getCurrentPage()).toBe("b.com");

        expect(history.goBack()).toBe("a.com");
        expect(history.goBack()).toBeNull(); // already at the oldest
        expect(history.getCurrentPage()).toBe("a.com");

        expect(history.goForward()).toBe("b.com");
        expect(history.goForward()).toBe("c.com");
        expect(history.goForward()).toBeNull(); // already at the newest
        expect(history.getCurrentPage()).toBe("c.com");
    });

    test("visiting after going back clears forward history", () => {
        history.visitPage("a.com");
        history.visitPage("b.com");
        history.visitPage("c.com");

        expect(history.goBack()).toBe("b.com"); // now current at b

        history.visitPage("d.com"); // should drop forward history (c.com)

        expect(history.getCurrentPage()).toBe("d.com");
        expect(history.goForward()).toBeNull(); // c.com should be gone

        expect(history.goBack()).toBe("b.com");
        expect(history.goForward()).toBe("d.com");
    });
});
