import Video from '../models/Video';

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
  const video = await Video.findById(id);
  if (!video) {
    return res.status(400).render('404', { pageTitle: 'Video not found' });
  }
  return res.render('videos/watch', {
    pageTitle: `Watch ${video.title}`,
    video,
  });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found' });
  }
  return res.render('videos/edit', {
    pageTitle: `Edit: ${video.title}`,
    video,
  });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render('404', { pageTitle: 'Video not found' });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect('/');
};

export const getUpload = (req, res) => {
  return res.render('videos/upload', { pageTitle: 'Upload Video' });
};

export const postUpload = async (req, res) => {
  const { path: fileUrl } = req.file; // ES6; Create constants named {path} from req.file.path and change its name to fileUrl
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      fileUrl,
      hashtags: Video.formatHashtags(hashtags),
    });
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
      // $or: [
      //   {
      //     createdAt: {
      //       $gte: year,
      //     },
      //   },
      //   {
      //     meta: {
      //       rating: {
      //         $gte: rating,
      //       },
      //     },
      //   },
      // ],
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
