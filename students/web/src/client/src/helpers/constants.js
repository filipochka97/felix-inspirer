import config from 'config';

module.exports = {
  UPLOAD_LIMIT: 5000000, // 5 MB
  DEFAULT_PHOTO: `${config.baseApiUrl}/photo/default.jpg`,
  PHOTO_COLORS: [
    'rgba(251,251,251,0.5)',
    'rgba(196,196,196,0.5)',
    'rgba(220,220,220,0.5)',
    'rgba(228,228,228,0.5)',
    'rgba(212,212,212,0.5)',
  ],
};
