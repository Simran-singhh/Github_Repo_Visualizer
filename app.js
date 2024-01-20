const express = require("express");
const app = express();

const port = 5000;

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

const homeRoutes = require("./routes/homepageRoutes");

app.use("/",homeRoutes);

app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});