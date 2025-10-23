package com.example.calculator_backend.service;

import org.springframework.stereotype.Service;
import java.util.Stack;

@Service
public class CalculatorService {

    public String calculate(String expression) {
        try {
            if(expression == null || expression.isEmpty()) {
                return "E";
            }

            // Clean the expression
            expression = expression.trim();

            // Evaluate the expression
            double result = evaluateExpression(expression);

            // Check for invalid results
            if(Double.isInfinite(result) || Double.isNaN(result)) {
                return "E";
            }

            // Format the result
            if(result == (long) result) {
                return String.valueOf((long) result);
            } else {
                return String.valueOf(result);
            }

        } catch (Exception e) {
            return "E";
        }
    }

    private double evaluateExpression(String expression) {
        // Remove spaces
        expression = expression.replaceAll("\\s+", "");

        // Stacks for numbers and operators
        Stack<Double> numbers = new Stack<>();
        Stack<Character> operators = new Stack<>();

        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);

            // If current character is a number or decimal point
            if (Character.isDigit(c) || c == '.') {
                StringBuilder sb = new StringBuilder();
                // Handle multi-digit numbers and decimals
                while (i < expression.length() &&
                        (Character.isDigit(expression.charAt(i)) || expression.charAt(i) == '.')) {
                    sb.append(expression.charAt(i++));
                }
                i--; // Step back one position
                numbers.push(Double.parseDouble(sb.toString()));
            }
            // If current character is an opening parenthesis
            else if (c == '(') {
                operators.push(c);
            }
            // If current character is a closing parenthesis
            else if (c == ')') {
                while (operators.peek() != '(') {
                    numbers.push(applyOperation(operators.pop(), numbers.pop(), numbers.pop()));
                }
                operators.pop(); // Remove '('
            }
            // If current character is an operator
            else if (c == '+' || c == '-' || c == '*' || c == '/') {
                // Handle negative numbers at the start or after an operator
                if (c == '-' && (i == 0 || expression.charAt(i-1) == '(' ||
                        expression.charAt(i-1) == '+' || expression.charAt(i-1) == '-' ||
                        expression.charAt(i-1) == '*' || expression.charAt(i-1) == '/')) {
                    StringBuilder sb = new StringBuilder();
                    sb.append('-');
                    i++;
                    while (i < expression.length() &&
                            (Character.isDigit(expression.charAt(i)) || expression.charAt(i) == '.')) {
                        sb.append(expression.charAt(i++));
                    }
                    i--;
                    numbers.push(Double.parseDouble(sb.toString()));
                    continue;
                }

                // Process operators based on precedence
                while (!operators.empty() && hasPrecedence(c, operators.peek())) {
                    numbers.push(applyOperation(operators.pop(), numbers.pop(), numbers.pop()));
                }
                operators.push(c);
            }
        }

        // Apply remaining operations
        while (!operators.empty()) {
            numbers.push(applyOperation(operators.pop(), numbers.pop(), numbers.pop()));
        }

        return numbers.pop();
    }

    private boolean hasPrecedence(char op1, char op2) {
        if (op2 == '(' || op2 == ')') {
            return false;
        }
        if ((op1 == '*' || op1 == '/') && (op2 == '+' || op2 == '-')) {
            return false;
        }
        return true;
    }

    private double applyOperation(char operator, double b, double a) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b == 0) {
                    throw new ArithmeticException("Division by zero");
                }
                return a / b;
        }
        return 0;
    }
}