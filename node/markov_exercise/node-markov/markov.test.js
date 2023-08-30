const {MarkovMachine} = require('./markov');

describe('markov machine', () => {
    test('', () => {
        let marMachine = new MarkovMachine("a b c a B a C");

        expect(marMachine.chain)
        .toEqual(new Map([
            ["a", ["b", "B", "C"]],
            ["b", ["c"]],
            ["c", ["a"]],
            ["B", ["a"]],
            ["C", [null]]
        ]));
    });

    test('make sure randidx picks from a array', () => {
        expect(MarkovMachine
        .randomIdx([1,1,1]))
        .toEqual(1);
        expect([1,2,3])
        .toContain(MarkovMachine
        .randomIdx([1,2,3]));
    });

    test('generates text', () => {
        let marMachine = new MarkovMachine("a b c");
        let text = marMachine.makeText();
        expect(["a b c","b c", "c"])
        .toContain(text);
    });
});