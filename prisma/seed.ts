import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed () {
  // await prisma.post.deleteMany()
  // await prisma.user.deleteMany()
  console.log('Seeding the database...')
  await prisma.user.create({
    data: {
      email: 'zitrojj@gmail.com',
      hashedPassword: '123456'
    }
  })
  console.log('Seeding the database...')
  // await prisma.user.create({
  //   data: {
  //     email: 'azjj0610@gmail.com',
  //     hashedPassword: '123456'
  //   }
  // })
  // const post = await prisma.post.create({
  //   data: {
  //     titleSpanish: 'Hola Mundo',
  //     titleEnglish: 'Hello World',
  //     contentSpanish: 'Este es mi primer post',
  //     contentEnglish: 'This is my first post',
  //     status: 'PUBLISHED',
  //     author: {
  //       connect: {
  //         email: 'zitrojj@gmail.com'
  //       }
  //     }
  //   }
  // })
  // await prisma.comment.create({
  //   data: {
  //     content: 'This is my first comment',
  //     user: {
  //       connect: {
  //         email: 'azjj0610@gmail.com'
  //       }
  //     },
  //     post: {
  //       connect: {
  //         id: post.id
  //       }
  //     }
  //   }
  // })
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
