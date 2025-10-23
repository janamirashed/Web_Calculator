angular.module('calculatorApp', [])
    .controller('CalculatorController', function($http) {
        var vm = this;

        // Initialize calculator state
        vm.displayValue = '0';
        vm.currentExpression = '';
        vm.shouldResetDisplay = false;
        vm.lastResult = null;
        vm.waitingForOperand = false;

        // Handle all button clicks
        vm.handleButtonClick = function(button) {
            switch(button) {
                case 'C':
                case 'CE':
                    vm.clear();
                    break;
                case '⌫':
                    vm.backspace();
                    break;
                case '=':
                    vm.calculate();
                    break;
                case '+/−':
                    vm.toggleSign();
                    break;
                case '⅟x':
                    vm.reciprocal();
                    break;
                case 'x²':
                    vm.square();
                    break;
                case '²√x':
                    vm.squareRoot();
                    break;
                case '%':
                    vm.percentage();
                    break;
                case '+':
                case '-':
                case '×':
                case '÷':
                    vm.handleOperator(button);
                    break;
                case '.':
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    vm.appendToDisplay(button);
                    break;
            }
        };

        // Clear the calculator
        vm.clear = function() {
            vm.displayValue = '0';
            vm.currentExpression = '';
            vm.shouldResetDisplay = false;
            vm.lastResult = null;
            vm.waitingForOperand = false;
        };

        // Backspace function
        vm.backspace = function() {
            if (vm.shouldResetDisplay) {
                return;
            }
            if (vm.displayValue.length > 1) {
                vm.displayValue = vm.displayValue.slice(0, -1);
            } else {
                vm.displayValue = '0';
            }
        };

        // Append value to display (numbers and decimal point only)
        vm.appendToDisplay = function(value) {
            if (vm.shouldResetDisplay) {
                vm.displayValue = '';
                vm.shouldResetDisplay = false;
            }

            if (vm.displayValue === '0' && value !== '.') {
                vm.displayValue = value;
            } else {
                // Prevent multiple decimal points
                if (value === '.' && vm.displayValue.includes('.')) {
                    return;
                }
                vm.displayValue += value;
            }
            vm.waitingForOperand = false;
        };

        // Handle operator buttons
        vm.handleOperator = function(operator) {
            // Convert display operators to backend-friendly format
            var backendOp = operator;
            if (operator === '×') backendOp = '*';
            if (operator === '÷') backendOp = '/';

            if (vm.currentExpression === '') {
                // First operator pressed
                vm.currentExpression = vm.displayValue + backendOp;
            } else if (vm.waitingForOperand) {
                // Replace the last operator if user changes their mind
                vm.currentExpression = vm.currentExpression.slice(0, -1) + backendOp;
            } else {
                // Add the current number and operator to expression
                vm.currentExpression += vm.displayValue + backendOp;
            }

            vm.waitingForOperand = true;
            vm.shouldResetDisplay = true;
        };

        // Toggle positive/negative
        vm.toggleSign = function() {
            if (vm.displayValue !== '0' && vm.displayValue !== 'E') {
                if (vm.displayValue.charAt(0) === '-') {
                    vm.displayValue = vm.displayValue.substring(1);
                } else {
                    vm.displayValue = '-' + vm.displayValue;
                }
            }
        };

        // Calculate reciprocal
        vm.reciprocal = function() {
            var value = parseFloat(vm.displayValue);
            if (value === 0) {
                vm.displayValue = 'E';
                vm.shouldResetDisplay = true;
                return;
            }

            var expression = '1/' + vm.displayValue;
            vm.sendCalculation(expression);
        };

        // Calculate square
        vm.square = function() {
            var expression = vm.displayValue + '*' + vm.displayValue;
            vm.sendCalculation(expression);
        };

        // Calculate square root
        vm.squareRoot = function() {
            var value = parseFloat(vm.displayValue);
            if (value < 0) {
                vm.displayValue = 'E';
                vm.shouldResetDisplay = true;
                return;
            }

            // For square root, we need to send a special request or compute client-side
            vm.displayValue = Math.sqrt(value).toString();
            vm.currentExpression = '';
            vm.shouldResetDisplay = true;
        };

        // Calculate percentage
        vm.percentage = function() {
            var value = parseFloat(vm.displayValue);
            vm.displayValue = (value / 100).toString();
        };

        // Send calculation to backend
        vm.calculate = function() {
            if (vm.currentExpression === '' || vm.waitingForOperand) {
                // No expression to calculate or operator was last pressed
                return;
            }

            // Complete the expression with the current display value
            var expression = vm.currentExpression + vm.displayValue;
            vm.sendCalculation(expression);
        };

        // Helper function to send calculation request
        vm.sendCalculation = function(expression) {
            var calculationRequest = {
                expression: expression
            };

            $http.post('http://localhost:8080/api/calculate', calculationRequest)
                .then(function(response) {
                    vm.displayValue = response.data.toString();
                    vm.currentExpression = '';
                    vm.shouldResetDisplay = true;
                    vm.waitingForOperand = false;
                    vm.lastResult = vm.displayValue;
                })
                .catch(function(error) {
                    console.error('Calculation error:', error);
                    vm.displayValue = 'E';
                    vm.currentExpression = '';
                    vm.shouldResetDisplay = true;
                    vm.waitingForOperand = false;
                });
        };
    });