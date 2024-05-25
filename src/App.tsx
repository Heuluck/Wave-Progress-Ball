import { useEffect, useRef, useState } from "react";
import { BallSettingIS } from "./components/ball";
import { ProgressBall } from "./components/ball/ball";
import { Button, Card, Collapse, ColorPicker, Flex, Form, InputNumber, Slider, Space, Switch } from "antd";
import autoAnimate from "@formkit/auto-animate";
import "./App.css";

interface gradient {
    start: string;
    end: string;
}

function App() {
    const [activeTabKey, setActiveTabKey] = useState<string>("common");
    const [value, setValue] = useState(50);
    const [size, setSize] = useState<number>(350);
    const [magnifyAA, setMagnifyAA] = useState<number>(2);
    const [initialRange, setInitialRange] = useState<number>(50);
    const [lineWidth, setLineWidth] = useState<number>(1);
    const [lineColor, setLineColor] = useState<string>("#bdc3c7");
    const [waveWidth, setWaveWidth] = useState<number>(0.018);
    const [waveHeight, setWaveHeight] = useState<number>(20);
    const [speed, setSpeed] = useState<number>(0.002);
    const [waveQuality, setWaveQuality] = useState<number>(3);
    const [bgWaveOffset, setBgWaveOffset] = useState<number>(0.7);
    const [isReverse, setIsReverse] = useState<boolean>(false);
    const [isReverseBg, setIsReverseBg] = useState<boolean>(false);
    const [isShowBg, setIsShowBg] = useState<boolean>(true);
    const [waveColor, setWaveColor] = useState<string | gradient>({
        start: "#43CF73",
        end: "#BCEC4F",
    });
    const [bgWaveColor, setBgWaveColor] = useState<string | gradient>({
        start: "rgba(130, 221, 95,0.5)",
        end: "rgba(130, 221, 97,0.5)",
    });
    const [isGradient, setIsGradient] = useState<boolean>(true);
    const parent = useRef(null);
    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);
    const setting: BallSettingIS = {
        size,
        magnifyAA,
        initialRange,
        lineWidth,
        lineColor,
        waveWidth,
        waveHeight,
        speed,
        waveQuality,
        bgWaveOffset,
        isReverse,
        isReverseBg,
        isShowBg,
        waveColor,
        bgWaveColor,
        isGradient,
    };
    const tabList = [
        {
            key: "common",
            tab: "基础设置",
        },
        {
            key: "outfit",
            tab: "显示设置",
        },
        {
            key: "wave",
            tab: "波浪设置",
        },
        {
            key: "others",
            tab: "其他设置",
        },
        {
            key: "output",
            tab: "导出设置",
        },
    ];

    const contentList: Record<string, React.ReactNode> = {
        common: (
            <>
                <Form.Item label="液面高度">
                    <Slider key="height" defaultValue={value} onChange={setValue} min={0} max={100} step={1} />
                </Form.Item>
                <Form.Item label="流动速度">
                    <Slider
                        key="speed"
                        value={speed}
                        onChange={(e) => {
                            setSpeed(e);
                        }}
                        min={0}
                        max={0.02}
                        step={0.001}
                    />
                    <InputNumber
                        size="small"
                        changeOnWheel
                        min={0}
                        step={0.001}
                        max={10}
                        value={speed}
                        onChange={(e) => {
                            e != null && setSpeed(e);
                        }}
                    />
                </Form.Item>
            </>
        ),
        outfit: (
            <>
                <Form.Item label="球体大小">
                    <Slider key="size" defaultValue={size} onChangeComplete={setSize} min={70} max={1000} step={1} />
                </Form.Item>
                <Form.Item label="抗锯齿">
                    <Slider
                        key="maa"
                        defaultValue={magnifyAA}
                        onChangeComplete={setMagnifyAA}
                        min={1}
                        max={10}
                        step={1}
                    />
                </Form.Item>
                <Flex gap="middle" justify="center" wrap>
                    <Card style={{ marginTop: 16, width: "20vw" }} type="inner" title="圆形外壳">
                        <Form.Item label="外壳颜色">
                            <ColorPicker
                                defaultValue={lineColor}
                                onChange={(color) => {
                                    setLineColor(color.toRgbString());
                                }}
                                showText
                                format="hex"
                            />
                        </Form.Item>
                        <Form.Item label="外壳粗细">
                            <Slider
                                key="lineWidth"
                                defaultValue={lineWidth}
                                onChange={(e) => {
                                    setLineWidth(e);
                                }}
                                min={1}
                                max={10}
                                step={1}
                            />
                        </Form.Item>
                    </Card>
                    <Card style={{ marginTop: 16, width: "20vw" }} type="inner" title="波浪">
                        <Form.Item label="波浪品质">
                            <Slider
                                key="maa"
                                defaultValue={waveQuality}
                                onChange={setWaveQuality}
                                min={1}
                                max={15}
                                step={1}
                            />
                        </Form.Item>
                        <Form.Item label="渐变切换">
                            <Switch
                                checkedChildren="渐变"
                                unCheckedChildren="单色"
                                defaultChecked={isGradient}
                                onChange={(checked) => {
                                    if (checked) {
                                        setWaveColor({
                                            start: "#43CF73",
                                            end: "#BCEC4F",
                                        });
                                        setBgWaveColor({
                                            start: "rgba(130, 221, 95,0.5)",
                                            end: "rgba(130, 221, 97,0.5)",
                                        });
                                        setIsGradient(checked);
                                    } else {
                                        setWaveColor("#69d569");
                                        setBgWaveColor("rgba(158, 226, 89,.5)");
                                        setIsGradient(checked);
                                    }
                                }}
                            />
                        </Form.Item>
                        {isGradient ? (
                            <>
                                <Form.Item label="前景波浪颜色">
                                    <Space direction="vertical">
                                        <ColorPicker
                                            key={1}
                                            defaultValue={(waveColor as gradient).start}
                                            onChange={(color) => {
                                                setWaveColor((current) => {
                                                    return {
                                                        start: color.toRgbString(),
                                                        end: (current as gradient).end,
                                                    };
                                                });
                                            }}
                                            showText
                                            format="rgb"
                                        />
                                        <ColorPicker
                                            key={2}
                                            defaultValue={(waveColor as gradient).end}
                                            onChange={(color) => {
                                                setWaveColor((current) => {
                                                    return {
                                                        start: (current as gradient).start,
                                                        end: color.toRgbString(),
                                                    };
                                                });
                                            }}
                                            showText
                                            format="rgb"
                                        />
                                    </Space>
                                </Form.Item>
                                <Form.Item label="背景波浪颜色">
                                    <Space direction="vertical">
                                        <ColorPicker
                                            key={3}
                                            defaultValue={(bgWaveColor as gradient).start}
                                            onChange={(color) => {
                                                setBgWaveColor((current) => {
                                                    return {
                                                        start: color.toRgbString(),
                                                        end: (current as gradient).end,
                                                    };
                                                });
                                            }}
                                            showText
                                            format="rgb"
                                        />
                                        <ColorPicker
                                            key={4}
                                            defaultValue={(bgWaveColor as gradient).end}
                                            onChange={(color) => {
                                                setBgWaveColor((current) => {
                                                    return {
                                                        start: (current as gradient).start,
                                                        end: color.toRgbString(),
                                                    };
                                                });
                                            }}
                                            showText
                                            format="rgb"
                                        />
                                    </Space>
                                </Form.Item>
                            </>
                        ) : (
                            <>
                                <Form.Item label="前景波浪颜色">
                                    <ColorPicker
                                        defaultValue={waveColor as string}
                                        onChange={(color) => {
                                            setWaveColor(color.toRgbString());
                                        }}
                                        showText
                                        format="rgb"
                                    />
                                </Form.Item>
                                <Form.Item label="背景波浪颜色">
                                    <ColorPicker
                                        defaultValue={bgWaveColor as string}
                                        onChange={(color) => {
                                            setBgWaveColor(color.toRgbString());
                                        }}
                                        showText
                                        format="rgb"
                                    />
                                </Form.Item>
                            </>
                        )}
                    </Card>
                </Flex>
            </>
        ),
        wave: (
            <>
                <Form.Item label="波浪宽度">
                    <Slider key="waw" defaultValue={waveWidth} onChange={setWaveWidth} min={0} max={0.1} step={0.001} />
                </Form.Item>
                <Form.Item label="波浪高度">
                    <Slider key="wah" defaultValue={waveHeight} onChange={setWaveHeight} min={0} max={80} step={1} />
                </Form.Item>
                <Flex gap="middle" justify="center">
                    <Card style={{ marginTop: 16, width: "20vw" }} type="inner" title="前景波浪">
                        <Form.Item label="反转">
                            <Switch
                                checkedChildren="反转"
                                unCheckedChildren="不反转"
                                checked={isReverse}
                                onChange={(checked) => {
                                    setIsReverse(checked);
                                }}
                            />
                        </Form.Item>
                    </Card>
                    <Card style={{ marginTop: 16, width: "20vw" }} type="inner" title="背景波浪">
                        <Form.Item label="反转">
                            <Switch
                                checkedChildren="反转"
                                unCheckedChildren="不反转"
                                checked={isReverseBg}
                                onChange={(checked) => {
                                    setIsReverseBg(checked);
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="显示">
                            <Switch
                                checkedChildren="显示"
                                unCheckedChildren="隐藏"
                                checked={isShowBg}
                                onChange={(checked) => {
                                    setIsShowBg(checked);
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="偏移">
                            <Slider
                                defaultValue={bgWaveOffset}
                                onChange={(e) => {
                                    setBgWaveOffset(e);
                                }}
                                min={0}
                                max={2}
                                step={0.1}
                            />
                        </Form.Item>
                    </Card>
                </Flex>
            </>
        ),
        others: (
            <>
                <Form.Item label="初始高度（注：无法预览）">
                    <Slider
                        key="inh"
                        defaultValue={initialRange}
                        onChange={setInitialRange}
                        min={0}
                        max={100}
                        step={1}
                    />
                </Form.Item>
            </>
        ),
        output: (
            <>
                <Button
                    type="primary"
                    onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(setting, null, 2));
                    }}>
                    复制
                </Button>
                <span
                    style={{
                        textAlign: "left",
                        userSelect: "text",
                        whiteSpace: "pre-wrap",
                        border: "1px solid black",
                        padding: "8px",
                        borderRadius: "8px",
                    }}>
                    {JSON.stringify(setting, null, 2)}
                </span>
                <Collapse
                    items={[
                        {
                            key: "1",
                            label: "使用示例",
                            children: <ExampleCode setting={setting} />,
                        },
                    ]}
                />
            </>
        ),
    };
    return (
        <>
            <ProgressBall value={value} {...setting} />
            <Card title="设置" tabList={tabList} activeTabKey={activeTabKey} onTabChange={setActiveTabKey}>
                <Flex gap="middle" vertical ref={parent} justify="center" wrap>
                    {contentList[activeTabKey]}
                </Flex>
            </Card>
        </>
    );
}

function ExampleCode(props: { setting: BallSettingIS }) {
    return (
        <span
            style={{
                textAlign: "left",
                userSelect: "text",
                whiteSpace: "pre-wrap",
                display: "block",
                padding: "8px",
                borderRadius: "8px",
            }}>
            {`
export function ExampleBall(){
    const [value, setValue] = useState(50)
    const settings = ${JSON.stringify(props.setting, null, 2)}
    return (
        <>
            <ProgressBall value={value} {...settings} />
        </>
    )
}
`}
        </span>
    );
}

export default App;
