import multer from 'multer';

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedInUser = req.session.user || {};
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = 'Wetube';
  // console.log(req.session.user);
  next();
};

export const protectMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect('/login');
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect('/');
  }
};

export const multerAvatar = multer({
  dest: 'uploads/avatars/',
  limits: { fileSize: 3000000 },
});

export const multerVideo = multer({
  dest: 'uploads/videos/',
  limits: { fileSize: 100000000 },
});
