const { generatePHP } = require('../utils/generatePHP');

describe('generatePHP', () => {
  it('should generate PHP code for a simple object', () => {
    const input = {
      klucz: "'wartosc'",
      klucz2: "'wartosc2'",
      klocz_int: 312,
      klucz_float: 4.12,
      klucz_bool_tak: 'true',
      klucz_bool_nie: 'false',
    };

    const expectedOutput =
      `$result = [];\n` +
      `$result['klucz'] = 'wartosc';\n` +
      `$result['klucz2'] = 'wartosc2';\n` +
      `$result['klocz_int'] = 312;\n` +
      `$result['klucz_float'] = 4.12;\n` +
      `$result['klucz_bool_tak'] = true;\n` +
      `$result['klucz_bool_nie'] = false;\n`;

    expect(generatePHP(input)).toEqual(expectedOutput);
  });
  it('should handle nested objects', () => {
    const input = {
      level1: {
        level2: {
          key: 'value',
        },
      },
    };

    const expectedOutput =
      `$result = [];\n` +
      `$result['level1'] = [];\n` +
      `   $result['level1']['level2'] = [];\n` +
      `      $result['level2']['key'] = value;\n`;

    expect(generatePHP(input)).toEqual(expectedOutput);
  });

  it('should handle array keys', () => {
    const input = {
      1: 'value1',
      2: 'value2',
      level: {
        3: 'value3',
      },
    };

    const expectedOutput =
      `$result = [];\n` +
      `$result1 = value1;\n` +
      `$result2 = value2;\n` +
      `$result['level'] = [];\n` +
      `   $result['level']3 = value3;\n`;

    expect(generatePHP(input)).toEqual(expectedOutput);
  });

  it('should handle mixed keys', () => {
    const input = {
      key1: 'value1',
      2: 'value2',
      nested: {
        3: 'value3',
      },
    };

    const expectedOutput =
      `$result = [];\n` +
      `$result2 = value2;\n` +
      `$result['key1'] = value1;\n` +
      `$result['nested'] = [];\n` +
      `   $result['nested']3 = value3;\n`;

    expect(generatePHP(input)).toEqual(expectedOutput);
  });

  it('should handle empty objects', () => {
    const input = {};

    const expectedOutput = `$result = [];\n`;

    expect(generatePHP(input)).toEqual(expectedOutput);
  });
});
