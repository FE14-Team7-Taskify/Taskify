export type Column = {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
};

type ColumnResponse = Column | { message: string };

export type CreateColumnRequest = { title: string; dashboardId: number };

export type CreateColumnResponse = ColumnResponse;

export type FindColumnsResponse = { result: 'SUCCESS'; data: Column[] } | { message: string };

export type UpdateColumnRequest = { columnId: number; title: string };

export type UpdateColumnResponse = ColumnResponse;

export type UploadColumnImageRequest = { columnId: number; image: string };

export type UploadColumnImageResponse = { imageUrl: string };
