const { convertToMultiline } = require('../utils/convertToMultiline');

describe('convertToMultiline', () => {
  it('should return string', () => {
    expect(typeof convertToMultiline('')).toBe('string');
  });
  it('should return an empty string for an empty input', () => {
    expect(convertToMultiline('')).toEqual('');
  });
  it('should format nested objects correctly', () => {
    const input = `
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
    `;
    const expectedOutput = `
      array(3)
{
  ["klucz"]=>
  string(7)"wartosc"
  ["klucz2"]=>
  string(8)"wartosc2"
  ["klucz31"]=>
  array(1)
  {
    ["klucz31"]=>
    string(9)"wartosc31"
  }
}
    `.trim();
    expect(convertToMultiline(input).trim()).toEqual(expectedOutput);
  });

  it('should format various data types correctly', () => {
    const input = `
      array(6) {
        ["klucz"]=>
        string(7) "wartosc"
        ["klucz2"]=>
        string(8) "wartosc2"
        ["klocz_int"]=>
        int(312)
        ["klucz_float"]=>
        float(4.12)
        ["klucz_bool_tak"]=>
        bool(true)
        ["klucz_bool_nie"]=>
        bool(false)
      }
    `;
    const expectedOutput = `
      array(6)
{
  ["klucz"]=>
  string(7)"wartosc"
  ["klucz2"]=>
  string(8)"wartosc2"
  ["klocz_int"]=>
  int(312)
  ["klucz_float"]=>
  float(4.12)
  ["klucz_bool_tak"]=>
  bool(true)
  ["klucz_bool_nie"]=>
  bool(false)
}
    `.trim();
    expect(convertToMultiline(input).trim()).toEqual(expectedOutput);
  });

  it('should handle empty data correctly', () => {
    const input = 'array(0) {}';
    const expectedOutput = `array(0)
{
}
`.trim();
    expect(convertToMultiline(input).trim()).toEqual(expectedOutput);
  });

  it('should return an error for unmatched closing curly bracket', () => {
    const input = 'array(1) { ["klucz"]=> string(7) "wartosc" } }';
    expect(convertToMultiline(input)).toEqual(
      'Error: Unmatched closing curly bracket }'
    );
  });

  it('should return an error for unmatched opening curly bracket', () => {
    const input = 'array(1) { { ["klucz"]=> string(7) "wartosc" }';
    expect(convertToMultiline(input)).toEqual(
      'Error: Unmatched opening curly bracket {'
    );
  });

  it('should return an error for unmatched closing round bracket', () => {
    const input = 'array(1) ( ["klucz"]=> string(7) "wartosc" ) )';
    expect(convertToMultiline(input)).toEqual(
      'Error: Unmatched closing round bracket )'
    );
  });

  it('should return an error for unmatched opening round bracket', () => {
    const input = 'array(1) ( ( ["klucz"]=> string(7) "wartosc" )';
    expect(convertToMultiline(input)).toEqual(
      'Error: Unmatched opening round bracket ('
    );
  });

  it('should return an error for unmatched closing square bracket', () => {
    const input = 'array(1) [ ["klucz"]=> string(7) "wartosc" ] ]';
    expect(convertToMultiline(input)).toEqual(
      'Error: Unmatched closing square bracket ]'
    );
  });

  it('should return an error for unmatched opening square bracket', () => {
    const input = 'array(1) [ [ ["klucz"]=> string(7) "wartosc" ]';
    expect(convertToMultiline(input)).toEqual(
      'Error: Unmatched opening square bracket ['
    );
  });

  
});
