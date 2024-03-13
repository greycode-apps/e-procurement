const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const db = require('./models/index');
require('dotenv').config();
const cors = require('cors');
const {PORT, CLIENT_ORIGIN} = require('./config');
const { AuthRouter, SupplierRouter, InstituteRouter, BidRouter, PayRouter, } = require('./routes');


app.use(cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
    methods: ["POST", "GET", "PATCH", "DELETE", "PUT"]
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.get('/', (req, res) => {
    res.send('Welcome to the E-Procurement System');
})

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/supplier', SupplierRouter);
app.use('/api/v1/institute', InstituteRouter);
app.use('/api/v1/tender', BidRouter);
app.use('/api/v1/subscribe', PayRouter);

db.sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });