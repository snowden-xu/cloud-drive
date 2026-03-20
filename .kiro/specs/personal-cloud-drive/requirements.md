# 需求文档

## 简介

个人网盘系统是一个类似百度网盘的客户端应用，为用户提供安全、高性能的文件存储与管理服务。系统支持海量文件的上传与下载、文件夹管理、文件预览、用户认证及权限管理等核心功能。系统以客户端形式交付，支持 Windows 和 macOS 平台，注重高性能和大规模文件处理能力。

## 术语表

- **Cloud_Drive_Client**: 个人网盘客户端应用程序，用户通过该客户端与云端存储服务交互
- **Auth_Service**: 认证服务，负责用户登录、令牌签发与验证
- **Upload_Engine**: 上传引擎，负责文件分片、断点续传及并发上传调度
- **Download_Engine**: 下载引擎，负责文件分片下载、断点续传及并发下载调度
- **File_Manager**: 文件管理器，负责文件夹的创建，以及文件与文件夹的删除、重命名、移动和查询操作
- **Preview_Service**: 预览服务，负责生成和展示文件预览内容
- **Permission_Service**: 权限服务，负责管理文件和文件夹的访问权限
- **File_Chunk**: 文件分片，将大文件拆分为固定大小的数据块用于传输
- **Access_Token**: 访问令牌，用户登录后由 Auth_Service 签发的身份凭证

## 需求

### 需求 1：用户注册

**用户故事：** 作为新用户，我希望能够注册账号，以便使用个人网盘服务。

#### 验收标准

1. WHEN 用户提交有效的用户名、密码和邮箱, THE Auth_Service SHALL 创建新账号并发送邮箱验证邮件
2. WHEN 用户提交的用户名已存在, THE Auth_Service SHALL 返回用户名已被占用的错误信息
3. WHEN 用户提交的密码不符合强度要求（少于 8 位或不包含字母和数字）, THE Auth_Service SHALL 拒绝注册并提示密码规则
4. WHEN 用户点击邮箱验证链接, THE Auth_Service SHALL 激活账号并允许登录
5. IF 用户未完成邮箱验证, THEN THE Auth_Service SHALL 拒绝该账号登录并提示验证邮箱

### 需求 2：用户登录与认证

**用户故事：** 作为用户，我希望能够安全地登录网盘客户端，以便访问我的个人文件。

#### 验收标准

1. WHEN 用户提交有效的用户名和密码, THE Auth_Service SHALL 验证凭据并签发 Access_Token
2. WHEN 用户提交无效的用户名或密码, THE Auth_Service SHALL 返回明确的认证失败错误信息
3. WHEN Access_Token 过期, THE Auth_Service SHALL 支持使用刷新令牌获取新的 Access_Token
4. IF 用户连续 5 次登录失败, THEN THE Auth_Service SHALL 锁定该账户 15 分钟
5. THE Cloud_Drive_Client SHALL 在本地安全存储 Access_Token，避免明文保存
6. WHEN 用户点击退出登录, THE Cloud_Drive_Client SHALL 清除本地存储的 Access_Token 和刷新令牌，并跳转到登录页面
7. WHEN 用户退出登录, THE Auth_Service SHALL 将当前 Access_Token 加入失效列表，防止被继续使用

### 需求 3：用户个人信息管理

**用户故事：** 作为用户，我希望能够管理我的个人账号信息，以便保持账号安全和个性化设置。

#### 验收标准

1. WHEN 用户提交当前密码和新密码, THE Auth_Service SHALL 验证当前密码正确后更新为新密码
2. WHEN 用户提交的新密码与当前密码相同, THE Auth_Service SHALL 拒绝修改并提示新密码不能与旧密码相同
3. WHEN 用户上传新头像, THE Cloud_Drive_Client SHALL 支持裁剪图片并保存为用户头像
4. WHEN 用户修改昵称, THE Auth_Service SHALL 更新用户昵称并在客户端界面实时刷新显示

### 需求 4：文件上传

**用户故事：** 作为用户，我希望能够上传文件到网盘，以便在云端安全存储我的数据。

#### 验收标准

