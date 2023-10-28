import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const id = (event.context.params && event.context.params.id) as string;
  const body = await readBody(event);
  if (!body?.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "password is required",
    });
  }
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: body.password,
      },
    });
    return setResponseStatus(event, 201);
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "password is incorrect",
    });
  }
});
