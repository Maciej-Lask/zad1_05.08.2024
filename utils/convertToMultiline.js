function convertToMultiline(input) {
  let lines = [];
  let currentLine = '';
  let inString = false;

  // Stacks to keep track of opening brackets
  let curlyStack = [];
  let roundStack = [];
  let squareStack = [];

  for (let i = 0; i < input.length; i++) {
    let char = input[i];

    // Toggle inString flag if encountering quotes
    if (char === '"' || char === "'") {
      inString = !inString;
    }

    // Handle opening and closing curly brackets { }
    if (!inString && (char === '{' || char === '}')) {
      if (char === '{') {
        curlyStack.push(char);
      } else if (char === '}') {
        if (curlyStack.length === 0) {
          return 'Error: Unmatched closing curly bracket }';
        }
        curlyStack.pop();
      }

      if (currentLine.trim().length > 0) {
        lines.push(currentLine.trim());
        currentLine = '';
      }
      lines.push(char);
    }
    // Handle opening and closing round brackets ( )
    else if (!inString && (char === '(' || char === ')')) {
      if (char === '(') {
        roundStack.push(char);
      } else if (char === ')') {
        if (roundStack.length === 0) {
          return 'Error: Unmatched closing round bracket )';
        }
        roundStack.pop();
      }
      currentLine += char;
    }
    // Handle opening and closing square brackets [ ]
    else if (!inString && (char === '[' || char === ']')) {
      if (char === '[') {
        squareStack.push(char);
      } else if (char === ']') {
        if (squareStack.length === 0) {
          return 'Error: Unmatched closing square bracket ]';
        }
        squareStack.pop();
      }
      currentLine += char;
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

  // Check if all stacks are empty, indicating all brackets matched
  if (curlyStack.length > 0) {
    return 'Error: Unmatched opening curly bracket {';
  }
  if (roundStack.length > 0) {
    return 'Error: Unmatched opening round bracket (';
  }
  if (squareStack.length > 0) {
    return 'Error: Unmatched opening square bracket [';
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

export { convertToMultiline };
