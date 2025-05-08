export type InvitationType = {
  id: number;
  inviter: { nickname: string; email: string; id: number };
  teamId: string;
  dashboard: { title: string; id: number };
  invitee: { nickname: string; email: string; id: number };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FindInvitationsRequest = { size?: number; cursorId?: number; title?: string };

export type FindInvitationsResponse = { cursorId: number; invitations: InvitationType[] };

export type UpdateInvitationsRequest = { invitationId: number; inviteAccepted: boolean };

export type UpdateInvitationsResponse = InvitationType;
