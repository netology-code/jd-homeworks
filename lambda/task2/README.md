# Задача 3: Работа с числами

## Описание
Работа с коллекциями является обычной задачей в программировании. Такие операции как сортировка, фильтрация, перебор встречаются в каждом проекте. Работа с коллекциями в Java значительно упростилась с появлением `Stream API`. Давайте сравним два подхода! 

Составьте ArrayList из набора чисел `1, 2, 5, 16, -1, -2, 0, 32, 3, 5, 8, 23, 4` и произведите над ним следующие действия:
1. Отфильтруйте положительные числа.
2. Найдите среди этих положительных чисел четные.
3. Отсортируйте отфильтрованные числа в порядке возрастания.
4. Выведите результат на экран.

## Реализация
Реализуйте два класса `Main` и `StreamMain`, в каждом из которых в функции `main()` составьте ArrayList из приведенных выше чисел и произведите над ними указанные операции, причем:
* в первом классе выполнените работу без `Stream API`, используйте коллекции
* во втором классе используйте стримы из библиотеки `Stream API`.

Получить ArrayList из чисел можно следующим образом:
```java
List<Integer> intList = Arrays.asList(1, 2, 5, 16, -1, -2, 0, 32, 3, 5, 8, 23, 4);
```
Для получения потока из массива целых чисел используйте:
```java
Stream<Integer> stream = intList.stream();
```
К потоку примените ряд промежуточных операций:
```java
filter(x -> x > 0)
filter(x -> x % 2 == 0)
sorted(Comparator.naturalOrder())
```
Потребуется и терминальная операция. Например:
```java
forEach(System.out::println)
```
И с помощью стримов, и без них Вы должны получить одинаковый ответ:
2
4
8
16
32




# Задача 4: Перепись населения

## Описание
В данной задаче предлагается проанализировать массив данных с информаций о людях с использованием стримов из библиотеки `Stream API`. 

Для работы необходимо подготовить несколько классов, а именно:
1. `Sex`, содержащий типы полов:
```java
public enum Sex {
    MAN,
    WOMAN
}
```
2. `Education`, содержащий типы образования:
```java
public enum Education {
    ELEMENTARY,
    SECONDARY,
    FURTHER,
    HIGHER
}
```
3. `Person`, содержащий информацию об имени, возрасте, поле и образовании человека:
```java
class Person {
    private String name;
    private String family;
    private Integer age;
    private Sex sex;
    private Education education;

    public Person(String name, String family, int age, Sex sex, Education education) {
        this.name = name;
        this.family = family;
        this.age = age;
        this.sex = sex;
        this.education = education;
    }

    public String getName() {
        return name;
    }

    public String getFamily() {
        return family;
    }

    public Integer getAge() {
        return age;
    }

    public Sex getSex() {
        return sex;
    }

    public Education getEducation() {
        return education;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", family='" + family + '\'' +
                ", age=" + age +
                ", sex=" + sex +
                ", education=" + education +
                '}';
    }
}
```

Из коллеции объектов `Person` необходимо:
1. Найти количество несовершеннолетних (т.е. людей младше 18 лет).
2. Получить список фамилий призывников (т.е. мужчин от 18 и до 27 лет).
3. Получить отсортированный по фамилии список потенциально работоспособных людей с высшим образованием в выборке (т.е. людей с высшим образованием от 18 до 60 лет для женщин и до 65 лет для мужчин).

## Реализация
В классе `Main` в функции `main()` необходимо создать коллекцию экземпляров класса `Person`. Вам потребуется действительно большое количство данных. Для примера будем считать, что Вы производите перепись населения города Лондон с населением в 10 миллионов человек. Для генерации исходных данных воспользуемся следующим способом:
```java
List<String> names = Arrays.asList("Jack", "Connor", "Harry", "George", "Samuel", "John");
List<String> families = Arrays.asList("Evans", "Young", "Harris", "Wilson", "Davies", "Adamson", "Brown");
Collection<Person> persons = new ArrayList<>();
for (int i = 0; i < 10_000_000; i++) {
    persons.add(new Person(
                names.get(new Random().nextInt(names.size())),
                families.get(new Random().nextInt(families.size())),
                new Random().nextInt(100),
                Sex.values()[new Random().nextInt(Sex.values().length)],
                Education.values()[new Random().nextInt(Education.values().length)])
    );
}
```

Из созданной коллекции `persons` для каждого задания создавайте новый стрим методом `stream()` и далее применяйте к нему ряд промежуточных операций и одну терминальную:
1. Для поиска несовершеннолетних используйте промежуточный метод `filter()` и терминальный метод `count()`.
2. Для получения списка призывников потребуется применить несколько промежуточных методов `filter()`, а также для преобразования данных из `Person` в `String` (так как нужны только фамилии) используйте метод `map()`. Так как требуется получить список `List<String>` терминальным методом будет `collect(Collectors.toList())`.
3. Для получения отсортированного по фамилии списка потенциально работоспособных людей с высшим образованием необходимо применить ряд промежуточных методов `filter()`, метод `sorted()` в который нужно будет положить компаратор по фамилиям `Comparator.comparing()`. Завершить стрим необходимо методом `collect()`.
