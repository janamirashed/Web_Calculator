package com.example.calculator_backend.service;

import org.springframework.stereotype.Service;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

@Service
public class CalculatorService {
    public String calculate(String expression) {
        try {
            if(expression == null || expression.isEmpty()) {
                return "E";
            }

            expression = expression.replace("×", "*")
                                   .replace("÷", "/")
                                   .replace("²", "**2")
                                   .replace("√", "Math.sqrt");

            ScriptEngine engine = new ScriptEngineManager().getEngineByName("JavaScript");
            Object result = engine.eval(expression);

            if(result == null) {
                return "E";
            }
            String str = result.toString();
            if(str.equals("Infinity") || str.equals("NaN")) {
                return "E";
            } else {
                return str;
            }
        } catch (ScriptException e) {
            return "E";
        }
    }
}
