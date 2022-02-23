package com.example.calculator.calcService;

import com.example.calculator.calcModel.CalculatorModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CalculatorService {
    private final CalculatorModel model ;

    @Autowired
    public CalculatorService(CalculatorModel model) {
        this.model = model;
    }

    public void evaluate (String exp) {
        String oldExpression , newVar2 = "", newVar = "";
        double result , value , value2 ;
        result = 0.0;
        char op = 'n';///////////getting the last operand
        int opIndex = -1;
        for (int i = 0; i < exp.length(); i++) {
            if (exp.charAt(i) == '+' || exp.charAt(i) == '-' ||
                    exp.charAt(i) == 'x' || exp.charAt(i) == '/') {
                op = exp.charAt(i);
                opIndex = i;
            }
            if (opIndex == 0 && op == '-') {
                opIndex = -1;
                op = 'n';
            } else if (opIndex - 1 >= 0 && op == '-' && (exp.charAt(opIndex - 1) == '+'
                    || exp.charAt(opIndex - 1) == '-' || exp.charAt(opIndex - 1) == 'x'
                    || exp.charAt(i - 1) == '/')) {
                opIndex--;
                op = exp.charAt(opIndex);
            }
        }
        for (int i = 0; i < opIndex; i++) newVar += exp.charAt(i);
        for (int i = opIndex + 1; i < exp.length(); i++) newVar2 += exp.charAt(i);
        //evaluating 1st exp
        value = getValue(newVar);
        if (value == 0.0 && !newVar.equals("") && !newVar.equals("0") && !newVar.equals("0.0")) {
            evaluate(newVar);
            value = this.model.getResult();
        }
        //evaluating 2nd exp
        value2 = getValue(newVar2);
        if (value2 == 0.0 && !newVar2.equals("") && !newVar2.equals("0") && !newVar2.equals("0.0")) {
            evaluate(newVar2);
            value2 = this.model.getResult();
        }
        if (value == 0.0 && !newVar.equals("") || value2 == 0.0 && !newVar2.equals("")) result = Double.MAX_VALUE;
        else if (value == Double.MAX_VALUE || value2 == Double.MAX_VALUE) result = Double.MAX_VALUE;
        else if (op == '+') result = value + value2;
        else if (op == 'x') result = value * value2;
        else if (op == '/') result = value / value2;
        else if (op == '-') result = value - value2;
        else if (op == 'n') result = value2;

        oldExpression = newVar + op + newVar2;
        this.model.setResult(result);
        this.model.setExpression(oldExpression);
    }

    public double getResult(){/*to get the calculated expressionreturn*/ return this.model.getResult();}

    public double getValue(String var){/////to get the value of operand
        double value = 0.0;
        ///////if the operand is square root
        if (var != "" && (var.charAt(0) == 'S' || (var.charAt(0) == '-' &&
                var.length() >= 2 && var.charAt(1) == 'S'))) {
            String root = "";
            if(var.charAt(0) == 'S'){
                for(int j = 5; j< var.length() - 1; j++) root += var.charAt(j);
                try {
                    value = Math.sqrt(Double.parseDouble(root));
                }
                catch(NumberFormatException ex){ value = 0.0;}
            }
            else if(var.charAt(0) == '-'){
                for (int j = 6; j < var.length() - 1; j++) root += var.charAt(j);
                try {
                    value = -1 * Math.sqrt(Double.parseDouble(root));
                }
                catch(NumberFormatException ex){ value = 0.0;}
            }
        }
        ////////if the operand is square
        else if (var != "" && (var.charAt(0) == 's' || (var.charAt(0) == '-' &&
                var.length() >= 2 && var.charAt(1) == 's'))) {
            String root = "";
            if(var.charAt(0) == 's'){
                for(int j = 7; j< var.length() - 1; j++) root += var.charAt(j);
                try {
                    value = (Double.parseDouble(root));
                    value *= value;
                }
                catch(NumberFormatException ex){ value = 0.0;}
            }
            else if(var.charAt(0) == '-'){
                for (int j = 8; j < var.length() - 1; j++) root += var.charAt(j);
                try {
                    value = (Double.parseDouble(root));
                    value *= -1 * value;
                }
                catch(NumberFormatException ex){ value = 0.0;}
            }
        }
        ///////if the operand is a percentage%
        else if (var != "" && (var.charAt(0) == 'C' || (var.charAt(0) == '-' &&
                var.length() >= 2 && var.charAt(1) == 'C'))) {
            String root = "";
            if(var.charAt(0) == 'C'){
                for(int j = 5; j< var.length() - 1; j++) root += var.charAt(j);
                try {
                    value = (Double.parseDouble(root)) / 100;
                }
                catch(NumberFormatException ex){ value = 0.0;}
            }
            else if(var.charAt(0) == '-'){
                value = 0.0;
            }
        }
        //////if the value is a reciprocal 1/x
        else if (var != "" && (var.charAt(0) == 'R' || (var.charAt(0) == '-' &&
                var.length() >= 2 && var.charAt(1) == 'R'))) {
            String root = "";
            if(var.charAt(0) == 'R'){
                for(int j = 9; j< var.length() - 1; j++) root += var.charAt(j);
                try {
                    if(Double.parseDouble(root) == 0.0) value = Double.MAX_VALUE;
                    else value = 1 / (Double.parseDouble(root));
                }
                catch(NumberFormatException ex){ value = 0.0;}
            }
            else if(var.charAt(0) == '-'){
                for (int j = 10; j < var.length() - 1; j++) root += var.charAt(j);
                try{
                    if(Double.parseDouble(root) == 0.0) value = Double.MAX_VALUE;
                    else value = -1 / (Double.parseDouble(root));
                }
                catch(NumberFormatException ex){ value = 0.0;}
            }
        }
        //////if the value is none of the above
        else{
            try{
                value = Double.parseDouble(var);
            }
            catch (NumberFormatException ex){
                value = 0.0;
            }
        }
        return value;
    }
}
