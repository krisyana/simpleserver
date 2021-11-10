const express = require('express');
const app = express();
const port = 3000;

const { UserController, User } = require('./Controller/UserController');
const ItemController = require('./Controller/ItemController');

// The Setting
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
const checkToken = async(req, res, next) => {
    const token = req.headers.token;
    const user = User.find((user) => user.email === token);
    if (!user) {
        return res.status(401).json({ error: 'Forbidden' });
    } else {
        next();
    }
};

app.post('/register', UserController.register);
app.post('/login', UserController.login);
app.use(checkToken);
app.get('/items', ItemController.getAll);
app.get('/items/:id', ItemController.getOne);
app.post('/items', ItemController.create);
app.delete('/items/:id', ItemController.delete);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});