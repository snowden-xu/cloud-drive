/** 上传会话状态 */
export type UploadSessionStatus = 'pending' | 'uploading' | 'completed' | 'cancelled' | 'failed';

/** 上传分片状态 */
export type UploadPartStatus = 'pending' | 'uploaded' | 'failed';

/** 下载会话状态 */
export type DownloadSessionStatus =
  | 'pending'
  | 'downloading'
  | 'completed'
  | 'cancelled'
  | 'failed';

/** 上传初始化请求 */
export interface UploadInitRequest {
  filename: string;
  md5: string;
  size: number;
  parentId: number | null;
}

/** 上传初始化响应 */
export interface UploadInitResponse {
  /** 秒传命中时为 true */
  instantUpload: boolean;
  sessionId?: string;
  totalParts?: number;
  chunkSize?: number;
  /** 秒传命中时返回 */
  entryId?: number;
}

/** 上传完成响应 */
export interface UploadCompleteResponse {
  entryId: number;
  md5: string;
  size: number;
}

/** 下载初始化响应 */
export interface DownloadInitResponse {
  sessionId: string;
  filename: string;
  size: number;
  totalParts: number;
  chunkSize: number;
  md5: string;
}

/** 客户端本地上传任务状态 */
export type LocalTaskStatus =
  | 'pending'
  | 'uploading'
  | 'downloading'
  | 'paused'
  | 'completed'
  | 'failed';
