module.exports = {
  cosmicjs: {
    bucket: {
      slug: process.env.COSMIC_BUCKET || 'static-website',
      read_key: process.env.COSMIC_READ_KEY,
      write_key: process.env.COSMIC_WRITE_KEY
    }
  }
}