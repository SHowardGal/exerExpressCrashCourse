const express = require('express');
const path = require('path');
// const moment = require('moment');
// const exphbs = require('express-handlebars');
const { engine } = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');
const app = express();

// const logger = (req, res, next) => {
//     console.log(
//         `${req.protocol}://${req.get('host')}${
//             req.originalUrl
//         }: ${moment().format()}`
//      );
//      next();
// };

// app.use(logger);

// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');
app.engine('handlebars', engine({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
})
);

app.use(express.json());
app.use(express.urlencoded({extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/members', require('./routes/members'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));