const auth = require('./auth');
const user = require('./user');
const gfg = require('./gfg');
const codeforces = require('./codeforces');
const blog = require('./blog');
const vedio = require('./vedio');
const playlist = require('./playlist');
const spoj = require('./spoj');
const codechef = require('./codechef');

const authenticate = require('../middlewares/authenticate');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Api started"});
    });

    app.use('/auth', auth);
    app.use('/user',authenticate , user);
    app.use('/gfg',authenticate ,gfg);
    app.use('/codeforces',authenticate , codeforces);
    app.use('/blog',authenticate , blog);
    app.use('/vedio',authenticate , vedio);
    app.use('/playlist',authenticate ,playlist);
    app.use('/spoj',authenticate ,spoj);
    app.use('/codechef',authenticate , codechef);
};