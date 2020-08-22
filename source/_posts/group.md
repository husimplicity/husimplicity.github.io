---
title: 团团伙伙论
date: 2020-02-26 16:00:15
tags:
  - 琉璃猫
categories:
  - [猫爪记, Mathematics]
mathjax: true

---

### 群论

集合X的变换$\alpha$的群记为$S_X$（对称群）

<u>Cycle notation：可以证明任意变换可以写作不相交的轮换</u>

另一种形式是写成交换的形式。

由此可以确定变换的奇偶。可以证明$sgn(\alpha)=(-1)^{n-t}$，t为轮换的个数。显然奇偶变换数量一样。

<!--more-->

定义：操作$\mu:G\times G\rightarrow G$，半群$(G,*)$定义为G上有结合律的操作$\*$。

定义：群是有单位元的半群。

定义：同态$f:G\to H$，$f(ab)=f(a)f(b)$。同构是双射的同态。

定义：子群$S\leq G$。

定义：有限群，order

定义：同态$f$的kernel：$ker\:f={a|f(a)=1}$和image：$im\:f={h|h=f(a)}$

定义：$S\leq G$，右（左）陪集 =St(tS)。显然右陪集不交。

定义：index为右陪集数量，记为[G:S]。（Lagrange：G有限，则[G:S]=|G|/|S|）

循环群$|G|=n$，那么对于每个n的因子d，存在唯一子群$|H|=d$。（因此$n=\sum_{d|n}\phi(d)$。）反之，若对每个d，至多存在一个这样的子群，则G为循环群。

$|ST||S\cap T|=|S||T|$

定义：正规子群$K\lhd G$，如果对任意$g\in G$，$gKg^{-1}=K$。

定义：x的共轭为$\{x^\*|\exists a\:,x^\*=axa^{-1}\}$

题目：（H.B.Mann)有限群G，子集ST，|S|+|T|>G，那么G=ST。（考察S^{-1}g，必和T有交集）；有限域F的任意元素可以写成平方和。（考察a^2和b-a^2）

定义：$N\lhd G$，商群G/N定义为陪集的集合

定义：交换子$aba^{-1}b^{-1}$，其生成的群为交换子群。交换子群G'是G的正规子群。$H\lhd G$，则$G/H$可交换$\Leftrightarrow G'\leq H$

性质：(P.YFF)交换子群为“长交换子集”的子集。

性质：交换子集不一定等于交换子群，一个例子就是P.J.Cassidy给出的
$$
\pmatrix{1&f(x)&h(x,y)\\
0&1&g(y)\\
0&0&1}
$$
第一同构定理：同态$f$，$G/(ker\:f)\cong im\:f$

引理：G子群S、T中有一个是正规的，那么ST=TS也是子群

第二同构定理：$N\lhd G$，$T\leq G$，那么$N\cap T\lhd T$且$T/(N\cap T)\cong NT/N$。

第三同构定理：$K\leq H\leq G$，K、H正规，那么$(G/K)/(H/K)\cong G/H$。

Correspondence Theorem：$K\leq T\leq S\leq G$，K正规，那么$T\lhd S\Leftrightarrow T^\*\lhd S^\*$，且此时$S/T\cong S^\*/T^\*$。其中$S^\*=S/K$。

定理：H，K正规，如果$HK=G$,$H\cap K=1$，那么$G\cong H\times K$。

定理：$A\lhd H$，$B\lhd K$，那么$(H\times K)/(A\times B)\cong(H/A)\times(K/B)$

定义：a的共轭的集合记为$a^G$

定义：群G的中心Z(G)是所有的$\{a|ag=ga\:,\:\forall g\in G\}$

定义：中心化子$C_G(a)=\{x|ax=xa\}$，显然这是个子群。
$$
|a^G|=[G:C_G(a)]
$$
定义：群H的共轭记为$H^g=gHg^{-1}$

定义：正规化子$N_G(H)=\{a\in G:\:aHa^{-1}=H\}$，显然这是个子群，且$|H\lhd N_G(H)|$。

H的共轭的个数=$[G:\:N_G(H)]$

题目：$H\lhd G$且有质数index，且$C_H(x)<C_G(x)$，那么x在H中共轭的数量和在G中相等。（考虑$G=C_G(x)H$）（在证明A_n单群中多次用到）

引理：$\alpha,\:\beta\in S_n$，那么$\alpha\beta\alpha^{-1}$和$\beta$有相同的结构，即r-cycle数量相等。（证明：$\beta(i)=j,\:\alpha(i)=k,\:\alpha(j)=l$，那么$\alpha\beta\alpha^{-1}(k)=l$）

