---
title: 凸优化问题-应用和算法
date: 2020-02-21 11:04:43
categories:
  - 猫爪记
tags:
  - 琉璃猫
mathjax: true
---

### 一些应用

##### 逼近和拟合

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
**函数拟合与插值**：

考虑一族函数，通过
$$
f(u)=\sum_{i=1}^nx_nf_n(u)
$$
将x与映射$f:R^M\to R$联系起来。

另外还有插值**条件约束**，或者插值的不等式约束。以及对f的凸约束，比如Lipschitz约束。

**基筛选**中寻找较少数目的基函数，使得能够在card(x)很小的情况下进行拟合。称为**稀疏描述**。

##### 统计估计

最大似然问题可以表述如下
$$
max\:l(x)=log(p_x(y))\\
subject\:to\:x\in C
$$
Chebyshev界：我们希望给$prob(X\in C)$定界，假设$f(z)\geq 1_C(z)$，那么可以求解凸优化问题
$$
min\:x_o+\sum a_ix_i\\
subject\:to\:f(z)=\sum x_if_i(z)\geq1\:\forall z\in C\\
f(z)=\sum x_if_i(z)\geq0\:\forall z\notin C
$$
Chernoff界：定义为$prob(X\geq u)\leq inf_{\lambda\geq 0}Ee^{\lambda(X-u)}$同样得到
$$
log(prob(X\in C))\leq\mu+logEe^{\lambda^Tx}
$$
（这里略过数章...）

### 无约束优化算法

$$
min\:f(x)
$$

其中$f$二次可微凸函数。那么最优点应该满足一阶导数为0，我们需要通过迭代求解。首先需要一个适当的初始点$x_0$，且$f(x_0)$下水平集必须是闭集。（下水平集的形状影响收敛速度）

我们假设目标函数是**强凸**的，即存在m>0，满足$\nabla^2 f(x)\succeq mI$。（好处是梯度足够小的点都可以计算得到近似最优解。）

通用下降方法：确定下降方向；选择步长；修改x。

利用负梯度作为搜索方向是一种自然的选择，称为**梯度下降法**。

我们假设强凸，因此存在$mI\preceq \nabla^2f(x)\preceq MI$，那么可以得到上界
$$
f(t)\leq f(x)-t||\nabla f(x)||_2^2+\frac{Mt^2}{2}||\nabla f(x)||_2^2
$$
采用**精确直线搜索**的话，右边的最小值为$f(x)-(1/2M)||\nabla f(x)||_2^2$，所以
$$
f(x^+)-p^*\leq (1-m/M)(f(x)-p^*)
$$
因此是**线性收敛**的。事实上，即使是**回溯直线搜索**，满足$0\leq t\leq 1/M$，也可以达到**线性收敛**。

**最速下降方法**是通过定义**规范化的最速下降方向**，即找到
$$
\Delta x_{nsd}=argmin\{\nabla f(x)^Tv|||v||=1\}
$$


457

