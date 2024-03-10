const express = require('express');
const sequelize = require('./config/sequelize');
require('./config/associations')(sequelize); // Make sure to call the function to define associations

const bookRoutes = require('./routes/book');
const borrowerRoutes = require('./routes/borrower');
const borrowingRoutes = require('./routes/borrowing');

// sequelize.sync({ force: true });

const app = express();
app.use(express.json());
app.use('/api', bookRoutes);
app.use('/api', borrowerRoutes);
app.use('/api', borrowingRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log(`Server running on port 3000`);
  });
});
