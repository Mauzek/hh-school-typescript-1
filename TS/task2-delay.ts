/*
Задание 2: Реализуйте delay

Требования:
- delay(ms) возвращает промис
- Промис резолвится через ms миллисекунд
*/

function delayTS(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// Бубу бебе
delayTS(500).then(() => console.log("Готово через 500мс"));
