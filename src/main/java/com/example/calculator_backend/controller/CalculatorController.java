package com.example.calculator_backend.controller;

import com.example.calculator_backend.model.CalculationRequest;
import com.example.calculator_backend.service.CalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class CalculatorController {
    @Autowired
    private final CalculatorService calculatorService;
    public CalculatorController(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @PostMapping("/calculate")
    public String calculate(@RequestBody CalculationRequest calculationRequest) {
        return calculatorService.calculate(calculationRequest.getExpression());
    }
}
