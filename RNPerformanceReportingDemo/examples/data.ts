import {faker} from '@faker-js/faker';

export interface User {
  userId: string;
  username: string;
  email: string;
  password: string;
  color: string;
}

export function createRandomUser(): User {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    color: faker.color.human(),
  };
}

export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
  count: 1000,
});
