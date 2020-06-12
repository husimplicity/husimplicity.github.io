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

# 凸优化

强对偶/KKT条件

单纯形法

内点法

# 压缩感知

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

# 压缩感知（算法）

L1正则的最小二乘问题
$$
min\:\mu||x||_1+\frac{1}{2}||Ax-b||_2^2
$$
## Proximal Gradient Method/ISTA/FPC

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

## 增广拉格朗日框架

$$
\min||x||_1,s.t.Ax=b
$$

对偶问题
$$
\max b^T\lambda,s.t.||A^T\lambda||_\infty\leq 1
$$
等价于
$$
\max b^T\lambda,s.t.A^T\lambda=s,||s||_\infty\leq 1
$$
Augmented Lagrangian (Bregman) function
$$
L(\lambda,s,x)=-b^T\lambda+x^T(A^T\lambda-s)+\frac{1}{2\mu}||A^T\lambda-s||^2
$$
算法框架

1. 第k次迭代计算$\lambda^{k+1},s^{k+1}$
   $$
   \min_{\lambda,s}L(\lambda,s,x^k),s.t.||s||_\infty\leq 1
   $$

2. 更新(计算导数易得)
   $$
   x^{k+1}=x^k+(A^T\lambda^{k+1}-s^{k+1})/\mu
   $$

<u>缺点是求min太慢</u>

 ADMM（An alternating direction minimization scheme）
$$
\lambda^{k+1}=\arg\min_\lambda L(\lambda,s^k,x^k)\\
s^{k+1}=\arg\min_s L(\lambda^{k+1},s,x^k),s.t.||s||_\infty\leq 1\\
x^{k+1}=x^k+(A^T\lambda^{k+1}-s^{k+1})/\mu
$$
<u>在x更新步乘以步长1.618性能提升30%左右</u>

Bregman method（实际与Augmented Lagrangian等价，但是计算更复杂）
$$
D_J^{p^k}(x,x^k)=||x||_1-||x^k||_1-<p^k,x-x^k>\\
x^{k+1}=\arg\min_x\mu D_j^{p^k}(x,x^k)+\frac12 ||Ax-b||_2^2\\
p^{k+1}=p^k+\frac1\mu A^T(b-Ax^{k+1})
$$

**Linearized ADMM**

Review of Bregman method
$$
\min ||x||_1,s.t.Ax=b
$$
Bregman method:
$$
D_J^{n^k}(x,x^k)=||x||_1-||x^k||_1-<p^k,x-x^k>\\x^{k+1}=\arg\min_x\mu D_J^{n^k}(x,x^k)+\frac12||Ax-b||_2^2\\p^{k+1}=p^k+\frac1\mu A^T(b-Ax^{k+1})
$$
（等价于
$$
\min\mu\{||x||_1-<p^k,x-x^k>\}+\frac12||Ax-b||_2^2\\0\in\mu \partial||x||_1-\mu p^k+A^T(Ax^{k+1}-b)\\p^{k+1}=p^k+\frac1\mu A^T(b-Ax^{k+1})
$$
Linearized Bregman method
$$
x^{k+1}=\arg\min\mu D_L^{p^k}(x,x^k)+(A^T(Ax^k-b))^T(x-x^k)+
frac1{2\delta}||x-x^k||_2^2\\
p^{k+1}=p^k-\frac1{\mu\delta}(x^{k+1}-x^k)-\frac1\mu A^T(Ax^k-b)
$$
实际上$x^k$逼近
$$
\arg \min\mu||x||_1+\frac1{2\delta}||x||_2^2,s.t.Ax=b
$$



# 矩阵恢复

常见于推荐系统

起源：Netflix电影推荐竞赛

## Collaborative Filtering（协同过滤）

$$
\hat{r}_{si}=b_{si}+\sum_{j\in N(i:x)}w_{ij}(r_{xj}-b_{xj})
$$

权重的确定：
$$
\min_{w_{ij}}F(w):=\sum_x([b_{xi}+\sum_jw_{ij}(r_{xj}-b_{xj})]-r_{xi})^2
$$
求导可得
$$
\nabla_{w_{ij}}F(w)=2\sum_x([b_{xi}+\sum_jw_{ij}(r_{xj}-b_{xj})]-r_{xi})(r_{xj}-b_{xj})=0
$$
梯度下降求解：GD、SGD

## Latent factor models

“SVD” on Netflix data: 
$$
R\approx Q\cdot P^T
$$
预测
$$
\hat{r}_{si}=q_i\cdot p_s^T
$$
考虑到下式有显式解（奇异值分解）
$$
\min_{Q,P}||R-QP^T||_F^2
$$
所以将原问题
$$
\min\sum_{(i,j)\in\Omega}(R_{ij}-(QP^T)_{ij})^2
$$
等价于
$$
\min ||P_\Omega(R-QP^T)||_F^2,P_\Omega为投影算子
$$
进行求解。

梯度下降方法：异步迭代QP（矩阵导数）

另外还有加上bias的latent factor model。

## General Matrix Completion

$$
\min rank(X)\\
s.t. X_{ij}=M_{ij},(i.j)\in\Omega
$$

<u>这是个NP-hard问题</u>

引入奇异值分解
$$
X=\sum\sigma_ku_kv_k^*
$$
(Eckart&Young 1936) if k<rank(A):
$$
\min_{rank(B)=k}||A-B||_2=||A-\sum_{i=1}^k\sigma_iu_iv_i^*||_2
$$

## Positive semidefinite unknown

假设X半正定，那么可以转换为半定规划
$$
\min trace(X)\\
s.t.X_{ij}=M_{ij},(i,j)\in\Omega\\
X\succeq 0
$$
Nuclear norm和spectral norms是对偶的
$$
||X||=\sigma_1(X),||X||_*=\sum\sigma_i(X)
$$
核范数最小化
$$
\left.\begin{align}\min||X||_*\\
s.t.A(X)=b\end{align}\right.
\Leftrightarrow
\left.\begin{aligned}
\max b^Ty\\
s.t.||A^T(y)||\leq 1
\end{aligned}\right.
$$
SDP reformulation
$$
\left.\begin{align}
\min\frac12(trace(W_1)+trace(W_2))\\
s.t.A(X)=b\\
\begin{pmatrix}W_1&X\\X^T&W_2\end{pmatrix}\succeq 0
\end{align}\right.
\Leftrightarrow
\left.\begin{aligned}
\max b^Ty\\
s.t.\begin{pmatrix}I&A^*(y)\\(A^*(y))^T&I\end{pmatrix}\succeq 0
\end{aligned}\right.
$$

## Matrix Shrink Operator

$$
\min v||X||_*+\frac12||X-Y||_F^2
$$

Optimal solution
$$
X=S_v(Y)=UDiag(s_v(\sigma))V^T
$$
其中
$$
Y=UDiag(\sigma)V^T\\
s_v(x)=\max(x_i-v,0)
$$

可以证明这是non-expansive的。

计算量在SVD上。-->LANSVD、LMSVD、Randomized SVD等方法

