import { queryOptions } from '@tanstack/react-query';
import { userService } from './users.service';

const usersQueries = {
  all: ['users'],

  getMyInfoKey: () => [...usersQueries.all, 'getMyInfo'],
  myInfo: () =>
    queryOptions({
      queryKey: [...usersQueries.getMyInfoKey()],
      queryFn: () => userService.getMyInfo(),
    }),
};

export default usersQueries;
