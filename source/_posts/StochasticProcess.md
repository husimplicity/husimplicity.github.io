---
title: 随机过程论
date: 2020-02-18 12:26:47
tags:
  - 琉璃猫
categories:
  - 猫爪记
mathjax: true
---

# 条件期望

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
+ $X_n\geq 0$，$X_n\uparrow X$，$EX<\infty$，那么$E(X_n|F)\uparrow E(X|F)$（Levi单调收敛定理）
+ $X_n\geq 0$，$E(lim\_{n\to\infty}X\_n|F)\leq lim\_{n\to\infty}E(X\_n|F)$（Fatou引理，由lim xn=lim inf xk）
+ $|X_n|<Y<\infty$，$lim\_{n\to\infty}X_n=X$，那么$lim\_{n\to\infty}E(X_n|F)=E(X|F)$（Lebesgue控制收敛定理）
+ 如果$\phi$凸，则$\phi(E(X|F))\leq E(\phi(X)|F)$（Jensen不等式，直线显然，然后利用直线包络）
+ $F\subset G$，且$E(X|G)\in F$，那么$E(X|F)=E(X|G)$
+ $F\subset G$，那么$E(E(X|F)|G)=E(E(X|G)|F)=E(X|F)$（条件期望平滑性）

如果$X\in F$且$E|X|\:,\:E|XY|<\infty$，那么$E(XY|F)=XE(Y|F)$。（典型four-step的证明）

### 正则条件概率：

可测映射$X\::\:(\Omega,F)\rightarrow (S,S)$（随机变量）。for X given G，**正则条件分布**$\mu\::\:\Omega\times S\rightarrow [0,1]$满足

+ 对每个A，$\omega\rightarrow\mu(\omega,A)$是$P(X\in A|G)$的一个版本
+ 对a.e. $\omega$，$A\rightarrow\mu(\omega,A)$是一个$(S,S)$上的测度。

如果$S=\Omega$，X是恒等映射，$\mu$是**正则条件概率**。（此时$\mu(A)=PX^{-1}(A)=P(X\in A)$）

正则条件分布可以**同时计算X的所有函数的条件期望**。

由$E(f(x))=\int_R f(x)dPX^{-1}$可得

