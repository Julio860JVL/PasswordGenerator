const passwordBox = document.querySelector('#passwords');

function generatePassword() {
  const options = {
    uppercase: parseInt(document.getElementById('uppercase').value),
    lowercase: parseInt(document.getElementById('lowercase').value),
    numbers: parseInt(document.getElementById('numbers').value),
    symbols: parseInt(document.getElementById('symbols').value),
  };

  const password = generateRandomPassword(options);
  displayPassword(password);
}

function generateRandomPassword(options) {
  let password = '';
  let chars = '';

  for (let i = 0; i < options.uppercase; i++) {
    chars += getRandomUppercase();
  }

  for (let i = 0; i < options.lowercase; i++) {
    chars += getRandomLowercase();
  }

  for (let i = 0; i < options.numbers; i++) {
    chars += getRandomNumber();
  }

  for (let i = 0; i < options.symbols; i++) {
    chars += getRandomSymbol();
  }

  chars = shuffleString(chars);

  return chars;
}

function displayPassword(password) {
  const passwordElement = document.createElement('div');
  passwordElement.classList.add('password');
  passwordElement.innerHTML = colorizePassword(password);

  const copyButton = document.createElement('button');
  copyButton.innerText = 'Copy';
  copyButton.classList.add('copy-button');
  copyButton.addEventListener('click', function () {
    copyToClipboard(password);
  });

  passwordElement.appendChild(copyButton);

  const passwordsContainer = document.getElementById('passwords');
  passwordsContainer.prepend(passwordElement);
}

function colorizePassword(password) {
  let coloredPassword = '';

  for (let i = 0; i < password.length; i++) {
    const char = password[i];

    if (/[A-Z]/.test(char)) {
      coloredPassword += '<span class="uppercase">' + char + '</span>';
    } else if (/[a-z]/.test(char)) {
      coloredPassword += '<span class="lowercase">' + char + '</span>';
    } else if (/[0-9]/.test(char)) {
      coloredPassword += '<span class="number">' + char + '</span>';
    } else {
      coloredPassword += '<span class="symbol">' + char + '</span>';
    }
  }

  return coloredPassword;
}

function shuffleString(string) {
  let shuffledString = '';

  string = string.split('');
  while (string.length > 0) {
    shuffledString += string.splice(
      Math.floor(Math.random() * string.length),
      1
    );
  }

  return shuffledString;
}

function getRandomUppercase() {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
}

function getRandomLowercase() {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  return lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10).toString();
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function decreaseOptionValue(option) {
  const input = document.getElementById(option);
  const value = parseInt(input.value);
  if (value > 0) {
    input.value = value - 1;
  }
}

function increaseOptionValue(option) {
  const input = document.getElementById(option);
  input.value = parseInt(input.value) + 1;
}

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}
