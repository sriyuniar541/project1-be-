const Pool = require("../config/db");

const selectDataDetail = (id) => {
  return Pool.query(`SELECT * FROM artikel WHERE artikel.id='${id}'`);
};

const selectData = ({ limit, offset, sort, sortBy, search }) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT * FROM artikel WHERE (artikel.title) ILIKE ('%${search}%') ORDER BY artikel.${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err.message);
        }
      }
    );
  });
};

const selectDataUser = ({ users_id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM artikel WHERE users_id ='${users_id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err.message);
        }
      }
    )
  );
};
//
const insertData = (data) => {
  console.log(data);
  const {
    id,
    title,
    bacgroundPhoto,
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
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO artikel(id, title, bacgroundPhoto, mainContent, content1, titleContent2, content2, titleContent3, content3, titleContent4, content4, users_id, subTema) VALUES('${id}','${title}','${bacgroundPhoto}','${mainContent}','${content1}','${titleContent2}','${content2}','${titleContent3}','${content3}','${titleContent4}','${content4}','${users_id}','${subTema}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err.message);
        }
      }
    )
  );
};
//
const updateData = (id, data) => {
  console.log(data);
  const {
    title,
    bacgroundPhoto,
    mainContent,
    content1,
    titleContent2,
    content2,
    titleContent3,
    content3,
    titleContent4,
    content4,
    subTema,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE artikel SET  title = '${title}', bacgroundPhoto = '${bacgroundPhoto}', mainContent =' ${mainContent}', content1 = '${content1}', titleContent2 = '${titleContent2}', content2  = '${content2}', titleContent3= '${titleContent3}', content3  ='${content3}', titleContent4 = '${titleContent4}', content4  = '${content4}', subTema = '${subTema}' WHERE id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err.message);
        }
      }
    )
  );
};
//
const deleteData = (id) => {
  return Pool.query(`DELETE FROM artikel where id ='${id}'`);
};

module.exports = {
  insertData,
  deleteData,
  selectDataDetail,
  updateData,
  selectData,
  selectDataUser,
};
