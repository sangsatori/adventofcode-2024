import { Solver } from "./utils.ts";

const re = /(?<before>\d+)\|(?<after>\d+)/g;

const fn: Solver<number> = async (lines) => {
    let sum1 = 0; let sum2 = 0;

    {
        const rules: Map<string, Set<string>> = new Map();
        let isParsingRules = true;
        for await (const line of lines) {
            if (!line.length) {
                isParsingRules = false;
                continue;
            }
    
            if (isParsingRules) { // first part, building rules
                for (const { groups: { before, after } = {}} of line.matchAll(re)) {
                    if (!rules.has(after))
                        rules.set(after, new Set());
                    rules.get(after)?.add(before);
                }
            } else { // second part, parsing and validating
                // we don't even need .map(s => Number.parseInt(s))
                // it's just tokenization at first
                const tokens = line.split(',');
                const positions = tokens.reduce((lookup, token, i) => lookup.set(token, i), new Map());
                let isValid = true;
    
                positionValidation:
                for (const [token, position] of positions) if (rules.has(token))
                    for (const mustPrecede of rules.get(token) ?? [])
                        if (positions.has(mustPrecede))
                        if (positions.get(mustPrecede) > position) {
                            isValid = false; // invalidated
                            break positionValidation;
                        } // else we're good, continue checkining
                if (isValid) 
                    sum1 +=  Number.parseInt(tokens[(tokens.length-1) / 2]);
            }
        }
    }

    return [sum1, 0];
}

export default fn;