**low-rank factorization model**
$$
\min_{X,Y,Z}\frac12||XY-Z||_F^2,s.t.Z_{ij}=M_{ij},\forall(i,j)\in\Omega
$$
优点：不需要SVD

Nonlinear Gauss-Seidel scheme
$$
X_+\leftarrow ZY^+\\
Y_+\leftarrow (X_+)^+Z\\
Z_+\leftarrow X_+Y_++P_\Omega(M-X_+Y_+)
$$
这个算法需要计算广义逆，注意到
$$
X_+Y_+=P_{X_+}Z=P_{ZY^T}Z
$$
由此推出第二个版本：
$$
X_+\leftarrow ZY^T\\
Y_+\leftarrow (X_+)^+Z\\
Z_+\leftarrow X_+Y_++P_\Omega(M-X_+Y_+)
$$
这里还是有广义逆，又有$V=orth(ZY^T)$，因而
$$
X_+\leftarrow V\\
Y_+\leftarrow V^TZ\\
Z_+\leftarrow X_+Y_++P_\Omega(M-X_+Y_+)
$$

## 矩阵分离

M=W+E，其中W为低秩矩阵，E为系数矩阵
$$
\min_{W,E}||W||_*+\mu||E||_1,s.t.W+E=M
$$
Robust PCA

（应用：监控录像分离人和背景）

增广拉格朗日函数
$$
L(W,E,A)=||W||_*+\mu||E||_1+<A,W+E-M>+\frac1{2\beta}||W+E-M||_F^2
$$
ADMM:
$$
W^{i+1}=\arg\min_WL(W,E^i,A^i)\\
E^{i+1}=\arg\min_EL(W^{i+1},E,A^i)\\
A^{i+1}=A^i+\frac\gamma\beta(W^{i+1}+E^{i+1}-M)
$$
W-子问题：
$$
W^{i+1}=S_\beta(M-E^j-\beta A^i)
$$
其中$S_\beta$是将SVD的特征值shrink，见上文"Matrix Shrink Operator"

E-子问题：
$$
E^{i+1}=S_{\beta\mu}(M-W^{i+1}-\beta A^i)
$$
其中$S_{\beta\mu}$是L1 shrink，见上文“Proximal Gradient Method”

**low-rank factorization model for matrix seperation**

考虑模型
$$
\min_{Z,S}||S||_1,s.t.Z+S=D,rank(Z)\leq k
$$
对Z进行低秩分解
$$
\min_{U,V,Z}||P_\Omega(Z-D)||_1,s.t.UV-Z=0
$$
这里的增广拉格朗日函数为
$$
L_\beta(U,V,Z,A)=||P_\Omega(Z-D)||_1+<A,UV-Z>+\frac\beta2||UV-Z||_F^2
$$
ADMM依次优化U、V、Z、A。

**非负矩阵低秩分解**

基本相似，更加复杂

ADMM

# 运输优化

Application：image color adaption、shape interpolation、word mover's distance

## Kantorovitch's Formulation

输入两个离散概率度量
$$
\alpha=\sum_{i=1}^ma_i\delta_{x_i},\:\beta=\sum_{j=1}^nb_j\delta_{y_j}
$$
其中$X=\{x_i\}_i,\:Y=\{y_j\}_j$是给定的**点云**，$x_i,y_j$是向量。

$a_i,\:b_j$是**正权重**，满足$\sum_{i=1}^ma_i=\sum_{j=1}^nb_j=1$

$C_{ij}$是**花费**，$C_{ij}=c(x_i,y_j)\geq 0$

定义**Couplings**
$$
U(a,b)=\{\Pi\in R_+^{m\times n}|\Pi 1_n=a,\Pi^T1_m=b\}
$$
Transportation 问题
$$
\min \sum P_{ij}C_{ij}\\
s.t. P\in U(a,b)
$$
推广：**Radon 度量**$(\alpha,\beta)$ on $(X,Y)$

Transfer of measure by $T:X\to Y$

定义Y上的度量
$$
T_\#\alpha(Y)=\alpha(T^{-1}(Y))\:\forall Y\:measurable
$$
离散情形下
$$
T_\#\alpha=\sum_i\alpha_i\delta_{T(x_i)}
$$
连续情形下
$$
d\alpha=\rho(x)dx,\:d\beta=e(x)dx\\
T_\#\alpha=\beta\Leftrightarrow \rho(T(x))|det(\partial T(x))|=e(x)
$$

## Monge Problem

找到这样的T，使得
$$
b_j=\sum_{i:\:T(x_i)=y_j}a_i
$$
离散情形下
$$
\min_T\sum_ic(x_i,T(x_i))\:s.t.T_\#\alpha=\beta
$$
连续情形下
$$
\min_T\int_Xc(x,T(x))d\alpha(x)\:s.t.T_\#\alpha=\beta
$$

## Wasserstein Distance

Kantorovitch Problem for General Measures
$$
L(\alpha,\beta,c)=\min_{\pi\in U(\alpha,\beta)}\int_{X\times Y}c(x,y)d\pi(x,y)
$$
花费满足$c(x,y)=d(x,y)^p$，定义W-distance
$$
W_p(\alpha,\beta)=L(\alpha,\beta,d^p)^{1/p}
$$
可以证明这是个距离，且
$$
W_p(\alpha_n,\alpha)\to 0\Leftrightarrow \alpha_n\to^{weak}\alpha
$$
**Wasserstein barycenter**

定义$C=M_{XY}$，那么W-距离等于
$$
L(a,b,C)=\min\{\sum C_{ij}\Pi_{ij}|\Pi\in U(a,b)\}
$$
给定Y，b，找到X，a使得
$$
\min_{X,a}\frac1N\sum_{i=1}^NL(a,b^{k},M_{XY})
$$

## Dual form

$$
\max f^Ta+g^Tb\\
s.t. f_i+g_j\leq C_{ij}
$$

## Entropy regularization

定义
$$
H(P)=-\sum_{i,j}P_{i,j}(log(P_{i,j})-1)
$$
定义Lullback-Leibler divergence
$$
KL(u||v)=-\sum_{i=1}^nu_ilog(v_i/u_i)
$$
定义Entropy regularization问题
$$
L^e(a,b,C)=\min_{P\in U(a,b)}(P,C)-eH(P)
$$
可以证明这个问题当$e>0$时解唯一。 

解法：考虑Lagrangian对偶，令关于P导数为0
$$
P_{ij}=exp(-\frac{C_{ij}+a_i+\beta_j}{e})
$$
因此可以解得
$$
P_e=diag(e^{-\alpha/2})e^{-C/2}diag(e^{-\beta/2})
$$
根据KKT条件，令$u=e^{-\alpha/2}$，$v=e^{-\beta/2}$，$K=e^{-C/2}$，那么
$$
P_e=diag(u)Kdiag(v)\\
a=diag(u)Kv\\
b=diag(v)K^Tu
$$
Sinkhorn算法就是交替优化uv
$$
u^{k+1}=diag(Kv^k)^{-1}a\\
v^{k+1}=diag(K^Tu^{k+1})^{-1}b
$$
 Sinkhorn-Newton 法：令
