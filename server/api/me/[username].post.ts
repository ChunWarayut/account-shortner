import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const username = (event.context.params && event.context.params.username) as string;

  const isMatch = await prisma.user.findUnique({
    where: {
      username: username,
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
    return data;
  }
  throw createError({
    statusCode: 400,
    statusMessage: "username is incorrect",
  });
});
