function convertToMultiline(input) {
  let lines = [];
  let currentLine = '';
  let inString = false;


  for (let i = 0; i < input.length; i++) {
    let char = input[i];

    // Toggle inString flag if encountering quotes
    if (char === '"' || char === "'") {
      inString = !inString;
    }

    // Handle opening array( and closing } characters
    if (!inString && (char === '{' || char === '}')) {
      if (currentLine.trim().length > 0) {
        lines.push(currentLine.trim());
        currentLine = '';
      }
      lines.push(char);
    }
    // Handle arrow => separator
    else if (!inString && char === '=' && input[i + 1] === '>') {
      currentLine += '=>';
      i++; // Skip next character '='
      if (currentLine.trim().length > 0) {
        lines.push(currentLine.trim());
        currentLine = '';
      }
    }
    // Handle whitespace between key-value pairs
    else if (
      !inString &&
      char === ' ' &&
      currentLine.trim().length > 0 &&
      !['{', '}', '=>'].includes(currentLine.trim())
    ) {
      lines.push(currentLine.trim());
      currentLine = '';
    }
    // Handle other characters
    else {
      currentLine += char;
    }
  }

  // Push the last processed line
  if (currentLine.trim().length > 0) {
    lines.push(currentLine.trim());
  }

  // Combine strings and their values into a single line
  let combinedLines = [];
  for (let i = 0; i < lines.length; i++) {
    if (
      lines[i].startsWith('string(') &&
      i < lines.length - 1 &&
      lines[i + 1].startsWith('"')
    ) {
      combinedLines.push(lines[i] + lines[i + 1]);
      i++; // Skip next line since it's already combined
    } else if (
      lines[i].startsWith('int(') ||
      lines[i].startsWith('float(') ||
      lines[i].startsWith('bool(')
    ) {
      combinedLines.push(lines[i]);
    } else {
      combinedLines.push(lines[i]);
    }
  }

  // Format combined lines into a multi-line string with indentation
  let result = '';
  let indentLevel = 0;
  for (let line of combinedLines) {
    if (line === '{') {
      result += ' '.repeat(indentLevel) + line + '\n';
      indentLevel += 2;
    } else if (line === '}') {
      indentLevel -= 2;
      result += ' '.repeat(indentLevel) + line + '\n';
    } else {
      result += ' '.repeat(indentLevel) + line + '\n';
    }
  }
  return result;
}

module.exports = { convertToMultiline };