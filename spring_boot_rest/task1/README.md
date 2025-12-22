# Задача «Сервис авторизации»

## Описание

Сегодня вы реализуете сервис авторизации пользователей по логину и паролю. Ключевое в этом задании то, как ваше приложение будет реагировать на ошибки, которые ваш сервис будет выбрасывать в разных случаях.

Для работы нужно подготовить несколько классов.

**Шаг 0**. Создайте Spring Boot приложение и все классы контроллеры, сервисы и репозитории сделать бинами в вашем application context.

**Шаг 1**. Запрос на разрешения будет приходить на контроллер:

```java
@RestController
public class AuthorizationController {
    AuthorizationService service;
    
    @GetMapping("/authorize")
    public List<Authorities> getAuthorities(@RequestParam("user") String user, @RequestParam("password") String password) {
        return service.getAuthorities(user, password);
    }
}
``` 

**Шаг 2.** Класс-сервис, который будет обрабатывать введённые логин и пароль, выглядит так: 

```java
public class AuthorizationService {
    UserRepository userRepository;

    List<Authorities> getAuthorities(String user, String password) {
        if (isEmpty(user) || isEmpty(password)) {
            throw new InvalidCredentials("User name or password is empty");
        }
        List<Authorities> userAuthorities = userRepository.getUserAuthorities(user, password);
        if (isEmpty(userAuthorities)) {
            throw new UnauthorizedUser("Unknown user " + user);
        }
        return userAuthorities;
    }

    private boolean isEmpty(String str) {
        return str == null || str.isEmpty();
    }

    private boolean isEmpty(List<?> str) {
        return str == null || str.isEmpty();
    }
}
``` 
Он принимает в себя логин и пароль и возвращает разрешения для этого пользователя, если такой пользователь найден и данные валидны. Если присланные данные неверны, тогда выкидывается InvalidCredentials:

```java
public class InvalidCredentials extends RuntimeException {
    public InvalidCredentials(String msg) {
        super(msg);
    }
}
``` 

Если ваш репозиторий не вернул никаких разрешений, либо вернул пустую коллекцию, тогда выкидывается ошибка UnauthorizedUser:

```java
public class UnauthorizedUser extends RuntimeException {
    public UnauthorizedUser(String msg) {
        super(msg);
    }
}
``` 

Enum с разрешениями выглядит так:

```java
public enum Authorities {
    READ, WRITE, DELETE
}
``` 

**Шаг 3.** Код-метод getUserAuthorities класс UserRepository, который возвращает либо разрешения, либо пустой массив, надо реализовать вам.

```java
public class UserRepository {
    public List<Authorities> getUserAuthorities(String user, String password) {
        return ...;
    }
}
``` 

Для проверки работоспособности можно сделать запрос из браузера, заполнив `<ИМЯ_ЮЗЕРА>` и `<ПАРОЛЬ_ЮЗЕРА>` своими тестовыми данными: 

localhost:8080/authorize?user=<ИМЯ_ЮЗЕРА>&password=<ПАРОЛЬ_ЮЗЕРА>

**Шаг 4.** Теперь, когда весь код у вас готов, вам нужно написать обработчики ошибок, которые выкидывает сервис `AuthorizationService`. 

Требования к обработчикам ошибок:

* на `InvalidCredentials` он должен отсылать обратно клиенту HTTP-статус с кодом 400 и телом в виде сообщения из exception;
* на `UnauthorizedUser` он должен отсылать обратно клиенту HTTP-статус с кодом 401 и телом в виде сообщения из exception и писать в консоль сообщение из exception.
 
