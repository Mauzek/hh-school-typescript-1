/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/
// Просто скопировал типизацию оригинального Promise.all

type PromiseAllResult<T extends readonly unknown[]> = {
  -readonly [P in keyof T]: Awaited<T[P]>;
};

function promiseAllTS<T extends readonly unknown[] | []>(promises: T): Promise<PromiseAllResult<T>> {
  return new Promise((resolve, reject) => {
    const results: Awaited<T[number]>[] = [];
    let resolvedCount = 0;

    if (promises.length === 0) return resolve(results as unknown as PromiseAllResult<T>);

    promises.forEach((promise, index) => {
      Promise.resolve<T[number]>(promise) // Было => Promise.resolve(promise as T[number])
        .then((value) => {
          results[index] = value;
          resolvedCount++;
          if (resolvedCount === promises.length) {
            resolve(results as unknown as PromiseAllResult<T>);
          }
        })
        .catch(reject);
    });
  });
}

const p1TS = 10;
const p2TS = Promise.resolve("Привет");
const p3TS = Promise.resolve(true);

promiseAllTS([p1TS, p2TS, p3TS]).then((res) => {
  console.log(res);
});

// Тест 2: Пустой массив промисов
promiseAllTS([]).then((res) => {
  console.log("Бубу бебе:", res); 
});
// Вывод: Бубу бебе: []


// Тест 3: Немедленный реджект при первой ошибке
const pSuccessTS = Promise.resolve("Успех");
const pFailTS = Promise.reject("Критическая ошибка");
const pSuccess2TS = Promise.resolve("Этот не дождемся");

promiseAllTS([pSuccessTS, pFailTS, pSuccess2TS])
  .then((res) => console.log("Не должно сработать", res))
  .catch((err) => console.error("Тест ошибки:", err)); 
// Вывод: Тест ошибки: Критическая ошибка


// Тест 4: Сохранение порядка результатов
const slowPromiseTS = new Promise((resolve) => setTimeout(() => resolve("Я долгий"), 100));
const fastPromiseTS = new Promise((resolve) => setTimeout(() => resolve("Я быстрый"), 10));

promiseAllTS([slowPromiseTS, fastPromiseTS])
  .then((res) => console.log("Тест порядка:", res)); 
// Вывод: Тест порядка: [ 'Я долгий', 'Я быстрый' ]


// Тест 5: Обработка не промисов
promiseAllTS([42, "Привет", Promise.resolve(true)])
  .then((res) => console.log("Смешанные типы:", res)); 
// Вывод: Смешанные типы: [ 42, 'Привет', true ]