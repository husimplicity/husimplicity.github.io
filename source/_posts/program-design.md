---
title: 程序设计
date: 2020-03-22 11:04:03
tags:
  - 琉璃猫
categories:
  - [猫爪记, Computer-Science]
mathjax: true

---

# C语言输入输出

## scanf 

参数可变的函数

```C
int scanf(const char * , ...);
```

第一个参数是格式字符串，后面的参数是变量的地址，函数作用是按照第一个参数指定的格式，将数据读入后面的变量

返回值

+ \>0 成功读入的数据个数
+ 0 没有被赋值
+ EOF 第一个尝试输入的字符是EOF

## printf

参数可变函数

```c
int printf( const char * , ...); 
```

第一个参数是格式字符串，后面的参数是待输出的变量，函数作用是按照第一个参数指定的格式，将后面的变量在屏幕上输出

返回值

+ 成功打印的字符数
+ 返回负值为出错

例子

```C
#include <cstdio>
using namespace std;
int main() 
{
	int a;
	char b;
	char c[20];
	double d = 0;
	float e = 0;
	int n = scanf("%d%c%s%lf%f",&a,&b,c,&d,&e);
	printf("%d %c %s %lf %e %f %d",a,b,c,d,e,e,n);
	return 0; 
}
```

## gets

```C
char * gets(char * s);
```

从标准输入读取一行到字符串s

如果成功，返回值就是s 地址

如果失败，返回值是 NULL

<u>调用时要确保s 指向的缓冲区足够大，否则可能发生内存访问错误</u>

## sscanf和ssprint

```C
int sscanf(const char * buffer, const char * format[, address, ...]);
// 和scanf的区别在于，它是从buffer里读取数据

int sprintf(char *buffer, const char *format[, argument, ...]);
// 和printf的区别在于，它是往buffer里输出数据
```

# C语言高级内容

## 函数指针

定义形式：类型名 (* 指针变量名)(参数类型1, 参数类型2,…);

使用方法：可以用一个原型匹配的函数的名字给一个函数指针赋值。要通过函数指针调用它所指向的函数，写法为：函数指针名(实参表);

```c
void PrintMin(int a,int b)  {
	if( a<b )
	    printf("%d",a);
	else
	    printf("%d",b);
}
int main() {
    void (* pf)(int ,int);
    int x = 4, y = 5;		
    pf = PrintMin;   
    pf(x,y);	
    return 0;
}
```

应用：qsort库

```C
void qsort(void *base, int nelem, unsigned int width, int ( * pfCompare)( const void *, const void *)); // base起始位置，nelem元素个数，width元素宽度
```

## 命令行参数

```c
int main(int argc, char * argv[]){} // argc命令行参数个数，包括可执行程序本身的名字
```

## 位运算

六种运算符：&，|，^，~，<<，>>

应用：交换a，b

```C
     a = a ^ b;
     b = b ^ a;
     a = a ^ b;
```

# 从C到C++

## 引用

下面的写法定义了一个引用，并将其初始化为引用某个变量。 类型名 & 引用名 = 某变量名; 

```C
int n = 4; 
int & r = n;  // r引用了 n, r的类型是 int &
```

定义引用时一定要将其初始化成引用某个变量。

初始化后，它就一直引用该变量，不会再引用别 的变量了。

引用只能引用变量，不能引用常量和表达式。

<u>C语言&取指，C++中&引用</u>

引用可以作为函数的返回值

```C
int n = 4; 
int & SetValue()  { return n;  } 
int main() { 
    SetValue() = 40; 
    cout << n; 
    return 0; 
}  //输出： 40
```

<u>const T & 和T & 是不同的类型</u>

T & 类型的引用或T类型的变量可以用来初始化 const T & 类型的引用。

const T 类型的常变量和const T & 类型的引用则 不能用来初始化T &类型的引用，除非进行强制类 型转换

## 动态内存分配

第一种用法，分配一个变量：T是任意类型名，P是类型为T * 的指针。 

```C++
P = new T;
```

第二种用法，分配一个数组：

```c++
P = new T[N];
```

<u>使用new动态分配的内存空间，一定要用delete进行释放</u>

使用delete释放动态分配的数组，要加[]，

```c++
delete [] p;
```

## 内联函数

 为了减少函数调用的开销，引入了内联函数机制。编译器处理对内联函数的调用语句时，是将整个函数的代码插入到调用语句处，而不会产生调用函数的语句。

```c++
inline int Max(int a,int b) {
    if( a > b) return a; 
    return b; 
}
```

## 函数重载

一个或多个函数，名字相同，然而参数个数或参数类型不相同，这叫做函数的重载

函数重载使得函数命名变得简单。 

编译器根据调用语句的中的实参的个数和类型判断应该调用哪个函数

# 类和对象

## this指针

其作用就是指向成员函数所作用的对象。

```C++
class A 
{
    int i;
public:
    void Hello() { cout << i << "hello" << endl; }
}; 
// 等价于 void Hello(A * this ) { cout << this->i << "hello" << endl; } 
```

**非静态成员函数**中可以直接使用this来代表指向该函数作用的对象的指针。  

```C++
class Complex {
public:
    double real, imag;
    void Print() { cout << real << "," << imag ; }
    Complex(double r,double i):real(r),imag(i) {}
    Complex AddOne() {
        this->real ++; //等价于 real ++;
        this->Print(); //等价于 Print
        return * this;
    }
};
```

## 静态成员

**静态成员**是在说明前面加了static关键字的成员。静态成员变量本质上是全局变量。

<u>普通成员变量每个对象有各自的一份，而静态成员变量一共就一份， 为所有对象共享。</u>

sizeof 运算符不会计算静态成员变量。  

普通成员函数必须具体作用于某个对象，而静态成员函数并不具体作用于某个对象，因此静态成员不需要通过对象就能访问。

四种种访问静态成员的方法

```c++
CRectangle::PrintTotal(); // 类名::成员名
CRectangle r; r.PrintTotal(); // 对象名.成员名
CRectangle * p = &r; p->PrintTotal(); // 指针->成员名
CRectangle & ref = r; int n = ref.nTotalNumber; // 引用.成员名
```

必须在定义类的文件中对静态成员变量进行一次说明或初始化。否则编译能通过，链接不能通过。  

<u>在静态成员函数中，不能访问非静态成员变量，也不能调用非静态成员函数。</u>

例子

```C++
CRectangle::CRectangle(int w_,int h_){
    w = w_;
    h = h_;
    nTotalNumber ++;
    nTotalArea += w * h;
}
CRectangle::~CRectangle(){
    nTotalNumber --;
    nTotalArea -= w * h;
}
void CRectangle::PrintTotal(){
    cout << nTotalNumber << "," << nTotalArea << endl;
}
```

