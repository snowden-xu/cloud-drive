/** 统一 API 成功响应 */
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

/** 分页响应 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/** 游标分页响应 */
export interface CursorPaginatedResponse<T> {
  items: T[];
  nextCursor: string | null;
  total: number;
}

/** 认证 Token 对 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/** 登录请求 */
export interface LoginRequest {
  username: string;
  password: string;
}

/** 注册请求 */
export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

/** 异步任务状态 */
export type AsyncTaskStatus = 'pending' | 'processing' | 'completed' | 'failed';

/** 异步任务信息 */
export interface AsyncTaskInfo {
  taskId: string;
  taskType: string;
  status: AsyncTaskStatus;
  totalItems: number;
  processedItems: number;
  createdAt: string;
}
