# Задача Люди

## Описание
В этом задании попрактикуемся с шаблоном *Builder* (*Строитель*). Мы спроектируем класс `Person`, в котором будут храниться данные о человеке:
* **Имя** (`String`). Каждый человек обязан иметь имя, причём с момента создания объекта изменить его нельзя.
* **Фамилия** (`String`). Каждый человек обязан иметь фамилию, причём с момента создания объекта изменить её нельзя.
* **Возраст** (`int`). Если возраст человека известен, то с момента создания объекта он может быть изменён только увеличением на единицу через вызов метода `happyBirthday()`. Возраст человека может быть неизвестен, в этом случае метод `boolean hasAge()` должен вернуть `false`, иначе - `true`. Подумайте, как эффективнее хранить в объекте информацию о том, известен ли возраст человека.
* **Текущий город жительства** (`String`). Может быть известен (в этом случае метод `boolean hasAddress()` должен вернуть `true`, иначе - `false`) и выставлен в любой через `setAddress(String city)`.

Все данные о человеке должны быть доступны через соответствующие методы (например, `String getName()`), поля же класса не должны быть `public`. 

Также надо создать класс `PersonBuilder` для конструирования объектов класса `Person`. Объекту этого класса (далее - *билдер*) можно выставлять любые данные для будущего объекта класса `Person` через методы (например, `setName(String name)`). И в этом объекте будет метод `Person build()`, возвращающий объект класса `Person` с указанными билдеру данными. В случае, если мы билдеру не указали достаточное количество данных (например, не указали фамилию), то метод `build()` должен выкинуть `IllegalStateException` с осмысленным сообщением. Если же мы передали неподходящие данные билдеру (например, некорректный возрст `builder.setAge(-100)`), то именно этот метод должен выкинуть `IllegalArgumentException` с осмысленным сообщением. Каждый метод добавления данных в билдер должен возвращать самого себя чтобы можно было сделать, например, вот так:
```java
Person person = new PersonBuilder()
                  .setName("Антошка")
                  .setSurname("Лопатов")
                  .setAge(48)
                  .build();
```

Также в класс `Person` надо добавить метод `PersonBuilder newChildBuilder()`, который будет возвращать полузаполненный билдер для ребёнка, а именно: с уже заполненными фамилией (родительской), возрастом и текущим городом жительства (родительским).

Продемонстрируйте работу ваших классов в классе `Main` (необязательно реализовывать ввод данных от пользователя).

## Реализация
1. Создайте класс `Person` с полями, необходимыми для хранения данных, указанных в условии.
```java
public class Person {
  protected final String name;
  protected final String surname;
  //...

  public Person(String name, String surname) {
    //...
  }

  public Person(String name, String surname, int age) {
    //...
  }
}
```
2. Наполните класс `Person` методами, нужными для реализации поведения объектов этого класса как описано выше в условии.
```java
public class Person {
  //...

  public boolean hasAge() { /*...*/ }
  public boolean hasAddress() { /*...*/ }

  public String getName() { /*...*/ }
  public String getSurname() { /*...*/ }
  public OptionalInt getAge() { /*...*/ }
  public String getAddress() { /*...*/ }

  public void setAddress(String address) { /*...*/ }
  public void happyBirthday() { /*...*/ }

  @Override
  public String toString() { /*...*/ }

  @Override
  public int hashCode() { /*...*/ }
}
```
3. Создайте класс `PersonBuilder`, наполните его полями для данных будущего объекта класса `Person` и методами их наполняющими (не забудьте про `IllegalArgumentException` в случае ввода недопустимых данных)
```java
public class PersonBuilder {
  //...

  public PersonBuilder setName(String name) { /*...*/ }
  public PersonBuilder setSurname(String surname) { /*...*/ }
  public PersonBuilder setAge(int age) { /*...*/ }
  public PersonBuilder setAddress(String address) { /*...*/ }

  public Person build() { /*...*/ }
}
```
4. Добавьте метод для получения полузаполненного билдера для ребёнка в класс `Person`
```java
public class Person {
  //...

  public PersonBuilder newChildBuilder() { /*...*/ }
}
```
6. Добавьте класс `Main` для демонстрации
```java
public class Main {
  public static void main(String[] args) {
    Person mom = new PersonBuilder()
                  .setName("Анна")
                  .setSurname("Вольф")
                  .setAge(31)
                  .setAddress("Сидней")
                  .build();
    Person son = mom.newChildBuilder()
                  .setName("Антошка")
                  .build();
    System.out.println("У " + mom + " есть сын, " + son);

    try {
      // Не хватает обяхательных полей
      new PersonBuilder().build(); 
    } catch (IllegalStateException e) {
      e.printStackTrace(); 
    }

    try {
      // Возраст недопустимый
      new PersonBuilder().setAge(-100).build();
    } catch (IllegalArgumentException e) {
      e.printStackTrace();
    }
  }
}
```
6. Протестируйте работу программы. Не забывайте про правила форматирования кода (для автоформата можете выделить код в идее и нажать **Ctrl+Alt+L**).
