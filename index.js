import express from 'express';
import cors from 'cors'
import { setGame, enterToGame } from './functions.js';

const app = express();
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 4444;

let games = [{
    id: 0,
    roomName: 'Vas11a',
    amount: '4',
    time: '120',
    location: 'Университет',
    spyId: 3,
    entered: 0
}]
const locations = ['База террористов', 'Банк', 'Школа', 'Цирк-шапито', 'Церковь', 'Университет', 'Хоккейная арена', 'Театр', 'Супермаркет', 'Станция техобслуживания', 'Спа-салон', 'Самолет', 'Ресторан', 'Посольство', 'Полярная станция', 'Полицейский участок', 'Подводная лодка', 'Пляж', 'Пиратский корабль', 'Пассажирский поезд', 'Партизанский отряд', 'Отель', 'Орбитальная станция', 'Океанский лайнер', 'Овощебаза', 'Ночной клуб', 'Лунапарк', 'Корпоративная вечеринка', 'Киностудия', 'Карнавал', 'Казино', 'Зоопарк', 'Войско крестоносцев', 'Выставка  настольных игр', 'Воинская часть', 'Больница']

app.post('/create', (req, res) => {
    games.push(setGame(req.body, locations, games))
    res.send('all good')
});

app.get('/getGames', (req, res) => {
    res.send(games)
});



app.post('/enter', (req, res) => {
    const result = enterToGame(req.body.id, games)
    res.send(result)
});



app.patch('/quit', (req, res) => {
    for (var i = games.length - 1; i >= 0; i--) {
        if (games[i].id === req.body.id) {
            if (games[i].amount == games[i].entered) {
                res.send('full')
            } else {
                games[i].entered -= 1
                res.send('quit')
            }
            return
        }
    }
    res.send('bad')
});

app.patch('/finish', (req, res) => {
    for (var i = games.length - 1; i >= 0; i--) {        
        if (games[i].id === req.body.id) {
            if (games[i].amount == games[i].entered) {
                games.splice(i, 1)
                res.send('good')
            } else {
                res.send('quit')
            }
            return
        }
    }
    res.send('bad')
});




app.patch('/next', (req, res) => {
    for (var i = games.length - 1; i >= 0; i--) {
        if (games[i].id === req.body.id) {
            if (games[i].amount == games[i].entered) {
                res.send('good')
            } else {
                res.send('not all players')
            }
            return
        }
    }
    res.send('bad')
})


app.post('/finish', (req, res) => {
    if (req.body.data === 'get') {
        res.send(games)
    } else {
        games = []
        res.send('reactor was stoped')
    }
})





app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('server ok');
})