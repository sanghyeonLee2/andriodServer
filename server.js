const bodyParser = require("body-parser");
const express = require("express");
const multer = require("multer");
const app = express();
//const fs = require("fs");

const upload = multer({ dest: "uploads/" }); // 이미지를 저장할 경로를 지정합니다.

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(express.json());

let productArray = [];
let chatArray = [];

let cnt = 0;
app.get("/", (req, res) => {
  res.json({
    success: true,
  });
});

app.post("/productList", (req, res) => {
  const {
    productAddress,
    productName,
    eventContent,
    event1,
    event2,
    personCount,
    productPrice,
  } = req.body;

  //  const image = req.file;

  //const savePath = "uploads/imageFile/" + image.originalname;

  // fs.renameSync(image.path, savePath);

  // 새로운 데이터를 객체로 생성
  const newProduct = {
    productAddress,
    productName,
    eventContent,
    event1,
    event2,
    personCount,
    productPrice,
    //   image: savePath,
  };
  console.log(req.body);
  // 데이터를 productArray에 추가
  productArray.push(newProduct);
  // JSON 형태로 응답을 보내는 코드

  res.json({
    productAddress,
    productName,
    eventContent,
    event1,
    event2,
    personCount,
    productPrice,
  });
});

app.get("/productList", (req, res) => {
  // JSON 형태로 productArray를 응답으로 보냅니다.
  res.json({
    productArray,
  });
});

app.post("/picture", upload.single("picture"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // 이미지를 저장하거나 처리할 수 있습니다.
  // 예를 들어, 파일 이름을 사용하여 이미지를 구분하여 저장할 수 있습니다.
  const imagePath = `picture/${req.file.originalname}`;
  // 파일을 이동시키는 코드
  fs.rename(req.file.path, imagePath, (err) => {
    if (err) {
      console.error("Error moving file:", err);
      return res.status(500).send("Error moving file.");
    }
    const imageUrl = `http://192.168.64.88:${PORT}/${imagePath}`; // 이미지가 저장된 URL
    res.send({
      imageUrl: imageUrl,
    });
  });
});

app.post("/chatRoom", (req, res) => {
  let { user, chat, id } = req.body;
  cnt += 1;
  id = cnt;
  const chatLog = {
    id,
    user,
    chat,
  };

  chatArray.push(chatLog);
  console.log(chatArray);
  res.json({
    id,
    user,
    chat,
  });
});

app.get("/chatRoom", (req, res) => {
  // JSON 형태로 chatArray를 응답으로 보냅니다.
  res.json({
    chatArray,
  });
});

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});
