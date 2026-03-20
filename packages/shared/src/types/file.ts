/** 文件条目类型 */
export type EntryType = 'file' | 'folder';

/** 文件/文件夹条目 */
export interface FileEntry {
  id: number;
  userId: number;
  parentId: number | null;
  name: string;
  type: EntryType;
  /** 仅文件有 */
  size?: number;
  /** 仅文件有 */
  md5?: string;
  /** 仅文件夹有 */
  depth?: number;
  createdAt: string;
  updatedAt: string;
}

/** 文件详情（含存储信息） */
export interface FileDetail extends FileEntry {
  storageKey?: string;
  mimeType?: string;
}

/** 文件列表排序字段 */
export type SortField = 'name' | 'size' | 'updatedAt' | 'type';

/** 排序方向 */
export type SortOrder = 'asc' | 'desc';

/** 文件列表查询参数 */
export interface FileListQuery {
  parentId: number | null;
  page: number;
  pageSize: number;
  sortField?: SortField;
  sortOrder?: SortOrder;
}

/** 搜索查询参数 */
export interface SearchQuery {
  keyword: string;
  cursor?: string;
  pageSize?: number;
  parentId?: number | null;
  fileType?: string;
  minSize?: number;
  maxSize?: number;
}
