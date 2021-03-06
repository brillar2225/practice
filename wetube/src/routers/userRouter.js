import express from 'express';
import {
  startGithubLogin,
  finishGithubLogin,
  startKakaoLogin,
  finishKakaoLogin,
  logout,
  getEdit,
  postEdit,
  getPassword,
  postPassword,
  profile,
} from '../controllers/userController';
import {
  multerAvatar,
  protectMiddleware,
  publicOnlyMiddleware,
} from '../middlewares';

const userRouter = express.Router();

userRouter.get('/github/start', publicOnlyMiddleware, startGithubLogin);
userRouter.get('/github/finish', publicOnlyMiddleware, finishGithubLogin);
userRouter.get('/kakao/start', publicOnlyMiddleware, startKakaoLogin);
userRouter.get('/kakao/finish', publicOnlyMiddleware, finishKakaoLogin);
userRouter.get('/logout', protectMiddleware, logout);
userRouter
  .route('/mypage')
  .all(protectMiddleware)
  .get(getEdit)
  .post(multerAvatar.single('avatar'), postEdit);
userRouter.route('/password').get(getPassword).post(postPassword);
userRouter.get('/:id', profile);

export default userRouter;
