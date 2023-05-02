const path = require('path');
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use((req, res, next) => {
  User.findById('6450d4023407e9991fe19242')
    .then(user => {
      console.log('user', user)
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/', adminRoutes);
app.use(shopRoutes);

mongoConnect(() => {
  app.listen(5001);
});
