/* import { SEED_USERS } from "./const";
import { PrismaClient } from "../generated/prisma";
import { formatDate, formatTime } from "../lib/utils/date-format";

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    SEED_USERS.map((user) => {
      return prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
 
 */