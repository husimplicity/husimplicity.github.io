---
title: 设计模式
date: 2020-03-17 22:44:28
tags:
  - 琉璃猫
categories:
  - [猫爪记, Computer-Science]
---

两种手段

+ 抽象
+ 分解

八大原则

+ 依赖倒置原则（DIP）
+ 开放封闭原则（OCP）
+ 单一职责原则（SRP）
+ Liskov替换原则（LSP）
+ 接口隔离原则（ISP）
+ 对象组合优于类继承
+ 封装变化点
+ 面向接口编程

<!--more-->

五个重构技巧

+ 静态改为动态
+ 早绑定改为晚绑定
+ 继承改为组合
+ 编译时依赖改为运行时依赖
+ 紧耦合改为松耦合

二十三个模式分类*（斜体为不常用）*

+ 组件协作
  - 模板（Template Method）
  - 策略（Strategy）
  - 观察者（Observer）
+ 单一职责
  + 装饰器（Decorator）
  + 桥（Bridge）
+ 对象创建
  - 工厂模式（Factory Method）
  - 抽象工厂（Abstract Factory）
  - 原型（Prototype）
  - *构建器（Builder）*
+ 对象性能
  + Singleton
  + Flyweight
+ 接口隔离
  + 门面（Facade）
  + 代理（Proxy）
  + *中介模式（Mediator）：中介对象的具体实现过于复杂*
  + 转换器（Adapter）
+ 状态变化
  + *备忘录（Memento）：被序列化所替代*
  + 状态模式（State）
+ 数据结构
  - 组合器（Composite）
  - *迭代器（Iterator）：编译时多态*
  - *职责链（Chain of Responsibility）*
+ 行为变化
  - *命令模式（Command）：Function Object*
  - *访问者（Visitor）：前提苛刻*
+ 领域问题
  - *编译器（Interpreter）*



