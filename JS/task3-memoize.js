/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      const result = fn.call(this, ...args);
      cache.set(key, result);
      return result;
    }
    console.log("Из кэша ↓↓↓");
    return cache.get(key);
  };
}

const slowAdd = (a, b) => a + b;
const memoAdd = memoize(slowAdd);

// Тест 1: Проверка работы самого кэша
console.log(memoAdd(1, 2)); // 3 (вычисляет)
console.log(memoAdd(1, 2)); // "Из кэша", 3 
console.log(memoAdd(1, 2)); // "Из кэша", 3 


// Тест 2: Различаем типы данных (строки и числа)
const checkType = (x) => typeof x;
const memoType = memoize(checkType);

console.log(memoType(100));   // "number" (вычисляет, ключ: "[100]")
console.log(memoType("100")); // "string" (вычисляет, ключ: '["100"]')
console.log(memoType(100));   // "Из кэша", "number"


// Тест 3: Важность порядка аргументов
const concatStrings = (str1, str2) => str1 + str2;
const memoConcat = memoize(concatStrings);

console.log(memoConcat("Привет", "Мир")); // "ПриветМир" (вычисляет)
console.log(memoConcat("Мир", "Привет")); // "МирПривет" (вычисляет, порядок другой)
console.log(memoConcat("Привет", "Мир")); // "Из кэша", "ПриветМир"

// Тест 4: Сохранение контекста this
const user = {
  discount: 10,
  calculatePrice(price) {
    return price - this.discount; 
  }
};

user.memoizedCalculate = memoize(user.calculatePrice);

console.log(user.memoizedCalculate(100)); // Выведет 90 (Вычисляет)
console.log(user.memoizedCalculate(100)); // Выведет: "Из кэша", 90