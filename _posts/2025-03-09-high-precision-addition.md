---
title: "高精加模板"
date: 2025-03-09
permalink: /posts/2025/03/high-precision-addition/
published: true
excerpt: "C++ 高精度加法模板"
tags:
  - algorithm
  - c++
  - template
  - 高精度
---

```cpp
#define r int // register关键字将变量存储在CPU寄存器中，可以提高效率
struct BigInteger
{
    char str[100001];     // str数组用于存储字符串
    int num[100001], len; // num数组为str数组转为int类型的结果，len为str的长度，也就是num的大小

    inline void init() {
        // 统一初始化为0，避免高位未清空影响后续运算
        len = 1;
        memset(str, 0, sizeof str), memset(num, 0, sizeof num);
        str[0] = '0';
    }

    inline void assign(const char *k) {
        init();
        if (!k || !*k) return;
        int slen = strlen(k);
        len = 0;
        // 倒序存储，便于直接模拟竖式加法
        for (r i = slen - 1; i + 1; --i)
            if (k[i] >= '0' && k[i] <= '9') num[len++] = k[i] - 48;

        // 去掉高位前导0，但至少保留一位
        while (len > 1 && num[len - 1] == 0) --len;
        if (!len) len = 1;
        for (r i = 0; i ^ len; ++i)
            str[i] = char(num[len - 1 - i] + 48);
    }

    inline void output() const { // 输出函数，由于是反向模拟加法的，所以也需要反向输出
        for (r i = len - 1; i + 1; --i)
            printf("%d", num[i]);
    }

    BigInteger &operator+=(const BigInteger &k) { // 开始重载了，加法竖式模拟
        len = std::max(len, k.len);
        r f = 0;
        for (r i = 0; i ^ len; ++i)
        {
            num[i] += k.num[i] + f;
            if (num[i] > 9) num[i] -= 10, f = 1;
            else f = 0;
        }
        if (f) num[len++] = 1; // 这里是对进位的处理
        return *this;       //*this返回一个指向类本身的指针
    }
    BigInteger operator+(const BigInteger &k) const {
        // operator+ 返回新对象，避免直接修改左操作数
        BigInteger res(*this);
        res += k;
        return res;
    }

    BigInteger() { // 初始化，清零所有变量和数组
        init();
    }

    BigInteger(int k) { // 将BigInteger类型赋为int类型，也可当做强制转换使用
        memset(str, 0, sizeof str), memset(num, 0, sizeof num);
        long long x = k;
        if (x < 0) x = -x;
        sprintf(str, "%lld", x);      // sprintf与printf类似，可以当做将数值打印到字符串中
        len = strlen(str);            // 保存字符串长度
        std::reverse(str, str + len); // 由于需要反向模拟竖式，所以我们在这里就调用STL的reverse函数将str字符串倒过来
        for (r i = 0; i ^ len; ++i)
            num[i] = str[i] - 48; // 将字符串转为int类型
    }

    BigInteger(const char *k) {
        // 字符串构造可以直接处理超出int范围的大整数
        assign(k);
    }
};
```
