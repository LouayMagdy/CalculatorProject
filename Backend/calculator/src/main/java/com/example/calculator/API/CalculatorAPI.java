package com.example.calculator.API;

import com.example.calculator.calcService.CalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping("/louayCalculator")
public class CalculatorAPI {
    private final CalculatorService service;

    @Autowired
    public CalculatorAPI(CalculatorService service){
        this.service = service;
    }
    @GetMapping("/calc")
    public String calculate(@RequestParam String exp){
        exp = exp.replaceAll("P", "+");
        this.service.evaluate(exp);
        double result = this.service.getResult();
        if(result == Double.MAX_VALUE || result == - Double.MAX_VALUE) return "NaN";
        return Double.toString(result);
    }
}
