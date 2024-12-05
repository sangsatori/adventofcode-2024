import { Solver } from "./utils.ts";

const re = /(?<before>\d+)\|(?<after>\d+)/g;

const fn: Solver<number> = async (lines) => {
    const result: [number, number] = [0, 0];

    {
        const rules: Map<string, Set<string>> = new Map();
        let isParsingRules = true;
        for await (const line of lines) {
            // no need to parse as numbers yet - it's all just tokenization

            if (isParsingRules) // pt. 1: parsing & building rules
            if (line.length) for (const { groups: { before, after } = {}} of line.matchAll(re)) {
                if (!rules.has(after))
                    rules.set(after, new Set());
                rules.get(after)?.add(before);
            } else {
                isParsingRules = false;
                continue;
            } else { // pt. 2: validating page sequences
                const tokens = line.split(',');
                let isValid = true;

                positionValidation:
                for (let position = 0; position < tokens.length; position++) {
                    const token = tokens[position];

                    if (rules.has(token)) for (const mustPrecede of rules.get(token) ?? []) {
                        const mustPrecedeIndex = tokens.indexOf(mustPrecede);
                        if (mustPrecedeIndex > -1 && mustPrecedeIndex > position) {
                            isValid = false; // invalidated
                            break positionValidation;
                        } // else we're good, continue checkining
                    }
                }

                if (!isValid) tokens.sort((after, before) => 
                    rules.get(before)?.has(after) ? -1 : 1);

                result[isValid ? 0 : 1] += Number.parseInt(tokens[(tokens.length-1) / 2]);
            }
        }
    }

    return result;
}

export default fn;
