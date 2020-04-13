const Clarifai = require('clarifai');

const actionToModelMap = {
  'detectFaces': Clarifai.FACE_DETECT_MODEL,
  'generalConcepts': Clarifai.GENERAL_MODEL,
  'getDemographics': Clarifai.DEMOGRAPHICS_MODEL,
  'getApparels': Clarifai.APPAREL_MODEL,
  'recognizeFood': Clarifai.FOOD_MODEL,
  'recognizeCelebrity': Clarifai.CELEBRITY_MODEL
}

const app = new Clarifai.App({
 apiKey: process.env.CLARIFAI_API_KEY
});

const handleApiCall = (req, res) => {
  app.models
    .predict(actionToModelMap[req.body.action], req.body.imageurl)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}