var inputRange = document.querySelector("#len");
var n = document.querySelector("#n");
var submit = document.querySelector("#submit");
var upperCase = document.querySelector("#upper");
var lowerCase = document.querySelector("#lower");
var numbers = document.querySelector("#number");
var symbols = document.querySelector("#symbol");
var passOutput = document.querySelector("#pass-data");
var copyBtn = document.querySelector("#copy"); 
var power = document.querySelector("#power");
var boxes = document.querySelectorAll(".box");

inputRange.style.backgroundSize = 8 * 100 / 20 + '% 100%';
inputRange.addEventListener("input", (e) => {
    var min = e.target.min;
    var max = e.target.max;
    var val = e.target.value;
    n.textContent = val;
    e.target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
})

submit.addEventListener("click",generatePassword);
copyBtn.addEventListener("click",()=>{
    if (passOutput.value !="") {
        navigator.clipboard.writeText(passOutput.value);
        copyBtn.classList.replace("fa-regular","fa-solid");
        copyBtn.classList.replace("fa-copy","fa-check");
        setTimeout(()=>{
            copyBtn.classList.replace("fa-solid","fa-regular");
            copyBtn.classList.replace("fa-check","fa-copy");
        },2000);
    }
})
function generatePassword() {
    passOutput.value ="";
    var combination = "";
    if (upperCase.checked) {
        combination += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (lowerCase.checked) {
        combination+= "abcdefghijklmnopqrstuvwxyz";
    }
    if (numbers.checked) {
        combination += "0123456789";
    }
    if (symbols.checked) {
        combination += "`~!@#$%^&*()-+=?[]{}.,<>/"
    }
    
    if (combination==="") {
        // write function to display valid input 
        return;
    }
    var password = "";
    for (let i = 0; i < inputRange.value; i++) {
        var key = Math.floor(Math.random() *(combination.length-1));
        password+= combination[key];
    }
    passOutput.value = password;
    passOutput.style.color = "#fff";
    var check = passwordStrength(password);
    boxes.forEach(element => {
        element.classList.remove("active");
        
    });
    power.textContent = check.value;
    for (let i = 0; i <= check.id; i++) {
        const element = boxes[i];
        element.classList.add("active");
        
    }
}
const defaultOptions = [
    {
      id: 0,
      value: "Too weak",
      minDiversity: 0,
      minLength: 0
    },
    {
      id: 1,
      value: "Weak",
      minDiversity: 2,
      minLength: 6
    },
    {
      id: 2,
      value: "Medium",
      minDiversity: 4,
      minLength: 8
    },
    {
      id: 3,
      value: "Strong",
      minDiversity: 4,
      minLength: 10
    }
  ];
  
  const passwordStrength = (password, options = defaultOptions, allowedSymbols="!\"#\$%&'\(\)\*\+,-\./:;<=>\?@\[\\\\\\]\^_`\{|\}~") => {
    
    let passwordCopy = password || '';
  
    options[0].minDiversity = 0,
    options[0].minLength = 0;
  
    const rules = [
      {
        regex: "[a-z]",
        message: 'lowercase'
      },
      {
        regex: '[A-Z]',
        message: 'uppercase'
      },
      {
        regex: '[0-9]',
        message: 'number'
      },
    ];
  
    if (allowedSymbols) {
      rules.push({
        regex: `[${allowedSymbols}]`,
        message: 'symbol'
      });
    }
  
    let strength = {};
  
    strength.contains = rules
      .filter(rule => new RegExp(`${rule.regex}`).test(passwordCopy))
      .map(rule => rule.message);
  
    strength.length = passwordCopy.length;
  
    let fulfilledOptions = options
      .filter(option => strength.contains.length >= option.minDiversity)
      .filter(option => strength.length >= option.minLength)
      .sort((o1, o2) => o2.id - o1.id)
      .map(option => ({id: option.id, value: option.value}));
  
    Object.assign(strength, fulfilledOptions[0]);
  
    return strength;
  };