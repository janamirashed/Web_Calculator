angular.module('calculatorApp', [])
    .controller('CalculatorController', function($http) {
        var vm = this;

        // Initialize calculator state
        vm.displayValue = '0';
        vm.currentExpression = '';
        vm.shouldResetDisplay = false;
        vm.lastResult = null;

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
                default:
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
        };

        // Backspace function
        vm.backspace = function() {
            if (vm.displayValue.length > 1) {
                vm.displayValue = vm.displayValue.slice(0, -1);
            } else {
                vm.displayValue = '0';
            }
        };

        // Append value to display
        vm.appendToDisplay = function(value) {
            if (vm.shouldResetDisplay) {
                vm.displayValue = '';
                vm.shouldResetDisplay = false;
            }

            if (vm.displayValue === '0' && value !== '.') {
                vm.displayValue = value;
            } else {
                vm.displayValue += value;
            }
        };

        // Toggle positive/negative
        vm.toggleSign = function() {
            if (vm.displayValue !== '0') {
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
            if (value !== 0) {
                vm.currentExpression = '1/(' + vm.displayValue + ')';
                vm.calculate();
            } else {
                vm.displayValue = 'E';
            }
        };

        // Calculate square
        vm.square = function() {
            vm.currentExpression = '(' + vm.displayValue + ')**2';
            vm.calculate();
        };

        // Calculate square root
        vm.squareRoot = function() {
            var value = parseFloat(vm.displayValue);
            if (value >= 0) {
                vm.currentExpression = 'Math.sqrt(' + vm.displayValue + ')';
                vm.calculate();
            } else {
                vm.displayValue = 'E';
            }
        };

        // Calculate percentage
        vm.percentage = function() {
            var value = parseFloat(vm.displayValue);
            vm.displayValue = (value / 100).toString();
        };

        // Send calculation to backend
        vm.calculate = function() {
            var expression = vm.currentExpression || vm.displayValue;

            // Don't send empty expressions or if last button was equals
            if (!expression || expression === '=') {
                return;
            }

            var calculationRequest = {
                expression: expression
            };

            $http.post('http://localhost:8080/api/calculate', calculationRequest)
                .then(function(response) {
                    vm.displayValue = response.data;
                    vm.currentExpression = '';
                    vm.shouldResetDisplay = true;
                    vm.lastResult = vm.displayValue;
                })
                .catch(function(error) {
                    console.error('Calculation error:', error);
                    vm.displayValue = 'E';
                    vm.shouldResetDisplay = true;
                });
        };

        // Update current expression when operator is pressed
        vm.appendToDisplay = function(value) {
            var operators = ['+', '-', '×', '÷'];

            if (operators.includes(value)) {
                // If pressing an operator, update the current expression
                if (vm.currentExpression === '' && vm.lastResult) {
                    vm.currentExpression = vm.lastResult + value;
                } else {
                    vm.currentExpression = vm.displayValue + value;
                }
                vm.shouldResetDisplay = true;
            } else {
                // Regular number input
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
            }
        };
    });