import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const id = (event.context.params && event.context.params.id) as string;
  const body = await readBody(event);
  if (!body?.name) {
    throw createError({
      statusCode: 400,
      statusMessage: "name is required",
    });
  }
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: body.name,
      },
    });
    return setResponseStatus(event, 201);
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "name is incorrect",
    });
  }
});
