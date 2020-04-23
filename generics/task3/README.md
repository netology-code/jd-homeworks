# Задача Наследование дженерик классов

## Описание
В данной задаче требуется реализовать коробку, в которую можно будет положить только вкусные фрукты и нельзя будет положить полезные овощи.

Начните с того, что создайте обобщающий класс фрутов:
```java
class Fruit {
    public void printClass() {
        System.out.println("I am in super class Fruit");
    }
}
```

Далее, создайте несколько подтипов фруктов, которые будут унаследованы от общего предка `Fruit`:
```java
class Apple extends Fruit {
    @Override
    public void printClass() {
        System.out.println("I am in sub class Apple");
    }
}

class Banana extends Fruit {
    @Override
    public void printClass() {
        System.out.println("I am in sub class Banana");
    }
}
```

Создайте один полезный овощ:
```java
class Cabbage {
    public void printClass() {
        System.out.println("I am Cabbage");
    }
}
```

Теперь, создайте дженерик коробку, в которую можно будет положить только фрукты. Реализуется это путем указания, от какого класса может быть наследован параметр `T`:
```java
class Box<T extends Fruit> {

    private T fruit;

    public Box(T fruit) {
        this.fruit = fruit;
    }

    public void doRunTest() {
        fruit.printClass();
    }
}
```

## Реализация
Создайте несколько фруктов и поместите в созданные специально для них коробки:
```java
public class Main {
    public static void main(String a[]) {
        Box<Banana> bananaBox = new Box<>(new Banana());
        bananaBox.doRunTest();

        Box<Apple> appleBox = new Box<>(new Apple());
        appleBox.doRunTest();

        Box<Fruit> fruitBox = new Box<>(new Fruit());
        fruitBox.doRunTest();

        Box<Cabbage> cabbageBox = new Box<>(new Cabbage());
        cabbageBox.doRunTest();
    }
}
```

Обратите внимание, что в коде выше есть ошибка. Найдите ошибку и с помощью комментария объясните, по какой причине она возникла.

Создайте вторую коробку, которая бы хранила в себе только полезные овощи.

В случае успешного выполнения задания, Вы увидите в консоле следующие строки:
```
I am in sub class Banana
I am in sub class Apple
I am in super class Fruit
I am Cabbage
```