const bodyParser = require("body-parser");
const express = require("express");
const multer = require("multer");
const app = express();
const fs = require("fs");

const upload = multer({ dest: "uploads/" }); // 이미지를 저장할 경로를 지정합니다.

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.json());

let productArray = [];
let chatArray = [];

app.get("/", (req, res) => {
  res.json({
    success: true,
  });
});

app.post("/productList", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const {
    productAddress,
    productName,
    eventContent,
    event1,
    event2,
    personCount,
    productPrice,
  } = req.body;

  const image = req.file;

  const fileName = `${Date.now()}-${image.originalname}`;

  const imagePath = `uploads/${fileName}`;

  fs.renameSync(image.path, imagePath);

  // 새로운 데이터를 객체로 생성
  const newProduct = {
    productAddress,
    productName,
    eventContent,
    event1,
    event2,
    personCount,
    productPrice,
    imagePath,
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
    imagePath,
  });
});

app.get("/productList", (req, res) => {
  // JSON 형태로 productArray를 응답으로 보냅니다.
  res.json({
    productArray,
  });
});

// app.post("/upload", upload.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }

//   const imageName = req.body.imageName; // 클라이언트에서 이미지 파일의 이름을 전송한 경우

//   // 이미지를 저장하거나 처리할 수 있습니다.
//   // 예를 들어, 파일 이름을 사용하여 이미지를 구분하여 저장할 수 있습니다.
//   const imagePath = `uploads/${imageName}-${req.file.originalname}`;
//   // 파일을 이동시키는 코드
//   fs.rename(req.file.path, imagePath, (err) => {
//     if (err) {
//       console.error("Error moving file:", err);
//       return res.status(500).send("Error moving file.");
//     }
//     const imageUrl = `http://192.168.64.88.com/${imagePath}`; // 이미지가 저장된 URL
//     res.send({
//       message: "File uploaded and moved!",
//       imageUrl: imageUrl,
//     });
//   });
// });

app.post("/chatRoom", (req, res) => {
  let { user, chat, id } = req.body;
  id += 1;
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
