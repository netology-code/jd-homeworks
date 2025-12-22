# Запрос на получение списка фактов о кошках

## Описание
По адресу https://raw.githubusercontent.com/netology-code/jd-homeworks/master/http/task1/cats находится список фактов о кошках. Наша задача - сделать запрос к этому ресурсу и отфильтровать факты, за которые никто не проголосовал (поле upvotes).
Формат каждой записи следующий:
```json
{
  "id": "5b4910ae0508220014ccfe91",
  "text": "Кошки могуть создавать более 100 разных звуков, тогда как собаки только около 10.",
  "type": "cat",
  "user": "Alex Petrov",
  "upvotes": null
},
```
```text
id - уникальный идентификатор записи
text - сообщение
type - тип животного
user - имя пользователя
upvotes - голоса
```

## Что нужно сделать
- Прочитать весь список и вернуть только те факты, у которых поле upvotes не равно `null`.

## Реализация
1. Перед тем как начать откройте url https://raw.githubusercontent.com/netology-code/jd-homeworks/master/http/task1/cats в браузере и посмотрите на данные;
2. Создайте проект `maven` или `gradle` и добавьте в pom.xml или gradle.build библиотеку apache httpclient
Пример:
```text
<dependency>
   <groupId>org.apache.httpcomponents</groupId>
   <artifactId>httpclient</artifactId>
   <version>4.5.12</version>
</dependency>
```
3. Создайте метод в который добавьте и настройте класс `CloseableHttpClient` например с помощью builder
```text
CloseableHttpClient httpClient = HttpClientBuilder.create()
    .setDefaultRequestConfig(RequestConfig.custom()
        .setConnectTimeout(5000)    // максимальное время ожидание подключения к серверу
        .setSocketTimeout(30000)    // максимальное время ожидания получения данных
        .setRedirectsEnabled(false) // возможность следовать редиректу в ответе
        .build())
    .build();
```
4. Добавьте объект запроса HttpGet request = new HttpGet("https://raw.githubusercontent.com/netology-code/jd-homeworks/master/http/task1/cats") и
вызовите удаленный сервис `CloseableHttpResponse response = httpClient.execute(request)`;
5. Добавьте в pom.xml или gradle.build библиотеку для работы с json
Пример:
```text
<dependency>
   <groupId>com.fasterxml.jackson.core</groupId>
   <artifactId>jackson-databind</artifactId>
   <version>2.11.1</version>
</dependency>
```
6. Создайте класс, в который будем преобразовывать json ответ от сервера;
7. Преобразуйте json в список java объектов;
8. Отфильтруйте список - например, средствами stream api, с помощью метода filter(value -> value.getUpvotes() != null && value.getUpvotes() > 0);
9. Выведите результат на экран;
10. Отправьте задачу на проверку.
