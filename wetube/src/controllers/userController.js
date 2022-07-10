import User from '../models/User';
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });

export const postJoin = async (req, res) => {
  // Get user's infomations user input
  const { name, email, username, password, password2, location } = req.body;
  const pageTitle = 'join';
  if (password !== password2) {
    return res.status(400).render('join', {
      pageTitle,
      errorMessage: 'Password confirmation does not match.',
    });
  }
  // Check if username and email inputted is existing in mongoDB as well
  const isExist = await User.exists({ $or: [{ username }, { email }] });
  if (isExist) {
    return res.status(400).render('join', {
      pageTitle,
      errorMessage: 'This username/email is already taken.',
    });
  }
  try {
    // Create a user data into User model
    await User.create({
      name,
      email,
      username,
      password,
      location,
    });
    return res.redirect('/login');
  } catch (error) {
    return res.status(400).render('join', {
      pageTitle: 'Join Error',
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) =>
  res.render('login', { pageTitle: 'Login' });

export const postLogin = async (req, res) => {
  // Get username and password user input
  const { username, password } = req.body;
  const pageTitle = 'Login';
  // Check username
  const user = await User.findOne({ username, socialOnly: false });
  if (!user) {
    return res.status(400).render('login', {
      pageTitle,
      errorMessage: 'An account with this username deos not exist.',
    });
  }
  // Check password
  const comparision = await bcrypt.compare(password, user.password);
  if (!comparision) {
    return res.status(400).render('login', {
      pageTitle,
      errorMessage: 'Wrong Password.',
    });
  }
  // Success Login and redirect to home('/')
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect('/');
};

export const startGithubLogin = (req, res) => {
  // Request a user's GitHub identity
  const baseUrl = 'https://github.com/login/oauth/authorize';
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: 'read:user user:email', // Github gives me datas in scope to 'code'
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  // Get 'code' to exchane for access token which has user's data
  const baseUrl = 'https://github.com/login/oauth/access_token';
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();
  if ('access_token' in tokenRequest) {
    // Use the access token to access the API
    const apiUrl = 'https://api.github.com';
    const { access_token } = tokenRequest;
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    // Create user data if user does not have email that primary and verified are true
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    // Get user's email that 'primary' and 'verified' are true
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect('/login');
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: '',
        socialOnly: true,
        avatarUrl: userData.avatar_url,
        location: userData.location,
      });
    }
    // Success Login and redirect to home('/')
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect('/');
  } else {
    // error alert
    return res.redirect('/login');
  }
};

export const startKakaoLogin = (req, res) => {
  // Request a user's Kakao identity
  const baseUrl = 'https://kauth.kakao.com/oauth/authorize';
  const config = {
    client_id: process.env.KA_CLIENT,
    redirect_uri: 'http://localhost:4000/users/kakao/finish',
    response_type: 'code',
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  return res.redirect(finalUrl);
};

export const finishKakaoLogin = async (req, res) => {
  // Get 'code' to exchane for access token which has user's data
  const baseUrl = 'https://kauth.kakao.com/oauth/token';
  const config = {
    grant_type: 'authorization_code',
    client_id: process.env.KA_CLIENT,
    client_secret: process.env.KA_SECRET,
    redirect_uri: 'http://localhost:4000/users/kakao/finish',
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: 'POST',
      headers: {
        'Content-type': ' application/x-www-form-urlencoded;charset=utf-8',
      },
    })
  ).json();
  // Use the access token to access the API
  if ('access_token' in tokenRequest) {
    const apiUrl = 'https://kapi.kakao.com';
    const { access_token } = tokenRequest;
    const userData = await (
      await fetch(`${apiUrl}/v2/user/me`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
    ).json();
    const { kakao_account } = userData;
    if (
      kakao_account.is_email_valid !== true &&
      kakao_account.is_email_verified !== true
    ) {
      return res.redirect('/login');
    }
    let user = await User.findOne({ email: kakao_account.email });
    if (!user) {
      user = await User.create({
        name: kakao_account.profile.nickname,
        username: kakao_account.email,
        email: kakao_account.email,
        password: '',
        socialOnly: true,
        avatarUrl: kakao_account.profile.profile_image_url,
        location: '',
      });
    }
    // Success Login and redirect to home('/')
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect('/');
  } else {
    return res.redirect('/login');
  }
};

export const getEdit = (req, res) => {
  return res.render('edit-profile', { pageTitle: 'Edit Profile' });
};

export const postEdit = async (req, res) => {
  // const id = req.session.user.id;
  // const {name, email, username, location} = req.body;
  // ES6
  const {
    session: {
      user: { _id, email: pastEmail, username: pastUsername, socialOnly },
    },
    body: { name, email, username, location },
  } = req;
  // Do not allow to change email or username if they are existed in DB
  const pageTitle = 'Edit Profile';
  if (email !== pastEmail) {
    const checkEmail = await User.exists({ email });
    if (checkEmail) {
      return res.status(400).render('edit-profile', {
        pageTitle,
        errorMessage: 'This email is already taken',
      });
    }
  }
  if (username !== pastUsername) {
    const checkUsername = await User.exists({ username });
    if (checkUsername) {
      return res.status(400).render('edit-profile', {
        pageTitle,
        errorMessage: 'This username is already taken',
      });
    }
  }
  const findSocialOnly = await User.findOne({ socialOnly: true });
  if (findSocialOnly && email !== pastEmail) {
    return res.status(400).render('edit-profile', {
      pageTitle,
      errorMessage: 'This ID using social media can not change the email.',
    });
  }
  const updateUser = await User.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  req.session.user = updateUser;
  return res.redirect('/users/edit');
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

export const see = (req, res) => res.send('See User');
