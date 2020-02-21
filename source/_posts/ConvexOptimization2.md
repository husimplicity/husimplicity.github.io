---
title: 凸优化问题-应用
date: 2020-02-21 11:04:43
categories:
  - 猫爪记
tags:
  - 琉璃猫
mathjax: true
---

### 逼近和拟合

范数逼近
$$
min\:||Ax-b||
$$
罚函数逼近（$l_p$-范数的一个有用的推广）
$$
min\:\sum\phi(r_i)\\
subject\:to\:r=Ax-b
$$
对**野值**不敏感的函数称为**鲁棒**的。当限定为凸的罚函数时，最不敏感的就是线性增长函数。例子就是绝对值函数和**Huber罚函数**。

基本问题
$$
min\:||x||\\
subject\:to\:Ax=b
$$
这是个凸优化问题。

正则化逼近：
$$
min\:||Ax-b||+\gamma||x||
$$
**Tikhonov正则化**：
$$
min\:||Ax-b||_2^2+\delta||x||_2^2
$$
有解析解
$$
x=(A^TA+\delta I)^{-1}A^Tb
$$
重构、光滑、去噪声：
$$
min\:(||x-x_{cor}||_2,\phi(x))
$$
326

