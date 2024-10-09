import { error, customError, CustomError } from './throwFunction';

test('error가 잘 난다', () => {
    expect(() => error()).toThrow(Error);
    expect(() => customError()).toThrow(CustomError);
});

test('error가 잘 난다(try/catch)', () => {
    try {
        error();
    } catch (err) {
        expect(err).toStrictEqual(new Error());
    }
});
