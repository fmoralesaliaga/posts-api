const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Delete existing records
  await prisma.post.deleteMany({});
  
  // Create sample posts
  const posts = [
    {
      name: 'Getting Started with Node.js',
      description: 'Learn the basics of Node.js and how to build your first server.'
    },
    {
      name: 'RESTful API Design Principles',
      description: 'Best practices for designing RESTful APIs that are scalable, maintainable, and easy to use.'
    },
    {
      name: 'Using Prisma with PostgreSQL',
      description: 'A comprehensive guide on setting up and using Prisma ORM with PostgreSQL database.'
    },
    {
      name: 'Error Handling in Express',
      description: 'Strategies for handling errors in Express applications to improve reliability and user experience.'
    },
    {
      name: 'Implementing Authentication',
      description: 'How to implement secure authentication in your web applications using JWT and bcrypt.'
    }
  ];
  
  for (const post of posts) {
    await prisma.post.create({
      data: post
    });
  }
  
  console.log('Database has been seeded!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
