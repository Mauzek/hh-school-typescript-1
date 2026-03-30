import { typedObject, memoize, promiseAll, delay } from "./utils.js";

// Тест 1: Базовый функционал promiseAll
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

promiseAll([p1, p2]).then(console.log);
// Вывод: [1, 2]

// Тест 2: Базовый функционал delay
delay(500).then(() => console.log("Готово через 500мс"));
// Вывод: Готово через 500мс

// Тест 3: Базовый функционал memoize
const slowAdd = (a: number, b: number) => a + b;
const memoAdd = memoize(slowAdd);

console.log(memoAdd(1, 2)); // 3 (вычисляет)
console.log(memoAdd(1, 2)); // "Из кэша", 3
console.log(memoAdd(1, 2)); // "Из кэша", 3

// Тест 4: Базовый функционал typedObject
interface User {
  name: string;
  age: number;
  isAdmin: boolean;
}

const user = typedObject<User>({
  name: "string",
  age: "number",
  isAdmin: "boolean",
});

user.name = "Ivan";
user.age = 20;
user.isAdmin = true;
console.log("Успешное создание:", user);

try {
  user.age = "20";
  console.log("Это сообщение не должно вывестись");
} catch (error) {
  if (error instanceof TypeError) {
    console.error("Тест ошибки типа:", error.message);
  } else {
    console.error("Неизвестная ошибка:", error);
  }

  // Вывод: Тест ошибки типа: Ожидается number для свойства age, получено string
}