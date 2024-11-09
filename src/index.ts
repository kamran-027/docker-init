import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
app.use(express.json());

const client = new PrismaClient();

app.get("/getUsers", async (req, res) => {
  const users = await client.user.findMany();
  res.json({
    allUsers: users,
  });
});

app.get("/getUser/:id", async (req, res) => {
  const user = await client.user.findFirst({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({
    userFound: user,
  });
});

app.post("/addUser", async (req, res) => {
  await client.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
    },
  });

  res.json({
    message: "Done signing up you fool!",
  });
});

app.delete("/deleteUser/:id", async (req, res) => {
  try {
    await client.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "User gone for good!",
    });
  } catch (error) {
    res.json({
      error: "Check details again you fool!",
    });
  }
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