$$
F(\alpha,\beta)=\begin{pmatrix}diag(e^{-\alpha/e})Ke^{-\beta/2}-a\\
diag(e^{-\beta/e})Ke^{-\alpha/2}-b\end{pmatrix}
$$
即找到$F(\alpha,\beta)=0$的解。由此Newton Iteration为
$$
\begin{pmatrix}\alpha^{k+1}\\\beta^{k+1}\end{pmatrix}=
\begin{pmatrix}\alpha^k\\\beta^k\end{pmatrix}-J_F^{-1}(\alpha^k,\beta^k)F(\alpha^k,\beta^k)
$$
<u>Sinkhorn算法是忽略非对角元素的近似Sinkhorn-Newton算法</u>

定义
$$
U_\alpha(a,b)=\{P\in U(a,b)|KL(P||ab^T)\leq\alpha\}
$$
定义**Sinkhorn Distance**如下
$$
d_{C,\alpha}(a,b)=\min_{P\in U_\alpha(a,b)}(C,P)
$$
这是一个距离。

## Shielding Neighborhood Method

Proposed by Bernhard Schmitzer in 2016

把主问题分解为多个稀疏子问题

对$N\subset X\times Y$，（称N为Neighborhood），

如果
$$
c(x_1,y_n)\geq c(x_1,y_2)+\sum_{i=2}^{n-1}(c(x_i,y_{i+1})-c(x_i,y_i))
$$
则称为**short-cut**

定义：**shielding condition**是指这样的$(x_s,y_s)$使得
$$
c(x,y)+c(x_s,y_s)>c(x,y_s)+c(x_s,y)
$$
定义：**shielding neighborhood**是指对给定的$\pi$，满足下列条件的N：任意$(x,y)\notin N$，存在$(x_s,y_s)\in\pi$，$x_s,y_s$ shield x,y。

定义：**multiscale scheme**是把集合X分为层级结构，$X_0=\{\{x\}|x\in X\}$，之后每层是从前一层合并而来。

我们假设有两个子算法：

+ solveLocal
+ shield

主算法(从粗网格到细网格)

1. $\pi=solveDense(k)$
2. while k>0 do
3. ​    k-=1
4. ​    N={}
5. ​    对 $(x,y)\in\pi$，$N=N\cup(children(x)\times children(y))$
6. ​    $\pi=solveSparse(k, N)$
7. return 

SolveSparse算法：利用当前等级k和可行邻居N来计算$\pi$

1. i=1
2. while i=1 or $C(\pi_i)\neq C(\pi_{i-1})$ do
3. ​    $\pi_{i+1}=solveLocal(N)$
4. ​    $N_{i+1}=shield(\pi_{i+1},k)$
5. ​    i+=1
6. return

# Large-scale ML

$$
(x,y)\sim P
$$

给定一个数据集$D=\{(x,y)\},\:(x,y)\sim P$，找到
$$
\min R[h_s]:=E[l(h_s(x),y)]
$$
Empirical Risk Minimizor(ERM) ---- Expected Risk Minimizor

对任意小的$\epsilon,\delta$，当n足够大的时候，有
$$
P(|R[h_n]-R[h]|\geq\epsilon)<\delta
$$
Hoeffding不等式：$X_i$是i.i.d.随机变量，且$E(X_i)=\mu$且$P(a\leq X_i\leq b)=1$，那么对任意$\epsilon>0$
$$
P(|\frac1n\sum_{i=1}^nX_i-\mu|\geq\epsilon)\leq2exp(-\frac{2n\epsilon^2}{(b-a)^2})
$$
假设对于固定的h，根据Hoeffding不等式
$$
P(|R_n[h]-R[h]|\geq\epsilon)\leq2e^{-2n\epsilon^2}
$$
得到上界
$$
P(\cup_{h\in H}\{|R_n[h]-R[h]|\geq\epsilon\})\leq2|H|e^{-2n\epsilon^2}
$$
因此需要样本数量
$$
n\geq\frac1{2\epsilon^2}log(2|H|/\delta)
$$

## VC dimension

VC dimension是集合的集合
$$
H\cap C:=\{h\cap C|h\in H\}
$$
定义C被H **shattered**，如果$H\cap C=2^C$

H的VC dimension定义为最大的整数D，使得存在|C|=D被H shattered。

一个模型$f$的VC dimension定义为最大的点数可以被$f$ shattered。

根据VC dimension，可以控制泛化误差
$$
\sup_{h\in H}|R_n[h]-R[h]|\leq O(\sqrt{\frac{VC[H]log(n/VC[H])+log(1/\delta)}{n}})
$$

## 次梯度方法

**次梯度方法**
$$
x_{k+1}=x_k-\alpha_kg_k,g_k\in \partial f(x_k)
$$
定理1（次梯度的收敛性）：假设存在最小点，且次梯度有界M。那么
$$
\sum_{k=1}^K\alpha_k[f(x_k)-f(x^*)]\leq \frac12||x_1-x^*||_2^2+\frac12\sum_{k=1}^K\alpha_k^2M^2
$$
推论：令$A=\sum_{i=1}^k\alpha_i$，$\bar{x_K}=\frac{1}{A_K}\sum_{k=1}^K\alpha_kx_k$，那么
$$
f(\bar{x_K})-f(x^*)\leq\frac{||x_1-x^*||_2^2+\sum \alpha_k^2M^2}{2\sum\alpha_k}
$$
**投影次梯度方法**
$$
x_{k+1}=\pi_C(x_k-\alpha_kg_k),g_k\in \partial f(x_k)
$$
定理2（投影次梯度的收敛性）：假设$||x-x^\*||_2\leq R<\infty$，且次梯度有界M，那么
$$
\sum_{k=1}^K\alpha_k[f(x_k)-f(x^*)]\leq \frac12||x_1-x^*||_2^2+\frac12\sum_{k=1}^K\alpha_k^2M^2
$$
**随机次梯度方法**

问题
$$
\min_{x\in C}f(x):=E_P[F(x;S)]
$$
S是random space。
$$
x_{k+1}=\pi_C(x_k-\alpha_kg_k),E[g_k|x_k]\in\partial f(x_k)
$$
定理3（随机次梯度法的收敛性）：假设$||x-x^\*||_2\leq R<\infty$，且$E||g(x,S)||_2^2\leq M^2\leq\infty$，那么
$$
\sum_{k=1}^K\alpha_kE[f(x_k)-f(x^*)]\leq \frac12E||x_1-x^*||_2^2+\frac12\sum_{k=1}^K\alpha_k^2M^2
$$
推论：令$A=\sum_{i=1}^k\alpha_i$，$\bar{x_K}=\frac{1}{A_K}\sum_{k=1}^K\alpha_kx_k$，那么
$$
E[f(\bar{X_K})-f(x^*)]\leq\frac{R^2+\sum \alpha_k^2M^2}{2\sum\alpha_k}
$$
定理5（随机次梯度法的收敛性2）：$\alpha_k$不增，且定义$\bar{x_K}=\frac1K\sum x_k$，那么
$$
E[f(\bar{X_K})-f(x^*)]\leq\frac{R^2}{2K\alpha_K}+\frac1{2K}\sum \alpha_k^2M^2
$$
推论：令$\alpha_k=R/M\sqrt{k}$，那么
$$
E[f(\bar{x_K})-f(x^*)]\leq \frac{3RM}{2\sqrt{K}}
$$
定理6（随机次梯度法的收敛性3--依概率收敛）：在定理5的条件下，假定$||g||_2\leq M$，那么
$$
E[f(\bar{X_K})-f(x^*)]\leq\frac{R^2}{2K\alpha_K}+\frac1{2K}\sum \alpha_k^2M^2+\frac{RM}{\sqrt{K}}\epsilon
$$
至少以概率$1-e^{-\epsilon^2/2}$的概率成立。

