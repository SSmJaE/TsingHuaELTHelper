# 开发指南

## 架构
  - main.ts是入口文件
  - 作为chrome扩展时
    - 通过inject.ts注入main.ts，以获取原生context访问权限(unsafeWindow)
    - main.ts通过bridge.ts与content.ts实现通信，content.ts转发跨域请求至background.ts
  - 插件
    - 考试、练习、时长都作为插件单独编写，尽量解耦，新增插件也应如此，每一个插件只服务于一项主要功能
    - 每一个插件都应符合以下规范
      - main.ts中放置主要逻辑
        - 需要暴露给外部的函数，通过index.ts转发
      - initial.ts中放置需要在app初始化时执行的函数，并在plugins文件夹下的initial.ts中统一注册
        - 只调用，实现最好放在main.ts中
      - setting.ts暴露所有插件相关的设置，并在index.ts中统一注册，最终呈现于设置面板
  - utils下
    - 实现了对网络请求的封装
      - request-base.ts
      - bridge.ts
      - proxy.ts
    - 所有请求
      - requests.ts
    - 创建容器的封装
      - container.ts
    - 通用工具
      - common.ts
    - 用户设置相关
      - settings.ts
  - views中
    - Panel.vue负责渲染悬浮窗
    - Setting.vue负责渲染控制面板
  - tests
    - 尚未开始

## 安装所有依赖
```
npm install
```

## 运行开发服务器，可以用来调整UI布局
```
npm run server
```

## 打包带source map的dev bundle，用于油猴
```
npm run dev
```

## 打包生产bundle，用于油猴
```
npm run build
```

## 打包生产bundle，用于chrome扩展
```
npm run crx
python zip.py
```

