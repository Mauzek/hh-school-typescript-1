/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

function memoizeTS<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();

  const memoized = function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);

    if (!cache.has(key)) {
      const result = fn.call(this, ...args);
      cache.set(key, result);
      return result;
    }

    console.log("Из кэша ↓↓↓");
    return cache.get(key) as ReturnType<T>;
  };

  return memoized as T;
}


// Тест 1: Проверка работы самого кэша
const slowAddTS = (a: number, b: number) => a + b;
const memoAddTS = memoizeTS(slowAddTS);

console.log(memoAddTS(1, 2)); // 3 (вычисляет)
console.log(memoAddTS(1, 2)); // "Из кэша", 3
console.log(memoAddTS(1, 2)); // "Из кэша", 3


// Тест 2: Различаем типы данных (строки и числа)
const checkTypeTS = (x: unknown) => typeof x;
const memoTypeTS = memoizeTS(checkTypeTS);

console.log(memoTypeTS(100));   // "number" (вычисляет, ключ: "[100]")
console.log(memoTypeTS("100")); // "string" (вычисляет, ключ: '["100"]')
console.log(memoTypeTS(100));   // "Из кэша", "number"


// Тест 3: Важность порядка аргументов
const concatStringsTS = (str1: string, str2: string) => str1 + str2;
const memoConcatTS = memoizeTS(concatStringsTS);

console.log(memoConcatTS("Привет", "Мир")); // "ПриветМир" (вычисляет)
console.log(memoConcatTS("Мир", "Привет")); // "МирПривет" (вычисляет, порядок другой)
console.log(memoConcatTS("Привет", "Мир")); // "Из кэша", "ПриветМир"


// Тест 4: Сохранение контекста this
const userTS2 = {
  discount: 10,
  calculatePrice(price: number) {
    return price - this.discount;
  },
  memoizedCalculate: (value: number) => value, // Заглушка для типизации
};

userTS2.memoizedCalculate = memoizeTS(userTS2.calculatePrice);

console.log(userTS2.memoizedCalculate(100)); // Выведет 90 (Вычисляет)
console.log(userTS2.memoizedCalculate(100)); // Выведет: "Из кэша", 90
