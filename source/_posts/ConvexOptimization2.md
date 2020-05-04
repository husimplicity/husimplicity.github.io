---
title: 凸优化问题-应用和算法
date: 2020-02-21 11:04:43
categories:
  - [猫爪记, Mathematics]
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
上面范数取Euclid范数时即为梯度下降，采用二次范数$||·||_P$时，$\Delta x_{nsd}=-(\nabla f(x)^TP^{-1}\nabla f(x))^{-1/2}P^{-1}\nabla f(x)$。

**Newton方法**：$\Delta x_{nt}=-\nabla^2 f(x)^{-1}\nabla f(x)$，这其实等价于Hessian矩阵定义的二次范数下的最速下降方法

可以表明，Newton方法的迭代过程分为两个阶段，第一阶段称为**阻尼Newton阶段**，步长t<1，线性收敛速度，第二阶段为**纯Newton阶段**，步长t=1，二次收敛速度。

**自和谐函数**的Newton方法分析不依赖未知常数（强凸性常数、李普西茨常数），且具有仿射不变性。

定义凸函数$f:R\to R$满足对所有x
$$
|f'''(x)|\leq 2f''(x)^{3/2}
$$
就是**自和谐**的。常数2可以被任何常数k替代。这个条件可以写成
$$
|\frac{d}{dt}(f''(t)^{-1/2})|\leq1
$$
由此得到$f''(t)$的上下界
$$
\frac{f''(0)}{(1+tf''(0)^{1/2})^2}\leq f''(t)\leq \frac{f''(0)}{(1-tf''(0)^{1/2})^2}
$$
由此可以得到次优性的界。

### 等式约束优化

$$
\min f(x)\\s.t. Ax=b
$$

考虑二阶Taylor近似
$$
\min f(x+v)=f(x)+\nabla f(x)^Tv+(1/2)v^T\nabla^2f(x)v\\
s.t.A(x+v)=b
$$
**Newton方向**$\Delta x_{nt}$由以下方程确定
$$
\begin{pmatrix}\nabla^2f(x)&A^T\\A&0\end{pmatrix}\begin{pmatrix}\Delta x_{nt}\\w\end{pmatrix}=\begin{pmatrix}-\nabla f(x)\\0\end{pmatrix}
$$
对于**不可行初始点**的newton方向，
$$
\begin{pmatrix}\nabla^2f(x)&A^T\\A&0\end{pmatrix}\begin{pmatrix}\Delta x_{nt}\\w\end{pmatrix}=\begin{pmatrix}-\nabla f(x)\\b-Ax\end{pmatrix}
$$

### 线性规划问题的解法

**Primal单纯形法**

对于线性规划
$$
min\:c^Tx\\
s.t.\:Ax=b\\
x\geq 0
$$
和对偶问题
$$
max\:b^Ty\\
s.t.\:A^Ty+s=c\\
s\geq 0
$$
得到KKT条件
$$
Ax=b,x\geq 0\\
A^Ty+s=c,s\geq 0\\
x_is_i=0
$$
Primal单纯形法得到
$$
x_B=B^{-1}b\geq 0,x_N=0\\
y=B^{-T}c_B\\
s_B=c_B-B^Ty=0,s_N=c_N-N^Ty？？0
$$
（B是一个基，N是自由基）然后判断$s_N$和0的大小关系，决定是否停止迭代。如果$s_j\geq 0$那么x是最优解，否则可以找到q，$s_q<0$。那么就找到$p\in B$移出基。

令$u=B^{-1}A_q$，那么$x_B^+=x_B-ux_q^+$。如果$u\leq 0$则原问题无界；否则找到$u_k>0$，就可以找到$x_q^+$和$p$满足$ x_B^+\geq 0$和$x_p^+=0，确定
$$
p=argmin\frac{x_B(i)}{u_i}
$$
<u>单纯形法工业级应用还需要解决很多问题，比如快速求逆、防止循环迭代等等。</u>

**对偶单纯形法**
$$
x_B=B^{-1}b？？0,x_N=0\\
y=B^{-T}c_B\\
s_B=c_B-B^Ty=0,s_N=c_N-N^Ty\geq 0
$$
 如果$x_B\geq 0$，则达到最优，否则找到$q\in B$使得$x_q<0$退出基，选择r加入基，$s_r^+=0$。然后进行更新：
$$
s_B^+=s_b+ae_q\\
y^+=y+av(e_q=-B^Tv)
$$
<u>对偶单纯形法和单纯形法有时候速度差距很大。</u>

**内点法**

$(x,y,s)$为当前估计，$(\Delta x,\Delta y,\Delta s)$是搜索方向，定义$\mu=\sum x_is_i/n$。所以要找到
$$
A(x+\Delta x)=b\\
A^T(y+\Delta y)+s+\Delta s=c\\
(x_i+\Delta x_i)(s_i+\Delta s_i)=\sigma_\mu
$$
舍弃二阶小量得到
$$
A\Delta x=r_p:=b-Ax\\
A^T\Delta y+\Delta s=r_d:=c-A^Ty-s\\
x_i\Delta s_i+\Delta x_is_i=(r_c)_i:=\sigma_\mu-x_is_i
$$
写成矩阵形式如下，令$L_x=Diag(x)$，$L_s=Diag(s)$
$$
\begin{pmatrix}A&0&0\\
0&A^T&I\\
L_s&0&L_x\end{pmatrix}
\begin{pmatrix}\Delta x\\
\Delta y\\
\Delta s\end{pmatrix}
=
\begin{pmatrix}r_p\\
r_d\\
r_c
\end{pmatrix}
$$
如果A满秩，$AL_s^{-1}L_xA^T$是对称正定的，可以解得到
$$
\Delta y=(AL_s^{-1}L_xA^T)^{-1}(r_p+AL_s^{-1}(L_xr_d-r_c))\\
\Delta s = r_d-A^T\Delta y\\
\Delta x = -L_s^{-1}(L_x\Delta s-r_c)
$$
然后进行步长搜索，保证$(x^{k+1},s^{k+1})>0$。

<u>步长搜索用Central Path，具体定义如下：</u> $C=\{(x_\tau,y_\tau,s_\tau|\tau>0\}$满足
$$
Ax_\tau=b,x_\tau>0\\
A^Ty_\tau+s_\tau=c,s_\tau>0\\
(x_\tau)_i(s_\tau)_i=\tau
$$
Central Path neighborhoods是对$\theta,\gamma\in[0,1)$：
$$
N_2(\theta)=\{(x,y,s)|||L_xL_se-\mu e||_2\leq\theta\mu\}\\
N_{-\infty}(\gamma)=\{(x,y,s)|x_is_i\geq\gamma\mu\}
$$
一般而言$\theta=0.5$，$\gamma=10^{-3}$。

Path-Following：设定步长$\alpha_k$为最大的满足$(x^{k+1},y^{k+1},s^{k+1})\in N_{-\infty}(\gamma)$的值。那么$|\Delta x\cdot\Delta s|\leq 2^{-3/2}(1+1/\gamma)n\mu$，更新
$$
\mu_{k+1}\leq(1-\delta/n)\mu_k,\delta=2^{3/2}\gamma\frac{1-\gamma}{1+\gamma}\sigma(1-\sigma)
$$
那么如果$(x^0,y^0,s^0)\in N_{-\infty}(\gamma)$，存在$K=O(nln(1/\epsilon))$使得$\mu_k\leq\epsilon\mu_0$

<u>内点法是很少见的多项式时间算法</u>