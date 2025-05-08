import api from '@/lib/axios';
import { FindMembersRequest, FindMembersResponse } from './members.schema';

const PATH = '/members';

class MembersService {
  getDashboardMembers(params: FindMembersRequest) {
    return api.get<FindMembersResponse>(PATH, { params });
  }
  deleteMember(memberId: number) {
    return api.delete(`${PATH}/${memberId}`);
  }
}

export const membersService = new MembersService();
