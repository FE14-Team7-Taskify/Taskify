export type ColumnType = {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateColumnRequest = { title: string; dashboardId: number };

export type CreateColumnResponse = ColumnType;

export type FindColumnsResponse = { result: 'SUCCESS'; data: ColumnType[] };

export type UpdateColumnRequest = { columnId: number; title: string };

export type UpdateColumnResponse = ColumnType;

export type UploadColumnImageRequest = { columnId: number; image: string };

export type UploadColumnImageResponse = { imageUrl: string };
