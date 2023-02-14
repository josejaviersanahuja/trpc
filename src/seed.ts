import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed () {
  await prisma.$connect()
  console.log('Seeding database...', prisma.$connect)
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
