# Задача Сервис авторизации

## Описание
Реализуем то, что делали на занятии - сервис иницализации Spring boot приложение. Для полноты, напишем еще конфигурацию nginx, который будет возвращать статический сайт, с помощью которого можно обратиться к нашему сервису авторизации из прошлого домашнего задания.

1. Первым делом нужно создать html форму для авторизации, которую нам будет возвращать nginx.

```html
<html>
    <body>
        <h1>Sign in form</h1>
    
        <form action="/authorize" method="get" target="_blank">
          <label for="user">User name:</label>
          <input type="text" id="user" name="user"><br><br>
          <label for="password">Password:</label>
          <input type="text" id="password" name="password"><br><br>
          <button type="submit">Submit</button>
        </form>
    </body>
</html>
```

2. Настроим unit для systemd. 
```
[Unit]
Description=A Spring Boot application
After=syslog.target
After=nginx.service

[Service]
User=osboxes
ExecStart=/usr/bin/java -jar /path/to/your-app.jar
StandardOutput=syslog
StandardError=syslog

[Install] 
WantedBy=multi-user.target
```