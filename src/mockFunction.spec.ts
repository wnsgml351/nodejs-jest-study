import { obj } from './mockFunction';

test('obj.minus 함수가 1번 호출되었다 (spy 삽입)', () => {
    // const spyFn = jest.spyOn(obj, 'minus');
    jest.spyOn(obj, 'minus');
    const result = obj.minus(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).toBe(-1);
    /*
    spyFn.mockClear(); // Times, With 초기화
    spyFn.mockReset(); // mockClear + mockImplementation(() => {})
    */
    // spyFn.mockRestore(); // 아예 전부 없애버림
});

test('obj.minus에 스파이를 심고 실행도 안되게', () => {
    jest.spyOn(obj, 'minus').mockImplementation();
    const result = obj.minus(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).not.toBe(-1);
});

test('obj.minus에 스파이를 심고 리턴값을 바꾸게', () => {
    jest.spyOn(obj, 'minus').mockImplementation((a, b) => a + b);
    const result = obj.minus(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).toBe(3);
});

test('obj.minus에 스파이를 심고 리턴값이 서로 다르게 나오게', () => {
    jest.spyOn(obj, 'minus')
        .mockImplementationOnce((a, b) => a + b)
        .mockImplementationOnce(() => 5);
    const result1 = obj.minus(1, 2);
    const result2 = obj.minus(1, 2);
    const result3 = obj.minus(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(3);
    expect(result1).toBe(3);
    expect(result2).toBe(5);
    expect(result3).toBe(-1);
    // spyFn.mockRestore();
});

test('obj.minus에 스파이를 심고 리턴값이 서로 다르게 나오게(mockReturnValue)', () => {
    jest.spyOn(obj, 'minus').mockReturnValue(5);
    const result1 = obj.minus(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result1).toBe(5);
    // spyFn.mockRestore();
});

test('obj.minus에 스파이를 심고 리턴값이 서로 다르게 나오게(mockReturnValueOnce)', () => {
    jest.spyOn(obj, 'minus').mockReturnValueOnce(5).mockReturnValueOnce(3).mockReturnValue(8);
    const result1 = obj.minus(1, 2);
    const result2 = obj.minus(1, 2);
    const result3 = obj.minus(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(3);
    expect(result1).toBe(5);
    expect(result2).toBe(3);
    expect(result3).toBe(8);
});

beforeAll(() => {
    console.log('이 파일의 준비사항 실행');
});

beforeEach(() => {
    console.log('각 테스트 전에 실행됨');
});

afterEach(() => {
    console.log('각 테스트 후에 실행됨');
    jest.restoreAllMocks();
});

afterAll(() => {
    console.log('모든 테스트가 끝난 후');
});
