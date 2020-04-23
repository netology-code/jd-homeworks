# Задача Дженерик класс с несколькими параметрами

## Описание
У дженерик класса может быть несколько параметров. 

Расширьте созданный в первой задача типизированный класс `SimpleGeneric`. Помимо параметра `V` добавьте параметр `U`:
```java
class SimpleGeneric<U,V>{ 

}
```

Теперь класс `SimpleGeneric` будет обладать двумя полями:
```java
private U objUreff;
private V objVreff;
```

Их значение могут быть получены через конструктор класса. Конструктор класса будет выглядеть следующим образом:
```java
public SimpleGeneric(U objU, V objV){
        this.objUreff = objU;
        this.objVreff = objV;
    }
```

Для работы с переменными класса добавьте методы `get` и `set`. Метод `printType()` будет выводить в консоль типы объектов класса `SimpleGeneric`:
```java
public void printType() {
    System.out.println("U Type: " + this.objUreff.getClass().getName());
    System.out.println("V Type: " + this.objVreff.getClass().getName());
}
```

## Реализация
Создадим несколько экземпляров класса `SimpleGeneric`, используя при этом различные типы:
```java
public class Main {
    public static void main(String a[]) {
        SimpleGen<String, Integer> sample_1 = new SimpleGen<>("Нетология", 1);
        sample_1.printTypes();

        SimpleGen<Boolean, Double> sample_2 = new SimpleGen<>(true, 1.1);
        sample_2.printTypes();
    }
}
```

В результате выполнения программы, в консоле увидим следующие строки:
```
U Type: java.lang.String
V Type: java.lang.Integer
U Type: java.lang.Boolean
V Type: java.lang.Double
```

Теперь создадим `ArrayList` и типизируем его для хранения объектов типа `SimpleGen<String, Integer>`:

``
ArrayList<SimpleGen<String, Integer>> list_1 = new ArrayList<>();
``

Попробуйте добавить в него объекты `sample_1` и `sample_2`. Однако Вы столкнетесь с ошибкой. С помощью комментария в коде, объясните, в чем заключается ошибка и по какой причине она возникла.

Исправьте ошибку, создав дополнительный типизированный `ArrayList` и добавив в него объект `sample`.