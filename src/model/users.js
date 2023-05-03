const Pool = require("./../config/db");

const create = (data) => {
  const {
    id,
    email,
    password,
    fullname,
    role,
    adress,
    photo,
    gender,
    phoneNumber,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO user_artikel(id, email, password, fullname, role, adress, photo, gender, phoneNumber) 
        VALUES('${id}','${email}','${password}','${fullname}','${role}','${adress}','${photo}','${gender}','${phoneNumber}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const findEmail = (email) => {
  console.log(email, "model");
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM  user_artikel WHERE email='${email}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const getUserId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM  user_artikel WHERE id = '${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

// const updateProfile = (id, data) => {
//     console.log(data)
//     const { email, fullname, adress, photo, gender, phonenumber } = data
//     return new Promise((resolve, reject) =>
//         Pool.query(`UPDATE  SET email='${email}',fullname='${fullname}',adress='${adress}',photo='${photo}',gender='${gender}',phonenumber='${phonenumber}' WHERE id = '${id}'`, (err, result) => {
//             if (!err) {
//                 resolve(result)
//             } else {
//                 reject(err.message)
//             }
//         })
//     )
// }

module.exports = { create, findEmail, getUserId };
