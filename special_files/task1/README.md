# Задача CSV - JSON парсер

## Описание
В данном домашнем задании вам предстоит написать два конвертора: из формата CSV и XML в формат JSON, а так же парсер JSON файлов в Java классы.

В первой задаче вам предстоит произвести запись в файл JSON объекта, полученного из CSV файла.

Для работы с проектом потребуются вспомогательные библиотеки, поэтому необходимо создать новый проект с использованием сборщика проекта `Gradle` или `Maven`. Далее пропишите зависимости для следующих библиотек: `opencsv`, `json-simple` и `gson`. Ниже приведен пример для сборщика `Gradle`:
```gradle
compile 'com.opencsv:opencsv:5.1'
compile 'com.googlecode.json-simple:json-simple:1.1.1'
compile 'com.google.code.gson:gson:2.8.2'
```
В качестве исходной информации создайте файл `data.csv` со следующим содержимым и поместите его в корень созданного проекта:
```csv
1,John,Smith,USA,25
2,Inav,Petrov,RU,23
```
Помимо этого потребуется класс `Employee`, который будет содержать информацию о сотрудниках. Обратите внимание, что для парсинга Java классов из CSV потребуется пустой конструктор класса.
```java
public class Employee {
    public long id;
    public String firstName;
    public String lastName;
    public String country;
    public int age;

    public Employee() {
        // Пустой конструктор
    }

    public Employee(long id, String firstName, String lastName, String country, int age) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.country = country;
        this.age = age;
    }   
}
``` 
В резльтате работы программы в корне проекта должен появиться файл `data.json` со следующим содержимым:
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Smith",
    "country": "USA",
    "age": 25
  },
  {
    "id": 2,
    "firstName": "Inav",
    "lastName": "Petrov",
    "country": "RU",
    "age": 23
  }
]
```

## Реализация
Первым делом в классе `Main` в методе `main()` создайте массив строчек `columnMapping`, содержащий информацию о предназначении колонок в CVS файле:
```java
String[] columnMapping = {"id", "firstName", "lastName", "country", "age"};
```
Далее определите имя для считываемого CSV файла:
```java
String fileName = "data.csv";
```
Далее получите список сотрудников, вызвав метод `parseCSV()`:
```java
List<Employee> list = parseCSV(columnMapping, fileName);
```
Метод `parseCSV()` вам необходимо реализовать самостоятельно. В этом вам поможет экземпляр класса `CSVReader`. Передайте в его конструктор файловый ридер `FileReader` файла `fileName`. Данную операцию производите либо в блоке `try-catch` с ресурсами, либо не забудьте закрыть поток после использования. Так же вам потребуется объект класса `ColumnPositionMappingStrategy`. Используя объект стратении, укажите тип `setType()` и тип колонок `setColumnMapping()`. Далее создайте экземпляр `CsvToBean` с использованием билдера `CsvToBeanBuilder`. При постройке `CsvToBean` используйте ранее созданный объект стратегии `ColumnPositionMappingStrategy`. Созданный экземпляр объекта `CsvToBean` имеет метод `parse()`, который вернет вам список сотрудников.

Полученный список преобразуйте в строчку в формате JSON. Сделайте это с помощью метода `listToJson()`, который вам так же предстоит реализовать самостоятельно.
```java
String json = listToJson(list);
```
При написании метода `listToJson()` вам понадобятся объекты типа `GsonBuilder` и `Gson`. Для преобразования списка объектов в JSON, требуется определить тип этого спика:
```java
Type listType = new TypeToken<List<T>>() {}.getType();
```
Получить JSON из экземпляра класса `Gson` можно с помощтю метода `toJson()`, передав в качестве аргументов список сотрудников и тип списка:
```java
String json = gson.toJson(list, listType);
```
Далее запишите полученный JSON в файл с помощью метода `writeString()`, который необходимо реализовать самостоятельно. В этом вам поможет `FileWriter` и его метод `write()`.