定理：$\mu(\omega,A)$是**正则条件分布**，$f:(S,S)\rightarrow (R,R)$，且$E|f(X)|<\infty$，那么f关于测度$\mu(\omega,·)$的积分存在，且
$$
E(f(x)|F)(\omega)=\int \mu(\omega,dx)f(x)\:a.s.
$$
正则条件分布并不总是存在。但是当$(S,S)$ **is nice**的时候，它总是存在。(定义：**好的可测空间是指标准Borel空间**，即存在从$S\to R$的一一可测映射。若S是**Polish空间（完备+可分）的Borel子集**，S是S上Borel $\sigma$域，那么是一个好的可测空间）

证明：设$\phi:S\to R$是一一可测映射。则$\phi(X):(\Omega,F)\to(R,R)$，那么，$\forall A\in S$
$$
P(X\in A|G)=P(\phi(X)\in\phi(A)|G)\\
=P(Y\in\phi(A)|G)=P(Y\in B|G)\\
(B=\phi(A)\in R)
$$
然后构造$Y=\phi(x)$关于G的正则条件分布函数$P(Y\leq y|G)$：取除掉一个零测集以外的集合$\Omega_0$使得任意$\omega\in\Omega_0$
$$
G(q,\omega)=P(Y\leq q|G)(\omega)
$$
然后$F(x,\omega)=inf\{G(q,\omega),q>x\}$。所以$F(x,\omega)$是$P(\phi(X)\leq x|G)$的一个版本。然后得到度量$\nu(\omega,·)$
$$
\nu(w,(-\infty,x])=F(x,\omega)
$$
然后得到$\mu(\omega,A)=\nu(\omega,\phi(A))$

定理：X，Y在**nice space** (S,S)中取值，$G=\sigma(Y)$，那么存在$\mu\::\:S\times S\rightarrow [0,1]$，

+ 对每个A，$\mu(Y(\omega),A)$是$P(X\in A|G)$
+ 对a.e. $\omega$，$A\rightarrow\mu(Y(\omega),A)$是$(S,S)$上的测度

# 鞅过程Martingales

$F_n$是一个递增的$\sigma$-域序列，如果序列$X_n$满足

+ $E|X_n|<\infty$
+ $Xn\in F_n$
+ $E(X_{n+1}|F_n)=x_n$

则称$X_n$为**鞅过程**。

如果第三个条件改为$E(X_{n+1}|F_n)\geq(\leq) X_n$，则称为**下鞅（上鞅）**

最常见的是线性鞅：$S_n=S_0+\sum_{k=1}^n e_k$，$E(e)=0$。如果$E(e)\leq(\geq)0$，则为上鞅（下鞅）。

定理：鞅过程满足$E(X_n|F_m)=X_m$，$m<n$

定理：凸函数$\phi$，那么$\phi(X_n)$下鞅。即$E(\phi(X_{n+1})|F\_n)\geq \phi(E(X\_{n+1}|F_n))=\phi(X_n)$。如果$X\_n$下鞅，$\phi$增也有此结论。

定义$H_n$为**可预测序列**，即$H_n\in F_{n-1}$。定理：$X_n$上鞅，那么如果$H_n\geq 0$有界，则$(H\cdot X)\_n$也是上鞅。显然对下鞅和鞅也有类似结论。

定理：若N是停时，$X_n$上鞅，则$X_{N\wedge n}$也是上鞅。

定理：$X_n$下鞅，则$\lim_{n\to\infty}X_n(\omega)$不存在$\Leftrightarrow\lim_{n\to\infty}inf\:X_n(\omega)<\lim_{n\to\infty}sup\:X_n(\omega)$，也等价于存在有理数a,b：
$$
\lim_{n\to\infty}inf\:X_n(\omega)<a<b<\lim_{n\to\infty}sup\:X_n(\omega)
$$
证明：定义$N_{2k-1}$为第k次下穿a的停时，$N_{2k}$是第k次上穿b的停时。令$H_n=1_{\bigcup_k\{N_{2k-1}<x<N_{2k}\}}$。定义$U_n=\{k|N_{2k}<n\}$

。。。。。。

定理（鞅收敛定理）：下鞅$X_n$有$sup\:EX_n^+<\infty$，那么有$X_n$a.s.收敛到非无穷的极限。

定理：如果上鞅$X_n\geq 0$，那么$X_n\to X$a.s.且$EX\leq EX_0$。

**注意：L1收敛并不成立。**一个简单的反例就是$S_0=1$，$P(e_i=-1)=P(e_i=1)=1/2$，N为$S_n=0$的停时，$X_n=S_{n\wedge N}$是鞅。但是由上面的定理可知$X_\infty=0$，与$EX_n=1$矛盾。

### 四个例子

##### 有界增长

$X_n$为鞅过程，且$|X_{n+1}-X_n|\leq M<\infty$，那么要么$lim\:X_n$存在且有限，要么$X_n$在正负无穷之间摇摆。

（Doob分解）下鞅$X_n$可以写成$X_n=M_n+A_n$。其中$M_n$是鞅过程，$A_n$是可预测序列。

（第二Borel-Cantelli引理）$A_n\in F_n$，那么
$$
\{A_n\:i.o.\}=\{\sum_{n=1}^\infty P(A_n|F_{n-1})=\infty\}
$$
证明：由Doob分解可得$M_n=\sum_{m=1}^n 1_{A_m}-P(A_m|F_{m-1})$是有界增长的鞅过程。

##### Polya's Urn Scheme

##### R-N微分

##### 分支过程

### Doob不等式

(Doob不等式)$X_m$下鞅，令$\bar{X_n}=max_{0\leq m\leq n}X_m^+$，$A=\{\bar{X_n}\geq\lambda\}$，那么
$$
\lambda P(X)\leq EX_n1_A\leq EX_n^+
$$
（LP不等式）下鞅$X_n$，p>1，那么
$$
E(\bar{X_n^p})\leq(\frac{p}{p-1})E(X_n^+)^p
$$




Durrent第四章 

206

