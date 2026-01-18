import { faker } from '@faker-js/faker'
import { group } from 'node:console'

// Set a fixed seed for consistent data generation
faker.seed(67890)

export const studentAttendance = Array.from({ length: 500 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()


  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    groupName: `REG${faker.string.uuid()}`,
    studentname: faker.internet
      .username({ firstName, lastName })
      .toLocaleLowerCase(),
    checkIn: faker.date
     .between({ from: '2025-01-01T07:00:00', to: '2025-01-01T09:00:00' })
     .toTimeString()
     .slice(0, 5),

    checkOut: faker.date
     .between({ from: '2025-01-01T13:00:00', to: '2025-01-01T16:00:00' })
     .toTimeString()
     .slice(0, 5),
    absent: faker.date
     .between({ from: '2025-01-01T13:00:00', to: '2025-01-01T16:00:00' })
     .toTimeString()
     .slice(0, 5),
    status: faker.helpers.arrayElement([
      'pending',
      'checkIn',
      'checkOut',
      'absent',
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
