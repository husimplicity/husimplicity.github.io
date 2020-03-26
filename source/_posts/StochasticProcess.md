---
title: 随机过程论
date: 2020-02-18 12:26:47
tags:
  - 琉璃猫
categories:
  - [猫爪记, Mathematics]
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

### 鞅收敛定理

$\lim_{n\to\infty}X_n(\omega)$不存在$\Leftrightarrow\lim_{n\to\infty}inf\:X_n(\omega)<\lim_{n\to\infty}sup\:X_n(\omega)$，也等价于存在有理数a,b：
$$
\lim_{n\to\infty}inf\:X_n(\omega)<a<b<\lim_{n\to\infty}sup\:X_n(\omega)
$$
定义$N_{2k-1}$为第k次下穿a的停时，$N_{2k}$是第k次上穿b的停时。定义$U_n=\{sup\:k|N_{2k}<n\}$为上穿[a,b]的次数。而
$$
\{\lim_{n\to\infty}inf\:X_n(\omega)<a<b<\lim_{n\to\infty}sup\:X_n(\omega)\}\subset \{\lim_{n\to\infty}U_n(\omega)=+\infty\}
$$
定义$H_m=1_{\bigcup\{N_{2k-1}\leq m\leq N_{2k}\}}$，$W_n=\sum_{m-1}^nH_m(X_m-X_{m-1})$，

（**下鞅上穿不等式**）若$X_n$下鞅，则对a<b，$(b-a)EU_n\leq E(X_n-a)^+-E(X_0-a)^+$（证明：定义$Y_n=a+(X_n-a)^+$，则也是下鞅且上穿次数与$X_n$相等。那么$W_n=\sum_{m=1}^nH_m(Y_m-Y_{m-1})$\geq (b-a)U_n$。又令$K_m=1-H_m$，$V_n=\sum_{m=1}^nK_m(Y_m-Y_{m-1})$。那么$W_n+V_n=Y_n-Y_0$，且$V_n$下鞅，$EV_N\geq EV_0=0 $。所以
$$
E(Y_n-Y_0)=EW_n+EV_n\geq EW_n\geq(b-a)EU_n
$$
 即得证）

利用上穿不等式，得到

（**下鞅基本收敛定理**） 如果下鞅$X_n$满足$sup\:EX_n^+<\infty$，则$X_n\to X$a.s.，且$E|X|<+\infty$。（证明：$(X_n-a)^+$是下鞅，根据上穿不等式$EU_n\leq E(X_n-a)^+/(b-a)$有界，而根据$U_n$单调上升必有极限$U$，因此
$$
P(\lim_{n\to\infty}inf\:X_n<a<b<\lim_{n\to\infty}sup\:X_n)=0
$$
所以$X_n$极限a.s.存在。又由于$EX_n\geq EX_0$，$EX_n^-=EX_n^+-EX_n\leq sup\:EX_n^+-EX_0<+\infty$然后由Fatou引理易得$E|X|<+\infty$。）

 定理：若$X_n$非负上鞅，则$\lim X_n=X$a.s.，且$EX\leq EX_0$。（证明：$-X_n$下鞅有界，a.s.收敛到极限X。）

**注意：L1收敛并不成立。**一个简单的反例就是$S_0=1$，$P(e_i=-1)=P(e_i=1)=1/2$，N为$S_n=0$的停时，$X_n=S_{n\wedge N}$是鞅。但是由上面的定理可知$X\to 0$a.s.，与$EX_n=1$矛盾。

### 四个例子

##### 有界增长

$X_n$为鞅过程，且$|X_{n+1}-X_n|\leq M<\infty$，那么要么$lim\:X_n$存在且有限，要么$X_n$在正负无穷之间摇摆。(停时$N=inf\{X_n\leq k\}$，那么$x_{n\wedge N}+k+M$a.s.收敛)

（Doob分解）下鞅$X_n$可以写成$X_n=M_n+A_n$。其中$M_n$是鞅过程，$A_n$是可预测序列。(令$A_n-A_{n-1}=E(X_n|F_{n-1})-X_{n-1}$)

（第二Borel-Cantelli引理）$A_n\in F_n$，那么
$$
\{A_n\:i.o.\}=\{\sum_{n=1}^\infty P(A_n|F_{n-1})=\infty\}
$$
（第二B-C引理是第一引理的推广，去掉了独立性要求）

证明：由Doob分解可得$M_n=\sum_{m=1}^n 1_{A_m}-P(A_m|F_{m-1})$是有界增长的鞅过程。

##### Polya's Urn Scheme