定理：$\beta$和$\gamma$是共轭当且仅当他们有相同的结构。

定理：order为12 的A4没有order为6的子群

定理：$A_n,\:n\geq 5$是单群。证明如下

+ $A_4$有正规子群{(), (1,2)(3,4), (1,3)(2,4), (1,4)(2,3)}
+ $A_5$是单群（1、所有3-cycle是共轭的；2、所有不交的交换是共轭的；3、5-cycle构成两个12元的共轭集合；4、|H|=60，但是1+共轭集合都不是60的约数）
+ 如果$H\lhd A_n$，且H中有3-cycle，那么$H=A_n$（首先证明所有3-cycle共轭，然后证明An可由3-cycle生成）
+ $A_6$是单群（考察$\{\alpha|\alpha(i)=i\}$，与$A_5$同构）
+ $A_n$是单群（考察$\beta(i)=j$，必有3-cycle与之不交换，所以可以找到$A_6$的同构）

### 一些群表示论定理

（Cayley）任何一个群G可以被嵌入为$S_G$的子群。如果|G|=n，那么G可以被嵌入$S_n$。（Left translation $L_a(x)=ax$，**$a\to L_a$也被称为G的左正规表示**）

推论：k是一个域，有限群|G|=n，那么G可以被嵌入GL(n,k)。

定理：如果$H\leq G$且$[G:H]=n$，那么有同态$\rho:G\to S_n$，满足$\ker\rho\leq H$。（这样的同态$\rho$称为**G在H陪集上的表示**）

推论：若定理中的G为单群，那么G可以被嵌入到$S_n$。（这也是Cayley定理的一个推广）

定理：$H\leq G$，定义$X$是H在G中的共轭。那么有同态$\phi:G\to S_X$，满足$\ker\phi\leq N_G(H)$。（这样的同态$\phi$称为**G在H共轭上的表示**）

### G-set

集合X，群G，定义X是G-set如果存在$\alpha:G\times X\to X$使得

1. 对$\forall x\in X$，1x=x
2. g(hx)=(gh)x

也称为G作用在X上。

可以看到存在G到$S_x$的同态。同时，群G到$S_X$的同态也能定义一个X上的群作用G。

定义：轨道G-orbit为
$$
O(x)=\{gx:g\in G\}\subset X
$$
定义：x的stabilizer
$$
G_x=\{g\in G:gx=x\}\leq G
$$
定理：如果X是G-set，$x\in X$
$$
|O(x)|=[G:G_x]
$$
推论：如果G是有限群，$x\in G$，那么x的共轭个数为$[G:C_G(x)]$

推论：如果G是有限群，$H\leq G$，那么H的共轭个数是$[G:N_G(H)]$

定义：X是transitive如果它只有一条轨道

定义：如果X和G都是有限的，称G-set X是有限的

定理（Burnside 引理）：有限的G-set X，轨道数量N
$$
N=(1/|G|)\sum_{\tau\in G}F(\tau)
$$
其中$F(\tau)$是被$\tau$所固定的x。

定义：$G\leq S_X$，其中$X=\{1,2,...,n\}$，如果C是colors的集合，那么$C^n$是一个G-set，如果我们定义$\tau(c_1,...,c_n)=(c_{\tau 1},...,c_{\tau n})$。如果$|C|=q$，那么一个$C^n$的轨道称为(q-G)-coloring of X。

引理：C是q个颜色的集合，$G\leq S_X$，如果$\tau\in G$，那么$F(\tau)=q^{t(\tau)}$，其中$t(\tau)$是$\tau$的完全分解的cycle个数。

定义：如果$\tau$的完全分解有$e_r(\tau)\geq 0$个r-cycle，那么定义index
$$
ind(\tau)=x_1^{e_1(\tau)}...x_n^{e_n(\tau)}
$$
如果$G\leq S_n$，那么G的cycle index就是多项式
$$
P_G(x_1,...,x_n)=(1/|G|)\sum_{\tau\in G}ind(\tau)\in Q[x_1,...,x_n]
$$
推论：如果|X|=n，且$G\leq S_n$，那么(q,G)-coloring的数量是$P_G(q,...,q)$。

定理（Polya，1937）：$G\leq S_X$，其中$|X|=n$，$|C|=q$，定义
$$
\sigma^i=c_1^i+...+c_1^i
$$
那么(q,G)-cloring of X且有$f_r$个元素是$c_r$的个数是$P_G(\sigma_1,...,\sigma_n)$中$c_1^{f_1}...c_q^{f_q}$的系数。

### Geometry

定义：motion是保距变换T满足$||Tx-Ty||=||x-y||$。

定义：线性变换S是正交的，如果$||Sx||=||x||$。

