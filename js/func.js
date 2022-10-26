let numberA = '',
    numberB = '',
    numberResult = '',
    sign = '',
    lastOperation = '',
    finish = false,
    haveDot = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'],
      action = ['+', '-', '×', '÷'],
      result = document.getElementById('result'),
      lastOperationField = document.getElementById('last_operation'),
      buttonsArea = document.querySelector('.calc-buttons'),
      allClearButton = document.getElementById('ac'),
      equalButton = document.getElementById('equal'),
      multiplicationButton = document.getElementById('multiplication');

allClearButton.onclick = () => {
    numberA = '';
    numberB = '';
    sign = '';
    finish = false;
    result.textContent = '0';
    lastOperationField.textContent = '';
};

buttonsArea.onclick = (event) => {
    
    const key = event.target.textContent;
    
    if (digit.includes(key)) {
        // result.textContent = '';

        if (numberB === '' && sign === '') {
            numberA += key;
            result.textContent = numberA;
            lastOperationField.textContent = numberA;

        } else if (numberA !== '' && numberB !== '' && finish) {
            numberB = key;
            finish = false;
            result.textContent = numberB;
            lastOperationField.textContent = numberA + ' ' + sign + ' ' + numberB + ' = ';
        } else {
            numberB += key;
            result.textContent = numberB;
            lastOperationField.textContent = numberA + ' ' + sign + ' ' + numberB;
        }
        return;
    }

    if (action.includes(key)) {
        sign = key;
        result.textContent = numberA;
        lastOperationField.textContent = numberA + ' ' + sign;
        return;
    }

    if (key === '=') {
        numberResult = numberA;
        if (numberB === '') numberB = numberA;
        switch (sign) {
            case '+':
                numberA = (+numberA) + (+numberB);
                break;
            case '-':
                numberA = numberA - numberB;
                break;
            case '×':
                numberA = numberA * numberB;
                break;
            case '÷':
                if (numberB === '0') {
                    result.textContent = 'Error';
                    numberA = '';
                    numberB = '';
                    numberResult = '',
                    sign = '';
                    return;
                }
                numberA = numberA / numberB;
                break;
            case '%':
                numberA = numberA % numberB;
                break;
        }
        finish = true;
        result.textContent = numberA;
        lastOperationField.textContent = numberResult + ' ' + sign + ' ' + numberB + ' = ';
    }
}

document.addEventListener('keyup', (event) => {
    if (digit.includes(event.key) || action.includes(event.key)) {
        document.querySelectorAll('.btn').forEach((item) => {
            if (event.key === item.textContent) {
                item.click();
            }
        })
    }

    console.log(event.key)

    switch (event.key) {
        case 'Enter':
            equalButton.click();
            break;
        case '*':
            console.log('multi');
            multiplicationButton.click();
            break;
        case 'Escape':
            allClearButton.click();
            break;
    }
})