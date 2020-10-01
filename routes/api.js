const express = require("express");
const router = express.Router();
const db = require("../models");
const slugify = require("slugify");
const Sequelize = require("sequelize");

const { Op } = Sequelize;

router.get("/albums", async (req, res) => {
  let filter = {};
  let { title } = req.query;
  if (title) {
    filter = {
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
    };
  }
  albums = await db.Album.findAll(filter);
  res.json(albums);
});

router.get("/albums/:id", async (req, res) => {
  album = await db.Album.findByPk(req.params.id);
  if (album) res.json(album);

  res.status(404).send();
});

router.post("/albums", async (req, res) => {
  album = await db.Album.create({
    title: req.body.title,
    slug: slugify(req.body.title),
  }).catch((err) => {
    console.log(err);
  });
  res.json(album);
});

router.put("/albums/:id", async (req, res) => {
  album = await db.Album.findByPk(req.params.id);
  if (album) {
    await album.update({ title: req.body.title });
    res.json(album);
  }
  res.status(404).send();
});

router.get("/images", async (req, res) => {
  let filter = {};
  let { description, caption } = req.query;
  if (description || caption) {
    filter = {
      where: {
        [Op.or]: [
          {
            description: {
              [Op.like]: `%${description}%`,
            },
          },
          {
            caption: {
              [Op.like]: `%${caption}%`,
            },
          },
        ],
      },
    };
  }

  images = await db.Image.findAll(filter);
  res.json(images);
});

router.post("/images", async (req, res) => {
  image = await db.Image.create({
    filename: req.body.filename,
    description: req.body.description,
    caption: req.body.caption,
    album_id: req.body.album_id,
  }).catch((err) => {
    console.log(err);
  });
  res.json(image);
});

router.put("/images/:id", async (req, res) => {
  image = await db.Image.findByPk(req.params.id);
  if (image) {
    await image.update({
      caption: req.body.caption,
      description: req.body.description,
    });
    res.json(image);
  }
  res.status(404).send();
});

module.exports = router;
