# Домашнее задание "Многомодульный проект на Gradle"

## Описание
Для закрепления лекционного материала попрактикуемся, как создавать проекты. 

Стандартный многомодульный проект имеет составляющие по функционалу:

db - модуль работы с базой данных

api - модуль работы с web

service - слой сервисов

## Реализация

Для начала создайте одномодульный проек - как это делали на занятии.

После создаем 3 папки в директории проекта: db, api, service.

В каждой из директории создаем pom.xml c содержимым:

```groovy
plugins {
    id 'java'
}

group 'ru.netology'
version '1.0-SNAPSHOT'

repositories {
    mavenCentral()
}

dependencies {

}
``` 

Чтобы подключить новые модули к проекту, добавляем в корне проекта в settings.gradle новые созданные модули:

```groovy
include 'db'
include 'service'
include 'api'
``` 

После создания многомодульного проекта подключим связанные модули между собой.
 
Для подключения модуля db в модуль  service добавим зависимость:

```groovy
dependencies {
    implementation project(":db")
}
```  

Для подключения модуля service в модуль api добавим зависимость:

```groovy
dependencies {
    implementation project(":db")
    implementation project(":service")
}
```

Теперь можно собрать проект, выполнив команду: 

```shell script
gradle build
``` 

Для демострации работы модульности в проекте db создадим классы.

```java
public class DbSetting {

    private String name;
    private String password;

    public Db(String name, String password) {
        this.name = name;
        this.password = password;
    }

}
```

```java
public class MyEntity {

    private UUID id;
    private String name;

    public MyEntity(String name) {
        this.name = name;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return new StringBuilder().append("MyEntity{").append("id=").append(id).append(", name='").append(name).append('\'').append('}').toString();
    }
}
```

```java
public class Db {

    private DbSetting dbSetting;
    private MyEntity myEntity;

    public Db(DbSetting dbSetting) {
        this.dbSetting = dbSetting;
        myEntity = new MyEntity("first");
        myEntity.setId(UUID.randomUUID());
    }

    public DbSetting getDbSetting() {
        return dbSetting;
    }

    public MyEntity getMyEntity() {
        return myEntity;
    }

    public void setMyEntity(MyEntity myEntity) {
        this.myEntity = myEntity;
    }
}
```

В проекте Service создадим класс:

```java
public class MyService {

    private DbSetting dbSetting = new DbSetting("name", "password");
    private String name = "myService";
    private Db db = new Db(dbSetting);

    public String getName() {
        return name;
    }

    public MyEntity setMyEntity(MyEntity myEntity) {
        myEntity.setId(UUID.randomUUID());
        db.setMyEntity(myEntity);
        return myEntity;
    }

    public MyEntity getMyEntity() {
        return db.getMyEntity();
    }
}
```

В проекте api создадим класс:

```java
public class Main {

    public static void main(String[] args) {
        MyService myService = new MyService();
        System.out.println(myService.getMyEntity());
        System.out.println(myService.setMyEntity(new MyEntity("second")));
        System.out.println(myService.getMyEntity());
    }
}
```

После успешной сборки проекта можем выполнить данный код. 

В результате выполнения данного задания мы получили модульный проект с разделением по функциональности

Дополнительная задача со * :
 
Создать реализацию хранения entity с помощью Map. Формат хранения выбрать самим. 

Реализовать класс в модуле api аналогичный, как в service. Продумать методы добавления, обновления, удаления entity.

Суть в том, что хренение данных находиться в модуле db, а вызовы для методов в модуле api. 
В модуле api напрямую использовать классы из модуля db нельзя, кроме класса MyEntity. 
В модуле service должна быть предусмотрена проверка на null для поля name из MyEntity перед сохранением или обновлением.

Дополнительная задача 2 со * :

Добавить ограничение на использование MyEntity в модуле api тоже: 
MyEntity тоже больше не используем в модуле api.

Для этого в модуле api уберем project(":db") из зависимости:

```groovy
dependencies {
    implementation project(":service")
}
```

В модуле service создадим класс MyDto c полями name и id. 
Все методы в api будут работать с MyDto, а для хранения в db будет использоваться MyEntity.
При получении данных в модуле service MyEntity будет преобразовываться в MyDto 
(этот процесс называется маппингом одной модели на другую). 
Аналогично преобразовываться будет при сохранении и обновлении MyDto в MyEntity.
