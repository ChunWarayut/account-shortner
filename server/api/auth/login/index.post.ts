import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  if (!body?.username) {
    throw createError({
      statusCode: 400,
      statusMessage: "username is required",
    });
  }
  if (!body?.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "password is required",
    });
  }

  const isMatch = await prisma.user.findUnique({
    where: {
      username: body.username,
      password: body.password,
    },
    include: {
      customer: {
        include: {
          urls: true,
        },
      },
    },
  });

  if (isMatch) {
    const { password, ...data } = isMatch;
    const token = jwt.sign(
      { id: data.id, username: data.username },
      config.public.secret || "B845C1AAA43857DABE8124CE69D1B",
      {
        expiresIn: "1 days",
      }
    );
    return { ...data, token };
  }
  throw createError({
    statusCode: 400,
    statusMessage: "username or password is incorrect",
  });
});
