/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObjectTS<T extends object>(schema: Record<string, string>): T {
  return new Proxy({} as T, {
    set(target, prop, value, receiver) {
      if (typeof prop === "symbol") {
        return Reflect.set(target, prop, value, receiver);
      }

      if (!schema[prop]) {
        throw new TypeError(`Свойство ${prop} не описано в схеме`);
      }
      if (typeof value !== schema[prop]) {
        throw new TypeError(
          `Ожидается ${schema[prop]} для свойства ${prop}, получено ${typeof value}`,
        );
      }

      return Reflect.set(target, prop, value, receiver);
    },
  });
}

interface User {
  name: string;
  age: number;
  isAdmin: boolean;
}

// Инициализация
const userTS = typedObjectTS<User>({
  name: "string",
  age: "number",
  isAdmin: "boolean",
});

// Тест 1: Успешное присваивание правильных типов
userTS.name = "Ivan";
userTS.age = 20;
userTS.isAdmin = true;
console.log("Успешное создание:", userTS);
// Вывод: { name: 'Ivan', age: 20, isAdmin: true }

// Тест 2: Выброс ошибки при несовпадении типов
try {
  userTS.age = "20";
  console.log("Это сообщение не должно вывестись");
} catch (error) {
  if (error instanceof TypeError) {
    console.error("Тест ошибки типа:", error.message);
  } else {
    console.error("Неизвестная ошибка:", error);
  }

  // Вывод: Тест ошибки типа: Ожидается number для свойства age, получено string
}

// Тест 3: Выброс ошибки при добавлении неизвестного свойства
try {
  userTS.city = "Moscow";
} catch (error) {
  if (error instanceof TypeError) {
    console.error("Тест неизвестного свойства:", error.message);
  } else {
    console.error("Неизвестная ошибка:", error);
  }

  // Вывод: Тест неизвестного свойства: Свойство city не описано в схеме
}

// Тест 4: Проверка мутации существующего объекта (изменение значения)
try {
  userTS.name = "Petr"; // Правильный тип
  userTS.name = 123; // Неправильный тип при перезаписи
} catch (error) {
  if (error instanceof TypeError) {
    console.error("Тест перезаписи:", error.message);
  } else {
    console.error("Неизвестная ошибка:", error);
  }
  // Вывод: Тест перезаписи: Ожидается string для свойства name, получено number
}
