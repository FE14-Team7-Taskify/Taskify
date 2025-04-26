import api from '@/lib/axios';
import {
  CreateColumnRequest,
  CreateColumnResponse,
  FindColumnsResponse,
  UpdateColumnRequest,
  UpdateColumnResponse,
  UploadColumnImageRequest,
} from './columns.schema';

const PATH = '/columns';

class ColumnsService {
  createColumn(body: CreateColumnRequest) {
    return api.post<CreateColumnResponse>(PATH, body);
  }
  getColumns(dashboardId: number) {
    return api.get<FindColumnsResponse>(PATH, { params: { dashboardId } });
  }
  updateColumn({ columnId, ...body }: UpdateColumnRequest) {
    return api.put<UpdateColumnResponse>(`${PATH}/${columnId}`, body);
  }
  deleteColumn(columnId: number) {
    return api.delete(`${PATH}/${columnId}`);
  }
  uploadCardImage({ columnId, ...body }: UploadColumnImageRequest) {
    return api.post(`${PATH}/${columnId}/card-image`, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}

export const columnsService = new ColumnsService();
