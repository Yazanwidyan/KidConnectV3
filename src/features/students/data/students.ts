import { faker } from '@faker-js/faker'

// Set a fixed seed for consistent data generation
faker.seed(67890)

export const students = Array.from({ length: 500 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  // Generate parent names for emails
  const parent1FirstName = faker.person.firstName()
  const parent2FirstName = faker.person.firstName()

  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    studentname: faker.internet
      .username({ firstName, lastName })
      .toLocaleLowerCase(),
    parent1: faker.internet.username({ firstName: parent1FirstName }).toLocaleLowerCase(),
    parent2: faker.internet.username({ firstName: parent2FirstName }).toLocaleLowerCase(),
    age: faker.number.int({ min: 6, max: 18 }),
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
