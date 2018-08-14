const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .find({ _id: ObjectID(id) })
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .deleteOne({ _id: ObjectID(id) })
      .then(() => {
        collection
          .find()
          .toArray()
          .then((docs) => res.json(docs));
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  //Create

router.post('/', (req, res) => {
  const newSighting = req.body;
  console.log(req.body);
  collection.insertOne( newSighting )
  .then(() => {
    collection.find().toArray()
    .then((docs) => res.json(docs))
  })
  .catch((err) => {
    console.error(err);
    res.status(500);
    res.json({ status: 500, error: err });
  });
});

//Update

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedSighting = req.body;
  collection.updateOne({ _id: ObjectID(id) },
  {$set:updatedSighting})
  .then(() => {
    collection.find().toArray()
    .then((docs) => res.json(docs))
  })
  .catch((err) => {
    console.error(err);
    res.status(500);
    res.json({ status: 500, error: err });
})
});

  return router;

};

module.exports = createRouter;
