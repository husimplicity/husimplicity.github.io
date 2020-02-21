---
title: 随机过程论
date: 2020-02-18 12:26:47
tags:
  - 琉璃猫
categories:
  - 猫爪记
mathjax: true
---

### 条件期望

给定概率空间$(\Omega,F,P)$，随机变量X，定义随机变量$Y=E(X|F)$如果它满足

+ $Y\in F$
+ for all $A\in F$，$\int_A XdP = \int_A YdP$

显然Y可积且唯一

**Radon-Nikodym定理**：测度$\nu <<\mu$，那么存在函数$f\in F$，对所有$A\in F$，
$$
\int_A fd\mu=\nu(A)
$$
先假设$X\geq 0$然后显然$\nu(A)=\int_A XdP$是测度，所以易证条件期望存在。

几个例子（小污猫说“这几个例子很重要”）

+ $X\in F$，那么$E(X|F)=X$

+ $X$与$F$独立，则$E(X|F)=EX$

+ $F=\sigma(\Omega_1,\Omega_2,...)$，则$E(X|F)=\frac{E(X;\Omega_i)}{P(\Omega_i)}\:on\:\Omega_i$。所以初等概率论里的条件期望是其一个特例。

+ $X$，$Y$有联合概率密度$f(x,y)$，则
  $$
  E(g(X)|Y)=h(Y)=\frac{\int g(x)f(X,y)dx}{\int f(X,y)dx}
  $$

+ $X$，$Y$独立，$E(\phi(X,Y)|X)=E(\phi(x,Y))$

性质：

+ $E(aX+Y|F)=aE(X|F)+E(Y|F)$
+ $X\leq Y\Rightarrow E(X|F)\leq E(Y|F)$
+ $X_n\geq 0$，$X_n\uparrow X$，$EX<\infty$，那么$E(X_n|F)\uparrow E(X|F)$
+ 如果$\phi$凸，则$\phi(E(X|F))\leq E(\phi(X)|F)$
+ $F\subset G$，且$E(X|G)\in F$，那么$E(X|F)=E(X|G)$
+ $F\subset G$，那么$E(E(X|F)|G)=E(E(X|G)|F)=E(X|F)$

如果$X\in F$且$E|X|\:,\:E|XY|<\infty$，那么$E(XY|F)=XE(Y|F)$。（usual four-step的证明）

### 鞅过程Martingales

鞅过程：
$$
E(X_{t+1}|F_t)=x_t
$$
下鞅（上鞅）：
$$
E(X_{t+1}|F_t)\geq(\leq) X_t
$$


Durrent第四章 195