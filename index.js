const express = require('express');
const sequelize = require('./config/sequelize');
require('./config/associations')(sequelize);
const rateLimiter = require("./middleware/rateLimiter");
const authentication = require('./middleware/authentication');
const router = express.Router();


const bookRoutes = require('./routes/book');
const borrowerRoutes = require('./routes/borrower');
const borrowingRoutes = require('./routes/borrowing');

// sequelize.sync({ force: true });

const app = express();
app.use(express.json());
app.use(authentication);
app.use(rateLimiter);
app.use('/api', bookRoutes);
app.use('/api', borrowerRoutes);
app.use('/api', borrowingRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log(`Server running on port 3000`);
  });
});
