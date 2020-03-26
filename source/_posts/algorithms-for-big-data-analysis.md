---
title: 大数据分析中的算法
date: 2020-03-12 10:59:23
tags:
  - 琉璃猫
categories:
  - [猫爪记, Mathematics]
mathjax: true
---

优化算法四种基本方法

+ Taylor展开
+ 考虑对偶
+ split（拆分问题，比如换元法）
+ 交替极小（BCD）

### 凸优化

强对偶/KKT条件

单纯形法

内点法

### 压缩感知

稀疏表示问题：
$$
min\:||x||\\
s.t.\:Ax=b
$$
<u>L0范数是NP难问题，L1范数可以等价为线性规划</u>

稀疏表示=好的压缩感知

**第一个基础结论：（感知稀疏信号）**

**x是s-稀疏的**（s个非零元），通过m个随机感知，$b_k=<a_k, x>,\:k=1,2,...,m$，通过L1最小化重建

如果$m\geq slog(n)$就可以精确重建

**第二个基础结论：（非适应性感知可压缩的信号）**

$m\geq slog(n)$甚至$m\geq slog(n/s)$，就可以达到
$$
||\hat{x}-x||_2\leq ||x-x_s||_2
$$
其中$x_s$是s个最大的系数。

**第三个基础结论：（对比Lasso或Dantzig）**

令$\bar{s}=m/log(n/m)$
$$
||\hat{x}-x||_2^2\leq\inf_{1\leq s\leq\bar{s}}||x-x_s||_2^2+log(n\frac{s\delta^2}{m})
$$
**SPARK**

spark(A)定义为A最小的线性相关列个数，一般情况下，$spark(A)\neq rank(A)+1$

定理（Gorodnitsky&Rao 1997）：如果$Ax=b$有一个解x满足$||X||_0\leq spark(A)/2$，那么x是最稀疏的解。（证明思路：$||x||_0+||y||_0\geq ||x-y||_0\geq spark(A)$）

**Coherence**

Coherence定义为A列向量间最大的正则内积（夹角大小）：$\mu(A)=max\frac{|a_k^Ta_j|}{||a_k||_2||a_j||_2}$

定理（Donoho&Elad 2003）：$spark(A)\geq 1+\mu^{-1}(A)$

证明：$A$列正则化为$\bar{A}$，令$p=spark(A)$，$B=\bar{A}^T\bar{A}$的$p\times p$的主子式。所以B对角线为1，且$\sum_{j\neq i}|B_{ij}|\leq(p-1)\mu(A)$。如果$p<1+\mu^{-1}(A)$，那么$|B_{ii}|>\sum_{j\neq i}|B_{ij}|$，所以$B\succ 0$（Gershgorin circle theorem），$spark(A)>p$矛盾。

推论：如果$Ax=b$有一个解x满足$||X||_0\leq (1+\mu^{-1}(A))/2$，那么x是**唯一**最稀疏的解。

**定理（Donoho&Elad 2003）**：如果A有正则化的列且$Ax=b$有一个解x满足$||X||_0\leq (1+\mu^{-1}(A))/2$，那么x是唯一最稀疏的解，**在L0和L1条件下**。

证明：由前面定理可知$x$是L0唯一解，设$S$为x张成的空间，设$y$为L1的解，令$h=y-x$，所以$Ah=0$且$||h||_1<2||h_S||_1$（因为$||h_{S^C}||_1<||h_S||_1$）。根据$A^TAh=0$和$||h||_1=\sum_{k\neq j}|h_k|+|h_j|$，得到
$$
|h_j|\leq(1+\mu(A))^{-1}\mu(A)||h||_1
$$
综合两式得到$|h_j|<1$矛盾。

**null space相关性质**

引理：$0 < p\leq 1$，如果$||(y-x)_{S^C}||_p\>||(y-x)_S||_P$，那么$||x||_P<||y||_p$。

定义：null space property（$NSP(k,\gamma)$），每个非零$h\in N(A)$满足$||h_S||_1<\gamma||h_{S^C}||_1$对所有$|S|\leq k$。

定理（Donoho&Huo 2001）L1范数问题可以唯一恢复k-sparse向量x从$b=Ax$当且仅当A满足 $NSP(k,1)$（证明：充分性S为x张成空间即可，必要性考虑等号成立条件$sgn(x_S)=-sgn(h_S)$。）

引理（Zhang 2008）：$||x||_1 < ||y||_1$的一个充分条件是$||x||_0 < \frac{1}{4}(\frac{||h||_1}{||h||_2})^2$

（证明：$||h_S||_1\leq\sqrt{|S|}||h_S||_2\leq\sqrt{||x||_0}||h||_2$，因而上不等式意味着$||h_{S^C}||_1 > ||h_S||_1$。）

定理（Zhang 2008）L1范数问题可以唯一恢复x如果
$$
||x||_0<min\{\frac{1}{4}(\frac{||h||_1}{||h||_2})^2,h\in N(A)\backslash\{0\}\}
$$
**RIP(Restriceted Isometry constants)**

