import { faker } from '@faker-js/faker'

// Set a fixed seed for consistent data generation
faker.seed(67890)

export const employees = Array.from({ length: 500 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()



  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    employeename: faker.internet
      .username({ firstName, lastName })
      .toLocaleLowerCase(),
    title: faker.person.jobTitle().toLowerCase(),
    phone: faker.phone.number(), 
    status: faker.helpers.arrayElement([
      'active',
      'inactive',
      'invited',
      'suspended',
    ]),
    role: faker.helpers.arrayElement([
      'superadmin',
      'admin',
      'cashier',
      'manager',
    ]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
