---
title: 数据库概论
date: 2020-03-06 21:22:46
tags:
  - 琉璃猫
categories:
  - [猫爪记, Computer-Science]
mathjax: true
---

### 关系模型

关系模型三要素：

+ 静态
+ 动态关系
+ 约束

关系代数六种基本操作

- 一元操作
  - 选择$\sigma$
  - 投影$\pi$
  - 重命名$\rho$
- 多元操作
  - 并集$\cup$
  - 差集$-$（先排序减少查重次数）
  - 笛卡尔积$\times$

其他操作：

+ 交运算：虽然可以用差集表示，但底层直接实现
+ $\theta$连接：笛卡尔积代价很大，所以连接表操作时并非笛卡尔积+选择而是先排序+连接
+ 自然连接：选取相同属性列上取值相等的元组
+ 除操作：满足$q\times s\subseteq r$的最大关系q（可以表示为笛卡尔积+差集，实现是排序）
+ 赋值运算：临时表，不支持递归定义（连接次数和数据相关）
+ 外连接：
+ 聚集函数：五个函数 sum、count、mean、max、mean（-distinct）
+ 分组和聚集函数
+ 广义投影：投影+计算

删除/修改操作

空值返回Unknown，计算为false

视图View：虚表，限制数据访问范围，作为基本表和外模式之间的映像；更新原表需要满足列数一样等限制

物化视图：1、频繁使用的；2、固定的

关系代数表达式的等价规则：oracle有约50条等价优化规则

关系代数树：合并投影，投影/选择尽可能移向叶节点

元组关系演算：存在/任意/否

<u>元组关系演算与关系代数等价</u>

### SQL概述

+ 数据操作：SELECT，INSERT，UPDATE，DELETE
+ 数据定义：CREATE，ALTER，DROP
+ 数据控制：GRANT，REVOKE

**SQL查询和关系模型**

+ SQL Parser
+ Query Optimization and Execution
+ Relational Operators（基本运算实现）
+ Files and Access Methods（堆文件、顺序文件、B+树）
+ Buffer Management（数据库特性的缓存管理）
+ Disk Space Management（定长纪录、非定长纪录）

SQL和关系代数的差别

+ SQL引入排序符号
+ SQL支持单值集合直接使用
+ SQL投影默认不去重（去重加distinct），集合默认去重（不去重加All）
+ SQL支持递归、group by等操作

SQL查询语句

+ SELECT子句：支持*、支持四则运算、支持不加FROM实现数值运算
+ FROM子句
+ WHERE子句

其他语句

+ 去重distinct
+ ORDER BY排序
+ AS重命名（可省略AS）