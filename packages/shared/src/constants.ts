// ─── 传输相关 ───
/** 分片大小：5MB */
export const CHUNK_SIZE = 5 * 1024 * 1024;
/** 单文件最大大小：20GB */
export const MAX_FILE_SIZE = 20 * 1024 * 1024 * 1024;
/** 并发上传数 */
export const CONCURRENT_UPLOAD_LIMIT = 3;
/** 并发下载数 */
export const CONCURRENT_DOWNLOAD_LIMIT = 3;

// ─── 文件系统相关 ───
/** 文件夹最大嵌套深度 */
export const MAX_FOLDER_DEPTH = 20;
/** 文件列表每页条数 */
export const PAGE_SIZE_FILES = 100;
/** 搜索结果每页条数 */
export const PAGE_SIZE_SEARCH = 200;
/** 文件名非法字符正则 */
export const ILLEGAL_NAME_CHARS = /[/\\:*?"<>|]/;

// ─── 认证相关 ───
/** Access Token 有效期（秒）：2 小时 */
export const ACCESS_TOKEN_EXPIRY = 2 * 60 * 60;
/** Refresh Token 有效期（秒）：30 天 */
export const REFRESH_TOKEN_EXPIRY = 30 * 24 * 60 * 60;
/** 最大连续登录失败次数 */
export const MAX_LOGIN_ATTEMPTS = 5;
/** 账户锁定时长（秒）：15 分钟 */
export const ACCOUNT_LOCK_DURATION = 15 * 60;
/** 密码最小长度 */
export const PASSWORD_MIN_LENGTH = 8;

// ─── 配额相关 ───
/** 默认用户配额：10GB */
export const DEFAULT_QUOTA_BYTES = 10 * 1024 * 1024 * 1024;
/** 配额告警阈值：90% */
export const QUOTA_WARNING_THRESHOLD = 0.9;

// ─── 回收站 ───
/** 回收站自动清理天数 */
export const TRASH_AUTO_CLEAN_DAYS = 30;
/** 回收站清理提前提醒天数 */
export const TRASH_WARN_BEFORE_DAYS = 7;

// ─── 网络与重试 ───
/** 请求超时（毫秒） */
export const REQUEST_TIMEOUT_MS = 30_000;
/** 最大重试次数 */
export const MAX_RETRY_COUNT = 3;

// ─── 预览 ───
/** 预览文件大小上限：50MB */
export const PREVIEW_MAX_SIZE = 50 * 1024 * 1024;

// ─── 批量操作 ───
/** 触发异步任务队列的文件数阈值 */
export const ASYNC_TASK_THRESHOLD = 1000;

// ─── 缓存 ───
/** 客户端 LRU 缓存上限：100MB */
export const CLIENT_CACHE_MAX_BYTES = 100 * 1024 * 1024;
/** 已完成任务保留天数 */
export const COMPLETED_TASK_RETENTION_DAYS = 30;
