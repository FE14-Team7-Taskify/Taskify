import { Invitation } from '../invitations/invitations.schema';

export type DashboardAPIComponent = {
  Dashboard: {
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    createdByMe: boolean;
    userId: number;
  };
};

type DashboardResponse = DashboardAPIComponent['Dashboard'];

export type CreateDashboardRequest = { title: string; color: string };

export type CreateDashboardResponse = DashboardResponse;

export type FindDashboardsRequest = {
  navigationMethod: 'infiniteScroll' | 'pagination';
  cursorId?: number;
  page?: number;
  size?: number;
};

export type FindDashboardsResponse =
  | {
      cursorId: number;
      totalCount: number;
      dashboards: Array<DashboardAPIComponent['Dashboard']>;
    }
  | { message: string };

export type GetDashboardResponse = DashboardResponse;

export type UpdateDashboardRequest = { dashboardId: number; title: string; color: string };

export type UpdateDashboardResponse = DashboardResponse;

export type CreateInvitationRequest = { dashboardId: number; email: string };

export type CreateInvitationResponse = Invitation | { message: string };

export type GetInvitationsRequest = { dashboardId: number; page?: number; size?: number };

export type GetInvitationsResponse =
  | { totalCount: number; invitations: Invitation[] }
  | { message: string };

export type DeleteInvitationRequest = { dashboardId: number; invitationId: number };
