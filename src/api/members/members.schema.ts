export type MemberType = {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
};

export type FindMembersRequest = {
  page?: number;
  size?: number;
  dashboardId: number;
};

export type FindMembersResponse = { members: MemberType[]; totalCount: number };
