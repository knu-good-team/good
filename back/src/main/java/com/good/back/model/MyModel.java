package com.good.back.model;

import org.springframework.stereotype.Component;

@Component
public class MyModel {
    private String data;

    public MyModel() {}

    public MyModel(String data) {
        this.data = data;
    }

    public String getDate() {
        return data;
    }

    public void setDate(String data) {
        this.data = data;
    }
}