1. WHEN 用户选择文件进行上传, THE Upload_Engine SHALL 将文件拆分为固定大小的 File_Chunk 进行传输
2. WHEN 上传过程中网络中断, THE Upload_Engine SHALL 记录已上传的 File_Chunk，在网络恢复后从断点继续上传
3. THE Upload_Engine SHALL 支持同时上传多个文件，并发数量可配置（默认 3 个）
4. WHEN 单个文件大小超过 5MB, THE Upload_Engine SHALL 自动启用分片上传模式
5. WHEN 所有 File_Chunk 上传完成, THE Upload_Engine SHALL 通知服务端合并分片并验证文件完整性（MD5 校验）
6. THE Upload_Engine SHALL 在上传过程中实时显示每个文件的上传进度百分比
7. WHEN 用户上传的文件与云端已有文件的 MD5 值相同, THE Upload_Engine SHALL 执行秒传操作，跳过实际数据传输
8. WHEN 用户将文件拖拽到客户端窗口, THE Cloud_Drive_Client SHALL 自动触发上传流程，将文件上传到当前浏览的目录
9. WHEN 用户通过点击上传按钮选择文件, THE Cloud_Drive_Client SHALL 允许用户选择目标上传路径，默认为当前浏览的目录
10. THE Upload_Engine SHALL 支持用户暂停、取消和重试上传任务
11. THE Cloud_Drive_Client SHALL 提供传输列表视图，集中展示所有上传和下载任务的状态与进度

### 需求 5：文件下载

**用户故事：** 作为用户，我希望能够高效地从网盘下载文件，以便在本地使用。

#### 验收标准

1. WHEN 用户选择文件进行下载, THE Download_Engine SHALL 支持多线程分片下载以提升下载速度
2. WHEN 下载过程中网络中断, THE Download_Engine SHALL 记录已下载的分片，在网络恢复后从断点继续下载
3. THE Download_Engine SHALL 支持同时下载多个文件，并发数量可配置（默认 3 个）
4. THE Download_Engine SHALL 在下载过程中实时显示每个文件的下载进度百分比和预估剩余时间
5. WHEN 下载完成, THE Download_Engine SHALL 验证文件完整性（MD5 校验），确保下载文件与云端文件一致
6. WHEN 用户选择下载整个文件夹, THE Download_Engine SHALL 将文件夹内所有文件打包为 ZIP 格式后下载，并保持原始目录结构
7. THE Download_Engine SHALL 支持用户暂停、取消和重试下载任务
8. THE Cloud_Drive_Client SHALL 支持设置默认下载路径，用户可在设置中修改，默认为系统下载目录

### 需求 6：文件夹管理

**用户故事：** 作为用户，我希望能够创建和管理文件夹，以便有序地组织我的文件。

#### 验收标准

1. WHEN 用户指定文件夹名称和路径, THE File_Manager SHALL 在指定路径下创建新文件夹
2. WHEN 用户重命名文件或文件夹, THE File_Manager SHALL 更新名称并保持文件内容和子目录结构不变
3. WHEN 用户删除文件或文件夹, THE File_Manager SHALL 将其移入回收站而非直接删除
4. WHEN 用户移动文件或文件夹到新路径, THE File_Manager SHALL 更新文件路径并保持文件内容完整
5. THE File_Manager SHALL 支持按名称、大小、修改时间和文件类型对文件列表进行排序
6. THE File_Manager SHALL 支持查看文件或文件夹的详细信息，包括文件名、大小、类型、上传时间、修改时间和 MD5 值
7. WHEN 用户在文件夹名称中使用非法字符（如 / \ : \* ? " < > |）, THE File_Manager SHALL 拒绝操作并提示合法的命名规则
8. IF 目标路径已存在同名文件夹, THEN THE File_Manager SHALL 提示用户选择重命名、合并或取消操作
9. WHEN 用户复制文件或文件夹到目标路径, THE File_Manager SHALL 在目标路径创建副本并保持原文件内容不变

### 需求 7：回收站管理

**用户故事：** 作为用户，我希望能够管理回收站中的文件，以便恢复误删文件或彻底清理空间。

#### 验收标准

1. THE File_Manager SHALL 提供回收站视图，展示所有已删除的文件和文件夹及其原始路径和删除时间
2. WHEN 用户选择回收站中的文件并执行还原, THE File_Manager SHALL 将文件恢复到原始路径
3. IF 原始路径已不存在, THEN THE File_Manager SHALL 提示用户选择新的还原路径
4. WHEN 用户选择彻底删除回收站中的文件, THE File_Manager SHALL 永久删除该文件并释放存储空间
5. WHEN 用户执行清空回收站操作, THE File_Manager SHALL 永久删除回收站中所有文件
6. THE File_Manager SHALL 自动清理回收站中超过 30 天的文件，并在清理前 7 天通过客户端提示用户

### 需求 8：权限管理

**用户故事：** 作为用户，我希望能够控制文件和文件夹的访问权限，以便保护我的隐私数据。

