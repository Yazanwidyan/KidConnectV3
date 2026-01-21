import { faker } from '@faker-js/faker'

// Set a fixed seed for consistent data generation
faker.seed(67890)


export const groups = Array.from({ length: 5 }, () => {
  const name = faker.person.firstName() + " Group"

  return {
    id: faker.string.uuid(),
    name,
    totalStudents: faker.number.int({ min: 5, max: 20 }),
    groupType: faker.helpers.arrayElement(['infants', 'toddlers', 'preschool']),
    maxStudents: faker.number.int({ min: 5, max: 20 }),
    minAge: faker.number.int({ min: 0, max: 3 }),
    maxAge: faker.number.int({ min: 4, max: 7 }),
    staffIds: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
      faker.string.uuid()
    ),
    status: faker.helpers.arrayElement(['active', 'inactive']),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
