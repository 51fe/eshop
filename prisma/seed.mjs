import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt-ts'

const prisma = new PrismaClient()

async function main() {
  await initUsers()
  await initProducts()
}

async function initUsers() {
  console.log('Start seeding user ...')
  const password = await hash('123456', 10)
  const user = await prisma.user.create({
    data: {
      name: 'admin',
      email: 'riafan@hotmail.com',
      password
    },
  })

  console.log(`Created user with id: ${user.id}`)
  console.log('Seeding user finished.')
}

async function initProducts() {
  console.log('Start seeding products ...')
  const products = await prisma.product.createMany({
    data: [{
      name: 'CSS3 beginne',
      priceInCents: 1343,
      file: 'd186ff34-3bd3-45c9-9e92-72e3c3674888-css3.zip',
      image: 'f924cc90-a7bb-4a2d-9975-75241cd97ca0-css3.png',
      createdAt: new Date(Date.now() + 1 * 1000),
      description: 'Dignissimos, repellat minima modi mollitia obcaecati accusamus iure animi, veritatis excepturi fugiat vel assumenda dolore. Eligendi eos libero eaque quia nihil?Corporis saepe consequatur nihil architecto optio et similique. Saepe aperiam qui corrupti voluptate odio asperiores voluptates eos quam. Vitae quae, corporis sunt ipsa placeat minima quis iure aliquam odio eveniet eum quos praesentium, nihil sint eligendi maxime omnis nulla cupiditate ratione reprehenderit alias voluptatum hic. Dignissimos, repellat minima modi mollitia obcaecati accusamus iure animi, veritatis excepturi fugiat vel assumenda dolore. Eligendi eos libero eaque quia nihil? Cum reprehenderit dolore nobis, illum veritatis aliquid temporibus odit, vero, facilis sint assumenda voluptatibus natus porro.'
    }, {
      name: 'PHP beginner',
      priceInCents: 1624,
      file: '82ba0daf-9b05-432a-99fc-d0bcf107db92-php.zip',
      image: '597531fb-f528-4afc-b9bf-0ab4565c8d4e-php.png',
      createdAt: new Date(Date.now() + 2 * 1000),
      description: 'Blanditiis corrupti, saepe facilis eius iure ab officia vero fugiat expedita esse debitis molestiae distinctio sit veritatis tempora obcaecati nesciunt non quis consectetur et minima voluptas nam. Exercitationem quaerat harum dolores aliquid aliquam odit illo. Ex reiciendis laudantium, beatae vel ducimus rerum dolor ipsum! Inventore, reprehenderit. Reprehenderit non illum impedit optio, laudantium, porro ex sapiente laboriosam tempore at similique magnam molestias itaque consectetur aut nobis quibusdam. Iste est earum minus harum et, voluptatum hic facilis deserunt assumenda nobis dolores quisquam numquam ab.'
    }, {
      name: 'Nuxt beginner',
      priceInCents: 1124,
      file: 'fc2565d4-2308-4487-94e0-d15d12dda65a-nuxtjs.zip',
      image: '9abdb47e-14de-4d0c-81a9-69d2f14ac057-nuxtjs.png',
      createdAt: new Date(Date.now() + 3 * 1000),
      description: 'Recusandae laboriosam blanditiis dolor minima animi eius eveniet non iste, dignissimos neque aspernatur in vitae error debitis soluta modi laborum optio nihil expedita doloremque nemo maxime? Iusto nam, culpa at voluptas ducimus facere doloremque, iste earum sit, id accusantium eaque recusandae. Veritatis, possimus assumenda, qui corrupti earum rem quibusdam nulla sequi nemo aliquid cupiditate itaque saepe corporis. Nulla molestiae dolore quis tempora quisquam? Asperiores, id dolores. Architecto, totam eligendi ducimus adipisci ipsa sapiente harum, expedita culpa, doloremque itaque dolores doloribus assumenda consequatur.'
    }, {
      name: 'HTML5 beginner',
      priceInCents: 1624,
      file: '98acd62d-0461-48ac-a98d-886d916e5f9f-html5.zip',
      image: '4c4bbdae-416a-4baf-b817-add7425c170e-html5.png',
      createdAt: new Date(Date.now() + 4 * 1000),
      description: 'A et repellat culpa eveniet eius velit, non illum rerum dolorum tempora magnam nihil earum deserunt excepturi eligendi at ratione dolor quas porro iusto labore unde voluptatum laboriosam maxime! Sed numquam recusandae error laudantium esse maxime nemo amet iusto quaerat! Nulla, ratione maiores ab eaque iure possimus. Repellendus dolores dolorum eligendi modi, ea adipisci necessitatibus quae! Voluptatibus vero doloribus iusto natus blanditiis, officia dolore eligendi minima porro a, nemo, earum corporis similique error tempore debitis eius! Numquam esse tenetur ipsa ullam labore.'
    }, {
      name: 'Vue beginner',
      priceInCents: 1356,
      file: '71ccf803-f29f-4b6b-90bf-3cf16527f0ca-vue.zip',
      image: '4f31c3c8-f4ed-4cb9-9b9e-17342ad686ad-vue.png',
      createdAt: new Date(Date.now() + 5 * 1000),
      description: 'Laboriosam maiores, quisquam numquam architecto illo debitis harum soluta corporis totam delectus similique et! Fuga sapiente adipisci deserunt, illum, natus quod ea distinctio eligendi laboriosam non vel? Repellat quod quisquam dicta error quo? Molestias adipisci et magni repellendus architecto nihil, ipsa doloremque. Itaque beatae eaque excepturi autem veritatis laboriosam nesciunt rerum veniam est amet aspernatur recusandae nulla, quibusdam porro voluptate ab, cum officiis, quisquam eum ipsum ipsa ullam ad laudantium molestiae? Cum fuga ducimus nostrum veritatis libero quo quos aspernatur reprehenderit nequ.'
    }, {
      name: 'Next beginner',
      priceInCents: 1456,
      file: '3840fea7-760e-4c8e-882b-14ddb5f8ad19-nextjs.zip',
      image: '0e697bc0-295a-44df-81b0-a3aa1b8ef968-nextjs.png',
      createdAt: new Date(Date.now() + 6 * 1000),
      description: 'Laudantium quia nisi labore possimus corrupti blanditiis ullam facilis. Numquam earum rem architecto repellat ullam nihil blanditiis autem perspiciatis veniam cumque quidem dolore repudiandae qui neque, molestias debitis magni sit nobis. Sapiente consequatur repellendus repellat quis, quidem sint nobis nemo eaque quos voluptas ea! Praesentium, facere culpa eaque sint, expedita vero in at ut totam, sapiente mollitia quas officia tenetur sequi cum! Corrupti hic impedit atque vero vel in quia placeat consectetur dolores incidunt. Dicta neque rem id. Vitae fugit veniam nobis.'
    }, {
      name: 'React beginner',
      priceInCents: 1432,
      file: '1cb1122f-7318-4a75-a18a-007edee39a52-react.zip',
      image: '3f277be0-3a3d-4bdf-9a58-91f09994b5f5-react.png',
      createdAt: new Date(Date.now() + 7 * 1000),
      description: 'Recusandae soluta earum aliquid vitae, assumenda quam praesentium excepturi tempora at molestias quasi adipisci, quisquam dolore unde nemo officiis doloribus quas omnis? Consequuntur optio deleniti eos dicta, similique tempore pariatur. Sequi, voluptatum? Eum, velit. Dolorum ipsa at quasi perspiciatis totam optio maxime eius iste, quam dolorem temporibus iure? Qui similique rem dolor nostrum corrupti, in voluptatum omnis molestias, dolorum doloremque, deserunt quo praesentium eum vitae ut non aliquid dolores mollitia sint cumque sapiente facilis. Nam possimus debitis, excepturi dolore quaerat perspiciatis consequatur.'
    }, {
      name: 'Python beginner',
      priceInCents: 1356,
      file: '14216e98-7626-4a29-b4b1-c4fc2ff83cfa-python.zip',
      image: 'a1cc9999-9bca-4555-a01e-053fc9c9e923-python.png',
      createdAt: new Date(Date.now() + 8 * 1000),
      description: 'Quibusdam officia et, voluptas ducimus, assumenda deserunt molestiae totam eveniet nisi nulla ratione esse debitis, nam voluptatem laudantium? Voluptate dignissimos, voluptatibus quae ipsam officiis laboriosam earum? Numquam provident adipisci hic dignissimos nostrum beatae quos amet quis aut quia et laborum dicta voluptate, earum perspiciatis maiores consequatur. Ab quibusdam dicta rerum. Similique mollitia, error tempore quia, voluptates esse nisi dolore saepe aliquid labore eveniet vel quisquam distinctio voluptas nihil autem ullam neque cumque. Qui sequi expedita molestias molestiae! Illo tempora earum adipisci eos.'
    }, {
      name: 'Java beginner',
      priceInCents: 1456,
      file: '3ce1c65f-1db3-4413-9053-b9d082c0ee3c-java.zip',
      image: 'a099745f-7e6d-41ad-9bdb-07a35165d89a-java.png',
      createdAt: new Date(Date.now() + 9 * 1000),
      description: 'Aut labore placeat exercitationem harum commodi, dignissimos possimus voluptatum laborum. Molestias magnam veniam consequuntur cupiditate porro at aliquam nobis odit minus esse inventore temporibus saepe tempore harum dolor cumque amet, expedita atque! Labore repellat quaerat temporibus sapiente sed quasi mollitia provident! Officiis ipsam ducimus cupiditate nam ea dicta amet quos ab laboriosam beatae labore, aliquam minus distinctio repellat illum. Corrupti obcaecati placeat ipsam itaque accusamus? In at ipsam sit maiores soluta eos consequatur, dicta totam enim magnam ea vel voluptate? Veniam, laborum. Perferendis, quia atque? Soluta aliquam maxime dolore accusamus officia enim.'
    }, {
      name: 'JavaScript beginner',
      priceInCents: 1524,
      file: 'a9d28553-37af-4d2e-99e8-7a95324a6dbf-javascript.zip',
      image: '3c82e862-adfe-49c5-9c73-dcbcddbfff1a-javascript.png',
      createdAt: new Date(Date.now() + 10 * 1000),
      description: 'Expedita, deleniti magni fugit delectus minus soluta ducimus ullam aut inventore eius dolorum molestiae repudiandae nostrum. Voluptate, eius quia beatae assumenda voluptas, obcaecati officiis dolorem velit ex ipsa dignissimos praesentium dolor quo cum. Distinctio vel id quasi deserunt alias architecto nihil voluptatibus tempora adipisci accusantium numquam est exercitationem praesentium tenetur laborum fugiat sed corrupti, non dolore velit odio minus! Sapiente dolor eligendi veritatis repudiandae reprehenderit. Necessitatibus alias beatae pariatur cupiditate ducimus adipisci in sapiente hic praesentium atque consequuntur harum eaque quibusdam aliquam, tempore dolores quos impedit quaerat. Rem voluptas magni repellat natus.'
    }, {
      name: 'TypeScript beginner',
      priceInCents: 1342,
      file: '3ecde91e-32df-4c37-9d1f-beeb02160615-typescript.zip',
      image: 'c83b61f3-9537-48ac-9ae9-5e589385d3f4-typescript.png',
      createdAt: new Date(Date.now() + 11 * 1000),
      description: 'Quae recusandae placeat fugiat! Deleniti earum explicabo blanditiis minima sit ducimus nesciunt, eaque quas error saepe, aperiam accusamus neque provident commodi, ipsum cupiditate vitae harum sunt. Ex facilis quam quibusdam autem asperiores dolorum quidem in cumque omnis rerum, laudantium tempora! Ducimus possimus alias dolores, non quos omnis commodi unde consequatur. Quasi, quaerat vel temporibus odit eius rerum magni tenetur ad unde dolor optio, neque labore possimus doloremque delectus dolore harum dolorum quod, accusamus pariatur illo ratione iste porro vitae! Quia unde debitis corporis ipsa voluptatem magnam, deleniti repellat ratione esse voluptatum minima.'
    }, {
      name: 'Node.js beginner',
      priceInCents: 2188,
      file: 'cb6258a8-21e8-4b8a-a499-434eccf58bf3-nodejs.zip',
      image: '0150e9b5-5fa9-4f34-8d88-ca8e233b3f97-nodejs.png',
      createdAt: new Date(Date.now() + 12 * 1000),
      description: 'Accusantium voluptatibus ipsam laboriosam quaerat beatae repellendus facilis, sunt quos itaque labore veniam iste unde nihil distinctio at? Fugiat quas provident ratione a numquam excepturi quod, harum distinctio voluptas! Voluptatem optio voluptates modi magni. Tempore dignissimos quisquam repellendus qui, nemo itaque quasi! Quas, minima tempore consectetur eum ratione quasi illo qui a doloremque temporibus nostrum neque error possimus fugiat nemo voluptatem aut doloribus excepturi necessitatibus provident ab, sit cum. Tenetur quam quidem eius consectetur mollitia! Obcaecati natus error voluptas reiciendis magnam doloribus nihil, adipisci illum, odio dolorum facere, debitis tempora quam sed.'
    }, {
      name: 'Angular beginner',
      priceInCents: 1646,
      file: 'be745fe4-e699-427f-b1e2-30ca30dc4aa9-angular.zip',
      image: '97fa8512-024c-40fd-91d9-9e9a4114691a-angular.png',
      createdAt: new Date(Date.now() + 13 * 1000),
      description: 'Expedita, deleniti magni fugit delectus minus soluta ducimus ullam aut inventore eius dolorum molestiae repudiandae nostrum. Voluptate, eius quia beatae assumenda voluptas, obcaecati officiis dolorem velit ex ipsa dignissimos praesentium dolor quo cum. Distinctio vel id quasi deserunt alias architecto nihil voluptatibus tempora adipisci accusantium numquam est exercitationem praesentium tenetur laborum fugiat sed corrupti, non dolore velit odio minus! Sapiente dolor eligendi veritatis repudiandae reprehenderit. Necessitatibus alias beatae pariatur cupiditate ducimus adipisci in sapiente hic praesentium atque consequuntur harum eaque quibusdam aliquam, tempore dolores quos impedit quaerat. Rem voluptas magni repellat natus.'
    }]
  })

  console.log(`Created products count: ${products.count}`)
  console.log('Seeding products finished.')
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

