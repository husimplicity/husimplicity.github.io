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

+ 字符串操作：(not) like ""，

  `%`匹配零个或多个，`_`匹配任意单个字符，`escape \`转义字符

关系连接

+ 连接类型：`inner join` `left outer join` `right outer join` `full outer join`
+ 链接条件：`nature` `on<谓词>` `using(A1,A2,..,An)

<u>写法比较简单，并不标准，执行和集合操作等价</u>

集合操作

union/intersect/except

<u>集合操作是自动去重的，不去重要加上`all`</u>

聚集函数

`max` `min` `avg` `sum` `count`

如果select后有聚集函数，则非聚集函数列必须在`group by`中出现

分组

`group by 列名 [having 条件表达式]`

空值

`is [not] null`

空值参与算术运算，结果也为null，逻辑运算为false，聚集函数直接忽略

`ISNULL(check_expression,replacement)`：如果check_expression为空则用replacement替代

嵌套子查询

+ 集合成员资格：`in`
+ 集合之间比较：`>= all` `some` 
+ 集合基数的测试
  - 测试集合是否为空 `[not] exists`
  - 测试集合是否存在重复元组 `unique` 没有重复元组则返回true（可用count替代所以并不常用）

派生关系

`AS`命名为临时关系 

临时视图

`with ... as ..., ... as ... select ...` 

**SQL修改功能**

`insert into 表名 [列名] values (...)` 插入一条指定好值的元组

`insert into 表名 [列名] (子查询)`插入子查询结果的若干条元组

多行数据的插入可以用union实现

`delete from 表名 [where 条件表达式]`

`truncate table`删除表中所有行（比delete快，但不能带条件）

`update 表名 set 列名=表达式|子查询 [where 条件表达式]`

 ORACLE数据库支持 `case` `when`根据条件update

SQL Servert支持用其他表更新某个表的数据（注意可能出现结果不确定的情况）

**视图**

`create view view_name [列名] as (查询表达式) [with check option]`

取消视图`drop view view_name`

用视图更新原表需要满足很多条件，视图更新约束如下

+ 有主码
+ select子句目标列不能包括聚集函数，不能有group by
+ select子句不能用distinct
+ 不能包括计算出的列

**事务**

大多是数据库中，每个SQL执行成功后自动提交

每个事务包含一个语句

我们可以取消自动提交，使之支持多事务

**数据定义语言（DDL）**

域定义：

基本表的定义：

```sql
create table 表名 (
    列名 数据类型 [default 缺省值] [not null] 
    [, primary key (列名)] 
    [, foreign key (列名)] 
    [, check(约束条件)]
)`
```

修改表的定义

```sql
alter table 表名
[add 子句] 增加新列和约束
[drop 子句] 删除列和约束 某些数据库不支持
[modify 子句] 修改列定义
```

删除表 `drop table 表名`

索引的定义

`create [unique] [clustr] index 索引名 on 表名 (列名[asc/desc])`

unique：唯一性索引，不允许不同行索引值相同

cluster：聚集索引，影响物理存储位置，一张表只能有一个聚集索引（主要影响区间查询速度）

<u>如果是非unique且非cluster的索引可能速度反而更慢</u>

删除索引 `drop index 索引名`

### 高级SQL

#### 完整性

##### 域约束：

`create domain 域名 域定义`

还可以通过`constraint value-test check(value > 4)`或者更复杂的`constraint account-type-test check(value in ('A', 'B'))`甚至还可以使用动态check

##### 引用完整性：

删除操作根据外码定义方式决定`restrict` 不能删除 `cascade`  一起删除 `set null`设为空值

##### 断言

`create assertion 断言名 check 语句` ：表明数据库所满足的条件，实现一般性约束。check约束、主码约束、外键约束可以看作其特例。

断言会导致显著的代价。目前数据库一般不支持assertion。

#### 功能增强

##### SQL数据分析/递归SQL：

扩展`Group by`按照不同标准聚集-->多维数据分析模型：

+ `rollup`  在指定属性列表的每个前缀上分组聚集的并集（相当于依次`group by`结果合集）
+ `cube`：2^n次`group by`合集

#####  支持排序、支持扩展聚集函数

基本分析句法 `<function name> () OVER ([partition by <exp1>] order by <exp2> [ASC|DESC] [NULLS FIRST|NULLS LAST])` 其中`partition by`用以分组，`NULL FIRST`确定空值的处理

排序函数`rank` `dense_rank`具体例子是`select student, rank() over (order by marks desc) from ...` <u>否则实现需要用连接+count</u>

滑动窗口`AVG(price) OVER (Order by date ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING)`

递归SQL `with A as (select ...(初始条件) union all select ... from A where ...)` 结束条件是A不再变化，<u>考虑到具体执行方式是分层执行，内层不支持聚集函数</u> 

##### 触发器

在SQL 99被引入，机制包括三点

+ E 执行时机：触发动作为insert、delete或者update
+ C 执行条件
+ A 完成动作

`create trigger 触发器名字 after|before insert|delete|update [of 列名] on 表名`

`referencing old|new table` 指定新旧数据

示例

```SQL
CREATE TRIGGER overdraft-trigger AFTER UPDATE ON account
REFERENCING NEW ROW AS nrow FOR EACH ROW
WHEN nrow.balance < 0
BEGIN atomic
    insert into ...
