function generatePHP(obj, level = 0, parentKey = '') {
  let phpCode = '';

  // Generate code for top-level object
  if (parentKey === '') {
    phpCode += '$result = [];\n';
    for (const [key, value] of Object.entries(obj)) {
      const sanitizedKey = key.replace(/[\[\]]/g, '');
      if (typeof value === 'object') {
        if (isNaN(sanitizedKey)) {
          // key is not a number
          phpCode += `${'   '.repeat(level)}$result['${key}'] = [];\n`;
          phpCode += generatePHP(value, level + 1, key);
        } else {
          // key is a number
          phpCode += `${'   '.repeat(level)}$result${key} = [];\n`;
          phpCode += generatePHP(value, level + 1, key);
        }
      } else {
        if (isNaN(sanitizedKey)) {
          // key is not a number
          phpCode += `${'   '.repeat(level)}$result['${key}'] = ${value};\n`;
        } else {
          // key is a number no '' is needed
          phpCode += `${'   '.repeat(level)}$result${key} = ${value};\n`;
        }
      }
    }
  }
  // Generate code for nested object
  else {
    const sanitizedParentKey = parentKey.replace(/[\[\]]/g, '');
    for (const [key, value] of Object.entries(obj)) {
      const indent = '   '.repeat(level);
      const sanitizedKey = key.replace(/[\[\]]/g, '');

      if (typeof value === 'object') {
        if (isNaN(sanitizedKey)) {
          // key is not a number
          if (isNaN(sanitizedParentKey)) {
            // parentKey is not a number
            phpCode += `${indent}$result['${parentKey}']['${key}'] = [];\n`;
          } else {
            // parentKey is a number
            phpCode += `${indent}$result${parentKey}['${key}'] = [];\n`;
          }
          phpCode += generatePHP(value, level + 1, key);
        } else {
          // key is a number
          if (isNaN(sanitizedParentKey)) {
            // parentKey is not a number
            phpCode += `${indent}$result['${parentKey}']${key} = [];\n`;
          } else {
            // parentKey is a number
            phpCode += `${indent}$result${parentKey}${key} = [];\n`;
          }
          phpCode += generatePHP(value, level + 1, key);
        }
      } else {
        if (isNaN(sanitizedKey)) {
          // key is not a number
          if (isNaN(sanitizedParentKey)) {
            // parentKey is not a number
            phpCode += `${indent}$result['${parentKey}']['${key}'] = ${value};\n`;
          } else {
            // parentKey is a number
            phpCode += `${indent}$result${parentKey}['${key}'] = ${value};\n`;
          }
        } else {
          // key is a number
          if (isNaN(sanitizedParentKey)) {
            // parentKey is not a number
            phpCode += `${indent}$result['${parentKey}']${key} = ${value};\n`;
          } else {
            // parentKey is a number
            phpCode += `${indent}$result${parentKey}${key} = ${value};\n`;
          }
        }
      }
    }
  }

  return phpCode;
}

module.exports = { generatePHP };