（证明需要用到Azume-Hoeffding不等式）

**Adaptive stepsize**--Variable metric methods
$$
x_{k+1}=\arg\min_{x\in C}\{<g_k,x>+\frac12<x-x_k,H_k(x-x_k)>\}
$$

+ 投影法：$H_k=\alpha_kI$ 
+ Newton法：$H_k=\nabla^2f(x_k)$
+ AdaGrad：$H_k=\frac1\alpha diag(\sum g_{i.} g_i)^{1/2}$

定理9（Variable metric method的收敛性）：$H_k>0$为正定矩阵，$E[g_k|x_k]\in\partial f(x_k)$那么
$$
E[\sum_{k=1}^K(f(x_k)-f(x^*))]\leq\frac12E[\sum_{k=2}^K(||x_k-x^*||_{H_k}^2-||x_k-x^*||_{H_{k-1}}^2)]+\frac12E[||x_1-x^*||_{H_1}^2+\sum_{k=1}^K||g_k||_{H_k^{-1}}^2]
$$
(证明根据$||x_{k+1}-x^\*||_{H_k}^2\leq||x_k-H_k^{-1}g_k-x^\*||_{H_k}^2$)

推论（AdaGrad的收敛性）：在定理9的条件下，定义$R_\infty=\sup_{x\in C}||x-x^\*||_\infty$，那么
$$
E[\sum_{k=1}^K(f(x_k)-f(x^*))]\leq\frac1{2\alpha}R_\infty^2E[tr(M_K)]+\alpha E[tr(M_K)]
$$
(证明利用$\sum_{k=1}^K\frac{a_k^2}{\sqrt{\sum^k a_i^2}}\leq 2\sqrt{\sum^K a_i^2}$)

<u>总结：合适的步长策略可以提升收敛性。</u>

## 随机梯度下降

收敛性：假设f是L-光滑且$\mu$-强凸的

引理：
$$
<\nabla f(x)-\nabla f(y),x-y>\geq \frac{L\mu}{L+\mu}||x-y||^2+\frac1{L+\mu}||\nabla f(x)-\nabla f(y)||^2
$$
定理：梯度下降收敛速度：定义$\alpha_k=\frac2{L+\mu}$，$k=L/\mu$，$\Delta_k=||x_k-x^\*||$，那么
$$
f(x_{T+1})-f(x^*)\leq \frac{L\Delta_1^2}2exp(-\frac{4T}{k+1})
$$
定理：随机梯度下降收敛速度：对于固定的步长$\alpha_k=\alpha<\frac1{2\mu}$
$$
E[f(x_{T+1})-f(x^*)]\leq\frac L2E[\Delta_{T+1}^2]\leq\frac L2[(1-2\alpha\mu)^T\Delta_1^2+\frac{\alpha M^2}{2\mu}]
$$
定理：随机梯度下降收敛速度：对于$\alpha_k=\frac{\beta}{k+\gamma}$
$$
E[f(x_T)-f(x^*)]\leq\frac L2E[\Delta_T^2]\leq\frac L2\frac{v}{\gamma+T}
$$

## Variance Reduction

f(x)是L-光滑和$\mu$-强凸的

GD：
$$
\Delta_{k+1}^2\leq(1-2\alpha\mu+\alpha^2L^2)\Delta_k^2
$$
SGD:
$$
E\Delta_{k+1}^2\leq (1-2\alpha\mu)E\Delta_k^2+\alpha^2E||\nabla f_{x_k}(x_k)||_2^2\\
\leq (1-2\alpha\mu+2\alpha^2L^2)E\Delta_k^2+2\alpha^2E||\nabla f_{x_k}(x_k)-\nabla f(x_k)||_2^2
$$
GD和SGD相差在最后一项，因而要控制方差就要控制这一项

**SAG method**（Le Roux，Schmidt， Bach，2012）
$$
x_{k+1}=x_k-\frac{\alpha_k}n\sum_{k=1}^ng_k^i=x_k-\alpha_k(\frac1n(\nabla f_{s_k}(x_k)-g_{k-1}^{s_k})+\frac1n\sum_{i=1}^ng_{k-1}^i)
$$
其中$g_k^i=\nabla f_i(x_k)$如果$i=s_k$，否则$g_k^i=\nabla g_{k-1}^i$。$s_k$是1~n的随机分布。

**SAGA method**（Defazio，Bach， Julien，2014）：SAG的无偏改进
$$
x_{k+1}=x_k-\alpha_k(\nabla f_{s_k}(x_k)-g_{k-1}^{s_k}+\frac1n\sum_{i=1}^ng_{k-1}^i)
$$
**SVRG**（Johnson，zhang，2013）
$$
v_k=\nabla f_{s_k}(x_k)-\nabla f_{s_k}(y)+\nabla f(y)\\
x_{k+1}=x_k-\alpha_kv_k
$$
相比SAG，隔断了$g_k$

定义condition number $k=L/\mu$

+ SVRG：$E\sim log(1/e)$，复杂度$O((n+k)log(1/e))$
+ GD：$T\sim klog(1/e)$
+ SGD：$T\sim k/e$

## DL 中的随机算法

$$
\min_x\frac1n\sum_{i=1}^nf_i(x)
$$

GD、SGD、SGD with momentum

Nesterov加速算法（外推算法）

Adagrad、Adadelta

# Randomized Numerical Linear Algebra

provably accurate algorithms for problems that are **massive or computationally expensive**

## 矩阵乘法近似

$$
AB\approx CR
$$

SVD分解取前k个特征值

CX分解：最小化A-CX，显然$X=C^-A$ 

## sampling rows/columns

$$
AB=\sum_{i=1}^nA_iB_i
$$

设定一系列概率$p_i$，$i=1,2,...,n$，总和为1。然后选取c列（下式左边需要正则化）
$$
AB\approx\frac1c\sum_{j=1}^c\frac1{p_{i_j}}A_{i_j}B_{i_j}
$$
有/无放回：i.i.d.更容易分析