END
```

<u>功能强大，对数据库负担也很大</u>

可以用于实现数据一致性、维护概要表、完成特定审计、记录关键变化

但是很难被优化、判定触发链终止条件比较复杂

##### 存储过程

数据库中的一段程序，执行代码会存储到数据库

适合功能单一、逻辑复杂、相对集中的任务

应用：手机月度账单计算

```sql
CREATE PROCEDURE Move(
    IN oldAddr VARCHAR[255],
    IN newAddr VARCHAR[255]
)
UPDATE MovieStar
SET address = newAddr
WHERE address = oldAddr;
```

使用方式`CALL Move("old", "new")`

安全性+性能+可维护性

##### 嵌入式SQL

SQL提供的预编译器将SQL语句预编译为C语句

如果返回只有一条记录可以用`select ... into ...`

返回多个记录用<u>游标</u>（相当于迭代器）`fetch`

游标分为滚动游标（可以取任意元组）、非滚动游标（只能顺序取下一个元组）、更新游标（增加更新锁）

使用游标需要先声明，再打开，然后检索。之后需要关闭和释放。

`declare 游标名[scroll] cursor for select ... [for update]`

`open`  `fetch ... from 游标名` `close` `free`

通过游标更新`update ... where current of 游标名`

##### SQL模块化

ODBC（Open Database Connectivity）标准：微软提出的应用程序和数据库交互的标准

JDBC基于ODBC+跨平台

好处：易实用，易移植，不需要预编译

缺点：动态绑定，执行效率低，运行时检查SQL语法

##### 图数据查询

创建点`CREATE TABLE 表名 (...) AS NODE;`

创建边`CREATE TABLE 表名 (...) AS EDGE;`

查询：`... WHERE MATCH (点名-(边名)->点名[-...->...])`

#### 安全性

防止不合法使用造成的数据*泄露*和*破坏*

##### 安全性控制

DBA

完备的策略是收回用户权限的时候，删除用户给出的权限和<u>不是从管理员出发的给这用户的权限</u>。

每一个权限应该形成从管理员出发的完整的权限链

授权命令`GRANT 表级权限 ON 表名|视图名 TO 用户 [WITH GRANT OPTION]`

表级权限包括select,update,...,以及 all。select和update可以指定列名

`with grant option`表示用户可以再把权限授予其他用户

收回权限 `REVOKE` 用法和授权一样

GRANTh和REVOKE权限不能细化到某个元组，但是可以通过<u>和视图结合支持元组级别授权</u>

基于<u>角色</u>的安全访问控制：`CREATE ROLE 角色名` `GRANT 角色名 TO 用户`

##### 自主访问控制

DAC：基于用户-对象权限访问矩阵和授权机制

桔皮书C1级别

##### 强制访问控制

MAC：每一个数据库对象有安全级别，用户也有安全级别

桔皮书B1级别

两条规则：

+ 主体级别>=客体 才能读

+ 主体=客体 才能写

修正规则：

+ 主体级别 <= 客体 才能写
+ 用户可以为写入数据对象赋予高于自己的级别

共同点

+ 禁止高级别主体更新低级别数据
+ 禁止低级别主体查询高级别数据

<u>Multilevel Relation</u>：每个数据用标签表明写入的级别（可以有相同主码）

##### 审计

DBA事前，审计事后

审计权限在DBA之外

##### SQL注入攻击

例1

在username输入`';DROP TABLE USERS; --`