定义：对k，$\delta_k$是最小的标量对所有k-sparse的x满足
$$
(1-\delta_k)||x||_2^2\leq ||Ax||_2^2\leq(1+\delta_k)||x||_2^2
$$
想法：稀疏恢复=远离零空间，如果A有2s线性相关列则不能恢复

$\delta_{2k}$是是最小的标量对所有k-sparse的$x_1,x_2$满足
$$
(1-\delta_{2k})||x_1-x_2||_2^2\leq ||Ax_1-Ax_2||_2^2\leq(1+\delta_{2k})||x_1-x_2||_2^2
$$
那么如果有s-sparse的解x满足Ax=b

+ 如果$\delta_{2s}<1$则L0最优解唯一
+ 如果$\delta_{2s}<0.414$，那么LP relaxtion的解唯一且相等
+ (Cai-Wang-Wu)$\delta_{2s}<0.307$是充分的
+ (Cai-Zhang)$\delta_{2s}<1/3$是L1重建的充要条件。

**L1解的特征**

x是解等价于$||x+h||_1\geq ||x||_1$对任意属于A零空间的h

L1重建的充要条件为对所有属于零空间的h，
$$
\sum_{i\in T}sgn(x_i)h_i\leq\sum_{i\in T^C}|h_i|
$$
**KKT条件的性质**
$$
L(x,\lambda)=f(x)+<\lambda,b-Ax>
$$
x是解当且仅当x可行，存在$\lambda$
$$
\nabla f(x)-A^*\lambda=0
$$
即$\nabla f(x)\perp null(A)$。当$f(x)$不可微时，可用**次梯度**同样成立。

推论：那么L1解x是最优的当且仅当存在$u=A^\*\lambda$，满足
$$
u_i=sgn(x_i),x_i\neq 0(i\in T)\\
|u_i|\leq 1,x_i=0(i\in T^C)
$$
如果$|u_i|<1$且$A^T$列满秩则x唯一。（只需证零空间的h，$||x+h||_1 > ||x||_1$）

T=supp(x)且$A_T$列满秩，定义valid dual certificate u（作用是证明可以达到）
$$
u:=A^*A_T(A_T^*A_T)^{-1}sgn(x_T)
$$
则y是$A^\*\lambda$的形式，且$u_i=sgn(x_i)$（$i\in T$）。对$i\in T^C$，$|u_i|<1$的证明如下

