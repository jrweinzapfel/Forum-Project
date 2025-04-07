import express from 'express';
import usersRouter from './routes/users.js';
import logging from './middleware/logging.js';
import errors from './middleware/errors.js';
const app = express();
const port = 3000;
app.use(express.json());
app.use(errors.errorHandler);
app.use(logging.logRequest);
app.use('/users', usersRouter);
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}.`);
});
