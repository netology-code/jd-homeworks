# Многопоточное программирование. Работа с потоками

# Задача 1 (обязательная)

Ваш коллега зачитался книгой по математической статистике и решил провести эксперимент. Он написал программу, которая генерирует **25** строк размером **30'000** символов, которые состоят из **'a'** и **'b'**. 

Для каждой строки он хочет найти размер наибольшего промежутка, состоящий из одних символов 'a'. Т.е., например, для строки "aaababbaaaaabaa" это будет 5 (5 символов a подряд). Для этого он написал очень неэффективный алгоритм: он перебирает всевозможные индексы потенциального начала этого промежутка и всевозможные индексы конца, после чего проверяет есть ли между ними символ 'b'; если нету - запоминает размер этого промежутка, если он оказался максимальным. **Менять этот алгоритм вам нельзя.**

В итоге он получил следующий код:

```java
import java.util.*;

public class Main {

    public static void main(String[] args) throws InterruptedException {
        String[] texts = new String[25];
        for (int i = 0; i < texts.length; i++) {
            texts[i] = generateText("aab", 30_000);
        }

        long startTs = System.currentTimeMillis(); // start time
        for (String text : texts) {
            int maxSize = 0;
            for (int i = 0; i < text.length(); i++) {
                for (int j = 0; j < text.length(); j++) {
                    if (i >= j) {
                        continue;
                    }
                    boolean bFound = false;
                    for (int k = i; k < j; k++) {
                        if (text.charAt(k) == 'b') {
                            bFound = true;
                            break;
                        }
                    }
                    if (!bFound && maxSize < j - i) {
                        maxSize = j - i;
                    }
                }
            }
            System.out.println(text.substring(0, 100) + " -> " + maxSize);
        }
        long endTs = System.currentTimeMillis(); // end time

        System.out.println("Time: " + (endTs - startTs) + "ms");
    }

    public static String generateText(String letters, int length) {
        Random random = new Random();
        StringBuilder text = new StringBuilder();
        for (int i = 0; i < length; i++) {
            text.append(letters.charAt(random.nextInt(letters.length())));
        }
        return text.toString();
    }
}
```

Скопируйте его себе в проект, запустите. Программа окажется слишком медленной, ваша задача - ускорить её средствами многопоточного программирования. Для этого:
1. Пусть обработка каждой строки из массива `texts` работает в отдельном потоке.
2. До цикла создайте `List<Thread> threads` куда будете складывать создаваемые потоки.
3. Поток создавайте через `new Thread(...)`, в конструкторе передайте реализацию лямбдой интерфейса `Runnable`, в котором будет нужное действие.
4. Не забудьте не только положить созданный объект потока в список потоков, но ещё запустить поток (подходящий метод описан в теории).
5. После цикла пропишите ожидание запущенных потоков основным потоком программы:
   ```java
   for (Thread thread : threads) {
       thread.join(); // зависаем, ждём когда поток объект которого лежит в thread завершится
   }
   ```

# Задача 2 (необязательная)
Отведите ветку в вашем репозитории первой задачи и в ней доработайте код так, чтобы можно было найти самое максимальное значение среди всех строк (для этого используйте `Callable`, `Future` и пул потоков).
