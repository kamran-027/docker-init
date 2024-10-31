import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
app.use(express.json());

const client = new PrismaClient();

app.get("/", async (req, res) => {
  const user = await client.user.findFirst();
  res.json({
    user: user,
  });
});

app.post("/", async (req, res) => {
  console.log("Req body::", req);

  await client.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
    },
  });

  res.json({
    message: "Done signing up!",
  });
});

app.listen(3000);