定义常数$\theta_{S,S'}$满足对所有不相交的集合$T,T'$，$|T|\leq S$，$|T'|\leq S'$，满足
$$
<A_{T}c,A_{T'}c'>\leq \theta_{S,S'}||c||||c'||
$$
如果$S\geq 1$且$\delta_S+\theta_{S,S'}+\theta_{S,2S}<1$，那么如果$|supp(x)|\leq S$，x唯一。

引理：令$S\geq 1$满足$\delta_S+\theta_{S,2S}<1$，那么存在$\lambda$满足对所有$j\in T$，$\lambda^\*A_j=sgn(x_j)$，且对所有$j\in T^C$
$$
|u_j|=|\lambda^*A_j|\leq\frac{\theta_{S,S'}}{(1-\delta_S-\theta_{S,2S})\sqrt{S}}||sgn(x)||\leq 1
$$

### 压缩感知（算法）

L1正则的最小二乘问题
$$
min\:\mu||x||_1+\frac{1}{2}||Ax-b||_2^2
$$
##### Proximal Gradient Method/ISTA/FPC

**Proximal Gradient Method**
$$
x^{k+1}:=\arg\min\mu||x||_1+(\nabla f(x^k))^T(x-x^k)+\frac{1}{2r}||x-x^k||_2^2\\
=\arg\min\mu||x||_1+\frac{1}{2r}||x-(x^k-r\nabla f(x^k))||_2^2\\
=shrink(x^k-r\nabla f(x^k),\mu r)
$$
定义$shrink(y,v)=sgn(y)max(|y|-v,0)$

**Proximal Gradient Method for General Problems**
$$
\min F(x):=f(x)+r(x)
$$
其中r(x)可以是不可微凸函数（甚至可以是离散的如L0范数），同样可以得到
$$
x^{k+1}:=prox_{\gamma r}(x^k-r\nabla f(x^k))
$$
其中代理算子
$$
prox_r(y):=argmin\:r(x)+\frac{1}{2}||x-y||_2^2
$$
<u>Proximal Gradient也叫投影梯度法。</u>

代理算子的性质：
$$
x=prox_r(y)\Leftrightarrow y-x\in\partial r(x)
$$
然后由Cauchy-Schwarz不等式得到
$$
||prox_r(y)-prox_r(x)||_2\leq ||x-y||_2
$$
**收敛性问题**

在一定假设下，$h(x)=x-\gamma\nabla f(x)$满足
$$
||h(x)-h(x')||\leq||x-x'||
$$
**线性搜索**
$$
x^k(r^k)=shrink(x^k-r^k\nabla f^k,\mu r^k)
$$
那么设定
$$
x^{k+1}=x^k+\alpha^k(x^k(r^k)-x^k)=x^k+\alpha^k d^k
$$
$r^k$的选择：Barzilai-Borwein法（$\min||rs-y||^2$）
$$
s^{k-1}=x^k-x^{k-1},y^{k-1}=\nabla f^k-\nabla f^{k-1}\\
r^k=\frac{(s^{k-1})^Ts^{k-1}}{(s^{k-1})^Ty^{k-1}}or\frac{(s^{k-1})^Ty^{k-1}}{(y^{k-1})^Ty^{k-1}}
$$
$r^k$需要通过truncation限制大小

$\alpha^k$的选择：Armijo-like线性搜索（能够达到超线性收敛速度）

（Armijo-Goldstein：$C^k=F(x^k)$）
$$
F(x^k+\alpha^k d^k)\leq C^k+\sigma a^k\Delta^k
$$

+ FPC：$\Delta^k=(\nabla f^k)^Td^k
+ FPC_AS：$\Delta^k=(\nabla f^k)^Td^k+\mu||x^k(r^k)||_1-\mu||x^k||_1
+ non-monotone line search(Zhang and Hagar)：$C^k=(\eta Q^{k-1}C^{k-1}+F(x^k))/Q^k$，$Q^k=\eta Q^{k-1}+1$，$C^0=F(x^0)$，$Q^0=1$

**三种名称**

+ proximal gradient method
+ ISTA: iterative shrinkage thresholding algorithm
+ FPC: fixed-point continuation method

如果$f(x)$满足Lipschitz连续条件$||\nabla f(x)-\nabla f(y)||_2\leq L||x-y||_2$，那么可以得到
$$
p_L(y)=prox_{r, 1/L}(y-\frac{1}{L}\nabla f(y))
$$
**复杂性分析**
$$
F(x^k)-F(x^*)\leq \frac{L||x_0-x^*||_2^2}{2k}
$$
(证明：引理$F(x)-F(pl(y))\geq \frac{L}{2}(||pl(y)-x||_2^2-||x-y||_2^2)$)

**FISTA: accelerated proximal gradient(APG)**

<u>FISTA/APG的理论收敛性质较好，但实际中不如B-B算法</u>

令$y^1=x_0$，$t^1=1$
$$
x^k=pL(y^k)\\
t^{k+1}=\frac{1+\sqrt{1+4(t^{k})^2}}{2}\\
y^{k+1}=x^k+\frac{t^k-1}{t^{k+1}}(x^k-x^{k-1})
$$
复杂性结果
$$
F(x^k)-F(x^*)\leq \frac{2L||x_0-x^*||_2^2}{(k+1)^2}
$$
证明：令$v_k=F(x^k)-F(x^\*)$，$u_k=t^kx^k-(t^k-1)x^{k-1}-x^\*$，那么
$$
\frac{2}{L}(t_k^2v_k-t_{k+1}^2v_{k+1})\geq ||u_{k+1}||_2^2-||u_k||_2^2
$$
**APG的几个变体**

Variant 1

$x_{-1}=x_0$，$\theta_{-1}=\theta_0=1$
$$
y_k=x_k+\theta_k(\theta_{k-1}^{-1}-1)(x_k-x_{k-1})\\
x_{k+1}=\arg\min l(x,y_k)+\frac{L}{2}||x-y_k||_2^2\\
\theta_{k+1}=\frac{\sqrt{\theta_k^4+4\theta_k^2}-\theta_k^2}{2}
$$
($\theta_k$其实相当于$t_k$的倒数)

Variant 2

用Bregman distance $D(x,y_k)$来代替$\frac 12||x-y_k||_2^2$，并且令$x_0=z_0=\theta_0=1$
$$
y_k=(1-\theta_k)x_k+\theta_kz_k\\
z_{k+1}=\arg\min l(x,y_k)+\theta_kL D(x,z_k)\\
x_{k+1}=(1-\theta_k)x_k+\theta_kz_{k+1}\\
\theta_{k+1}=\frac{\sqrt{\theta_k^4+4\theta_k^2}-\theta_k^2}{2}
$$
Variant 3

$x_0=z_0=\arg\min h(x)$，$\theta_0=1$
$$
y_k=(1-\theta_k)x_k+\theta_kz_k\\
z_{k+1}=\arg\min \sum_{i=0}^k\frac{l(x,y_i)}{\theta_i}+Lh(x)\\
x_{k+1}=(1-\theta_k)x_k+\theta_kz_{k+1}\\
\theta_{k+1}=\frac{\sqrt{\theta_k^4+4\theta_k^2}-\theta_k^2}{2}
$$
三个变体收敛性都是$\sim \frac{1}{k^2}LD(....)$

