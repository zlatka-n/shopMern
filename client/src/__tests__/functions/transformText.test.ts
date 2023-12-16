import {
  formatCamelCaseWord,
  setFirsLetterUpperCase,
} from '../../shared/utils';

describe('Text transformation', () => {
  test('set first letter to upper case', () => {
    const result = setFirsLetterUpperCase('hello');

    expect(result).toBe('Hello');
  });

  test('split camel case text with first letter uppercase', () => {
    const result = formatCamelCaseWord('helloWorld');

    expect(result).toBe('Hello world');
  });
});
