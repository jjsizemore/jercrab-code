// Git 2.56 quotes the term; older versions emit it without quotes.
const FIRST_BAD_RE = /^([0-9a-f]{7,40}) is the first (?:bad|'bad') commit$/m;

/** Parse the culprit SHA from `git bisect good|bad` output, or null when not yet converged. */
export function parseFirstBadCommit(output: string): string | null {
	const match = FIRST_BAD_RE.exec(output);
	return match ? match[1]! : null;
}
