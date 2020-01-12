---
title: 从一开始的汇编
date: 2020-01-10 15:49:05
categories:
  - 猫爪记
tags:
  - 琉璃猫
---

### Y86(一个玩具)

定义Y86指令集只处理四字节的数据

![](y86.png)

+ 将movl拆分成四个指令，显示指定源和目的。i表示立即数，r表示寄存器，m表示存储器。
+ OPl包含四个整数操作，分别是addl,subl,andl,xorl
+ 三个条件码ZF、SF和OF
+ 7个跳转指令jmp、jle、jl、je、jne、jge、jg
+ 6个条件传送cmovle、cmovl、cmove、cmovne、cmovge、cmovg（属于rrmovl类）
+ call、ret、pushl、popl不变
+ halt相当于X86里的hlt，会直接导致处理器暂停

指令集模拟器YIS

### HCL

位级电路->字级电路

多路复用电路

ALU（算术单元）：根据输入做一次算术运算

### 寄存器

寄存器操作时，输出会一直保存在当前寄存器状态上，直到时钟信号上升。

![](register.png)

这是一个典型的寄存器文件，这样一个多端口随机访问存储器允许同时进行多个读写操作。向寄存器文件写入字是由时钟信号控制的。

![](register2.png)

数据存储器只有一个输入输出。

*现实中更为复杂*

### 顺序实现

一个指令的各个阶段

+ 取指 fetch
+ 解码 decode
+ 执行 execute（包括计算和设置条件码）
+ 访存 memory
+ 写回 write back
+ 更新PC PC update，将PC设置成下一条指令的地址

大多数指令比较简单，最难实现的应该是pushl和popl（举例如下）

| 阶段       | call Dest                                          | ret                               |
| ---------- | -------------------------------------------------- | --------------------------------- |
| fetch      | icode: ifun <-M[PC]<br>valC<-M[PC+1]<br>valP<-PC+5 | icode: ifun <-M[PC]<br>valP<-PC+1 |
| decode     | valB<-R[%esp]                                      | valA<-R[%esp]<br>valB<-R[%esp]    |
| execute    | valE<-valB-4                                       | valE<-valB+4                      |
| memory     | M[valE]<-valP                                      | valM<-M[valA]                     |
| write back | R[%esp]<-valE                                      | R[%esp]<-valE                     |
| PC update  | PC<-valC                                           | PC<-valM                          |

| 阶段       | pushl rA                               | popl rA                                           |
| ---------- | -------------------------------------- | ------------------------------------------------- |
| fetch      | icode: ifun <-M[PC]<br> rA:rB<-M[PC+1] | icode: ifun <-M[PC]<br/> rA:rB<-M[PC+1]           |
| decode     | valP<-PC+2                             | valP<-PC+2                                        |
| execute    | valA<-R[rA] <br/>valB<-R[%esp]         | valA<-R[%esp]<br/> valB<-R[%esp]                  |
| memory     | valE<-valB+(-4)                        | valE<-valB+4                                      |
| write back | M[valE]<-valA <br/>R[%esp]<-valE       | valM<-M[valA]<br/> R[%esp]<-valE <br/>R[rA]<-valM |
| PC update  | PC<-valP                               | PC<-valP                                          |

一种顺序实现如下

![](seq.png)

### SEQ实现

所使用的常数如下（除了指令之外还包括了状态码）

![](seqconstant.png)

##### 取指阶段

+ instr_valid：合法指令
+ need_regids：包括寄存器指示符
+ need_valC：包含常数

![](seqfetch.png)

增加器产生值p+1+need_rigids+4*need_valC

##### 译码和写回阶段

![](seqfetch.png)

##### 执行阶段

![](seqexecute.png)

##### 访存阶段

![](seqmemory.png)

##### 更新PC阶段

HCL描述如下

```
int new_pc = [
	icode == ICALL: valC; # 调用
	icode == IJXX && Cnd: valC; # 跳转
	icode == IRET: valM; # 返回
	1: valP; # 默认
];
```

### 流水线

SEQ的问题在于每个单元只在整个时钟周期的一部分时间里被使用

理想流水线：划分成n个相互独立的周期，每个阶段需要的时间是原来的1/n，其他因素：

+ 不一致的划分
+ 流水线过深，反而降低收益（寄存器的延迟）

现代处理器采用15或更深的流水线，因而需要划分指令的执行减小延迟、设计更好的流水线寄存器、设计时钟传播网络

### 带反馈的流水线



P299