定理：集合$O(n,R)$（实正交群）是$GL(n,R)$的子群。motion的集合$M(n,R)$是一个群。

定义：矩阵$A\in GL(n,R)$是正交的，如果$AA^T=I$

定义：如果|T|=1（orietation-preserving），称为旋转。旋转群$SO(n,R)\leq O(n,R)$，显然$[O(n,R):SO(n,R)]=2$

定理：任何沿着过原点的超平面H的反射都不是旋转。

定义：二维平面上的图像$\Delta$的对称群
$$
\Phi(\Delta)=\{S\in O(2,R):S(\Delta)=\Delta\}
$$
定理：如果$\Delta$是一个正n边形，那么$\Phi(\Delta)$是由n阶元素S（旋转）和2阶元素T（反射）生成的。

定义：二面体群$D_{2n}$是2n阶群，由两个元素s,t生成，满足
$$
s^n=1,\:t^2=1,\:tst=s^{-1}
$$
定理：如果G是有限群，如果$a,b\in G$阶都是2，那么存在n，$<a,b>\cong D_{2n}$。（只需取s=ab,t=a即可）

定义：三维平面上的图像$\Omega$
$$
\Phi(\Omega)=\{S\in O(3,R):S(\Omega)=\Omega\}
$$
如果$\Omega$是正n面体，每个面有k个边，那么这个群是nk阶的。

定义：函数$\phi:R^2\to R^2$是仿射映射如果有线性变换$\lambda$和向量z
$$
\phi(v)=\lambda(v)+z
$$
用Aff(2,R)记所有仿射映射的群。

### Sylow Theorems

定义：素数p，p-群是每个元素的阶都是p的幂次。

引理：如果G是个有限阿贝尔群且阶可被素数p整数，那个G有阶为p的元素。

定理（Cauchy，1845）：如果有限G的阶被素数p整除，则G有阶为p的元素。

根据群分类定理：
$$
|G|=|Z(G)|+\sum_i[G:C_G(x_i)]
$$
可得$p|C_G(x_i)$或者$p||Z(G)|$。前者递归可证，后者是阿贝尔群。

另一种证明由J.H.McKay给出，定义$X=\{(a_1,a_2,...,a_p)|a_1a_2...a_p=1\}$，显然$|X|=|G|^{p-1}$，考虑X的每个元素都有p个轮换，除了满足$\forall i,a_i=a,\:a^p=1$。如果没有阶为1的元素，则只有a=1，那么
$$
|X|=|G|^{p-1}=1+kp
$$
与p||G|矛盾。

推论：有限群G是p群当且仅当|G|是p的幂次。

定理：如果$G\neq 1$是有限p群，那么它的中心$Z(G)\neq 1$。

推论：素数p，每个阶为$p^2$的群G都是阿贝尔群。（考察G/Z(G)易知）

定理：G是有限p群，如果H是G的真子群，那么$H<N_G(H)$。

定理：G是有限p群，每个G的最大子群都是正规的，且序为p。（由上可知$N_G(H)=G$）

引理：如果有限p群G有$r_1$个阶为p的子群，那么$r_1=1\mod p$（证明：p阶元素central的mod p=-1，not central是p的幂次。$r_1(p-1)\cong -1\mod p$）

定理：有限p群G有$r_s$个阶为$p^s$的子群，那么$r_s\cong 1\mod p$

证明：H是阶为$p^s$的子群，K是阶为$p^{s+1}$的子群且包含H。那么由上定理可知N是K的正规子群，又由上述引理，这样的K个数a mod p = 1。又可以证明，K是阶为$p^{s+1}$的子群，K的$p^s$子群个数b mod p = 1。因此
$$
\sum_{i=1}^{r_s}a_i=\sum_{j=1}^{r_{s+1}}b_j
$$
由此递归得证。

引理（Laudau，1903）：给定n>0，有理数q，那么只有有限个n元正整数对满足$q=\sum_{j=1}^n(1/i_j)$

定理：给定n，只有有限多个有限群恰好有n个共轭类。（根据引理和共轭类分类定理可得）

定义：素数p，G的sylow p-子群是一个最大p-子群。

引理：P是有限群G的一个sylow p-子群。那么

+ $|N_G(P)/P|$和p互素
+ 如果a是p的幂次阶元素，且$aPa^{-1}=P$，那么$a\in P$

定理（Sylow，1872）：（sylow第二定理）如果P是有限群G的一个sylow p-子群，那么G的所有sylow p-子群和P共轭；（sylow第三定理）如果有r个sylow p-子群，那么r||G|，$r\cong 1\mod p$。

推论：有限群G只有一个sylow p-子群当且仅当它是正规子群。



51

