# Задача Сохранение

## Описание
В данной задаче Вы потренируетесь сериализовать Java класса, используя интерфейс `Serializable`, записывать сериализованные файлы на жесткий диск, используя класс `FileOutputStream`, и упаковывать их в архив с помощью `ZipOutputStream`.

Для дальнейшей работы потребуется создать класс `GameProgress`, хранящий информацию об игровом процессе. Предлагаем следующую реализацию:
```java
public class GameProgress implements Serializable {
    private static final long serialVersionUID = 1L;

    private int health;
    private int weapons;
    private int lvl;
    private double distance;

    public GameProgress(int health, int weapons, int lvl, double distance) {
        this.health = health;
        this.weapons = weapons;
        this.lvl = lvl;
        this.distance = distance;
    }

    @Override
    public String toString() {
        return "GameProgress{" +
                "health=" + health +
                ", weapons=" + weapons +
                ", lvl=" + lvl +
                ", distance=" + distance +
                '}';
    }
}
```

Таким образом, для выолнения задания потребуется проделать следующие шаги:
1. Создать три экземпляра класса `GameProgress`.
2. Сохранить сериализованные объекты `GameProgress` в папку `savegames` из предыдущей задачи.
3. Созданные файлы сохранений из папки `savegames` запаковать в архив `zip`.
4. Удалить файлы сохранений, лежащие вне архива.

## Реализация
***Далее приведен лишь пример реализации. Вы можете предложить свое решение.***

Создайте три экземпляра класса `GameProgress`.

Реализуйте метод `saveGame()` принимающий в качесве аргументов полный путь к файлу типа `String` (например, "/Users/admin/Games/GunRunner/savegames/save3.dat") и объект класса `GameProgress`. Для записи Вам потребуются такие классы как `FileOutputStream` и `ObjectOutputStream`. У последнего есть метод `writeObject()`, подходящий для записи сериализованного объекта . Во избежании утечек памяти, не забудьте либо использовать try с ресурсами, либо вручную закрыть файловые стримы (это касается всех случаев работы с файловыми потоками).

Таким образом, вызов метода `saveGame()` должен приводить к созданию файлов сохранений в папке `savegames`.

Далее реализуйте метод `zipFiles()`, принимающий в качестве аргументов `String` полный путь к файлу архива (например, "/Users/admin/Games/GunRunner/savegames/zip.zip") и список запаковываемых объектов в виде списка строчек `String` полного пути к файлу (например, "/Users/admin/Games/GunRunner/savegames/save3.dat"). В методе Вам потребуется реализовать вложенный try-catch с одним `ZipOutputStream` и открываемыми в цикле `FileInputStream`. Для каждого `FileInputStream` создайте `ZipEntry` и через `ZipOutputStream` запишите его в архив.

Вызов метода `zipFiles()` должен приводить к созданию архива в папке `savegames` c тремя файлами сохранений внутри.

Далее с помощью методов класса `File` удалите файлы сохранений из папки `savegames`.