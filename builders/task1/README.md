# Задача 1: Многомодульный проект на Maven

## Описание
Для закрепления лекционного материала попрактикуемся в том, как создавать проекты. 

Стандартный многомодульный проект имеет составляющие по функционалу:

db - модуль работы с базой данных;

api - модуль работы с web;

service - слой сервисов.

## Реализация

Для начала создайте одномодульный проект - как это было показано на занятии.

После необходимо установить packaging в pom

```pom
<packaging>pom</packaging>
``` 

После создаем 3 модуля в корне проекта: db, api, service.

В каждом модуле будет создан pom.xml c содержимым:

```pom
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>App</artifactId>
        <groupId>ru.netology</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>
    <artifactId>db</artifactId>
    <packaging>jar</packaging>
</project>
``` 

В каждом pom.xml обязательно указываем parent - в качестве родительского модуля с его данными и 
название artifactId текущего модуля (db, api, service) 

Чтобы подключить новые модули к проекту, добавляем в корне проекта в файл pom.xml новые созданные модули:

```pom
  <modules>
    <module>db</module>
    <module>api</module>
    <module>service</module>
  </modules> 
``` 

Подключим связанные модули между собой.
 
Для подключения модуля db в модуль  service добавим зависимость:

```pom
    <dependencies>
        <dependency>
            <groupId>ru.netology</groupId>
            <artifactId>db</artifactId>
            <version>1.0-SNAPSHOT</version>
            <scope>compile</scope>
        </dependency>
    </dependencies>
```  

Для подключения модуля service в модуль api добавим зависимость:

```pom
    <dependencies>
        <dependency>
            <groupId>ru.netology</groupId>
            <artifactId>service</artifactId>
            <version>1.0-SNAPSHOT</version>
            <scope>compile</scope>
        </dependency>
    </dependencies> 
```

Теперь можно собрать проект, выполнив команду: 

```shell script
mvn clean install
``` 

Для демострации работы модульности в проекте db создадим классы:

```java
public class DbSetting {

    private String name;
    private String password;

    public DbSetting(String name, String password) {
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