这样写缺陷是在使用CRectangle类时，有时会调用复制构造函数生成临时的隐藏的CRectangle对象  ，比如调用CRectangle类对象作为参数或作为返回值的函数时，并不会增加nTotalNumber，却会在这些对象消亡时调用析构函数。解决办法：写一个赋值构造函数

```C++
CRectangle :: CRectangle(CRectangle & r ){
    w = r.w; h = r.h;
    nTotalNumber ++;
    nTotalArea += w * h;
}
```

## 成员对象和封闭类

有**成员对象**的类叫**封闭类**。

任何生成封闭类对象的语句，都要让编译器明白，对象中的成员对象，是如何初始化的。

具体的做法就是：<u> 通过封闭类的构造函数的初始化列表 。</u> 

封闭类对象生成时，先执行所有对象成员的构造函数，然后才执行封闭类的构造函数。

对象成员的构造函数调用次序和对象成员在类中的说明次序一致，与它们在成员初始化列表中出现的次序无关。

当封闭类的对象消亡时，先执行封闭类的析构函数，然后再执行成员对象的析构函数。次序和构造函数的调用次序相反  

例子

```c++
class CTyre {
public:
    CTyre() { cout << "CTyre contructor" << endl; }
    ~CTyre() { cout << "CTyre destructor" << endl; }
};
class CEngine {
public:
    CEngine() { cout << "CEngine contructor" << endl; }
    ~CEngine() { cout << "CEngine destructor" << endl; }
};
class CCar {
private:
    CEngine engine;
    CTyre tyre;
public:
    CCar( ) { cout << “CCar contructor” << endl; }
    ~CCar() { cout << "CCar destructor" << endl; }
};
// 创建实例
int main(){
    CCar car;
    return 0;
}
/*
输出结果：
CEngine contructor
CTyre contructor
CCar contructor
CCar destructor
CTyre destructor
CEngine destructor
*/
```

<u>封闭类的对象，如果是用默认复制构造函数初始化的，那么它里面包含的成员对象，也会用复制构造函数初始化。</u>

## 友元

友元分为友元函数和友元类两种  

<u>友元函数: 一个类的友元函数可以访问该类的私有成员。</u>

```c++
class CCar ; //提前声明 CCar类，以便后面的CDriver类使用
class CDriver{
public:
    void ModifyCar( CCar * pCar) ; //改装汽车
};
class CCar{
private:
    int price;
friend void CDriver::ModifyCar(CCar * pCar); //声明友元
};
void CDriver::ModifyCar( CCar * pCar){
    pCar->price += 1000; //汽车改装后价值增加
}
```

可以将一个类的成员函数(包括构造、析构函数)说明为另一个类的友元。

<u>友元类: 如果A是B的友元类，那么A的成员函数可以访问B的私有成员。</u>

```C++
class CCar{
private:
    int price;
friend class CDriver; //声明CDriver为友元类
};
```

<u>友元类之间的关系不能传递，不能继承。</u>

## 常量成员函数

如果不希望某个对象的值被改变，则定义该对象的时候可以在前面加 const关键字 。

```C++
const Sample Obj;
```

