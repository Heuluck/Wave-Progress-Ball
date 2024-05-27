# 波浪进度球 Wave Progress Ball for React

![Deploy Status](https://github.com/Heuluck/Wave-Progress-Ball/actions/workflows/node.js.yml/badge.svg)

这是一个基于 React，使用`<canvas>`实现的波浪进度球组件。进度球可以自定义颜色、大小、进度等。自定义内容详见[自定义](#参数-props)。

## 新版本 New Version

[新版本 Wave-Progress-Ball](https://github.com/Heuluck/Wave-Progress-Ball-v2)使用`<svg>`实现，较此版本性能和图形优势更为明显，但是渐变效果却不如此版本平滑，Demo：[Github Pages 页面](https://heuluck.github.io/Wave-Progress-Ball-v2/)。

## 预览 Preview

[Github Pages 页面](https://heuluck.github.io/Wave-Progress-Ball/)

## 安装 Manual Install

暂时没有发布 npm 包，所以需要手动安装。

需要 npm、React 以及 TypeScript 环境。

`git clone`到本地后，复制`src/components/ball`文件夹到自己的项目的`components`中。

## 使用 Usage

### 基本用法

```jsx
const [value, setValue] = useState(50);
return <ProgressBall value={value} />;
```

### 自定义

#### 快速生成 Setting Generator

在[Github Pages 页面](https://heuluck.github.io/Wave-Progress-Ball/)或本地部署本仓库，在页面中配置好参数，在“导出设置”选项卡点击复制按钮即可。

#### 示例 Example

```tsx
export function ExampleBall() {
    const [value, setValue] = useState(50);
    const settings = {
        size: 350,
        magnifyAA: 2,
        initialRange: 50,
        lineWidth: 1,
        lineColor: "#bdc3c7",
        waveWidth: 0.018,
        waveHeight: 20,
        speed: 0.002,
        waveQuality: 3,
        bgWaveOffset: 0.7,
        isReverse: false,
        isReverseBg: false,
        isShowBg: true,
        waveColor: {
            start: "#43CF73",
            end: "#BCEC4F",
        },
        bgWaveColor: {
            start: "rgba(130, 221, 95,0.5)",
            end: "rgba(130, 221, 97,0.5)",
        },
        isGradient: true,
    };
    return (
        <>
            <ProgressBall value={value} {...settings} />
        </>
    );
}
```

#### 参数 Props

| 参数         | 说明                       | 类型                                                      | 默认值                                                           | 必填  |
| ------------ | -------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------- | ----- |
| value        | 当前进度                   | number                                                    | "-"                                                              | true  |
| size         | 球的大小                   | number                                                    | 350                                                              | false |
| magnifyAA    | 抗锯齿(简单放大实现)       | number                                                    | 2                                                                | false |
| initialRange | 初始加载时的进度           | number                                                    | 50                                                               | false |
| lineWidth    | 圆形的线宽                 | number                                                    | 1                                                                | false |
| lineColor    | 圆形的线颜色               | string                                                    | "#bdc3c7"                                                        | false |
| waveWidth    | 波浪的宽度                 | number                                                    | 0.018                                                            | false |
| waveHeight   | 波浪的高度                 | number                                                    | 20                                                               | false |
| speed        | 波浪的速度                 | number                                                    | 0.002                                                            | false |
| waveQuality  | 波浪的质量                 | number                                                    | 3                                                                | false |
| bgWaveOffset | 背景波浪偏移量             | number                                                    | 0.7                                                              | false |
| isReverse    | 前景波浪是否反向           | boolean                                                   | false                                                            | false |
| isReverseBg  | 背景波浪是否反向           | boolean                                                   | false                                                            | false |
| isShowBg     | 是否显示背景波浪           | boolean                                                   | true                                                             | false |
| isGradient   | 波浪颜色是否为渐变         | boolean                                                   | true                                                             | false |
| waveColor    | 前景波浪颜色（渐变或单色） | string &nbsp;&#124;&nbsp; { start: string; end: string; } | {start: "#43CF73",end: "#BCEC4F",}                               | false |
| bgWaveColor  | 背景波浪颜色（渐变或单色） | string &nbsp;&#124;&nbsp; { start: string; end: string; } | {start: "rgba(130, 221, 95,0.5)",end: "rgba(130, 221, 97,0.5)",} | false |
