package com.good.back.controller;

import com.good.back.presenter.MyPresenter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class MyController {
    private final MyPresenter presenter;

    @Autowired
    public MyController(MyPresenter presenter) {
        this.presenter = presenter;
    }

    @GetMapping
    public String helloWorld() {
        return "Hello, World!";
    }

    @GetMapping("/display")
    public void displayData(@RequestParam String data) {
        presenter.setData(data);
        presenter.updateView();
    }
}
