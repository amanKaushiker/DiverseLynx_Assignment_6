const client = require("./client");
const express = require("express");
const app = express();

async function del_Val() {
  const resp = await client.del("Aman Kaushik");
  console.log("resp of delete  : ", resp);
}

del_Val();

const user = { name: "Aman Kaushik", profession: "Full Stack Engineer" };

app.get("/getUserData", async (req, res) => {
  const userData = await client.get("Aman Kaushik");
  if (userData) {
    return res
      .status(200)
      .json({ data: JSON.parse(userData), dataSource: "Send data From Redis" });
  } else {
    //============ set the value ===============//
    const data = await client.set(
      "Aman Kaushik",
      JSON.stringify(user),
      "EX",
      15
    );
    console.log("Redis status : ", data);
    return res
      .status(200)
      .json({ data: user, dataSource: "Send data From Database" });
  }
});

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
