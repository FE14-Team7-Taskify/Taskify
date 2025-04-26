import api from '@/lib/axios';
import {
  CreateDashboardRequest,
  CreateDashboardResponse,
  CreateInvitationRequest,
  CreateInvitationResponse,
  DeleteInvitationRequest,
  FindDashboardsRequest,
  FindDashboardsResponse,
  GetDashboardResponse,
  GetInvitationsRequest,
  GetInvitationsResponse,
  UpdateDashboardRequest,
  UpdateDashboardResponse,
} from './dashboards.schema';

const PATH = '/dashboards';

class DashboardsService {
  createDashboard(body: CreateDashboardRequest) {
    return api.post<CreateDashboardResponse>(PATH, body);
  }
  getDashboards(params: FindDashboardsRequest) {
    return api.get<FindDashboardsResponse>(PATH, { params });
  }
  getDashboardDetail(dashboardId: number) {
    return api.get<GetDashboardResponse>(`${PATH}/${dashboardId}`);
  }
  updateDashboard({ dashboardId, ...body }: UpdateDashboardRequest) {
    return api.put<UpdateDashboardResponse>(`${PATH}/${dashboardId}`, body);
  }
  deleteDashboard(dashboardId: number) {
    return api.delete(`${PATH}/${dashboardId}`);
  }
  createInvitation({ dashboardId, ...body }: CreateInvitationRequest) {
    return api.post<CreateInvitationResponse>(`${PATH}/${dashboardId}/invitations`, body);
  }
  getInvitations({ dashboardId, ...params }: GetInvitationsRequest) {
    return api.get<GetInvitationsResponse>(`${PATH}/${dashboardId}/invitations`, { params });
  }
  deleteInvitation({ dashboardId, invitationId }: DeleteInvitationRequest) {
    return api.delete(`${PATH}/${dashboardId}/invitations/${invitationId}`);
  }
}

export const dashboardsService = new DashboardsService();
