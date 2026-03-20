# Personal Cloud Drive（个人网盘系统）

基于 Electron + NestJS 的个人网盘系统，支持大文件分片上传/下载、文件预览、回收站等功能。

## 技术栈

- 客户端：Electron + React 19 + TypeScript + Ant Design
- 服务端：NestJS + Prisma + PostgreSQL
- 存储：MinIO（S3 兼容）
- 缓存/队列：Redis + BullMQ
- 构建：pnpm workspace monorepo

## 项目结构

```
packages/
├── client/    # Electron 桌面客户端
├── server/    # NestJS 后端服务
└── shared/    # 共享类型与常量
```

## 环境要求

- Node.js >= 22（见 .nvmrc）
- pnpm >= 8
- Docker & Docker Compose

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动基础设施（PostgreSQL、Redis、MinIO）

```bash
pnpm infra:up
```

服务端口：

- PostgreSQL：5432
- Redis：6379
- MinIO API：9000 / 控制台：9001

### 3. 初始化数据库

```bash
pnpm --filter @cloud-drive/server prisma:migrate
```

### 4. 构建共享包

```bash
pnpm build:shared
```

### 5. 启动开发环境

```bash
# 启动服务端（热重载）
pnpm dev:server

# 启动客户端
pnpm dev:client
```

## 常用命令

| 命令                | 说明                   |
| ------------------- | ---------------------- |
| `pnpm dev:client`   | 启动 Electron 客户端   |
| `pnpm dev:server`   | 启动 NestJS 开发服务器 |
| `pnpm build:client` | 打包客户端             |
| `pnpm build:server` | 构建服务端             |
| `pnpm build:shared` | 构建共享包             |
| `pnpm test`         | 运行测试               |
| `pnpm lint`         | ESLint 检查            |
| `pnpm format`       | Prettier 格式化        |
| `pnpm infra:up`     | 启动 Docker 基础设施   |
| `pnpm infra:down`   | 停止 Docker 基础设施   |

## 服务端环境变量

参考 `packages/server/.env`：

| 变量               | 说明                         | 默认值                                                       |
| ------------------ | ---------------------------- | ------------------------------------------------------------ |
| `DATABASE_URL`     | PostgreSQL 连接串            | `postgresql://clouduser:cloudpass@localhost:5432/clouddrive` |
| `REDIS_HOST`       | Redis 地址                   | `localhost`                                                  |
| `REDIS_PORT`       | Redis 端口                   | `6379`                                                       |
| `JWT_SECRET`       | JWT 密钥（生产环境务必修改） | `dev-jwt-secret-change-in-production`                        |
| `MINIO_ENDPOINT`   | MinIO 地址                   | `localhost`                                                  |
| `MINIO_PORT`       | MinIO 端口                   | `9000`                                                       |
| `MINIO_ACCESS_KEY` | MinIO 访问密钥               | `minioadmin`                                                 |
| `MINIO_SECRET_KEY` | MinIO 秘密密钥               | `minioadmin`                                                 |
| `MINIO_BUCKET`     | MinIO 存储桶                 | `cloud-drive`                                                |
| `PORT`             | 服务端口                     | `3000`                                                       |

## License

Private
