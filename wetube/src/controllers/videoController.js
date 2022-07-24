import Video from '../models/Video';
import User from '../models/User';

export const homepage = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: 'desc' });
    return res.render('home', { pageTitle: 'Home', videos });
  } catch {
    return res.render('server-error');
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate('owner');
  if (!video) {
    return res.status(400).render('404', { pageTitle: 'Video not found' });
  }
  return res.render('videos/watch', {
    pageTitle: `Watch ${video.title}`,
    video,
  });
};

export const getEdit = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;
  const video = await Video.findById(id);
  // Error if video is not found
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found' });
  }
  // Error if video owner and user logging in are not matched
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect('/');
  }
  return res.render('videos/edit', {
    pageTitle: `Edit: ${video.title}`,
    video,
  });
};

export const postEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, description, hashtags },
    session: {
      user: { _id },
    },
  } = req;
  const video = await Video.findById(id);
  // Error if video is not found
  if (!video) {
    return res.render('404', { pageTitle: 'Video not found' });
  }
  // Error if video owner and user logging in are not matched
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect('/');
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;
  const video = await Video.findById(id);
  const user = await User.findById(_id);
  // Error if video is not found
  if (!video) {
    return res.render('404', { pageTitle: 'Video not found' });
  }
  // Error if video owner and user logging in are not matched
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect('/');
  }
  await Video.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id), 1);
  user.save();
  return res.redirect('/');
};

export const getUpload = (req, res) => {
  return res.render('videos/upload', { pageTitle: 'Upload Video' });
};

export const postUpload = async (req, res) => {
  const {
    session: {
      user: { _id }, // user who is logging in now
    },
    file: { path: fileUrl }, // ES6; Create constants named {path} from req.file.path and change its name to fileUrl
    body: { title, description, hashtags },
  } = req;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    // await User.findOneAndUpdate(_id, {
    //   $push: {videos: {$each: newVideo._id}}
    // });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect('/');
  } catch (error) {
    console.log(error);
    return res.status(404).render('videos/upload', {
      pageTitle: 'Upload Video',
      errorMessage: error._message,
    });
  }
};

export const search = async (req, res) => {
  const {
    query: { keyword, year, rating },
  } = req;
  let keywords = [];
  // search movies by keyword including title and summary
  if (keyword) {
    keywords = await Video.find({
      $or: [
        {
          title: {
            $regex: new RegExp(keyword, 'ig'),
          },
        },
        {
          description: {
            $regex: new RegExp(keyword, 'ig'),
          },
        },
      ],
    });
  } else if (year || rating) {
    // search movies by year or rating
    keywords = await Video.find({
      createdAt: {
        $gte: year,
      },
    });
  }
  return res.render('videos/search', {
    pageTitle: 'Search',
    keywords,
    keyword,
    year,
    rating,
  });
};
