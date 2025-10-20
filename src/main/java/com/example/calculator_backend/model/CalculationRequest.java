package com.example.calculator_backend.model;

public class CalculationRequest {
    private String expression;

    public CalculationRequest() {}

    public CalculationRequest(String expression) {
        this.expression = expression;
    }

    public String getExpression() {
        return expression;
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }
}
