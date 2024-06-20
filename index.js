const express = require("express");
const app = express();
const port = 4000;
const routes = require('./Routes/api-collection');
const googleAuth = require("./Routes/Authentication/googleAuthentication");
const session = require("express-session");
const { sequelize } = require('./Models/modelCollectionConfig');
const passport = require("passport");


app.use(session({
  resave : false,
  saveUninitialized : true,
  secret : "abcd"
}))

app.use(passport.initialize());
app.use(passport.session());

//Render UI
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('auth');
})

//Parsing JSON Data
app.use(express.json());
app.use('/api', routes);
app.use('/auth', googleAuth);

sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }).catch((err) => {
    console.error('Unable to connect to the database:', err);
});