概率选取
$$
p_i=\frac{||A_i||_2||B_i||_2}{\sum_{j=1}^n||A_j||_2||B_j||_2}
$$
include $A_j/(cp_j)^{1/2}$ as a column and $B_j/(cp_j)^{1/2}$ as a row，此时CR也可以表示为
$$
CR=(AS)(S^TB)
$$
如此得到F-范数的界限
$$
E||AB-CR||_F\leq\frac1c||A||_F||B||_F
$$
证明：
$$
E[CR]=AB,\:Var[(CR)_{ij}]=\frac1c\sum_{k=1}^n\frac{A_{ik}^2B_{kj}^2}{p_k}-\frac1c(AB)_{ij}^2
$$
因此
$$
E||AB-CR||_F^2=\sum_{k=1}^n\frac{|A_k|^2|B_k|^2}{cp_k}-\frac1c||AB||_F^2\\
\leq\frac1c(\sum_{k=1}^n|A_k||B_k|)^2-\frac1c||AB||_F^2\\
\leq\frac1c||A||_F^2||B||_F^2
$$
在$B=A^T$时，根据Chernoff/Bernstein不等式，当
$$
c=\Omega(\frac{||A||_F^2}{e^2}ln(\frac{||A||_F^2}{e^2\sqrt{\delta}}))
$$
此时下式成立的概率至少为$1-\delta$
$$
E||AA^T-CC^T||_F\leq e
$$
**Using a dense S**

+ Reminiscent of random projections and the Johnson-Lindenstrauss transform
+ Bounds for the Frobenius norm are similar
+ need a sufficiently large value c

## Approximate SVD

Linear Time SVD algorithm:

1. input matrix A
2. for t = 1 to c，根据概率选择i，设定$C_t=A_i/\sqrt{cp_i}$
3. 计算$C^TC$和它的SVD：$C^TC=\sum \sigma_t(C)^2y_ty_t^T$
4. 计算$h_t=Cy_t/\sigma_t(C)$

<u>C的左特征向量很大概率近似A的左特征向量</u>

之后可以得到近似的k-dominant SVD

**主要结论**
$$
E[||A-H_kH_k^TA||_F^2]\leq||A-A_k||_F^2+\epsilon||A||_F^2
$$
矩阵扰动定理（后者为Hoffman-Wielandt不等式）
$$
max|\sigma_t(A+E)-\sigma_t(A)|\leq||E||_2\\
\sum_{k=1}^n(\sigma_k(A+E)-\sigma_k(A))^2\leq||E||_F^2
$$
引理：
$$
||A-H_kH_k^TA||_F^2\leq||A-A_k||_F^2+2\sqrt{k}||AA^T-CC^T||_F\\
||A-H_kH_k^TA||_2^2\leq||A-A_k||_2^2+2||AA^T-CC^T||_2
$$
第一个引理由$||X||_F^2=Tr(X^TX)$和Cauchy-Schwartz不等式和Hoffman-Wielandt不等式得到。

根据引理和F-范数的界限得到主要结论

<u>CX分解也有相应的方法/结论</u>

<u>Fewer sampling</u>

## Random Sampling for SVD

Range finding problem：找到Q，$A\approx QQ^TA$

input A，draw a random matrix X，Y=AX，

对Y做QR分解，Y=QR

对$Q^TAQ$做SVD分解得到$T^TDT$，那么QT是U的估计。

## Single View Algorithm for Matrix Approximation

低秩矩阵重建：

given A，given random matrices k列的$\Omega$, l行的$\Phi$，compute
$$
Y=A\Omega,W=\Phi A
$$
Y=QR，$X=(\Phi Q)^-W$，近似
$$
\hat{A}=QX
$$
如果k=2r+1,l=4r+2，那么
$$
E||A-\hat{A}||_F\leq2\min_{rank(Z)\leq r}||A-Z||_F
$$
<u>应用到一些问题上避免了对原矩阵A的revisit</u>

应用：低秩投影

投影到凸集C上：
$$
\Pi_C(M)=\arg\min_{X\in C}||X-M||_F^2
$$
Conjugate Symmetric Approximation：凸集$C=H^n=\{X=X^\*\}$。此时$\Pi_{H^n}(M)=\frac12(M+M^\*)$，所以对A=QX，$[Q,X^\*]=U[T_1,T_2]$，那么得到投影
$$
\hat{A_{sym}}=U(\frac12(T_1T_2^*+T_2T_1^*))U^*\triangleq USU^*
$$
PSD近似：对于半正定矩阵A，特征值分解$S=VDV^\*$，计算$\hat{A}_{sym}=(UV)D(UV)^\*$，构造
$$
\hat{A_+}=\Pi_{H_+^n}(\hat{A})=(UV)D_+(UV)^*
$$

# 相位恢复

$$
|Ax|=b\in C^m
$$

即为多元二次方程求根：NP难问题，非凸优化最值问题

应用：物理问题如Xray/天文观察，一般不能观测到辅角

## classical phase retrieval 

$$
find\:x\in S\cap M\\
M:=\{x(r)||\hat{x}(\omega)|=b(\omega)\},\:\hat{x}(\omega)=Fourier(x(r))\\
S:=\{x(r)|x(r)=0\:for\:x\notin D\}
$$

**Error Reduction**：交替投影法
$$
x^{k+1}=P_SP_M(x^k)
$$
之后有五种变体

+ Basic input-output (BIO)：$x^{k+1}=(P_SP_M+I-P_M)(x^k)$
+ Hybrid input-output (HIO)：$x^{k+1}=((1+\beta)P_SP_M+I-P_S-\beta P_M)(x^k)$
+ Hybrid projection reflection (HPR)：$x^{k+1}=((1+\beta)P_{S_+}P_M+I-P_{S_+}-\beta P_M)(x^k)$
+ Relaxed average alternating reflection (RAAR)：$x^{k+1}=(2\beta P_{S_+}P_M+\beta I-\beta P_{S_+}-(1-2\beta) P_M)(x^k)$
+ Difference Map(DF)：$x^{k+1}=(I+\beta(P_S((1-\gamma_2)P_M-\gamma_2 I)+P_M((1-\gamma_1)P_S-\gamma_1 I)))(x^k)$

<u>收敛性难以保证</u>

**ADMM**
$$
find\:x,y\:s.t.x=y,x\in X\:and\:y\in Y
$$
增广拉格朗日函数
$$
L(x,y,\lambda)=\lambda^T(x-y)+\frac12||x-y||^2
$$
ADMM与HIO/HPR在一些假设下等价

## Discrete model

$$
find\: x\\
s.t.\:|<a_k,x_0>|^2=b_k
$$

一般情况下NP难

**PhaseLift**

令$X=xx^\*$，那么$b_k=<a_ka_k^\*,X>$，
$$
find\:X\\
s.t.A(X)=b,X\succeq0
$$
（这里去掉了约束rank(X)=1）

如此回到半定规划问题

Theorem（C and Li 2012，C Strohmer and Voronisnski 2011）

如果$a_k$独立均匀地分布在单位圆上，且个数m>n，那么至少概率为$1-O(e^{-\gamma m})$唯一可行解即是原来的x（即*精确恢复*）。

**PhaseCut**

变形为
$$
\min_{x,u}\frac12||Ax-diag(b)u||_2^2=\min_u u^*(diag(b)(I-AA^*)diag(b))u
$$
是MAXCUT问题
$$
\min_U Tr(UM)
$$

## Phase retrieval by non-convex optimization

$$
\min_z f(z)=\frac1{4m}\sum_{k=1}^m(y_k-|<a_k,z>|^2)^2
$$

