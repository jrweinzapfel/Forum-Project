import express from 'express';
import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';
import repliesRouter from './routes/replies.js';
import logging from './middleware/logging.js';
import errors from './middleware/errors.js';
import xss from './middleware/xss.js';
import notFound from './middleware/notFound.js';
const app = express();
const port = 3000;
app.use(express.json());
app.use(xss);
app.use(logging.logRequest);
app.use('/v1/users', usersRouter);
app.use('/v1/posts', postsRouter);
app.use('/v1/replies', repliesRouter);
app.use(notFound);
app.use(errors.errorHandler);
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}.`);
});
