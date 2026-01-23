# MCSM 服务端部署指南

## 1.1 新建实例 (仅管理员)
> **注意**：非管理员用户请跳过此步，直接查收已分配的实例。 [1.2环境配置 (Docker)](http://localhost:63342/SDUcraft-docs/index.html#/./docs/server_arch/env_cfg/mcsm/mcsm?id=_12-%e7%8e%af%e5%a2%83%e9%85%8d%e7%bd%ae-docker)

1.  在【实例管理】中新建一个默认的 Minecraft 服务端实例。
    ![img.png](image/img.png)
    ![img_6.png](image/img_6.png)

2.  **选择部署节点**：建议优先选择 **青岛** 节点。
    ![img_1.png](image/img_1.png)

3.  **配置虚拟化**：此处**暂不勾选** Docker（为了后续能够选择特定的本地镜像）。
    ![img_2.png](image/img_2.png)

4.  **分配权限**：创建完成后，在【用户管理】界面将该实例分配给对应用户。
    ![img_3.png](image/img_3.png)

## 1.2 环境配置 (Docker)
点击进入实例控制台。

1.  前往 **功能组 -> 应用实例设置**。
2.  启用 **Docker** 开关，并选择对应 Java 版本的镜像（如需使用 MCDR，请务必选择 MCDR 专用镜像）。
    > **注意**：受网络环境限制，面板无法直接从 Docker Hub 拉取新镜像。如需使用列表之外的镜像，请联系管理员手动下载。
    ![img_7.png](image/img_7.png)

## 1.3 MCDR 初始化 (可选)
> 若不使用 MCDR 插件加载器，请跳过此步。

启动一次实例，MCDR 将会自动运行并初始化必要的配置文件和目录结构。
![img_8.png](image/img_8.png)

## 1.4 文件部署与端口配置
1.  **上传服务端**：
    *   在【文件管理】中上传并解压服务端文件。
    *   **MCDR 用户注意**：请将服务端核心及相关文件放置在根目录下的 `server` 文件夹内。

2.  **配置端口**：
    *   请联系管理员申请一个**空闲端口**。
    *   修改 `server.properties` 文件，将 `server-port` 设置为申请到的端口号。
        ![img_9.png](image/img_9.png)

3.  **开放端口**：
    *   在 **应用实例设置** 中，添加并开放上述端口。
        ![img_11.png](image/img_11.png)
        ![img_13.png](image/img_13.png)

4.  **端口转发 **：
    *   如果实例部署在青岛 PVE 节点，还需配置网络转发，请联系管理员 [PVE 网络转发配置教程]()。

## 1.5 启动命令配置
### 1.5.1 使用 MCDR
修改根目录下的 `config.yml` 配置启动命令，或直接指定启动脚本路径。

> **警告**：镜像环境为 Linux 系统，**不支持** `.bat` 批处理脚本，请使用 `.sh` (Bash) 脚本。

![img_15.png](image/img_15.png)

**参考启动脚本 (`start.sh`)：**
更多参数调优请参考：[服务端调优指南](https://docs.liuliyue.cn/games/mcje/introduction/server-jvm-optimization.html)

```bash
#!/bin/bash

# 内存设置
MEMORY="6G"

# JVM 优化参数
JAVA_ARGS="-server \
  -Xms${MEMORY} -Xmx${MEMORY} \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=130 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch \
  -XX:G1NewSizePercent=30 \
  -XX:G1MaxNewSizePercent=40 \
  -XX:G1HeapRegionSize=8M \
  -XX:G1ReservePercent=20 \
  -XX:G1HeapWastePercent=5 \
  -XX:InitiatingHeapOccupancyPercent=15 \
  -XX:SurvivorRatio=32 \
  -XX:MaxTenuringThreshold=1 \
  -XX:+UseStringDeduplication \
  -Dfabric.development=false \
  -Dfile.encoding=UTF-8"

# 启动命令 (请根据实际文件名修改 jar 包名称)
java ${JAVA_ARGS} -jar ./fabric-server-mc.1.21.1-loader.0.18.4-launcher.1.1.1.jar nogui
```

### 1.5.2 不使用 MCDR
直接在 **应用实例设置** 的“启动命令”输入框中填写启动命令。
![img_16.png](image/img_16.png)