复数求梯度：根据Wirtinger 梯度即$\frac{\partial}{\partial z}=\frac12(\frac{\partial}{\partial x}-i\frac{\partial}{\partial y})$
$$
\nabla f(z)=\frac1m\sum_{k=1}^m(|<a_k,z>|^2-y_k)(a_ka_k^*)z
$$
<u>梯度下降法线性收敛速度要求强凸</u>

定义距离
$$
dist(z,x)=\min_\phi||z-e^{i\phi}x||
$$
Convergence for Gaussian model：

假设sample $m>nlog(n)$，step size $\mu<c/n$

那么以至少$1-10e^{-\gamma n}-8/n^2-me^{-1.5n}$的概率$dist(z_0,x)\leq \frac18||x||$，在$\tau$步迭代之后
$$
dist(z_\tau,x)\leq\frac18(1-\mu/4)^{\tau/2}||x||
$$
引理1：假设f满足$RC((\alpha,\beta,\epsilon))$ for all $z\in E(\epsilon)$。进一步假设$z_0\in E(\epsilon)$，$0<\mu\leq 2/\beta$，考虑更新
$$
z_{\tau+1}=z_\tau-\mu\nabla f(z_\tau)
$$
那么所有$z_\tau\in E(\epsilon)$，且
$$
dist^2(z_\tau,x)\leq(1-\frac{2\mu}{\alpha})^\tau dist^2(z_0,x)
$$
上面f的正则条件$RC((\alpha,\beta,\epsilon))$是说对任意$z\in E(\epsilon)$
$$
Re(<\nabla f(z),z-xe^{i\phi(z)}>)\geq \frac1\alpha dist^2(z,x)+\frac1\beta||\nabla f(z)||^2
$$
引理2：假设$||x||=1$，又假设$m\geq c(\delta)nlog(n)$ in Gaussian model 或 $L\geq c(\delta)log^3(n)$ in CD model
$$
||\nabla^2f(x)-E\nabla^2f(x)||\leq \delta
$$
以至少$1-10e^{-\gamma n}-8/n^2$或$1-(2L+1)/n^3$的概率成立。

（需要Local Curvature Condition或者Local smoothness condition）

原式的证明：

根据引理2：
$$
||Y-(xx^*+||x||^2I)||\leq\epsilon=0.001
$$
设Y的最大的特征值为$\lambda_0$
$$
|\lambda_0-(|\bar{z_0}x|^2+1)|=|\bar{z_0}^*(Y-(xx^*+I))\bar{z_0}|\leq\epsilon
$$
因此
$$
|\bar{z_0}^*x|^2\geq\lambda_0-1-\epsilon
$$
同时有
$$
\lambda_0\geq x^*Yx=x^*(Y-(I+x^*x))x+2\geq2-\epsilon
$$
所以
$$
|\bar{z_0}^*x|^2\geq 1-2\epsilon\Rightarrow dist^2(\bar{z_0},x)\leq2-2\sqrt{1-2\epsilon}
$$

## Gauss-Newton Method

Nonlinear least square problem
$$
\min_z f(z)=\frac1{4m}\sum_{k=1}^m(y_k-|<a_k,z>|^2)^2
$$
根据Wirtinger导数
$$
z:=\begin{pmatrix}z\\\bar{z}\end{pmatrix}\\
g(z):=\nabla_cf(z)=\frac1m\sum_{r=1}^m(|a_r^Tz|^2-y_r)\begin{pmatrix}(a_ra_r^T)z\\(\bar{a_r}a_r^T)\bar{z}\end{pmatrix}\\
J(z):=\frac1{\sqrt{m}}\begin{pmatrix}|a_1^*z|a_1&|a_2^*z|a_2&...&|a_m^*z|a_m\\|a_1^*z|\bar{a_1}&|a_2^*z|\bar{a_2}&...&|a_m^*z|\bar{a_m}\end{pmatrix}^T\\
\Phi(z):=J(z)^TJ(z)
$$
modified LM method for Phase Retrieval：Levenberg-Marquardt Iteration
$$
z_{k+1}=z_k-(\Phi(z_k)+\mu_kI)^{-1}g(z_k)
$$
Convergence of the Gaussian Model：

假设$m\geq cnlog(n)$，如果$f(z_k)\geq\frac{||z_k||^2}{900n}$，$\mu_k=70000n\sqrt{nf(z_k)}$，否则$\mu_k=\sqrt{f(z_k)}$，那么很高的概率
$$
dist(z_{k+1},x)\leq c_1dist(z_k,x)
$$
当$f(z_s)<\frac{||z_s||^2}{900n}$时
$$
dist(z_{k+1},x)<c_2dist(z_k,x)^2
$$

## Cryo-Electron Microscopy

冷冻光镜问题

傅里叶切片定理

Detection of Common Line of Two photos 

