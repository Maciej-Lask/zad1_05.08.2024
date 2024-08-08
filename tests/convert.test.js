const { convert } = require('../utils/convert');

document.getElementById = jest.fn((id) => {
  if (id === 'input') {
    return {
      value: '',
    };
  }
  if (id === 'output') {
    return { textContent: '' };
  }
});

describe('convert', () => {
  it('should return a string ', () => {
    expect(typeof convert()).toBe('string');
  });
  it('should convert data 1 correctly', () => {
    document.getElementById.mockReturnValueOnce({
      value:
        'array(6) { ["klucz"]=> string(7) "wartosc" ["klucz2"]=> string(8) "wartosc2" ["klocz_int"]=> int(312) ["klucz_float"]=> float(4.12) ["klucz_bool_tak"]=> bool(true) ["klucz_bool_nie"]=> bool(false) }',
    });

    const expectedOutput =
      `$result = [];\n` +
      `$result['klucz'] = 'wartosc';\n` +
      `$result['klucz2'] = 'wartosc2';\n` +
      `$result['klocz_int'] = 312;\n` +
      `$result['klucz_float'] = 4.12;\n` +
      `$result['klucz_bool_tak'] = true;\n` +
      `$result['klucz_bool_nie'] = false;\n`;

    expect(convert()).toBe(expectedOutput);
  });

  it('should convert data 2 correctly', () => {
    document.getElementById.mockReturnValueOnce({
      value: `
        array(3) {
          ["klucz"]=>
          string(7) "wartosc"
          ["klucz2"]=>
          string(8) "wartosc2"
          ["klucz31"]=>
          array(1) {
            ["klucz31"]=>
            string(9) "wartosc31"
          }
        }
      `,
    });

    const expectedOutput =
      `$result = [];\n` +
      `$result['klucz'] = 'wartosc';\n` +
      `$result['klucz2'] = 'wartosc2';\n` +
      `$result['klucz31'] = [];\n` +
      `   $result['klucz31']['klucz31'] = 'wartosc31';\n`;

    expect(convert()).toBe(expectedOutput);
  });

  it('should convert data 3 correctly', () => {
    document.getElementById.mockReturnValueOnce({
      value: `
          array(3) {
            ["klucz"]=>
            string(7) "wartosc"
            [0]=>
            array(2) {
              [0]=>
              array(3) {
                ["zagniezdzony_klucz"]=>
                string(21) "zagniezdzona_wartosc1"
                ["zagniezdzony_bool"]=>
                bool(true)
                ["zagniezdzony_float"]=>
                float(6.34)
              }
              [1]=>
              array(3) {
                ["zagniezdzony_klucz"]=>
                string(21) "zagniezdzona_wartosc2"
                ["zagniezdzony_bool"]=>
                bool(false)
                ["zagniezdzony_float"]=>
                float(1.34)
              }
            }
            ["moje_liczby"]=>
            array(5) {
              [0]=>
              int(3)
              [1]=>
              int(4)
              [2]=>
              int(1)
              [3]=>
              int(5)
              [4]=>
              int(7)
            }
          }
        `,
    });

    const expectedOutput =
      `$result = [];\n` +
      `$result['klucz'] = 'wartosc';\n` +
      `$result[0] = [];\n` +
      `   $result[0][0] = [];\n` +
      `      $result[0]['zagniezdzony_klucz'] = 'zagniezdzona_wartosc1';\n` +
      `      $result[0]['zagniezdzony_bool'] = true;\n` +
      `      $result[0]['zagniezdzony_float'] = 6.34;\n` +
      `   $result[0][1] = [];\n` +
      `      $result[1]['zagniezdzony_klucz'] = 'zagniezdzona_wartosc2';\n` +
      `      $result[1]['zagniezdzony_bool'] = false;\n` +
      `      $result[1]['zagniezdzony_float'] = 1.34;\n` +
      `$result['moje_liczby'] = [];\n` +
      `   $result['moje_liczby'][0] = 3;\n` +
      `   $result['moje_liczby'][1] = 4;\n` +
      `   $result['moje_liczby'][2] = 1;\n` +
      `   $result['moje_liczby'][3] = 5;\n` +
      `   $result['moje_liczby'][4] = 7;\n`;

    expect(convert()).toBe(expectedOutput);
  });
});
