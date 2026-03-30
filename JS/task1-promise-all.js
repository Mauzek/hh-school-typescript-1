/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let resolvedCount = 0;

    promises.length === 0 && resolve(results);

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          resolvedCount++;
          if (resolvedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

// Тест 1: Базовый функционал
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

promiseAll([p1, p2]).then(console.log);
// Вывод: [1, 2]


// Тест 2: Пустой массив промисов
promiseAll([]).then((res) => {
  console.log("Бубу бебе:", res); 
});
// Вывод: Бубу бебе: []


// Тест 3: Немедленный реджект при первой ошибке
const pSuccess = Promise.resolve("Успех");
const pFail = Promise.reject("Критическая ошибка");
const pSuccess2 = Promise.resolve("Этот не дождемся");

promiseAll([pSuccess, pFail, pSuccess2])
  .then((res) => console.log("Не должно сработать", res))
  .catch((err) => console.error("Тест ошибки:", err)); 
// Вывод: Тест ошибки: Критическая ошибка


// Тест 4: Сохранение порядка результатов
const slowPromise = new Promise((resolve) => setTimeout(() => resolve("Я долгий"), 100));
const fastPromise = new Promise((resolve) => setTimeout(() => resolve("Я быстрый"), 10));

promiseAll([slowPromise, fastPromise])
  .then((res) => console.log("Тест порядка:", res)); 
// Вывод: Тест порядка: [ 'Я долгий', 'Я быстрый' ]


// Тест 5: Обработка не промисов
promiseAll([42, "Привет", Promise.resolve(true)])
  .then((res) => console.log("Смешанные типы:", res)); 
// Вывод: Смешанные типы: [ 42, 'Привет', true ]