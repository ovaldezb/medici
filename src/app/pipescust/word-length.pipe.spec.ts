import { WordLengthPipe } from './word-length.pipe';

describe('WordLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new WordLengthPipe();
    expect(pipe).toBeTruthy();
  });
});