—— Weighted Least Square Approach
$$
\min_{R_1,R_2,...,R_K}\sum_{i\neq j}w_{ij}||R_i(c_{ij},0)^T-R_j(c_{ji},o)^T||^2\\
=\max_{R_1,R_2,...,R_K}\sum_{i\neq j}w_{ij}<R_i(c_{ij},0)^T,R_j(c_{ji},0)^T>
$$
半定规划（SDR）
$$
\max trace((W\cdot S)G\\
G=R^TR,\:S_{ij}=c_{ji}^Tc_{ij},\:W_{ij}=w_{ij}\begin{pmatrix}1&1\\1&1\end{pmatrix}
$$
即要求
$$
G_{ii}=I_2,G\succeq 0
$$

# 数据降维

SVD
$$
A\approx U\Sigma V^T=\sum_i\sigma_iu_iv_i^T
$$
Theorem 
$$
\min_{rank(B)=k}||A-B||_2=||A-A_k||_2=\sigma_{k+1}
$$
复杂度：O(nm^2)或者O(n^2m)

但是如果我们只想要特征值/只想要k个特征向量/矩阵系数都可以减少计算量

**PCA（主成分分析）**

从X到Y，$y=z^Tx$，使得var(y)是最大的
$$
\max z^Tcov(X)z,s.t.||z||_2=1
$$
即找到cov(X)最大的特征值

如果是多个特征
$$
\max Tr(M^Tcov(X)M),s.t.M^TM=I
$$
令
$$
\bar{X}=X-\frac1n11^TX=U\Sigma V^T
$$
那么
$$
cov(X)=V\Sigma^2V^T/(n-1)
$$
**MDS（多维尺度分析）**

定义距离矩阵
$$
D_2(X)=(d_{ij}^2(X))_{ij}
$$
MDS就是找到Y
$$
\min_Y ||HD_2(X)H-HD_2(Y)H||_F^2
$$
Lemma：$H=I_n-\frac1n 11^T$，$\bar{X}=X-\frac1n11^TX$，那么
$$
B=-\frac12HD_2(X)H=\bar{X}\bar{X}^T
$$
引理的证明：
$$
D_2(X)_{ij}=x_ix_i^T+x_jx_j^T-2x_ix_j^T
$$
令$K=XX^T$，$w=diag(K)$，那么
$$
D_2(X)=w1^T+1w^T-2K
$$
根据引理可以看出：PCA和MDS是等价的，如下。
$$
\min_Y||B-YY^T||_F^2
$$
Extension of MDS：不同的距离度量，此时$K_{ij}=k(x_i,x_j)$

**MVU**

图G=(V,E)
$$
\max\sum_{i,j}||y_i-y_j||^2\\
s.t.\sum_iy_i=0,||y_i-y_j||^2=||x_i-x_j||^2,\forall(i,j)\in E
$$
这个问题非凸

定义$K=YY^T$，那么可以做半定规划松弛
$$
\max Tr(K)\\
s.t.K\succeq 0,1^TK1=0\\
K_{ii}-2K_{ij}+K_{jj}=D_{ij},\forall(i,j)\in E
$$
**Graph Realization and Sensor Network Localization Problems**

蛋白质折叠问题？

输入m个已知点$a_i$，n个未知点$x_j$，以及一些点对的距离，据此估计每个点的位置

定义$Y=X^TX$，半定规划松弛
$$
(e_i-e_j)^TY(e_i-e_j)=d_{ij}^2\\
(a_k;-e_j)^T\begin{pmatrix}I&X\\X^T&Y\end{pmatrix}(a_k;-e_j)=d_{kj}^2
$$

# 网络流问题

Path、Directed Path、Cycle、Directed Cycle

（这四个No node is repeated）

Walks：Paths that can repeat nodes and arcs

**最短路径**
$$
\min \sum c_{ij}x_{ij}\\
s.t.\sum_jx_{sj}=1,\sum_ix_{it}=1,\\
\sum_jx_{ij}=\sum_jx_{ji},\forall i\neq s,t\\
x_{ij}\geq 0
$$
其对偶形式
$$
\max d(t)-d(s)\\
s.t.d(j)-d(i)\leq c_{ij}
$$
**最大流**
$$
\max v\\
s.t.\sum x_{sj}=v,\sum x_{jt}=v,\\
\sum_jx_{ij}=\sum_jx_{ji},\forall i\neq s,t\\
x_{ij}\leq c_{ij}
$$
**Max-Weight Bipartite Matching**

find a set of edges covering each node at most once
$$
\max\sum w_{ij}x_{ij}\\
s.t.\sum_jx_{ij}\leq 1,i\in L\\
\sum_ix_{ij}\leq1,j\in R\\
x_{ij}\in[0,1]
$$
LP relaxtion：最后一个条件放宽为$x_{ij}\geq 0$

对偶问题：顶点覆盖，找到最小集合S，使得每条边至少一端在S里
$$
\min\sum_iy_i\\
s.t.y_i+y_j\geq w_{ij},\:(i,j)\in A\\
y_i\geq 0
$$
定义：矩阵A Totally Unimodular如果每个正方形子矩阵特征值为0,1或-1

定理：A totoal unimodular，b是整数向量，Ax=b的解为整数

Claim: The constraint matrix of the bipartite matching LP is totally unimodular.

**Modularity Maximization for Coummunity Detection**

define partition matrix X，$X_{ij}=1$，如果i和j在同一个社群，否则为0

modularity (MEJ Newman, M Girvan, 2004) defined by
$$
Q=<A-\frac{1}{2\lambda}dd^T,X>,\lambda=|E|
$$
SDP 松弛后
$$
\max<A-\frac1{2\lambda}dd^T,X>\\
s.t.X\succ0,0\leq X_{ij}\leq 1,X_{ii}=1
$$
为了进一步简化，进行非凸松弛
$$
\min<-A+\frac1{2\lambda}dd^T,UU^T>\\
s.t.||u_i||^2=1,||u_i||_0\leq p,U\geq0
$$
算法：固定U其他行，最小化第i行
$$
u_i=\arg\min f(u_1,u_2,...,x,...,u_n)+\frac\sigma2||x-\bar{u_i}||^2
$$

# 次模优化

推荐系统：Relevance and Diversity

简单的抽象模型：用户集W，广告集V，对每个广告i，有用户集合$S_i$，定义
$$
F(A)=|\bigcup_{i\in A}S_i|
$$
优化问题选在k篇来最大化用户覆盖
$$
\max_{|A|<k}F(A)
$$
这是NP-hard问题

**定义**

模函数F，如果对任意A，B
$$
F(A)+F(B)=F(A\cap B)+F(A\cup B)
$$
模函数可以写成
$$
F(A)=F(\emptyset)+\sum_{a\in A}(F(\{a\})-F(\emptyset))
$$
显然模函数单调、非负

次模函数F，如果对任意A，B
$$
F(A)+F(B)\geq F(A\cap B)+F(A\cup B)
$$
（次模函数的另一种定义，边际效益递减）对任意$A\subseteq B$，$s\notin B$
$$
F(B\cup\{s\})-F(B)\leq F(A\cup\{s\})-F(A)
$$
性质：$F(A)=\sum_i\lambda_i F_i(A)$也是次模函数

性质：次模函数F限制在集合W上也是次模函数

性质：凹函数复合模函数是次模函数

定义 coverage function $cover_d(c)=p(d\:covers\:c)$，集合coverage function
$$
cover_A(c)=1-\prod_{d\in A}(1-cover_d(c))
$$
原式化作
$$
\max_{|A|\leq k}F(A)=\sum_cw_ccover_A(c)
$$
**回到原问题**

这是个次模最大值问题

定理：在一般条件下，贪心法的解
$$
F(A)\geq(1-1/e)*optimal-value\approx63\%
$$
引理：F单调+次模，那么$F_A(S)=F(A\cup S)-F(A)$是单调+次模

引理：如果F正则+次模，那么存在$j\in A$，$F(\{j\})\geq \frac{1}{|A|}F(A)$

证明：k词迭代之后，$F(A^\*)-F(A_{k})$ shrink to $(1-1/k)^k<(1-1/e)$

贪心法的改进：“Lazy” Greedy，保持ordered list，只重新计算top的更新

**次模最小化**
$$
\min F(S)\\
s.t.S\subseteq X
$$
多项式时间算法

Choquet integral - Lovasz Extention：将$\{0,1\}$上定义的函数拓展为$[0,1]$上的函数

Given any set-function F and w such that $w_{j_1}\geq ...\geq w_{j_n}$
$$
f(w)=\sum_{k=1}^{n}w_{j_k}[F(\{j_1,...,j_k\})-F(\{j_1,...,f_{k-1}\})]\\
=\sum_{k=1}^{n-1}(w_{j_k}-w_{j_{k+1}})F(\{j_1,...,j_k\})+w_{j_n}F(\{j_1,...,j_n\})
$$
实际上
$$
f(w)=\max_{s\in B(F)}w^ts
$$
Theorem(Lovasz, 1982) F是次模函数当且仅当f是凸的

Theorem(Lovasz, 1982)
$$
\min F(A)=\min_{w\in\{0,1\}^n} f(w)=\min_{w\in[0,1]^n}f(w)
$$
第一个等号显然成立，第二个显然大于等于成立。

any $w\in [0,1]^n$可以被分解为$w=\sum_{i=1}^n\lambda_i1_{B_i}$，其中$B_1\subseteq B_2\subseteq ... \subseteq B_n$，其中$\lambda\geq 0$，且$\lambda(V)\leq 1$
$$
f(w)=\sum_{i=1}^n\lambda_iF(B_i)\geq\sum_{i=1}^n\lambda_i\min F(A)\geq \min F(A)
$$
因而得证。

迭代过程：
$$
w_t=\Pi_{[0,1]^n}(w_{t-1}-\frac C{\sqrt{t}}s_t)
$$
可以证明
$$
f(w_t)-\min f(w)\leq \frac C{\sqrt{t}}
$$

# 强化学习

MRP（Markov Reward Process）
$$
E[\sum_{t=1}^T\gamma^{t-1}r_t|s_t]
$$
**Value Functions**

On-Policy Value Function
$$
V^\pi(s)=\lim_{T\to\infty}E[\sum_{t=1}^T\gamma^{t-1}r_t|s_1=s]
$$
On-Policy Action-Value Function
$$
Q^\pi(s,a)=\lim_{T\to\infty}E[\sum_{t=1}^T\gamma^{t-1}r_t|s_1=s,a_1=a]
$$
Optimal Value Function
$$
V^*(s)=\max_\pi V^\pi(s)
$$
Optimal Action-Value Fucntion
$$
Q^*(s,a)=\max_\pi Q^\pi(s,a)
$$
**Bellman Equations**
$$
V^\pi(s)=E[R(s,a,s')+\gamma V^\pi(s')]\\
Q^\pi(s,a)=E[R(s,a,s')+\gamma E_{a'\sim\pi}[Q^\pi(s',a')]]
$$
for optimal value functions：
$$
V^*(s)=\max_{a}E[R(s,a)+\gamma V^*(s')]\\
Q^*(s,a)=E[R(s,a)+\gamma \max_{a'} E_{a'\sim\pi}[Q^*(s',a')]]
$$
**Bellman方程的不动点**

可以通过LP来找到
$$
\min_v \sum_s w_sv_s\\
s.t.\:v_s\geq R(s,a)+\gamma P(s,a)^Tv
$$
其中的约束等价于
$$
(I-\gamma P^{\pi^*})v\geq R^{\pi^*}
$$
因此
$$
v\geq (I-\gamma P^{\pi^*})^{-1}R^{\pi^*}=V^*
$$
这就证明了这个问题与Bellman方程等价。

**Bellman算子**
$$
LV(s)=\max_{a}R(s,a)+\gamma \sum_{s'}P(s,a,s')V(s')\\
L^\pi V(s)=E_\pi[R(s,a)+\gamma \sum_{s'}P(s,a,s') V(s')]
$$
所以对任意policy
$$
V^*=LV^*,\:V^\pi=L^\pi V^\pi
$$
这两个算子都是压缩映射，这证明了收敛性和唯一性。

可以证明
$$
||v_k-v^*||\leq \frac{\gamma^k}{1-\gamma}||v_0-v^*||
$$
**Q-value iteration**
$$
Q^*(s,a)=R(s,a)+\gamma\sum_{s'}P(s,a,s')(\max_{a'}Q^*(s',a'))
$$
迭代方法
$$
Q^k(s,a)=R(s,a)+\gamma E_{s'}[\max_{a'}Q^{k-1}(s',a')|s,a]
$$
**Policy Iteration**

k-th iteration has two steps

1. Policy evaluation: find $v^k$ by solving $v^k=L^{\pi^k}v^k$

$$
v^k(s)=E[R(s,a,s')+\gamma\sum_{s'}P(s,a,s')v^k(s')]
$$

2. Policy improvement: find $\pi^{k+1}$ such that $L^{\pi^{k+1}}v^k=Lv^k$

$$
\pi^{k+1}(s)=\arg\max_aR(s,a)+\gamma E_{s'}[v^k(s')|s,a]
$$

这是个Greedy算法

**Platform**

+ Gym: support Atari and Mujoco
+ Universe
+ Deepmind Lab
+ ViZDoom

Packages: Rllab/Baselines/Github

**Taxonomy**

![RLtaxonomy](RLtaxonomy.png)

**Temporal Difference**
$$
v(s_t)\leftarrow (1-\alpha_t)v(s_t)+\alpha_tG_t
$$
TD:
$$
G_t=r_t+\gamma v(s_{t+1})
$$
TD(n)：
$$
G_t^{(n)}=r_{t}+\gamma R_{t+1}+...+\gamma ^{n-1}r_{t+n-1}+\gamma ^{n}v(s_{t+n})
$$
TD( $\lambda$ )： 
$$
G_t^{\lambda}=(1-\lambda) \sum_{n=0}^{\infty}\lambda^{n-1}G_t^{(n)}
$$
 TD(0)即TD, TD(1)接近MC

## Q-learning

**Q-learning**
$$
Q_{k+1}(s_t,a_t)=(1-\alpha)Q_k(s_t,a_t)+\alpha(r_t+\gamma\max_{a'}Q_k(s_{t+1},a'))
$$

**Deep Q-learning**

以e的概率选择随机action，否则选择最大化Q的action $a_t$，然后得到$s_{t+1}$，$\phi_{t+1}=\phi(s_{t+1})$，然后将$(\phi_t,a_t,r_t,\phi_{t+1})$存储在D里

构造$y_j=r_j+\gamma\max_{a'} Q(\phi,a';\theta)$，然后perform GD on $(y_j-Q(\phi_j,a_j;\theta))^2$

**DDPG**：连续学习Q-function
$$
\max_a Q(s,a)\approx Q(s,\mu(s))
$$
选择action $a=clip(\mu_\theta(s)+e,low,high),\:e\sim N$。在Buffer D中存储(s,a,r,s',done)

每次构造targets 
$$
y(r.s',d)=r+\gamma(1-d)Q_{\phi targ}(s',\mu_{\theta targ}(s'))
$$
update Q-function by GD
$$
(Q_\phi(s,a)-y(r,s',a'))^2
$$
update policy $\theta$ by GD
$$
Q_\phi(s,\mu_\theta(s))
$$
然后按比例更新

**Twin Delayed DDPG**

三个trick：

1、learn two Q-function
$$
y(r.s',d)=r+\gamma(1-d)\min_{1,2}Q_{\phi targ}(s',\mu_{\theta targ}(s'))
$$
2、延迟更新policy（两次更新Q再更新policy）

3、对噪声e做截断

**Approximate dynamic programming**

update $\theta$ instead of value function
$$
V_\theta(s)=\theta_0f_0(s)+\theta_1f_1(s)+...+\theta_nf_n(s)
$$
TD(0) approximation: 
$$
\min\delta_t=r_t+\gamma V_\theta(s_{t+1})-V_\theta(s_t)
$$
Fitted value-iteration:

update $\theta$ by finding $\theta$ to fit data
$$
(V_\theta(s),LV_{\theta^{k-1}}(s))
$$
问题：不一定能收敛

定义approximation operator $M_A$
$$
v^i=(L\odot M_A)v^{i-1}
$$
要求这个算子Non-expansive

## Policy Gradient

$$
\max_\theta \rho(\pi_\theta)
$$