那么后台验证时执行 

```SQL
SELECT password FROM USERS WHERE username IS '';DROP TABLE USERS; --'
```

(`--`是SQL注释符号，保证语句正确性)

例2

在参数输入 `0 OR 1=1` 获得更多数据

其他

+ 通过特殊函数，使得服务器反馈详细信息，如版本和补丁信息
+ 分析反馈错误信息，获取模式信息，例如 `union select top 1 name from sysobjects`报错将'admin'转换为int时失败

解决方法

+ 动态绑定SQL语句：应用程序+后台数据，将输入作为参数接收
+ 验证所有的输入：验证输入有效性，防止注释符号等
+ 设置合理权限

### 实体关系模型

标准Entity-Relationship图

E-R图：用以交流，需要表达

+ 实体（方形）
+ 关系（菱形）
+ 属性（椭圆）
+ 多值属性（双椭圆）
+ 派生属性（虚椭圆）
+ 码（主码）
+ 参与（单线）/完全参与（双线）
+ 多对一/一对一（箭头）：此时不一定需要关系表

扩展属性（*微妙*）

+ 存在依赖（一个实体存在依赖于另一个实体）
+ 弱实体集（实体自身的属性不足以区分自己）（双长方形，需要以双菱形标识联系）
+ 父类-子类（标记为ISA三角形）
  - 成员资格由条件定义/用户定义
  - 子类不相交/有重叠

E-R图转换为表关系

+ 一般情况：属性对应多列
+ 复合属性：不支持
+ 多值属性：新的关系表
+ 一对一联系：
  - 均部分参与：定义为新的关系
  - 一方全部参与：作为一列，省略关系表

+ 一对多：作为列
+ 多对多：关系表
+ 弱实体：加入依赖强实体的码
+ ISA：三表方案/两表方案

**E-R模型的设计**

1. 需求分析
2. 确定局部结构范围
3. 实体定义
4. 联系定义
5. 属性分配
6. 局部E-R设计

...之后...

1. 局部E-R图
2. 确定公共实体类型
3. 合并局部E-R
4. 检查并消除冲突（属性冲突、命名冲突、结构冲突）
5. 全局E-R优化

工具：PowerDesigner

### 关系数据库设计

1. 需求分析
2. 概要设计（E-R图）
3. 逻辑设计（DBMS模型）
4. **模式细化**（规范化操作/逆规范化）
5. 物理设计
6. 安全设计

不良设计-->范式-->模式分解-->去范式的模式设计

##### 函数依赖

问题：数据冗余、插入/删除异常（限制信息表达能力）

问题本质是**函数依赖**：对客观世界的提炼（而非根据数据得出）

函数依赖分类

+ 平凡依赖：$Y\subset X$，$X\to Y$显然成立
+ 完全/部分依赖：是否存在X的子集$X'$，$X'\to Y$
+ 传递函数依赖：$X\to Y$，$Y\to Z$，且X不依赖于Y，$(X\cup Y)\cap Z=null$，称Z对X传递函数依赖。

<u>SQL没用提供函数依赖的支持，但是可以通过断言实现</u>

**多值依赖**：

关系U=(X,Y,Z)，给定(x,z)，有一组y，这组y仅仅取决于x而与z无关，此时y、z都是多值依赖于x（具有对称性），如果z是空集，则为平凡的多值依赖。函数依赖是多值依赖的特例。

多值依赖的有效性与属性集范围有关（增加属性不一定成立，而减少属性一定成立）

这是1NF范式的要求导致的

**码的术语**：

+ 属性K决定关系U，称K为**超码**
+ U完全依赖于K，称K为**候选码**
+ 候选码中选一个作为**主码**
+ 包括在任一候选码中的属性称为**主属性**
+ 关系模式的码由整个属性组成，称为**全码**，（此时不存在非平凡的函数依赖）

##### 范式

+ 1NF：元素不可再分（考虑查询代价）
+ 2NF：非主属性完全依赖于码（考虑数据冗余及插入/删除异常）
+ 3NF：不存在非主属性对码*传递依赖*（同上）
+ BCNF：不存在主属性对码的依赖
+ 4NF：不存在对码的多值依赖（主要是冗余）
+ 5NF

一般3NF/BCNF综合收益最高

$$
BCNF\subset 3NF\subset 2NF
$$
模式分解

模式分解的要求

+ 无损
+ 保持依赖
+ 无冗余

