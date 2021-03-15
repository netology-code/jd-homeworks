const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const multer  = require('multer')
const storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty... here is where req.body.new_file_name doesn't exists
            cb( null, file.originalname );
        }
    }
);
const upload = multer({
    dest: 'uploads/',
    storage
})

app.use(express.static('./'));

app.use(cors());
app.use(bodyParser.json());

const user = {
    login: 'test',
    password: 'test',
    token: 'n67btof3q725tr'
}

app.post('/login', function (req, res) {
    const login = req.body.login;
    const password = req.body.password;
    const errors = {
        login: [],
        password: []
    };

    if (!login) {
        errors.login.push('Необходимо ввести почту');
    }

    if (login && login !== user.login) {
        errors.login.push('Неправильно указана почта');
    }

    if (!password) {
        errors.password.push('Необходимо ввести пароль');
    }

    if (password && password !== user.password) {
        errors.password.push('Неправильно указан пароль');
    }

    if (errors.login.length > 0 || errors.password.length > 0) {
        res.status(400);
        res.json(errors);
    } else {
        res.json(user.token);
    }
});

app.post('/logout', function (req, res) {
    if (!req.headers['auth-token'] || req.headers['auth-token'] !== `Bearer ${user.token}` || !!req.body._error) {
        res.status(401);
        res.json([
            'Неверный токен авторизации'
        ]);

        return;
    }

    res.send('');
});

let files = [
    {
        id: 0,
        name: 'Название табличного файла.xls',
        createdAt: 1615231817551,
        editedAt: 1615231817551,
        size: 1258291
    },
    {
        id: 1,
        name: 'Название тестового файла с длинным названием.docx',
        createdAt: 1615231817551 + 1e5,
        editedAt: 1615231817551 + 1e5,
        size: 2216582
    },
    {
        id: 2,
        name: 'Название файла с изображением.png',
        createdAt: 1615231817551 + 2e5,
        editedAt: 1615231817551 + 2e5,
        size: 2516582
    },
    {
        id: 3,
        name: 'Название видео файла.mp4',
        createdAt: 1615231817551 + 3e5,
        editedAt: 1615231817551 + 3e5,
        size: 3216582
    }
];

app.get('/list', function (req, res) {
    if (!req.headers['auth-token'] || req.headers['auth-token'] !== `Bearer ${user.token}` || !!req.body._error) {
        res.status(401);
        res.json([
            'Неверный токен авторизации'
        ]);

        return;
    }

    res.json(files);
});

app.get('/file', function (req, res) {
    if (!req.headers['auth-token'] || req.headers['auth-token'] !== `Bearer ${user.token}` || !!req.body._error) {
        res.status(401);
        res.json([
            'Неверный токен авторизации'
        ]);

        return;
    }

    console.log(req.query.filename);

    const filename = req.query.filename;
    const file = `${__dirname}/uploads/${filename}`;
    res.download(file);
});

app.post('/file', upload.single('file'), function (req, res) {
    if (!req.headers['auth-token'] || req.headers['auth-token'] !== `Bearer ${user.token}` || !!req.body._error) {
        res.status(401);
        res.json([
            'Неверный токен авторизации'
        ]);

        return;
    }

    const filename = req.query.filename;

    const file = {
        id: files.length + 1,
        name: filename,
        createdAt: +(new Date()),
        editedAt: +(new Date()),
        size: req.file.size
    };

    files.push(file);

    res.json(files);
});

app.put('/file', function (req, res) {
    if (!req.headers['auth-token'] || req.headers['auth-token'] !== `Bearer ${user.token}` || !!req.body._error) {
        res.status(401);
        res.json([
            'Неверный токен авторизации'
        ]);

        return;
    }

    const filename = req.query.filename;

    const file = files.find(f => filename === f.name);

    file.name = req.body.name;

    fs.rename(`${__dirname}/uploads/${filename}`, `${__dirname}/uploads/${file.name}`, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });

    res.json(file);
});

app.delete('/file', function (req, res) {
    if (!req.headers['auth-token'] || req.headers['auth-token'] !== `Bearer ${user.token}` || !!req.body._error) {
        res.status(401);
        res.json([
            'Неверный токен авторизации'
        ]);

        return;
    }

    const filename = req.query.filename;

    files = files.filter(f => f.name !== filename);

    res.send('Success deleted');
});

app.listen(
    process.env.PORT || 3000,
    () => console.log(`Server is running at localhost:${process.env.PORT || 3000}`)
);
