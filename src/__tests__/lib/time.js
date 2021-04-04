import { getMinutesAndSecondsFromDurationInSeconds } from "../../lib/time";

describe("getMinutesAndSecondsFromDurationInSeconds", () => {
    it("works for 30", () => {
        expect(getMinutesAndSecondsFromDurationInSeconds(30)).toEqual([0, 30]);
    })
});