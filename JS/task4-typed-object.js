/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {
  return new Proxy({},
    {
      set(target, prop, value, receiver) {
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
    },
  );
}

// Инициализация
const user = typedObject({
  name: "string",
  age: "number",
  isAdmin: "boolean"
});

// Тест 1: Успешное присваивание правильных типов
user.name = "Ivan";
user.age = 20;
user.isAdmin = true;
console.log("Успешное создание:", user); 
// Вывод: { name: 'Ivan', age: 20, isAdmin: true }


// Тест 2: Выброс ошибки при несовпадении типов
try {
  user.age = "20"; 
  console.log("Это сообщение не должно вывестись");
} catch (error) {
  console.error("Тест ошибки типа:", error.message);
  // Вывод: Тест ошибки типа: Ожидается number для свойства age, получено string
}


// Тест 3: Выброс ошибки при добавлении неизвестного свойства
try {
  user.city = "Moscow";
} catch (error) {
  console.error("Тест неизвестного свойства:", error.message);
  // Вывод: Тест неизвестного свойства: Свойство city не описано в схеме
}


// Тест 4: Проверка мутации существующего объекта (изменение значения)
try {
  user.name = "Petr"; // Правильный тип
  user.name = 123;    // Неправильный тип при перезаписи
} catch (error) {
  console.error("Тест перезаписи:", error.message);
  // Вывод: Тест перезаписи: Ожидается string для свойства name, получено number
}
