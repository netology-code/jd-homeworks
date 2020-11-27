# Задача Conditional приложение

## Описание
Задача простая: расширить функционал проедыдущего задания "Сервис авторизации" 

Теперь ваш контроллер должен принимать не два объекта отдельно, а один объект содержащий значения user и password. Соответственно и `AuthorizationService` теперь работает с одним объектом.
При этом, API для клиента не изменилось и он отправляет запрос такого вида `localhost:8080/authorize?user=<ИМЯ_ЮЗЕРА>&password=<ПАРОЛЬ_ЮЗЕРА>`. Также вы можете заметить, что вы также должны проверять объект на валидность с помощью аннотации @Valid. Подумайте, как вы должны валидировать поля объекта `User`:

```java
@RestController
public class AuthorizationController {
    AuthorizationService service;
    
    @GetMapping("/authorize")
    public List<Authorities> getAuthorities(@Valid User user) {
        return service.getAuthorities(user);
    }
}
``` 

Сделать преобразование одного объекта в два вы можете с помощью своего `HandlerMethodArgumentResolver` и ,например, своей аннотации. 

