const SETTINGS: SectionSetting[] = [
    {
        title: "时长相关",
        display: true,
        settings: [
            {
                id: "autoRefresh",
                name: "自动挂机",
                type: "switch",
                default: false,
                description: "是否定时自动切换，仅用于刷时长",
            },
            {
                id: "loop",
                name: "循环挂机",
                type: "switch",
                default: true,
                description: "所有单元过完，是否重头开始；不开启只刷一遍",
            },
            {
                id: "randomInterval",
                name: "随机延时",
                type: "switch",
                default: true,
                description: "是否使用随机切换间隔，随机数小于切换间隔，大于等于其一半",
            },
            {
                id: "switchInterval",
                name: "切换间隔",
                default: 5,
                valueType: "float",
                description: "单位分钟，允许小数，多久切换一次页面",
            },
            {
                id: "switchLevel",
                name: "切换步长",
                default: 3,
                valueType: "number",
                description: "1，逐章节(chapter)切换；2，逐版块(section)切换；3，逐练习(tab)切换",
            },
            {
                id: "range",
                name: "范围限定",
                type: "switch",
                default: true,
                description: "仅当开启循环挂机时，才能循环指定范围",
            },
            {
                id: "chapterAmount",
                name: "章节数量",
                default: 6,
                valueType: "number",
                description: "一个单元(unit)有几个chapter?1-6即6个章节，2-8即8个章节",
            },
            {
                id: "rangeStart",
                name: "开始单元",
                default: 1,
                valueType: "number",
                description: "此区间是闭区间，[3，5]即从第三单元的第一章节刷至第五单元的最后一章节",
            },
            {
                id: "rangeEnd",
                name: "结束单元",
                default: 8,
                valueType: "number",
                description: "不要小于开始单元，可以等于，如[3,3]，则只刷第三单元",
            },
        ],
    },
];

export default SETTINGS;
