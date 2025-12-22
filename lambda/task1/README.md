# Задача 1: Калькулятор

## Описание
Создайте класс `Calculator`. В нем создайте статическую переменную типа `Supplier`. Это функциональный интерфейс, реализующий метод `get()`. С помощью данной переменной можно будет получить экземпляр класса `Calculator`. Реализуйте ссылку на вызов конструктора класса `Calculator() { }`.
```java
static Supplier<Calculator> instance = Calculator::new;
```
Далее добавьте несколько переменных типа `BinaryOperator` для математических операций над двумя числами. Типизируйте их как `Integer`:
```java
BinaryOperator<Integer> plus = (x, y) -> x + y;
BinaryOperator<Integer> minus = (x, y) -> x - y;
BinaryOperator<Integer> multiply = (x, y) -> x * y;
BinaryOperator<Integer> devide = (x, y) -> x / y;
```
Добавьте несколько переменных типа `UnaryOperator` для произведения математических операций над одним числом:
```java
UnaryOperator<Integer> pow = x -> x * x;
UnaryOperator<Integer> abs = x -> x > 0 ? x : x * -1;
```
Добавьте переменную типа `Predicate` для определения положительное ли число:
```java
Predicate<Integer> isPositive = x -> x > 0;
```
Добавьте переменную типа `Consumer` для вывода числа в консоль. Используйте для этого ссылку на статический метод `println()`:
```java
Consumer<Integer> println = System.out::println;
```

## Реализация
В классе `Main` в методе `main()` создайте экземпляр класса `Calculator` через вызов статической переменной `instance`:
```java
Calculator calc = Calculator.instance.get();
```
Произведите несколько математических операций над числами:
```java
int a = calc.plus.apply(1, 2);
int b = calc.minus.apply(1,1);
int c = calc.devide.apply(a, b);
```
И выведите в консоль результат:
```java
calc.println.accept(c);
```
Обратите внимание на то, что приведенный выше код работать не будет. С помощью комментария в коде объясните причину возникновения ошибки, в чем заключается ошибка и способы ее решения. Напишите реализацию, в которой предусмотрите обработку возникающей ошибки.
