import { describe, expect, it } from "bun:test";
import { parseFirstBadCommit } from "../../src/tools/bisect-output";

const FORTY_HEX = "a1b2c3d4e5f60718293a4b5c6d7e8f9012345678";

describe("parseFirstBadCommit", () => {
	it("extracts the culprit SHA from real git bisect output", () => {
		const output = `${FORTY_HEX} is the first bad commit\ncommit ${FORTY_HEX}\nAuthor: X\n`;
		expect(parseFirstBadCommit(output)).toBe(FORTY_HEX);
	});

	it("accepts the quoted bad term emitted by Git 2.56", () => {
		expect(parseFirstBadCommit(`${FORTY_HEX} is the first 'bad' commit\ncommit ${FORTY_HEX}`)).toBe(FORTY_HEX);
	});

	it("accepts abbreviated SHAs", () => {
		expect(parseFirstBadCommit("abc1234 is the first bad commit")).toBe("abc1234");
	});

	it("returns null before the search has converged", () => {
		expect(parseFirstBadCommit("Bisecting: 3 revisions left to test after this (roughly 2 steps)")).toBeNull();
	});

	it("does not match the phrase mid-line", () => {
		expect(parseFirstBadCommit("note: xyz is the first bad commit reported earlier by hand")).toBeNull();
	});
});

