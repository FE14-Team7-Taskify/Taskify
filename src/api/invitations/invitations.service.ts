import api from '@/lib/axios';
import {
  FindInvitationsRequest,
  FindInvitationsResponse,
  UpdateInvitationsRequest,
  UpdateInvitationsResponse,
} from './invitations.schema';

const PATH = '/invitations';

class InvitationsService {
  getInvitations(params: FindInvitationsRequest) {
    return api.get<FindInvitationsResponse>(PATH, { params });
  }
  updateInvitation({ invitationId, inviteAccepted }: UpdateInvitationsRequest) {
    return api.put<UpdateInvitationsResponse>(`${PATH}/${invitationId}`, { inviteAccepted });
  }
}

export const invitationsService = new InvitationsService();