##### Armstrong公理系统

正确的、完备的推理规则集

Armstrong公理：

+ 自反律：$Y\subset X\Rightarrow X\to Y$
+ 增广律：$X\to Y\Rightarrow XZ\to YZ$
+ 传递性

根据公理导出的规则

+ 合并律：$X\to Y,\:X\to Z\Rightarrow X\to YZ$
+ 分解律：上式反向
+ 伪传递率：$X\to Y,\: YW\to Z\Rightarrow XW\to Z$

<u>闭包的概念</u>

##### 候选码的计算

考察属性出现在依赖F左边还是右边

启发式规则

+ 左部属性必是主属性
+ 右部属性必是非主属性
+ 外部属性必是主属性

##### 模式分解相关算法

**正则覆盖**：没有冗余依赖的等价依赖集合

**无损连接分解定理**：分解$\rho=\{R_1,R_2\}$是无损连接分解的条件是$R_1\cap R_2\to R_1-R_2$或者$R_1\cap R_2\to R_2-R_1$

**函数依赖保持**：分解之后不需要连接表也可以验证函数依赖

**BCNF分解算法**

如果模式$R_i$不属于BCNF，那么找到$R_i$上的非平凡函数依赖$\alpha\to\beta$使得$\alpha\to R_i$不属于$F^+$（即$\alpha$不是码），那么将$R_i$分解为$R_i-\beta$和$(\alpha,\beta)$

**3NF分解算法**

正则覆盖的每个依赖是一张表

如果没有模式包含R的候选码，则再加一张表

<u>3NF分解是函数依赖保持的</u>

### 事务

事务是程序逻辑运行单位

必须保持数据库的一致性

ACID性质

+ Atomicity：事务的原子性
+ Consistency：保持数据库的一致性
+ Isolation：每个事务不了解其他并发事务--依靠**事务调度**实现
+ Durability：将更新永久化

事务调度

+ 串行

+ 并发--要求**可串行化**，即等价于某个串行调度

  两个事务的指令冲突当且仅当两者都存/取数据项Q，且至少有一个write指令

**视图可串行化**是指在任意调度中，事务read到的值都是一样的。

**冲突可串行化**调度的结果相同

<u>视图可串行化而非冲突可串行化必有盲写（blind write，不读直接写）</u>

事务调度好坏的标准：可恢复性，要求撤销*读取了失败事务写入数据的*事务

-->**无级联调度**：不读没有commit的数据，一定是可恢复的

冲突可串行化判定

-->**优先图**：要求不能有环，绘制方法是根据对一个数据的write有关的前后顺序判定箭头指向

事务隔离性级别：

+ serializable：串行（最高级别）
+ repeatable read：可能发生幻象（没有index锁）
+ read committed：重复读值可能改变（没有数据锁）
+ read uncommitted：读脏数据

##### 并发策略的实现

事务调度器

事务协议

+ 悲观控制策略：采取等待的方式避免冲突

  两种锁：排他锁（X-锁）、共享锁（S-锁），这样调度器只负责锁的控制

  锁控制协议：两阶段锁协议，第一阶段只能获得锁，第二阶段只能释放锁，事务结束的顺序就是事务lock point的先后。

  改进：可能存在级联回滚，提交时释放锁

  - 严格（Strict）：提交时才能释放排它锁
  - 严密（Rigorous）：提交时才能释放锁

  带有锁转换的两阶段锁协议：提高并发性（并无副作用）

  锁的自动获得：read/write

  锁的自动释放：commit 

  <u>另一种方式：图协议，要求所有数据项施加偏序</u>

  <u>另一种方式：树协议，避免重复加锁，缺陷是假设了数据的树状结构</u>

  <u>另一种方式：多粒度协议--多粒度锁（IS、IX、SIX锁，其中I表示其后裔）</u>

  共同缺陷：死锁，两种处理方法，都需要回滚

  + 预防：预先占据所需全部资源/资源预先排序/事务排序（wait-die非抢占式和wound-wait抢占式，都使得老事务具有对新事务的优先级）
  + 检测+恢复：基于时间戳的协议（空间代价）-->Thomas写规则，会被覆盖的Write可以忽略不回滚

  多版本时间戳序列：方便回滚读取

  -->多版本两阶段锁协议：区分只读事务和更新事务

+ 乐观控制策略：采取事务回滚的方式避免冲突

