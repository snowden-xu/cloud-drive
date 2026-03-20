/** 用户基本信息 */
export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

/** 用户个人资料 */
export interface UserProfile {
  userId: number;
  nickname: string;
  avatarUrl: string | null;
}

/** 用户配额 */
export interface UserQuota {
  userId: number;
  totalBytes: number;
  usedBytes: number;
}

/** 存储空间分布 */
export interface StorageDistribution {
  images: number;
  videos: number;
  documents: number;
  others: number;
}