坛子模型：坛子里有r个红球、g个绿球，每次取出一个并放进与之同色的c+1个球。n次抽取后绿球比例$X_n$是鞅。

如果r=g=c=1，可得$P(X_n=\frac{k}{n+2})=\frac{1}{n+1}$。

实际上，$X_\infty$有参数为$g/c$和$r/c$的beta分布：
$$
\frac{\Gamma((g+r)/c)}{\Gamma(g/c)\Gamma(r/c)}x^{(g/c)-1}(1-x)^{(r/c)-1}
$$

##### R-N微分

有限测度$\mu$，$\nu$，上升的$\sigma-$域$F_n$，定义$\mu_n=\mu|F_n$，$\nu_n=\nu|F_n$。

定理：若$\mu_n<<\nu_n$，定义$X_n=\frac{d\mu_n}{d\nu_n}$，令$X=\lim_{n\to\infty}sup\:X_n$，则
$$
\mu(A)=\int_AXd\nu+\mu(A\cap\{X=+\infty\})
$$
证明：根据定义，$A\in F_n$，则$\mu(A)=\int_AX_nd\nu$。$X_n$是非负鞅，所以$X_n\to X$a.s.。又令$\rho=(\mu+\nu)/2$，$\rho_n=\rho|F_n$，$Y_n=\frac{d\mu_n}{d\rho_n}$，$Z_n=\frac{d\nu_n}{d\rho_n}$。显然$Y_n$和%Z_n$都是非负鞅，且$Y_n+Z_n=2$a.s.。所以有$Y_n\to Y$，$Z_n\to Z$。记$Y=\frac{d\mu}{d\rho}$，$Z=\frac{d\nu}{d\rho}$。那么对$A\in F_n$，则由有界收敛
$$
\mu(A)=\mu_n(A)=\int_AY_nd\rho\to\int_AYd\rho
$$
$X_n=Y_n/Z_n$a.s.，而$Y+Z=2$a.s.，且$\rho(Y=0,Z=0)=0$。所以$X=Y/Z$,$\rho-$a.s.。

令$W=\frac{1}{Z}1_{\{Z>0\}}$所以$1=WZ+1_{\{Z=0\}}$。所以可得
$$
\mu(A)=\int_AYd\rho=\int_AYWZd\rho+\int_AY1_{\{Z=0\}}d\rho
$$
马上得证（第二部分由$\{Z=0\}=\{X=\infty\}$得到）。

由此推出**Kakutani关于无穷乘积测度的二分法**：$\mu$，$\nu$都是$(R^N,R^N)$上的概率测度，$e_n$独立，令$F_n(x)=\mu(e_n\leq x)$，$G_n(x)=\nu(e_n\leq x)$。

$\lambda_{F_n}<<\lambda_{G_n}$，令$q_n=\frac{d\lambda_{F_n}}{d\lambda_{G_n}}$。令$F_n=\sigma(e_m,m\leq n)$，$X_n=\frac{d\mu_n}{d\nu_n}=\prod q_n$。根据上面的定理，$X_n\to X$ $\nu-$a.s.，所以根据Kolmogorov 0-1律，$\nu(X=0)\in\{0,1\}$。因而$\mu<<\nu$或者两者正交。

**定理：$\mu\sim\nu$或者两者正交，根据$\prod\int\sqrt{q_m}dG_m$>0或=0进行判断**

证明：先证无穷乘积是有定义的。

如果$\prod\int\sqrt{q_m}dG_m=0$，那么$\int X_n^{1/2}d\nu\to 0$。而$\int X^{1/2}d\nu\leq\lim inf\:\int X_n^{1/2}d\nu =0$。所以$\nu(X=0)=1$，$\mu$和$\nu$相互独立。

