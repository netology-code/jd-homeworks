# Задача "JUnit + Hamcrest"

## Описание
Прочитайте про Hamcrest для JUnit

Перепишите ваши тесты из первого задания в стиле Hamcrest

Напишите ещё минимум 2 теста, стараясь использовать те фичи Hamcrest, которых нет в стандартных ассертах JUnit

## Реализация
Подключите зависимость к любимой системе сборки  
Maven:  
```xml
<dependency>
    <groupId>org.hamcrest</groupId>
    <artifactId>hamcrest-all</artifactId>
    <version>1.3</version>
</dependency>
```
Или Gradle:
```gradle
  testCompile("org.hamcrest:hamcrest-all:1.3")
```

*Пример теста из презентации:*
```java
@Test
public void contains() {
   List<String> list = List.of("hello", "netology", "world");

   assertThat(list, hasItems("hello", "netology"));
}
```

Здесь `assertThat` - статический импорт из `org.hamcrest.MatcherAssert`  
А `hasItems` можете найти в `org.hamcrest.Matchers` - там же вы можете искать другие матчеры.   
Проще набрать `Matchers.`, выбрать нужный из всплывающей подсказки, а потом уже добавить статическиий импорт средствами IntelliJ
