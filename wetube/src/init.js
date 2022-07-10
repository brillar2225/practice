import 'dotenv/config';
import './db';
import './models/Video';
import './models/User';
import app from './server';

const PORT = 4000;

const handleServer = () =>
  console.log(`✅Server Listening on Port http://localhost:${PORT}`);

app.listen(PORT, handleServer);
