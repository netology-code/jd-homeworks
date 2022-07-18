## Задача 1. Интервал значений

## Описание
Ваш коллега зачитался книгой по математической статистике и решил провести эксперимент. Он написал программу, которая генерирует **25** строк размером **30'000** символов, которые состоят из символов **'a'** и **'b'**.

Для каждой строки он хочет найти размер наибольшего промежутка, состоящего из одних символов 'a'. Т.е., например, для строки "aaababbaaaaabaa" ответом будет число 5 (5 символов 'a' подряд). Для этого он написал очень неэффективный алгоритм, который перебирает всевозможные индексы потенциального начала этого промежутка и всевозможные индексы конца, после чего проверяет есть ли между ними символ 'b'. Если символ 'b' не был найден, то программа запоминает размер этого промежутка, если он оказался максимальным. **Менять этот алгоритм вам нельзя.**

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
Скопируйте код программы себе в проект, запустите. Программа окажется слишком медленной, **ваша задача - ускорить её средствами многопоточного программирования**.

## Реализация
1. Реализуйте обработку каждой строки из массива `texts` в отдельном потоке.
2. До цикла создайте `List<Thread> threads`, для хранения создаваемых потоков.
3. Поток создавайте через `new Thread(...)`, в конструкторе передайте реализацию лямбдой интерфейса `Runnable`, в котором будет находиться нужное действие.
4. Не забудьте не только положить созданный объект потока в список потоков, но и запустить поток.
5. После цикла опишите ожидание запущенных потоков основным потоком программы:
  ```java
   for (Thread thread : threads) {
       thread.join(); // зависаем, ждём когда поток объект которого лежит в thread завершится
   }
   ```
Не изменяйте код программы, описанный в условиях задачи. В качестве решения на проверку отправьте ссылку на репозиторий с решением.

