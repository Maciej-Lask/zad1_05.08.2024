// const { convertToMultiline } = require('./convertToMultiline.js');
// const { generatePHP } = require('./generatePHP.js');

function convert() {
  // Get input element
  const input = document.getElementById('input');
  const inputMultiline = convertToMultiline(input.value);

  // Initialize variables
  let stack = [];
  let current = {};
  let key = '';

  // Split input into lines and remove empty lines
  const lines = inputMultiline
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  // Iterate over lines
  lines.forEach((line) => {
    // Handle array start
    if (line.startsWith('array')) {
      let newObj = {};
      if (Object.keys(current).length !== 0 || stack.length > 0) {
        stack.push({ obj: current, key });
      }
      current = newObj;
    }
    // Handle array end
    else if (line.startsWith('}')) {
      if (stack.length > 0) {
        const parent = stack.pop();
        if (!parent.key) {
          parent.obj.push(current);
        } else {
          parent.obj[parent.key] = current;
        }
        current = parent.obj;
        key = parent.key;
      }
    }
    // Handle key-value pair
    else if (line.endsWith('=>')) {
      key = line.slice(0, -2).replace(/^\["|\"]$/g, '');
    }
    // Handle string value
    else if (line.startsWith('string')) {
      const value = line.split('"')[1];
      current[key] = `'${value}'`;
    }
    // Handle integer value
    else if (line.startsWith('int')) {
      const value = parseInt(line.match(/\d+/)[0], 10);
      current[key] = value;
    }
    // Handle float value
    else if (line.startsWith('float')) {
      const value = parseFloat(line.match(/[\d\.]+/)[0]);
      current[key] = value;
    }
    // Handle boolean value
    else if (line.startsWith('bool')) {
      const value = line.includes('true') ? 'true' : 'false';
      current[key] = value;
    }
  });

  // Generate PHP code and set output
  console.log(current);
  const result = generatePHP(current);
  const output = document.getElementById('output');
  output.textContent = result;

  return result;
}

module.exports = { convert };
