const { db } = require("../DB.js");

const getCart = async (req, res) => {
  const q = "SELECT * FROM cart WHERE userId = ?";
  try {
    db.query(q, [req.params.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  } catch (err) {
    res.status(400).send(err);
  }
};
const addCart = async (req, res) => {
  let q;
  if (req.type !== "gifts") {
    q =
      "INSERT INTO cart(`userId`,`productId`,`title` ,`desc`,`price`,`image`,`type`,`category`,`color`,`size`,`sizelength`,`sizeChesst`,`sizeHips`,`sizeWaist`,`sizeSleeves`,`SizeAssistant`,`unit`) VALUES (?)";
  } else {
    q =
      "INSERT INTO cart(`userId`,`productId`,`title` ,`desc`,`price`,`image`,`type`,`sizelength`,`sizeChesst`,`sizeHips`,`sizeWaist`,`sizeSleeves`,`SizeAssistant`,`unit`) VALUES (?)";
  }

  const cart = [
    req.params.userId,
    req.body.id,
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.image,
    req.body.type,
    req.body.category,
    req.body.color,
    req.body.size,
    req.body.sizelength,
    req.body.sizeChesst,
    req.body.sizeHips,
    req.body.sizeWaist,
    req.body.sizeSleeves,
    req.body.SizeAssistant,
    req.body.unit,
  ];
  try {
    db.query(q, [cart], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send(data);
    });
  } catch (err) {
    res.status(401).send(err);
  }
};
const deleteCartItem = async (req, res) => {
  const q = "DELETE FROM cart WHERE `id` = ? AND userId = ?";
  try {
    db.query(q, [req.params.id, req.params.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send("cart item deleted");
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

const deleteCartUser = async (req, res) => {
  const q = "DELETE FROM cart WHERE `userId` = ?";
  try {
    db.query(q, [req.params.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send("cart user deleted");
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

const deleteCartProduct = async (req, res) => {
  const q = "DELETE FROM cart WHERE `productId` = ?";
  try {
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send("cart product deleted");
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports = {
  addCart,
  getCart,
  deleteCartItem,
  deleteCartProduct,
  deleteCartUser,
};
