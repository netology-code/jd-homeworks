# Запрос на получение списка фактов о кошках

## Описание
По адресу https://cat-fact.herokuapp.com/facts находится список фактов о кошках (англ.), наша задача сделать запрос к этому ресурсу и отфильтровать факты за которые никто не проголосовал (поле upvotes).
Формат каждой записи следующий:
```json
{
  "_id": "5b4910ae0508220014ccfe90",
  "text": "Cats can hear the ultrasonic noises that rodents and dolphins make to communicate.",
  "type": "cat",
  "user": {
    "_id": "5a9ac18c7478810ea6c06381",
    "name": {
      "first": "Alex",
      "last": "Wohlbruck"
    }
  },
  "upvotes": 11,
  "userUpvoted": null
}
```
```text
_id - уникальный идентификатор записи
text - сообщение
type - тип
user - описание пользователя
upvotes - голоса
userUpvotes - пользователей проголосовало
```

## Что нужно сделать
- Обработать и вернуть список фактов о кошках у которых поле upvotes не равно `null`

## Реализация
1. Перед тем как начать откройте url https://cat-fact.herokuapp.com/facts в браузере и посмотрите на данные;
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
4. Добавьте объект запроса HttpGet request = new HttpGet("https://cat-fact.herokuapp.com/facts") и
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
6. Создайте класс в который будем преобразовывать json ответ от сервера;
7. Преобразуйте json в список java объектов;
8. Отфильтруйте список, например средствами stream api, с помощью метода filter(value -> value.getUpvotes() != null);
9. Выведите результат на экран;
10. Отправьте задачу на проверку.
