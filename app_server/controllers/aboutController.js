const about = function(req, res) {
  res.render('about', {
    title: 'About Game Portal',
    content: 'Game Portal is an online platform where users can discover and explore various games tailored for different preferences and genres.'
  });
};

module.exports = {
  about
};
