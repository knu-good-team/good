package com.good.back.view;

import org.springframework.stereotype.Component;

@Component
public class MyView {
    public void displayData(String data) {
        System.out.println("Display data: " + data);
    }
}
