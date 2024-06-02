package com.good.back.presenter;

import com.good.back.model.MyModel;
import com.good.back.view.MyView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MyPresenter {
    private final MyModel model;
    private final MyView view;

    @Autowired
    public MyPresenter(MyModel model, MyView view) {
        this.model = model;
        this.view = view;
    }

    public void updateView() {
        view.displayData(model.getDate());
    }

    public void setData(String data) {
        model.setDate(data);
    }
}
