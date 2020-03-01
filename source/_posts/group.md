---
title: 团团伙伙论
date: 2020-02-26 16:00:15
tags:
  - 琉璃猫
categories:
  - 猫爪记
mathjax: true
---

### 群论

集合X的变换$\alpha$的群记为$S_X$（对称群）

<u>Cycle notation：可以证明任意变换可以写作不相交的轮换</u>

另一种形式是写成交换的形式。

由此可以确定变换的奇偶。可以证明$sgn(\alpha)=(-1)^{n-t}$，t为轮换的个数。显然奇偶变换数量一样。

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

定义：x的共轭为$for\:some\:a\:,axa^{-1}$

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



35