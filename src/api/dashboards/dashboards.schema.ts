import { InvitationType } from '../invitations/invitations.schema';

export type DashboardType = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};

export type CreateDashboardRequest = { title: string; color: string };

export type CreateDashboardResponse = DashboardType;

export type FindDashboardsRequest = {
  navigationMethod: 'infiniteScroll' | 'pagination';
  cursorId?: number;
  page?: number;
  size?: number;
};

export type FindDashboardsResponse = {
  cursorId: number;
  totalCount: number;
  dashboards: DashboardType[];
};

export type GetDashboardResponse = DashboardType;

export type UpdateDashboardRequest = { dashboardId: number; title: string; color: string };

export type UpdateDashboardResponse = DashboardType;

export type CreateInvitationRequest = { dashboardId: number; email: string };

export type CreateInvitationResponse = InvitationType;

export type GetInvitationsRequest = { dashboardId: number; page?: number; size?: number };

export type GetInvitationsResponse = { totalCount: number; invitations: InvitationType[] };

export type DeleteInvitationRequest = { dashboardId: number; invitationId: number };
