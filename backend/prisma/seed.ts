import {PrismaClient} from "@prisma/client"
import {faker} from "@faker-js/faker"

const prisma = new PrismaClient(); 


async function main() {
    for (let i = 0; i < 6; i++) {
        await prisma.concert.create({
            data: {
                performer: faker.music.artist(),
                startTime: faker.date.soon(),
                length: faker.number.int({min: 30, max: 300}),
            }
        })
        
    }


}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });