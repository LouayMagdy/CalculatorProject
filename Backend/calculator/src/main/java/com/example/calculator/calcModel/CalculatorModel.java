package com.example.calculator.calcModel;

import org.springframework.stereotype.Repository;

@Repository
public class CalculatorModel {
    private String expression;
    private double result;

    public CalculatorModel() {
        this.expression = "";
        this.result = 0.0;
    }

    public String getExpression() {
        return expression;
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }

    public double getResult() {
        return result;
    }

    public void setResult(double result) {
        this.result = result;
    }
}
