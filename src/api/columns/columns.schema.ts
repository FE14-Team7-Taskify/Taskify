export type Column = {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
};

export type ColumnResponse = Column | { message: string };

export type CreateColumnRequest = { title: string; dashboardId: number };

export type CreateColumnResponse = ColumnResponse;

export type FindColumnsResponse = { result: 'SUCCESS'; data: Column[] } | { message: string };

export type UpdateColumnRequest = { columnId: number; title: string };

export type UpdateColumnResponse = ColumnResponse;

export type UpdateColumnImageRequest = { columnId: number; image: string };

export type UpdateColumnImageResponse = { imageUrl: string };