反之，令$Y_n=X_n^{1/2}$，则$E(X_n)=E(Y_n^2)=1$。下证$Y_n$L2-基本列：$E(Y_{n+k}-Y_n)^2=2(1-\prod_{n+1}^{n+k} \int \sqrt{q_m}dG_m\to 0$。$E|X_{n+k}-X_n|\leq 2(E(Y_{n+k}-Y_n)^2)^{1/2}\to 0$，故而$X_n$是L1-基本列，$X_n\to X$。所以对$A\in F_n$
$$
\mu(A)=\mu_n(A)=\int_AX_nd\nu_n=\int_AX_nd\nu\to\int_AXd\nu
$$
有$\pi-\lambda$方法，A可以扩展到$R^N$，故而$\mu<<\nu$。

$EX=\lim EX_n=1$，所以$\nu(X=0)<1$，故而$\nu(X=0)=0$，$\nu(X>0)=1$，$\mu\sim\nu$。

##### 分支过程

$e_n$独立非负，定义$Z_n$，满足$Z_0=1$以及
$$
Z_{n+1}=\left\{\begin{array}.e_1^{n+1}+...+e_{Z_n}^{n+1}\:if\:Z_n>0\\0\:otherwise\end{array} \right.
$$
也叫做Galtom-Watson过程，描述繁衍过程。

*引理：令$\mu=E(e_i^n)$，则$\{Z_n/\mu^n\}$是鞅过程 。*

定理：若$\mu<1$，则对所有足够大的n，$Z_n=0$。因此$Z_n/\mu^n\to^{a.s.}0$

(由$E(Z_n/\mu^n)=E(Z_0)=1$得$E(Z_n)=\mu^n\to 0$可得)

定理：若$\mu=1$且$P(e_i^m=1)<1$，那么对所有足够大的n，$Z_n=0$。

（证明从$P(Z_n=k,n\geq N)=0$入手）

定理：若$\mu>1$，$P(Z_n>0,\forall n)>0$

定理：(Kesten-Stigum)
$$
P(W=\lim \frac{Z_n}{\mu^n}>0)>0\Leftrightarrow\sum P_kkln(k)<+\infty
$$

### Doob不等式(以及LP收敛)

定理：设$X_n$下鞅，N有界停时，$P(N\leq k)=1$，那么$EX_0\leq EX_N\leq EX_k$。

证明：$X_n$和$X_{N\wedge n}$下鞅，$Y_n=X_n-X_{N\wedge n}$下鞅，$EY_0\leq EY_k$得到$EX_N\leq EX_k$。

(反例：当N不是有界的时候，不一定成立，考虑SRW，$S_0=1$，停时N为0的首达时，此时$ES_N=0$。)

**(Doob不等式)**$X_m$下鞅，令$\bar{X_n}=\max_{0\leq m\leq n}X_m^+$，$A=\{\bar{X_n}\geq\lambda\}$，那么
$$
\lambda P(A)\leq EX_n1_A\leq EX_n^+
$$
证明：令$N=\inf\{m\geq 0, X_m\geq\lambda\}\wedge n$，在A上$X_N\geq\lambda$，所以$X_N1_A\geq \lambda 1_A$，$\lambda P(A)\leq EX_N1_A$，根据$A^C$上$N=n$，$EX_N1_A\leq EX_n1_A$。右边不等号显然。

**（LP不等式）**下鞅$X_n$，p>1，那么
$$
E(\bar{X_n})^p\leq(\frac{p}{p-1})^pE(X_n^+)^p
$$

特别的，若$Y_n$是鞅过程，$Y_n^\*=\max|Y_m|$，那么
$$
E(Y_n^*)^p\leq (\frac{p}{p-1})^pE|Y_n|^p
$$
证明：$E(X_n^+)^p=+\infty$则显然成立。下设$E(X_n+)^p<+\infty$，考虑$\bar{X_n}\wedge M$，所以
$$
E(\bar{X_n}\wedge M)^p=\int_0^\infty p\lambda^{p-1}P(\bar{X_n}\wedge M\geq\lambda)d\lambda\\
\leq\int_0^\infty p\lambda^{p-1}(\lambda^{-1}EX_n^+1_{\{\bar{X_n}\wedge M\}\geq\lambda})d\lambda\\
=\int X_n^+\int_0^{\bar{X_n}\wedge M}p\lambda^{p-2}d\lambda dp\\
=\frac{p}{p-1}\int X_n^+(\bar{X_n}\wedge M)^{p-1}dp\\
\leq\frac{p}{p-1}(E(X_n^+)^p)^{1/p}(E(\bar{X_n}\wedge M)^p)^{(p-1)/p}
$$
移项并令$M\to+\infty$由单调收敛定理可得证。

**（LP收敛定理）**若$X_n$鞅，满足$sup\:E|X_n|^p<+\infty$，$p>1$，那么
$$
X_n\to^{a.s.}X,\:X_n\to^{LP}X
$$
**（鞅增量正交性）**若$X_n$鞅，$EX_n^2<\infty$，若$Y\in F_m$，$EY^2<\infty$，那么$E(X_n-X_m)Y=0$。

**（条件方差公式）**若$X_n$鞅，$EX_n^2<\infty$，则$E((X_n-X_m)^2|F_m)=E(X_n^2|F_m)-X_m^2$。

##### 平方可积鞅

$X_n$鞅，$X_0=0$，且$EX_n^2<+\infty$，$X_n^2$下鞅，因而可以Doob分解为$X_n=M_n+A_n$，$M_n$鞅，而$A_n$非降。定义$A_\infty=\lim_{n\to\infty}A_n$。
$$
A_n=\sum_{m=1}^nE((X_m-X_{m-1})^2|F_{m-1})
$$
定理：$E\sup_{n\geq 0}|X_n|^2\leq 4 EA_\infty$（由LP不等式和单调收敛定理即得）

定理：在$\{A_\infty<\infty\}上$\lim_{n\to\infty}X_n$a.s.存在有限。

证明：取停时$N=\inf\{n\geq 0,\:A_{n+1}>a^2\}$，所以$X_{N\wedge n}$鞅。根据LP收敛定律，$X_{N\wedge n}$极限存在有限。所以在$\{A_\infty\leq a^2\}上$N=+\infty$，然后取并可得。

定理：设$f:[0,+\infty)\to [1,+\infty)$非降且$\int_0^\infty \frac{1}{f^2(t)}dt<+\infty$，则在$\{A_\infty=\infty\}$上$\frac{X_n}{f(A_n)}\to^{a.s.}0$

证明：$H_n=\frac{1}{f(A_m)}$可料有界，则$Y_n=\sum_{m=1}^nH_m(X_m-X_{m-1})$鞅。分解$Y_n^2=N_n+B_n$，可证$B_\infty<+\infty$，$Y_n\to^{a.s.}T_\infty$有限，由Kronecker引理得证。

定理（第二Borel-Cantelli定理）：$P_n=P(B_n|F_{n-1})$，那么在$\{\sum_{n=1}^\infty P_n=\infty\}$上
$$
\frac{\sum_{m=1}^n1_{B_m}}{\sum_{m=1}^nP_m}\to^{a.s.}1
$$
证明：定义$X_n=\sum_{m=1}^n1_{B_m}-\sum_{m=1}^nP_m$，定义$f(t)=t\vee 1$，由上可得。

##### 一致可积L1收敛

一致可积$\{X_i,\:i\in I\}$满足
$$
\lim_{M\to\infty}\sup E|X_i|1_{|X_i|>M}=0
$$
（一致）绝对连续$\{X_i,\:i\in I\}$满足
$$
\lim_{p(A)\to 0}\sup E|X_i|1_A=0
$$
<u>一致可积当且仅当绝对连续+L1有界</u>

定理：$X\in L1(\Omega,F_0,P)$，那么$\{E(X|F),\:F是子\sigma-域\}$一致可积

定理：若$X_n\to^P X$则下列叙述等价

+ $\{X_n\}$一致可积
+ $X_n\to{L1}X$
+ $E|X_n|\to E|X|<+\infty$

证明：$(1)\Rightarrow (2)$：构造辅助函数$\phi_M(x)=trunc(x, -M, M)$。$(2)\Rightarrow (3)$：显然。$(3)\Rightarrow (1)$：构造辅助函数
$$
\phi_M(x)=\left\{\begin{align}&x,&x\in[0,M-1]\\&-(M-1)(x-M),&x\in[M-1,M]\\&0,&x\in[M,+\infty)\end{align} \right.
$$
定理：设$p\in (0,+\infty)$，$\{X_n\}\subset LP(\Omega, F, p)$，随机变量$X_n\to^P X$那么下列叙述等价

+ $\{|X_n|^p\}一致可积
+ $X\in LP$，$X_n\to^{LP}X$
+ $X\in LP$，$E|X_n|^p\to E|X|^p$

定理：对下鞅$\{X_n\}$，下列叙述等价

+ $\{X_n\}$一致可积
+ $X_n\to ^{a.s.}X$，且$X_n\to^{L1}X$
+ $X_n\to^{L1}X$

引理：$X_n\to^{L1}X$，那么$\forall A$，$EX_n1_A\to EX1_A$

引理：若鞅$\{X_n\}$满足$X_n\to^{L1}X$，那么$X_n=E(X|F_n)$

定理：对鞅$\{X_n\}$，下列叙述等价

+ $\{X_n\}$一致可积
+ $X_n\to ^{a.s.}X$，且$X_n\to^{L1}X$
+ $X_n\to^{L1}X$
+ 存在可积随机变量X，$X_n=E(X|F_n)$

定理：若$\sigma$域流$F_n\uparrow F_\infty$，$F_\infty=\sigma(\bigcup F_n)$

Durrent第四章 



206