#### 验收标准

1. THE Permission_Service SHALL 支持为文件和文件夹设置三种访问级别：私有、指定用户可见、公开
2. WHEN 用户将文件设置为"指定用户可见", THE Permission_Service SHALL 允许用户选择可访问的用户列表
3. WHEN 用户生成文件分享链接, THE Permission_Service SHALL 支持设置链接有效期（1天、7天、30天或永久）
4. WHEN 用户生成文件分享链接, THE Permission_Service SHALL 支持设置提取码保护
5. IF 未授权用户尝试访问受保护的文件, THEN THE Permission_Service SHALL 拒绝访问并返回权限不足的错误信息
6. WHEN 文件夹权限变更, THE Permission_Service SHALL 将权限变更递归应用到文件夹内所有子文件和子文件夹
7. WHEN 用户查看已分享的文件, THE Permission_Service SHALL 展示分享链接的访问次数和最近访问记录
8. WHEN 用户取消分享链接, THE Permission_Service SHALL 立即使该链接失效，后续访问该链接的用户将收到链接已失效的提示

### 需求 9：文件预览

**用户故事：** 作为用户，我希望能够在线预览文件内容，以便无需下载即可查看文件。

#### 验收标准

1. THE Preview_Service SHALL 支持预览以下格式的文件：图片（JPG、PNG、GIF、BMP、WebP）、文档（PDF、TXT、Markdown）、视频（MP4、AVI、MKV）、音频（MP3、WAV、FLAC）
2. WHEN 用户请求预览图片文件, THE Preview_Service SHALL 在 2 秒内加载并显示图片缩略图
3. WHEN 用户请求预览视频文件, THE Preview_Service SHALL 提供流式播放功能，支持拖动进度条
4. WHEN 用户请求预览文档文件, THE Preview_Service SHALL 渲染文档内容并支持翻页浏览
5. IF 文件格式不在支持的预览列表中, THEN THE Preview_Service SHALL 显示文件基本信息（文件名、大小、类型、修改时间）并提供下载按钮
6. WHEN 预览大于 100MB 的视频文件, THE Preview_Service SHALL 采用分段加载策略避免内存溢出

### 需求 10：存储空间管理

**用户故事：** 作为用户，我希望能够了解和管理我的存储空间使用情况，以便合理规划文件存储。

#### 验收标准

1. THE Cloud_Drive_Client SHALL 在界面上实时显示用户已用空间和总配额
2. WHEN 用户已用空间超过总配额的 90%, THE Cloud_Drive_Client SHALL 显示存储空间不足的警告提示
3. WHEN 用户已用空间达到总配额上限, THE Upload_Engine SHALL 拒绝新的上传请求并提示用户清理空间
4. THE Cloud_Drive_Client SHALL 展示各文件类型（图片、视频、文档、其他）的空间占用分布

### 需求 11：文件搜索

**用户故事：** 作为用户，我希望能够快速搜索文件，以便在大量文件中定位目标文件。

#### 验收标准

1. WHEN 用户输入关键词进行搜索, THE File_Manager SHALL 支持在全盘范围内按文件名进行模糊匹配搜索
2. THE File_Manager SHALL 支持按文件类型、文件大小范围、修改时间范围对搜索结果进行筛选
3. WHEN 用户在特定文件夹内搜索, THE File_Manager SHALL 支持限定搜索范围为当前目录及其子目录
4. THE File_Manager SHALL 在搜索结果中显示文件所在路径，方便用户定位文件位置
5. WHEN 搜索结果超过 100 条, THE File_Manager SHALL 采用分页展示并显示结果总数

### 需求 12：海量文件处理与高性能

**用户故事：** 作为用户，我希望网盘在处理大量文件时依然保持流畅，以便高效管理我的数据。

#### 验收标准

1. WHEN 文件夹包含超过 10000 个文件, THE File_Manager SHALL 采用分页加载策略，每页加载 100 条记录
2. THE Cloud_Drive_Client SHALL 对文件列表数据进行本地缓存，减少重复请求
3. WHEN 用户搜索文件, THE File_Manager SHALL 在 1 秒内返回搜索结果（基于文件名模糊匹配）
4. THE Upload_Engine SHALL 支持上传单个大小不超过 20GB 的文件
5. THE Cloud_Drive_Client SHALL 支持管理总量不少于 100 万个文件的存储空间
6. WHEN 用户批量操作（移动、删除、复制）超过 1000 个文件, THE File_Manager SHALL 采用异步任务队列处理并实时显示操作进度
