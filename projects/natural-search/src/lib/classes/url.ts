import { isString } from 'lodash';
import { NaturalSearchSelections } from '../types/Values';

export function toUrl(selections: NaturalSearchSelections): string {

    const s = deepClone(selections);
    for (const a of s) {
        for (const b of a) {
            b['f'] = b.field;
            b['c'] = b.condition;

            delete b.field;
            delete b.condition;
        }
    }

    return JSON.stringify(s);
}

export function fromUrl(selections: string): NaturalSearchSelections {
    const s = JSON.parse(selections) as NaturalSearchSelections;

    for (const a of s) {
        for (const b of a) {
            b.field = b['f'];
            b.condition = b['c'];

            delete b['f'];
            delete b['c'];
        }
    }

    return s;
}

function deepClone(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
}
