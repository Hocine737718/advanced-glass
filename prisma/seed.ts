import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client';
import { seedAdminUser } from './seeds/seedAdminUser';
// Import other seed functions as needed

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  // Optional: Clean up data before seeding (use with caution)
  // await prisma.post.deleteMany();
  // await prisma.user.deleteMany();

  await seedAdminUser(prisma);
  // Call other seed functions here, e.g., await seedPosts(prisma);
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
