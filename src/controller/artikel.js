const { response } = require("../middleware/common");
const ModelProduct = require("../model/artikel");
const Pool = require("../config/db");
const { stringify } = require("uuid");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../config/cloudinary");

const ArtikelController = {
  update: async (req, res, next) => {
    try {
      let {
        title,
        mainContent,
        content1,
        titleContent2,
        content2,
        titleContent3,
        content3,
        titleContent4,
        content4,
        subTema,
      } = req.body;
      let data = {
        title,
        mainContent,
        content1,
        titleContent2,
        content2,
        titleContent3,
        content3,
        titleContent4,
        content4,
        subTema,
      };

      if (req.file) {
        const image = await cloudinary.uploader.upload(req.file.path, {
          folder: "artikel",
        });

        data.bacgroundPhoto = image.url;
      } else {
        data.bacgroundPhoto = user_artikel.photo;
      }

      const result = await ModelProduct.updateData(req.params.id, data);
      console.log(data);
      response(res, 200, true, result.rows, "update product success");
    } catch (err) {
      response(res, 404, err, "update product fail ");
    }
  },

  delete: async (req, res, next) => {
    ModelProduct.deleteData(req.params.id)
      .then((result) =>
        response(res, 200, true, result.rows, "delete data sukses")
      )
      .catch((err) => response(res, 401, false, err, "delete data fail"));
  },

  getArtikelAll: async (req, res, next) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortBy = req.query.sortBy || "title";
      const sort = req.query.sort || "ASC";
      const search = req.query.search || "";
      const result = await ModelProduct.selectData({
        limit,
        offset,
        sort,
        sortBy,
        search,
        page,
      });

      return response(res, 200, true, result.rows, "get data success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, "get data fail");
    }
  },

  getArtikelByUser: async (req, res, next) => {
    try {
      const users_id = req.payload.id;
      const result = await ModelProduct.selectDataUser({
        users_id,
      });
      response(res, 200, true, result.rows, "get data success");
    } catch (err) {
      console.log(err);
      response(res, 404, false, err.message, "get data fail");
    }
  },

  getArtikelDetail: (req, res, next) => {
    ModelProduct.selectDataDetail(req.params.id)
      .then((result) => {
        response(res, 200, true, result.rows, "get data success");
      })
      .catch((err) => response(res, 401, false, err, "get data fail"));
  },

  insert: async (req, res, next) => {
    try {
      let users_id = req.payload.id;
      let {
        title,
        mainContent,
        content1,
        titleContent2,
        content2,
        titleContent3,
        content3,
        titleContent4,
        content4,
        subTema,
      } = req.body;
      let data = {
        id: uuidv4(),
        title,
        mainContent,
        content1,
        titleContent2,
        content2,
        titleContent3,
        content3,
        titleContent4,
        content4,
        users_id,
        subTema,
      };

      if (req.file) {
        const image = await cloudinary.uploader.upload(req.file.path, {
          folder: "artikel",
        });

        data.bacgroundPhoto = image.url;
      } else {
        data.bacgroundPhoto = user_artikel.photo;
      }

      const result = await ModelProduct.insertData(data);
      console.log(data);
      response(res, 200, true, result.rows, "insert product success");
    } catch (err) {
      response(res, 404, err, "insert product fail ");
    }
  },
};

exports.ArtikelController = ArtikelController;
