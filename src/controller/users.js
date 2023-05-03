const { response } = require("../middleware/common");
const { create, findEmail, getUserId } = require("../model/users");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { generateToken, generateRefreshToken } = require("../helpers/auth");
const cloudinary = require("../config/cloudinary");
const Port = process.env.PORT;
const Host = process.env.HOST;

const UsersController = {
  insert: async (req, res, next) => {
    let {
      rows: [user_artikel],
    } = await findEmail(req.body.email);

    if (user_artikel) {
      return response(res, 404, false, "email alredy user", "register fail");
    }
    let salt = bcrypt.genSaltSync(10);
    let password = bcrypt.hashSync(req.body.password);
    let { email, fullname, adress, role, gender, phoneNumber } = req.body;
    let data = {
      id: uuidv4(),
      email,
      password,
      fullname,
      role,
      adress,
      gender,
      phoneNumber,
    };

    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "artikel",
      });

      data.photo = image.url;
    } else {
      // data.photo = user_artikel.photo;
    }

    try {
      const result = await create(data);
      console.log(result);
      response(res, 200, true, "register success");
    } catch (err) {
      console.log(err);
      response(res, 404, false, err, "register fail");
    }
  },

  login: async (req, res, next) => {
    let {
      rows: [user_artikel],
    } = await findEmail(req.body.email);

    if (!user_artikel) {
      return response(res, 404, false, null, "email not found");
    }
    const password = req.body.password;
    const validation = bcrypt.compareSync(password, user_artikel.password);

    if (!validation) {
      return response(res, 404, false, "wrong password");
    }
    delete user_artikel.password;
    let payload = {
      id: user_artikel.id,
      email: user_artikel.email,
      role: user_artikel.role,
    };

    let accessToken = generateToken(payload);
    let refToken = generateRefreshToken(payload);

    user_artikel.token = accessToken;
    response(res, 200, true, user_artikel, "login succes");
    user_artikel.refreshToken = refToken;
  },

  getUser: async (req, res, next) => {
    try {
      let id = req.payload.id;
      const result = await getUserId(id);
      response(res, 200, true, result.rows, "get user success");
    } catch (err) {
      response(res, 404, err.message, "get user fail ");
    }
  },

  // UpdateUser: async (req, res, next) => {
  //     try {
  //         const { email, fullname, gender, phonenumber, adress } = req.body
  //         const data = {
  //             email,
  //             fullname,
  //             adress,
  //             gender,
  //             phonenumber
  //         }

  //         if (req.file) {
  //             const image = await cloudinary.uploader.upload(req.file.path, {
  //                 folder: 'telegram',
  //             });

  //             data.photo = image.url;
  //         } else {
  //             data.photo = users.photo;
  //         }

  //         const result = await updateProfile(req.params.id, data)
  //         console.log(data)
  //         response(res, 200, true, result.rows, 'update user success')
  //     } catch (err) {
  //         response(res, 404, err.message, 'update user fail ')
  //     }
  // },
};

exports.UsersController = UsersController;
