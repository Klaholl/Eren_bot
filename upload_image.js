const fs = require('fs'),
  path = require('path'),
  Twit = require('twit'),
  Dotenv = require('dotenv');

Dotenv.config();

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

function upload_image() {
  fs.readdir(__dirname + '/images', function (err, files) {
    if (err) {
      console.log(err);
    } else {
      const images = [];
      files.forEach(function (f) {
        images.push(f);
      });
      upload_random_image(images);
    }
  });
}

function random_from_array(images) {
  return images[Math.floor(Math.random() * images.length)];
}

function upload_random_image(images) {
  console.log('Opening an image...');
  const image_path = path.join(__dirname, '/images/' + random_from_array(images)),
    b64content = fs.readFileSync(image_path, {
      encoding: 'base64'
    });

  console.log('Uploading an image...');

  T.post('media/upload', {
    media_data: b64content
  }, function (err, data, response) {
    if (err) {
      console.log('ERROR:');
      console.log(err);
    } else {
      console.log('Image uploaded!');
      console.log('Now tweeting it...');

      T.post('statuses/update', {
          media_ids: new Array(data.media_id_string)
        },
        function (err, data, response) {
          if (err) {
            console.log('ERROR:');
            console.log(err);
          } else {
            console.log('Posted an image!');
            fs.unlink(image_path, function (err) {
              if (err) {
                console.log('ERROR: unable to delete image ' + image_path);
              } else {
                console.log('image ' + image_path + ' was deleted');
              }
            });
          }
        }
      );
    }
  });
}

module.exports = upload_image;