常量对象只能使用构造函数、析构函数和有const 说明的函数(常量方法）。

```C++
class Sample {
public:
    Sample() { }
    void SetValue() const {}
};
```

常量成员函数内部不能改变属性的值，也不能调用非常量成员函数。  

在<u>定义常量成员函数</u>和<u>声明常量成员函数</u>时都应该使用const 关键字  

如果一个成员函数中没有调用非常量成员函数，也没有修改成员变量的值，那么， 最好将其写成常量成员函数。

两个函数，名字和参数表都一样，但是一个是const,一个不是，算重载。  

const成员函数可以修改的成员变量要加mutable

# 运算符重载

运算符重载的实质是函数重载

可以重载为普通函数，也可以重载为成员函数

把含运算符的表达式转换成对运算符函数的调用

例子

```C++
class Complex { 
public: 
    double real,imag; 
    Complex( double r = 0.0, double i= 0.0 ):real(r),imag(i) {} 
    Complex operator-(const Complex & c); 
}; 
Complex operator+ (const Complex & a, const Complex & b) { 
    return Complex(a.real+b.real,a.imag+b.imag); //返回一个临时对象 
} 
Complex Complex::operator-(const Complex & c) { 
    return Complex(real - c.real, imag - c.imag); //返回一个临时对象 
}
```

## 赋值运算符的重载

赋值运算符“=”只能重载为成员函数

如不定义自己的赋值运算符，那么可能会导致浅拷贝。

## 运算符重载为友元函数

有时，重载为成员函数不能满足使用要求，重载为普通函数，又不能访问类的私有成员，所以需要将运算符重载为友元。

```C++
class Complex { 
    double real,imag; 
public: 
    Complex( double r, double i):real(r),imag(i){ }; 
    Complex operator+( double r );  // c + 5
    friend Complex operator + (double r,const Complex & c); // 5 + c
}
```

## 流插入/提取运算符的重载

```C++
ostream & ostream::operator<<(int n) {
    ... // 输出n的代码
    return * this; 
}
```

## 重载类型转换运算符

## 自增/自减运算符重载

前置运算符作为一元运算符重载

```C++
// 重载为成员函数： 
T & operator++(); 
T & operator--(); 
// 重载为全局函数： 
T1 & operator++(T2); 
T1 & operator--(T2);
```

后置运算符作为二元运算符重载，多写一个没用的参数int

```C++
// 重载为成员函数： 
T operator++(int); 
T operator--(int);
// 重载为全局函数： 
T1 operator++(T2,int ); 
T1 operator--( T2,int);
```

但是在没有后置运算符重载而有前置重载的情况下，在vs中，obj++ 也调用前置重载，而dev则令 obj ++ 编译出错

## 注意事项

C++不允许定义新的运算符

重载不改变优先级顺序

重载(),[],->,=时，重载函数必须声明为类的成员函数。

# 继承和派生

派生类是通过对基类进行修改和扩充得到的。在派生类中，可以扩充新的成员变量 和成员函数。

派生类拥有基类的全部成员函数和成员变量，不论是private、protected、public 。

在派生类的各个成员函数中，不能访问 基类中的private成员。

## 继承关系和复合关系

继承：B继承A，A是基类，B对象也是A对象

复合：C中有成员变量k，k是D对象

## 覆盖

 派生类可以定义一个和基类成员同名的成员，这叫 覆盖。

在派生类中访问这类成员时，缺省的情况是 访问派生类中定义的成员。要在派生类中访问由基 类定义的同名成员时，要使用作用域符号::。

## 类的保护成员

基类的private成员：可以被下列函数访问 

+ 基类的成员函数 
+ 基类的友员函数 

基类的protected成员：可以被下列函数访问 

+ 基类的成员函数 
+ 基类的友员函数 
+ 派生类的成员函数可以访问**当前对象的基类**的保护成员

## 派生类的构造函数

构造函数不能访问基类的private变量

```C++
class Bug { 
private: 
    int nLegs; int nColor; 
public: 
    int nType; 
    Bug (int legs, int color); 
}; 
class FlyBug: public Bug // FlyBug是Bug的派生类 
{ 
    int nWings; 
 public: 
    FlyBug(int legs,int color, int wings); 
};
Bug::Bug(int legs, int color) { nLegs = legs; nColor = color; }
//正确的FlyBug构造函数： 
FlyBug::FlyBug(int legs, int color, int wings):Bug( legs, color) { nWings = wings; }
```

在创建派生类的对象时，需要调用基类的构造函数：初始化派 生类对象中从基类继承的成员。在执行一个派生类的构造函数 之前，总是先执行基类的构造函数。

调用基类构造函数的两种方式 

+ 显式方式：在派生类的构造函数中，为基类的构造函数提供参数. 
+ 隐式方式：在派生类的构造函数中，省略基类构造函数时， 派生类的构造函数则自动调用基类的默认构造函数.

派生类的析构函数被执行时，执行完派生类的析构函数后，自动调用基类的析构函数。

封闭派生类对象构造先基类构造函数，然执行对象成员的构造函数，最后执行自己的构造函数。析构时与之相反。

## public继承的赋值兼容规则

派生类的对象可以赋值给基类对象 

派生类对象可以初始化基类引用

派生类对象的地址可以赋值给基类指针

如果派生方式是 private或protected，则上述三条不可行

<u>protected继承时，基类的public成员和protected成员成为派生类的protected成员。</u>

<u>private继承时，基类的public成员成为派生类的private成员，基类的protected成员成 为派生类的不可访问成员</u>

# 多态

## 虚函数和多态

类的定义中，有virtual关键字的成员函数是虚函数

virtual关键字只用在类定义的函数声明中，写函数体时不用。

通过基类指针调用基类和派生类中的同名同参虚函数时: 

+ 若该指针指向一个基类的对象，那么被调用是基类的虚 函数；
+ 若该指针指向一个派生类的对象，那么被调用的是派生 类的虚函数。

这种机制就叫做**“多态”**。

两种表现形式

+ 派生类的指针可以赋给基类指针

  ```C++
  int main()  { 
      CDerived ODerived; 
      CBase * p = & ODerived; 
      p -> SomeVirtualFunction(); //调用哪个虚函数取决于p指向哪种类型的对象 
      return 0; 
  } 
  ```

+ 派生类的对象可以赋给基类引用

  ```C++
  int main()  { 
      CDerived ODerived; 
      CBase & r = ODerived; 
      r.SomeVirtualFunction(); //调用哪个虚函数取决于r引用哪种类型的对象 
      return 0; 
  }
  ```

<u>在非构造函数，非析构函数的成员 函数中调用虚函数，是多态!!!</u>

在构造函数和析构函数中调用虚函数，不是多态。编 译时即可确定，调用的函数是自己的类或基类中定义 的函数，不会等到运行时才决定调用自己的还是派生 类的函数。

派生类中和基类中虚函数同名同参数表的函数，不加virtual也自动成为虚函数

<u>虚函数的访问权限根据基类定义所决定。</u>

## 多态的实现原理

“多态”的关键在于通过基类指针或引用调用 一个虚函数时，编译时不确定到底调用的是基类还 是派生类的函数，运行时才确定——这叫**“动态联编”**。

<u>多态实现的关键 --- 虚函数表</u>

每一个有虚函数的类（或有虚函数的类的派生类） 都有一个虚函数表，该类的任何对象中都放着虚函数 表的指针。虚函数表中列出了该类的虚函数地址。

多态的函数调用语句被 编译成一系列根据基类指 针所指向的（或基类引用 所引用的）对象中存放的 虚函数表的地址，在虚函 数表中查找虚函数地址， 并调用虚函数的指令。 

```C++
class A   { 
public: virtual void Func() { cout << "A::Func" << endl; } 
}; 

class B:public A  { 
public: virtual void Func() { cout << "B::Func" << endl; } 
}; 

int main()  { 
	A a; 
	A * pa = new B(); 
	pa->Func(); //若是64位程序,指针为8字节，则应为long long 
	long * p1 = (long * ) & a; 
	long * p2 = (long * ) pa; 
	cout << * p1 << " " << * p2 << "\n";
	* p2 = * p1; 
	pa->Func(); 
    return 0;  
}
// 输出为：
// B::Func
// A::Func
```

## 虚析构函数

通过基类的指针删除派生类对象时，通常情况下只调用基类的析构函数。但是，删除一个派生类的对象时，应该先调用派生类的析构函 数，然后调用基类的析构函数。 

解决办法：把基类的析构函数声明为virtual 

派生类的析构函数可以virtual不进行声明

+ 通过基类的指针删除派生类对象时，首先调用派生类的析构函 数，然后调用基类的析构函数 
+  一般来说，一个类如果定义了虚函数，则应该将析构函数也定义成 虚函数。

或者，一个类打算作为基类使用，也应该将析构函数定义 成虚函数。 

<u>注意：不允许以虚函数作为构造函数</u>

## 纯虚函数和抽象类

纯虚函数：没有函数体的虚函数

```c++
virtual void func() = 0; // 纯虚函数
```

包含纯虚函数的类叫抽象类

不能创建抽象类的对象

抽象类只能作为基类来派生新类

在抽象类的成员函数内可以调用纯虚函数，但是在构造函数或析构函数内部 不能调用纯虚函数。

# 输入输出

输入输出相关的类

istream/ostream/iostream 流类

ifstream/ofstream/fstream 文件类

## 标准流对象

输入流cin从键盘读入

输出流cout、cerr、clog向屏幕输出（缺省情况下三者一样）

可以被重新向为向文件读/写数据

可以用如下方法判输入流结束

```c++
int x;
while (cin>>x){
...
}
return 0;
```

如果从键盘输入，则在单独一行输入ctrl+z代表输入流结束

## istream类成员函数

```c++
istream & getline(char * buf, int bufSize);
// 从输入流中读取bufSize-1个字符到缓冲区buf，或读到碰到‘\n’ 为止（哪个先到算哪个）
istream & getline(char * buf, int bufSize,char delim);
// 从输入流中读取bufSize-1个字符到缓冲区buf，或读到碰到delim字 符为止（哪个先到算哪个）
```

两个函数都会自动在buf中读入数据的结尾添加\0’。

‘\n’或 delim都不会被读入buf，但会被从输入流中取走。如果输入流中 ‘\n’或delim之前的字符个数达到或超过了bufSize个，就导致读 入出错，其结果就是：虽然本次读入已经完成，但是之后的读入就 都会失败了

可以用 `if(!cin.getline(…))` 判断输入是否结束

`bool eof(); `判断输入流是否结束 

`int peek(); ` 返回下一个字符,但不从流中去掉. 

`istream & putback(char c); `将字符ch放回输入流 

`istream & ignore( int nCount = 1, int delim = EOF );` 从流中删掉最多nCount个字符，遇到EOF时结束。

## 重定向

```C++
freopen("test.txt","w",stdout);  //将标准输出重定向到 test.txt文件 
freopen(“t.txt”,“r”,stdin);  //cin被改为从 t.txt中读取数据 
```

## 流操纵算子

<u>使用流操纵算子需要 `#include <iomanip>`</u>

整数流的基数：流操纵算子dec,oct,hex 

```C++
int n = 10; 
cout << n << endl; // 10
cout << hex << n << “\n” // a 
    << dec << n << “\n”  // 10
    << oct << n << endl;  // 12
```

指定输出浮点数有效位数（非定点方式输出）/小数点后有效位数（定点方式输出）：

precision是成员函数，调用方式为`cout.precision(5);`

setprecision是流操作算子，调用方式为`cout<<setprecision(5);`

`setiosflags(ios::fixed) `定点输出模式

`resetiosflags(ios::fixed) `非定点输出模式

设置域宽的流操作算子：

setw是流算子`cin>>setw(4);`

width是成员函数`cin.width(5);`

<u>宽度设置有效性是一次性的，在每次读入和 输出之前都要设置宽度。</u>

其他操作算子

`showpos`显示正负号/`noshowpos`不显示正负号

`left`、`right`、`internal`左/右/中

`scientific`科学计数法

用户自定义算子

```C++
ostream &tab(ostream &output){ 
    return output << '\t'; 
} 
// 这是因为iostream对<<进行了重载
ostream & operator <<(  ostream & ( * p ) ( ostream & ) ) ;
```

## 文件读写

`#include<fstream>`

```C++
ofstream outFile("clients.dat", ios::out|ios::binary);
```

`ios::out` 删除原有内容 `ios::app`保留原有内容

也可以先出创建ofstream对象，再用`open`函数打开

`tellp()`获得指针位置

`seekp(location)`将指针移到location处

`seekp(location, ios::beg)`从开头数，`seekp(location, ios::cur)`从当前数，`seekp(location, ios::end)`从结尾数

location可以是负数

关闭文件：

```c++
ifstream fin("1.dat", ios::in);
fin.close();

ofstream fout("1.dat", ios::out);
fout.close();
```

二进制读文件

```C++
istream& read (char* s, long n);
// 将文件读指针指向的地方的n个字节内容，读入到内存地址s，然后将文件读指针向后移动n字节
ostream& write (const char* s, long n);
// 将内存地址s处的n个字节内容，写入到文件中写指针指向的位置， 然后将文件写指针向后移动n字节
```

<u>二进制文件和文本文件的区别</u>

Linux,Unix下的换行符号：‘\n’  (ASCII码:  0x0a) 

Windows 下的换行符号：‘\r\n’  (ASCII码： 0x0d0a)    endl 就是 '\n' 

Mac OS下的换行符号： ‘\r’  (ASCII码：0x0d)

二进制和Linux下一致

# 模板

## 函数模板

```c++
template <class T> 
void Swap(T & x,T & y) { 
    T tmp = x; 
    x = y; 
    y = tmp; 
}
```

也可以不通过参数实例化函数模板

```C++
template <class T> 
T Inc(T n) { 
    return 1 + n; 
} 
int main() { 
    cout << Inc<double>(4)/2;  //输出 2.5 
    return 0; 
}
```

函数模板可以重载，只要它们的形参表或类型参数表不同即可

在有多个函数和函数模板名字相同的情况下，编译器如下处理一 条函数调用语句

1.  先找参数完全匹配的普通函数(非由模板实例化而得的函数)。 
2. 再找参数完全匹配的模板函数。 
3. 再找实参数经过自动类型转换后能够匹配的普通函数。 
4. 都找不到，则报错。

匹配模板函数时，不进行类型自动转换

## 类模板

```C++
template <class T1,class T2> 
class Pair { 
    public: 
    T1 key;  //关键字 
    T2 value;     //值 
    Pair(T1 k,T2 v):key(k),value(v) { }; 
    bool operator < ( const Pair<T1,T2> & p) const; 
}; 
template<class T1,class T2> 
bool Pair<T1,T2>::operator < ( const Pair<T1,T2> & p) const //Pair的成员函数 operator < 
{ 
    return key < p.key;    
}
```

编译器由类模板生成类的过程叫类模板的实例化。

由类 模板实例化得到的类，叫模板类。

<u>同一个类模板的两个模板类是不兼容的。</u>

类模板的“<类型参数表>”中可以出现非类型参数： `template <class T, int size>`

## 类模板和派生

类模板从类模板派生

类模板从普通类派生

类模板从模板类派生

普通类从模板类派生

## 类模板和友元

 函数、类、类的成员函数作为类模板的友元 

函数模板作为类模板的友元 

函数模板作为类的友元 

类模板作为类模板的友元

# 标准模板库（STL）

C++ 语言的核心优势之一就是便于软件的重用

C++中有两个方面体现重用：

1. 面向对象的思想：继承和多态，标准类库

2. 泛型程序设计(generic programming) 的思想： 模板机制，以及标准模板库 STL

将一些常用的数据结构（比如链表，数组，二叉树）和算法（比如排序，查找）写成模板，以后则不论数据结构里放的是什么对象，算法针对什么样的对象，则都不必重新实现数据结构，重新编写算法。

**标准模板库 (Standard Template Library) **就是一些常用数据结构和算法的模板的集合。

**有了STL，不必再写大多的标准数据结构和算法，并且可获得非常高的性能。**

## 基本概念

**容器**：可容纳各种数据类型的通用数据结构，是类模板

**迭代器：**可用于依次存取容器中元素，类似于指针

**算法：**用来操作容器中的元素的函数模板

## 容器

对象被插入容器中时，被插入的是对象的一个**复制品**。许多算法，比如排序，查找，要求对容器中的元素进行比较，有的容器本身就是排序的，所以，放入容器的对象所属的类，往往还应该重载 == 和 < 运算符。

### 顺序容器

vector, deque, list

**vector**

头文件`<vector>`

动态数组。元素在内存连续存放。随机存取任何元素都能在**常数时间**完成。在尾端增删元素具有较佳的性能

**deque**

头文件`<deque>`

双向队列。元素在内存连续存放。随机存取任何元素都能在常数时间完成(但次于vector)。在两端增删元素具有较佳的性能(大部分情况下是常数时间）。

所有适用于 vector的操作都适用于 deque。

deque还有 push_front（将元素插入到前面） 和 pop_front(删除最前面的元素）操作。

**list**

头文件`<list>`

双向链表。元素在内存**不连续存放**。在任何位置增删元素都能在常数时间完成。**不支持随机存取。**

 除了具有所有顺序容器都有的成员函数以外，还支持8个成员函数：

+ push_front: 在前面插入
+  pop_front:  删除前面的元素
+  sort:    排序 ( list 不支持 STL 的算法 sort)
+ remove:    删除和指定值相等的所有元素
+ unique:   删除所有和前一个元素相同的元素
+ merge:    合并两个链表，并清空被合并的那个
+ reverse:    颠倒链表
+  splice:   在指定位置前面插入另一链表中的一个或多个元素,并在另一链表中删除被插入的元素

### 关联容器

元素是排序的

插入任何元素，都按相应的排序规则来确定其位置

在查找时具有非常好的性能

通常以平衡二叉树方式实现，插入和检索的时间都是 O(log(N))

set, multiset, map, multimap

内部元素有序排列，新元素插入的位置取决于它的值，查找速度快。

除了各容器都有的函数外，还支持以下成员函数：

+ find: 查找等于某个值 的元素(x小于y和y小于x同时不成立即为相等)
+  lower_bound : 查找某个下界
+  upper_bound : 查找某个上界
+  equal_range : 同时查找上界和下界
+  count :计算等于某个值的元素个数(x小于y和y小于x同时不成立即为相等)
+  insert: 用以插入一个元素或一个区间

**set/multiset**

头文件`<set>` 

区别在于是否允许存储相同元素

multiset的定义如下

```C++
template<class Key, class Pred = less<Key>, 
	        class A = allocator<Key> >
class multiset { …… };
```

Pred类型的变量决定了multiset 中的元素，“一个比另一个小”是怎么定义的。multiset运行过程中，比较两个元素x,y的大小的做法，就是生成一个 Pred类型的变量，假定为 op,若表达式op(x,y) 返回值为true,则 x比y小。 Pred的缺省类型是` less<Key>`。

```C++
// less模板的定义
template<class T> 
struct less : public binary_function<T, T, bool> 
{ bool operator()(const T& x, const T& y) { return x < y ; } const;   };  
```



multiset用法如下

```C++
#include<set>
multiset<A> a;
// 等价于
multiset<A, less<A>> a;
```

由于less模板默认<比较大小，所以A不可比较时需要重载<

**map/multimap**

头文件`<map>`

map与set的不同在于map中存放的元素有且仅有两个成员变量，一个名为first,另一个名为second, map根据first值对元素进行从小到大排序，并可快速地根据first来检索元素。

pair模板如下，map/multimap里放着都是pair模板类的对象

```C++
  template<class _T1, class _T2>
    struct pair
    {
      typedef _T1 first_type;  
      typedef _T2 second_type; 
      _T1 first;               
      _T2 second;              
      pair(): first(), second() { }
      pair(const _T1& __a, const _T2& __b)
      : first(__a), second(__b) { }
      template<class _U1, class _U2>
      pair(const pair<_U1, _U2>& __p)
	: first(__p.first), second(__p.second) { }
    };
```

multimap定义如下

```C++
template<class Key, class T, class Pred = less<Key>,
		 class A = allocator<T> > 
class multimap { 
	….
	typedef pair<const Key, T> value_type; 
	…….	
 };    //Key 代表关键字的类型
```

multimap中的元素由 <关键字,值>组成，每个元素是一个pair对象，关键字就是first成员变量,其类型是Key

multimap 中允许多个元素的关键字相同。元素按照first成员变量从小到大排列，缺省情况下用 `less<Key>` 定义关键字的“小于”关系。

### 容器适配器

stack, queue, priority_queue

+ push 插入元素
+ pop 弹出元素
+ top 返回栈顶元素的引用

**stack**

头文件`<stack>`

后进先出

```C++
template<class T, class Cont = deque<T> >  
class stack { 
	…..
}; 
```

可用 vector, list, deque来实现。缺省情况下，用deque实现。用 vector和deque实现，比用list实现性能好。

**queue**

头文件`<queue>`

先进先出

和stack 基本类似，可以用 list和deque实现。缺省情况下用deque实现。

**priority_queue**

头文件`<queue>`

优先级队列。最高优先级元素总是第一个出列

和 queue类似，可以用vector和deque实现。缺省情况下用vector实现。

priority_queue 通常用堆排序技术实现，保证最大的元素总是在最前面。即执行pop操作时，删除的是最大的元素；执行top操作时，返回的是最大元素的引用。默认的元素比较器是 `less<T>`。

### 成员函数

begin 第一个元素的迭代器

end 最后一个元素后面的迭代器

rbegin 最后一个元素的迭代器

rend 第一个元素前面的迭代器

erase

clear

front 第一个元素的引用

back 最后一个元素的引用

push_back

pop_back

## 迭代器

用于指向顺序容器和关联容器中的元素

迭代器用法和指针类似

有const 和非 const两种

通过迭代器可以读取它指向的元素

通过非const迭代器还能修改其指向的元素

定义一个容器类的迭代器的方法可以是：

 `容器类名::iterator  变量名;`

或：

 `容器类名::const_iterator 变量名;`

访问一个迭代器指向的元素：

 `* 迭代器变量名`

迭代器可以执行++，--

可以判断是否相等

如果是随机访问迭代器，可以+i，-i， p[i]，可以判断大小

容器适配器（stack、queue、priority_queue）不支持迭代器

vector/deque 随机访问，list/set/map 双向

## 算法

算法就是一个个**函数模板**, 大多数在`<algorithm>` 中定义

STL中提供能在各种容器中通用的算法，比如查找，排序等

算法通过迭代器来操纵容器中的元素。许多算法可以对容器中的一个局部区间进行操作，因此需要两个参数，一个是起始元素的迭代器，一个是终止元素的后面一个元素的迭代器。比如，排序和查找

有的算法返回一个迭代器。比如 find() 算法，在容器中查找一个元素，并返回一个指向该元素的迭代器

算法可以处理容器，也可以处理普通数组

**find**

```C++
template<class InIt, class T>
InIt find(InIt first, InIt last, const T& val); 
```

first 和 last 这两个参数都是容器的迭代器，它们给出了容器中的查找区间起点和终点[first,last)。区间的起点是位于查找范围之中的，而终点不是。find在[first,last)查找等于val的元素

用 == 运算符判断相等

函数返回值是一个迭代器。如果找到，则该迭代器指向被找到的元素。如果找不到，则该迭代器等于last

**STL中“大”“小” 的概念**

关联容器内部的元素是从小到大排序的

有些算法要求其操作的区间是从小到大排序的，称为“有序区间算法”，例如`binary_search`

有些算法会对区间进行从小到大排序，称为“排序算法”，例如` sort`

还有一些其他算法会用到“大”，“小”的概念

使用STL时，在缺省的情况下，以下三个说法等价：

+ x比y小
+ 表达式“x<y”为真
+ y比x大

## 函数对象

是个对象，但是用起来看上去象函数调用，实际上也执行了函数调用。

```C++
class CMyAverage  {
public:
	double operator()( int a1, int a2, int a3 ) { //重载 () 运算符
		return (double)(a1 + a2+a3) / 3;
	}
};
 CMyAverage average;  //函数对象
 cout << average(3,2,3); // average.operator()(3,2,3) 用起来看上去象函数调用 输出 2.66667
```

STL里有以下模板

```C++
template<class InIt, class T, class Pred> 
T accumulate(InIt first, InIt last, T val, Pred pr); 
```

pr 就是个函数对象。

对[first,last)中的每个迭代器 I, 

执行 val = pr(val,* I) ,返回最终的val。

Pr也可以是个函数。

**greater 函数对象类模板**

```C++
template<class T>
struct greater : public binary_function<T, T, bool>{ 
 bool operator()(const T& x, const T& y) const {
     return x > y;
 }
};
//binary_function定义：
template<class Arg1, class Arg2, class Result> 
struct binary_function { 
	typedef Arg1 first_argument_type;
	typedef Arg2 second_argument_type; 
	typedef Result result_type;    
}; 
```

## 算法

STL中的算法大致可以分为以下七类：

+ 不变序列算法

  此类算法不会修改算法所作用的容器或对象，适用于所有容器。它们的时间复杂度都是O(n)的。

  min、max、for_each、count、count_if、find、find_if、find_end、find_first_of、adjacent_find，search、search_n、equal

+ 变值算法

  此类算法会修改源区间或目标区间元素的值。值被修改的那个区间，不可以是属于关联容器的。

  for_each、copy、copy_backward、transform、swap_ranges、fill、fill_n、generate、replace、replace_if、replace_copy、replace_copy_if

+ 删除算法

  删除算法会删除一个容器里的某些元素。这里所说的“删除”，并不会使容器里的元素减少，其工作过程是：将所有应该被删除的元素看做空位子，然后用留下的元素从后往前移，依次去填空位子。元素往前移后，它原来的位置也就算是空位子，也应由后面的留下的元素来填上。最后，没有被填上的空位子，维持其原来的值不变。删除算法不应作用于关联容器。

  remove、remove_if、remove_copy、remove_copy_if、unique、unique_copy

+ 变序算法

  变序算法改变容器中元素的顺序，但是不改变元素的值。变序算法不适用于关联容器。此类算法复杂度都是O(n)的。

  reverse、reverse_copy，rotate（左移）、next_permutation（下一个排列）、prev_permutation、random_shuffle（需要预设随机种子）、partition

+ 排序算法

  排序算法比前面的变序算法复杂度更高，一般是O(n×log(n))。排序算法需要随机访问迭代器的支持，因而不适用于关联容器和list。

  sort（快排）、stable_sort（归并）、partial_sort（部分排序，直到最小的n个元素就位）、nth_element、make_heap、push_heap、pop_heap、sort_heap

+ 有序区间算法

  有序区间算法要求所操作的区间是已经从小到大排好序的，而且需要随机访问迭代器的支持。所以有序区间算法不能用于关联容器和list。

  binary_search、includes、lower_bound、upper_bound、merge、set_union、set_intersection、set_difference、

+ 数值算法

大多重载的算法都是有两个版本的，其中一个是用“==”判断元素是否相等，或用“<”来比较大小；而另一个版本多出来一个类型参数“Pred”，以及函数形参“Pred op”,该版本通过表达式“op(x,y)”的返回值是ture还是false，来判断x是否“等于”y，或者x是否“小于”y。如下面的有两个版本的min_element:

```C++
iterate min_element(iterate first,iterate last);
iterate min_element(iterate first,iterate last, Pred op);
```

# C++11特性

统一的是初始化方法

```C++
int arr[3]{1, 2, 3}; 
vector<int> iv{1, 2, 3}; 
map<int, string>  mp{{1, "a"}, {2, "b"}}; 
string str{"Hello World"}; 
int * p = new int[20]{1,2,3}; 
```

```C++
struct A { 
    int i,j;  
    A(int m,int n):i(m),j(n) { }  
}; 
int main() { 
    A * pa = new A {3,7}; 
    A a[] = {{1,2},{3,4},{5,6}}; 
}
```

成员变量默认初始值

```C++
class B { 
    public: 
    int m = 1234; 
};
```

auto关键字：用于定义变量，编译起可以自动判断变量的类型

```C++
auto 
```

decltype 关键字：求表达式的类型

```C++
decltype
```

智能指针shared_ptr：通过shared_ptr的构造函数，可以让shared_ptr对象托管一个new运算符返 回的指针,此后ptr就可以像 T* 类型的指针一样来使用，即 *ptr 就是用new动态分配的那 个对象，而且不必操心释放内存的事。多个shared_ptr对象可以同时托管一个指针，系统会维护一个托管计数。当 无shared_ptr托管该指针时，delete该指针。 <u>shared_ptr对象不能托管指向动态分配的数组的指针，否则程序运行会出错</u>

```C++
#include <memory> 
int main() { 
    shared_ptr<A> sp1(new A(2)); //sp1托管A(2) 
    sp1.reset();           //sp1放弃托管 A(2) 
    A * q = new A(3); 
    sp1.reset(q); // sp1托管q 
}
```

基于范围的for循环

```C++
int main()  { 
    int ary[] = {1,2,3,4,5}; 
    for(int & e: ary)  
        e*= 10; 
    for(int e : ary) 
        cout << e << ",";
    return 0;
}
```

右值引用和move语义：一般来说，不能取地址的表达式，就是右值， 能取地址的，就是左值。

```C++
class A { }; 
A & r = A(); // error , A()是无名变量，是右值 
A && r = A(); //ok, r 是右值引用
```

```C++
template <class T> 
void MoveSwap(T& a, T& b)   { 
    T tmp(move(a)); // std::move(a)为右值，这里会调用move constructor 
    a = move(b);    // move(b)为右值，因此这里会调用move assigment 
    b = move(tmp);  // move(tmp)为右值，因此这里会调用move assigment 
}
```

无序容器(哈希表) 

```C++
#include <unordered_map> 
unordered_map<string,int> turingWinner; //图灵奖获奖名单
```

正则表达式

```C++
#include <regex>
regex reg("b.?p.*k"); 
cout << regex_match("bopggk",reg) <<endl;
```

Lambda表达式

```C++
[外部变量访问方式说明符](参数表) ->返回值类型 { 语句组 }
// “->返回值类型”也可以没有， 没有则编译器自动判断返回值类型
/*
[] 不使用任何外部变量 
[=] 以传值的形式使用所有外部变量 
[&] 以引用形式使用所有外部变量 
[x, &y] x 以传值形式使用，y 以引用形式使用 
[=,&x,&y] x,y 以引用形式使用，其余变量以传值形式使用 
[&,x,y] x,y 以传值的形式使用，其余变量以引用形式使用
*/
```

多线程 

```
#include <thread>
```

# C++11高级特性

## 强制类型转换

static_cast、reinterpret_cast、const_cast和dynamic_cast

static_cast用来进用行比较“自然”和低风险的转换，比 如整型和实数型、字符型之间互相转换。static_cast不能来在不同类型的指针之间互相转换，也不 能用于整型和指针之间的互相转换，也不能用于不同类型的 引用之间的转换。

reinterpret_cast用来进行各种不同类型的指针之间的转换、不同 类型的引用之间转换、以及指针和能容纳得下指针的整数类型之间 的转换。转换的时候，执行的是逐个比特拷贝的操作。

const_cast用来进行去除const属性的转换。将const引用转换成同类型的非 const引用，将const指针转换为同类型的非const指针时用它。

dynamic_cast专门用于将多态基类的指针或引用，强 制转换为派生类的指针或引用，而且能够检查转换的 安全性。对于不安全的指针转换，转换结果返回NULL 指针。 

dynamic_cast不能用于将非多态基类的指针或引用， 强制转换为派生类的指针或引用

## 异常处理

```C++
try{... throw ...}
catch(...){...}
```

C++标准库中有一些类代表异常，这些类都是从exception类派生而来

bad_typeid

bad_cast

bad_alloc

ios_base::failure

logic_error/out_of_range

## 运行时类型检查

 C++运算符typeid是单目运算符，可以在程序运行过程中获取一个表达式的值的 类型。typeid运算的返回值是一个type_info类的对象，里面包含了类型的信息。

```C++
#include <typeinfo> //要使用typeinfo，需要此头文件
cout << "1) int is: " << typeid(int).name() << endl; //输出 1) int is: in
```

## Boost.Any

 实现任意类型的存储 

```C++
any a = 10;        // 存储一个 int  
a = string(“hello world”); // 存储字符串  
a = myclass(); // 存储自己的对象  
cout << any_cast<int>(a); // 转换为需要的类型 
```

关于 any_cast 

 存储的类型与转换的类型不一致会抛出bad_any_cast 

指针版不一致返回空指针

```C++
#include <boost/any.hpp> 
//成员函数： 
any(); 
~any(); 
any(const any&); 
any& operator = (const any&); 
any& swap(any&); 
bool empty(); 
template<typename ValueType> any(const ValueType&); 
any& operator = (const ValueType&); 
// 独立函数： 
template<typename ValueType> 
ValueType any_cast(const any&); // Throw bad_any_cast 
const ValueType* any_cast(const any*); // Return NULL 
ValueType* any_cast(any*);
```

<u> 抽象基类 + 模板派生 = 编译时的多态</u>

## 多文件共享全局变量

```C++
extern
```

## 多继承

一个类可以有多个直接基类，这叫多继承 

```C++
class C :public A, public B { };
```

多继承可能导致二义性，因此需要把直接基类继承base声明为**虚拟基类**

```C++
class A { 
public : 
    int va;   
    void fun() { } 
};  
class B : virtual public A  {  int vb;    };     
class C : virtual public A  {  int vc;    };         
class D : public B, public C {  int  vd ; }; 
```

## 接口

调用C函数

```C++
extern "C" void c_func();
```

python调用C++

编译成动态链接库c.so，然后拷贝到调用它的python程序的文件夹下: g++ -o c.so -shared -fPIC c.cpp

```python
import ctypes 
from ctypes import * # c类型库 
import struct
libc = CDLL('c.so') #装入动态链接库 
libc.cpp_func1(c_char_p(bytes("this高达",encoding="utf-8"))); 
```

## 条件编译

```C++
(#define XXX/#undef XXX)
#ifdef XXX/#ifndef XXX
...
(#else ...)
#endif
```

# STL(Review)

六大部件

+ 容器
+ 分配器
+ 算法
+ 迭代器
+ 适配器
+ 仿函式

```C++
#include <vector>
#include <algorithm>
#include <functional>
#include <iostream>
using namespace std;
int main(){
    int ia[6] = {1, 2, 3, 4, 5, 6};
    vector<int, allocator<int>> vi(ia, ia+6);
    // 容器vector，分配器allocator（可以不写）
    cout << count_if(vi.begin(), vi.end(),
                    not1(bind2nd(less<int>(), 40))));
    // 算法count_if 迭代器.begin .end 
    // 函数适配器negator binder 函数less
    return 0;
}
```

## 容器

Set/Map 都是用红黑树实现的 

单向列表`forward_list`（和GNU_C中的`slist`完全一样），只有`push_front`

`array`无法扩充，`vector`两倍扩充

`deque`是一个本质是map到buffer的一些指针，

`unordered_multimap`相当于hash_map

`hash_set` `hash_map` `hash_multiset` `hash_multimap`并不是规范C++语言，但在编译器中实现（注意include的头文件位置） 

容器分类：

序列式容器：

+ array
+ vector
  - heap
    - priority_queue
+ list
+ slist（非标准）
+ dequeue（分段连续）
  - stack
  - queue

关联式容器

+ rb_tree（非公开）
  - set
  - map
  - multiset
  - multimap
+ hashtable（非公开、非标准）
  - hash_set
  - hash_map
  - hash_multiset
  - hash_multimap

### list

**GNU2.9** sizeof=4

```C++
template <class T, class Alloc=alloc >
class list{
protected:
    typedef __list_node<T> list_node;
public:
    typedef list_node* link_type;
    typedef __list_iterator<T, T&, T*> iterator;
protected:
    link_type node;
}
```

其中list node定义为（这里void pointer是有明显问题的）

```C++
template <class T>
struct __list_node {
    typedef void* void_pointer;
    void_pointer prev;
    void_pointer next;
    T data;
}
```

其中list iterator定义为

```C++
template <class T, class Ref, class Ptr>
struct __list_iterator {
    typedef __list_iterator<T, Ref, Ptr> self;
    typedef bidirectional_iterator_tag iterator_category; // necessary
    typedef T value_type; // necessary
    typedef Ptr pointer; // necessary
    typedef Ref reference; // necessary
    typedef __list_node<T>* link_type;
    typedef ptrdiff_t differnece_type; // necessary
    
    link_type node;
    
    reference operator*() const {return (*node).data;}
    pointer operato r->() const {return &(operator*())}
    self& operator++(){node=(link_type)((*node).next);return *this}
    self operator++(int){self tmp=*this; ++*this; return tmp;} 
    // tmp=*this 并不会调用重载的*，因为赋值操作被重载，this被解释为参数 
    // __list_iterator(const iterator& x): node(x.node){}
    // 之后++*this 也不会调用重载的*，因为*this已被解释为参数 
    ...
}
```

**GNU4.9**

修改了iterator和node的定义

```C++
// list 定义
template <typename _Tp, typename _Alloc=std::allocator<_Tp>>
class list: protected _List_base<_Tp, _Alloc>{
public:
    typedef __list_iterator<_Tp> iterator;
    ...
}
// iterator 定义
template<typename _Tp>
struct _List_iterator{
    typedef _Tp* pointer;
    typedef _Tp& reference;
}
// node 定义
struct _List_node_base{
    _List_node_base* _M_next;
    _List_node_base* _M_prev;
}
template<typename _Tp>
struct _List_node: public _List_node_base {
    _Tp _M_data;
}
```

list的父类定义`_List_base`有成员`_List_impl<_Tp,_A>`继承自`_A<List_node<_Tp>>`

<u>list的实际实现是**双向、环状**的，为了符合“前闭后开”的要求。</u>

### vector

两倍扩张

```C++
void push_back(const T& x){
    if (finish != end_of_storage){
        construct(finish, x);
        ++finish;
    }else{
        insert_aux(end(), x);
    }
}

template<class T, class Alloc>
void vector<T, Alloc>::insert_aux(iterator position, const T& x){
    if (finish != end_of_storage){ // 和push_back里的检查是一样的
        construct(finish, *(finish - 1));
        ++finish;
        T x_copy = x;
        copy_backward(position, finish - 2, finish - 1);
        *position = x_copy
    }else{
        const size_type old_size = size();
        const size_type len = old_size != 0 ? 2 * old_size : 1;
        
        iterator new_start = data_allocator::allocate(len);
        iterator new_finish = new_start;
        try {
            new_finish = uninitialized_copy(start, position, new_start);
            construct(new_finish, x);
            ++new_finish;
            new_finish = uninitialized_copy(position, finish, new_finish); //拷贝安插点之后的内容，因为insert也可能需要扩充
        } catch () {
            ...
        }
        // 销毁原vector
        destroy(begin(), end());
        deallocate();
        // 更新
        start = new_start;
        finish = new_finish;
        end_of_storage = new_start + len;
    }
}
```

vector的iterator（GNU4.9：舍近求远）

```C++
template<typename _Tp, typename _Alloc = std::allocator<_Tp>>
class vector : protected _Vector_base<_Tp, _Alloc>{
    typedef _Vector_Base<_Tp, _Alloc> _Base;
    typedef typename _Base::pointer pointer;
    typedef __gnu_cxx::__normal_iterator<pointer, vector> iterator;
    // _M_current:_Tp* 本质与GNU2.9相同
}
```

### array

TR1版本（C++1之后）

```C++
template<typename _Tp, std::size_t _Nm>
struct array {
    typedef _Tp value_type;
    typedef _Tp* pointer;
    typedef value_type* iterator;
    
    value_type _M_instance[_Nm ? _Nm : 1]; // 长度为0的默认为1
    iterator begin(){
        return iterator(&_M_instance[0]);
    }
    iterator end(){
        return iterator(&_M_instance[_Nm]);
    }
    ...
}
```

GNU4.9中的定义方式本质与之相同，变得更加复杂，但没有明显好处

```C++
template<typename _Tp, std::size_t _Nm>
struct array{
    ...
    //support for zero-sized array
    typedef _GLIIBCXX_STD_C::__array_traits<_Tp, _Nm> _AT_Type;
    typename _AT_Type::_Type _M_elems;
    ...
}

template<typename _Tp, std::size_t _Nm>
struct __array_traits{
    typedef _Tp _Type[_Nm];
    ...
}
```

```C++
int a[100]; // ok
int[100] b; // fail
typedef int T[100]; // OK
```

### deque

看上去连续，其实是分段的：多个buffer（或者称为node）

有一个中控（称为map）维护这些buffer，map是个vector

iterator分为四格：cur,first,last,node（前三个都是指向node中的位置）

## 迭代器

例：以`rotate`函数为例

```C++
template<typename _ForwardIterator>
inline void rotate(_ForwardIterator __first,
                  _ForwardIterator __middle,
                  _ForwardITerator __last){
    std::__rotate(__first, __middle, __last,
                  std::__iterator_category(__first));    
}
```

`rotate`需要知道iterators的三个associated types：为了回答iterator的类型，在C++标准库中设计出5种，`iterator_category`，`difference_type`， `value_type`，`reference`， `pointer`，后两种在STL中从未使用过。

回答的方式：`typedef`

```C++
// GNU2.9
template <class T, class Ref, class Ptr>
struct __list_iterator {
    typedef bidirectional_iterator_tag iterator_category; // necessary
    typedef T value_type; // necessary 
    typedef Ptr pointer; // necessary
    typedef Ref reference; // necessary
    typedef ptrdiff_t differnece_type; // necessary
    ......
};
// GNU4.9
template <typename _Tp>
struct _List_iterator {
    typedef std::bidirectional_iterator_tag iterator_category; // necessary
    typedef _Tp value_type; // necessary 
    typedef _Tp* pointer; // necessary
    typedef _Tp& reference; // necessary
    typedef ptrdiff_t differnece_type; // necessary
    ......
};
```

萃取机`traits`

分辨iterator是class还是pointer

实现方法：*偏特化*

```C++
template<class I>
struct iterator_traits {
    typedef typename I::value_type value_type;
};
// 偏特化
template<class T>
sturct iterator_traits<T*>{
    typedef T value_type;
}
template<class T>
struct iterator_traits<const *T>{
    typedef T value_type;
}
```

<u>标准库中有各式各样的萃取机</u>

## 分配器

除了默认的allocator之外还有

mt_allocator，debug_allocator，pool_allocator，bitmap_allocator，malloc_allocator，new_allocator，要`include<ext\相应的头文件>`

<u>分配器可以直接使用，但没有必要</u>

```C++
allocator<int> alloc;
p = alloc.allocate(1); // 1个元素
alloc.deallocate(p, 1);
```

所有分配内存（包括`new`）都会归结到`malloc`

由于malloc需要记录指针和*分配内存大小*，这是额外开销。但在容器中，利用元素大小相同这一点，G2.9 标准库 alloc对`allocator`的实现设计了16个链表，以节省这一部分开销。G4.9中命名为pool_allocator可以调用（不再是默认）。

## 泛型编程（GP）

面向对象编程（OOP）把方法放进对象

泛型编程（GP）却将datas和methods分开

*算法*通过*迭代器*确定操作范围，并通过*迭代器*取用*容器*元素。这样*算法*和*容器*可以独立开发。

所有的算法，最终涉及元素本身的操作，就是<u>比大小</u>

Template模板（略）

Specialization特化

```C++
// 泛化
template<class type>
struct __type_traits{...}
// 特化
template<>
struct __type_traits<int>{...}
```

Partial Specialization偏特化：可以特化一部分template（个数偏特化），也可以改变template

```C++
template <class Iterator>
struct iterator_traits {...}
// 偏特化为指针
template <class T>
struct iterator_traits<T*> {...}
```



