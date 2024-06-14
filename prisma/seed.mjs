import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  const password = await bcryptjs.hash('123456', 10)
  const user = await prisma.user.create({
    data: {
      name: 'admin',
      email: 'riafan@hotmail.com',
      password
    },
  })
  console.log(`Created admin with id: ${user.id}`)
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

