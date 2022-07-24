import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import rootRouter from './routers/rootRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import { localsMiddleware } from './middlewares';

const app = express();
const logger = morgan('dev');
app.use(logger);

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false, // 세션이 변경되지 않아도 모든 request마다 해당 세션을 저장함(false를 권장).
    saveUninitialized: false, // 세션이 생성되었지만 수정된 적이 없을 때 세션은 uninitialized 상태가 된다. 세션은 controller에서만 수정할 수 있는데 세션을 수정한 경우(로그인 등)에 한해서 쿠키로 세션을 넘겨주는 것이 선호된다(false로 설정).
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(localsMiddleware);
app.use('/uploads', express.static('uploads'));
app.use('/assets', express.static('assets'));
app.use('/', rootRouter);
app.use('/users', userRouter);
app.use('/videos', videoRouter);

export default app;
