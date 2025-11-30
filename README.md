# ECS 272 Final Project - A Used Car Filter

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D%2016.0.0-brightgreen)](https://nodejs.org/)
[![D3.JS](https://img.shields.io/badge/Tool_Kit-d3.js-orange)](https://d3js.org/)

This is our ECS 272 Final Project Repostory. We build a website that will help you choose your car. The following
is the repo structure

```bash
.
|-- CITATION.md
|-- LICENSE
|-- README.md
|-- Resources
|   |-- Background
|   |   `-- Warp.png
|   |-- car_data.csv
|   `-- favicon
|       `-- favicon.ico
|-- app.js
|-- index.html
|-- package.json
|-- src
|   |-- ChartMaker.js
|   |-- Diagrams.js
|   |-- Graph1.js
|   |-- Graph2.js
|   |-- Graph3.js
|   |-- Graph4.js
|   |-- Graph5.js
|   |-- SelectBrandModel.js
|   |-- csvReadIn.js
|   `-- graphDataCleaning.js
|-- style.css
`-- vite.config.js
```
This project was based upon an existing dataset from Kaggle[1]. The last time this dataset was updated was 7 months ago, and it
has 42,091 lines of data, covering 29,873 brands and 40,207 models. The price ranges from 7,000 rubles to 70 million rubles. It
also has full coverage of the city of the car being sold, fuel type, transmission type, type of drive, mileage, manufacture
country, engine capacity, horsepower, and age. We can confidently say this data is comprehensive enough to demonstrate the
trend. Down below, we attached a portion of our dataset for reference.

Our scenarios are designed for individuals new to the used car market who want to purchase their first vehicle on a limited
budget. This website serves as a filter, helping users navigate through numerous options and combinations to find their ideal
car. Our target audience includes those unfamiliar with the used car market seeking their first car, college students with
modest budgets looking for convenient commuting options, and car sales professionals interested in market trends.

## How to run this project

To deploy this website, please make sure you have nodeJS installed on your environment. Then clone the repo using this command

```bash
git clone git@github.com:TheRealMilesLee/ECS272-FinalProject.git
```
now we can go into the project folder
```bash
cd ECS272-FinalProject
```
Installing the dependencies using the following command
```bash
npm install
```
Now you can run this project by type command
```bash
npm run dev
```
Sit back, relax and enjoy the journey of finding your car

## Notice
For this project, we use a drill down method. It will guide you through filtering cars based
on your budget, age preferences, and mileage range. You can interact with the graphs by
clicking on the dots and bars. Each click records the value and uses it as a parameter to
filter the cars. You can always go back by scrolling up and reselecting the dots and bars.
At the end of the process, you will receive a list of cars that fit your criteria. You can
start over by clicking the "Start Over" button, which will take you back to the Get Started
page.

## Credit
We use the following tools to help us build this project
- D3.js
- HTML
- CSS
- Node.js

### Dataset and Tool Citation
- D3 Sankey: [GitHub Repository](https://github.com/d3/d3-sankey) and [D3 Graph Gallery](https://d3-graph-gallery.com/sankey)
- D3 LineChart: [D3 Graph Gallery](https://d3-graph-gallery.com/line)
- D3 Bar Chart: [D3 Graph Gallery](https://d3-graph-gallery.com/barplot)
- D3 Pie Chart: [D3 Graph Gallery](https://d3-graph-gallery.com/pie) and [D3.org](https://d3js.org/d3-shape/pie)
- Mozilla developer documentation: [MDN Web Docs](https://developer.mozilla.org/en-US/)
- Dataset: [Kaggle - Dataset of Used Cars](https://www.kaggle.com/datasets/volkanastasia/dataset-of-used-cars)

### Contributors
This project was completed by [Hengyi Li](https://github.com/TheRealMilesLee) and [Shu Zhang](https://github.com/shuzhang0).

---
## 🔍 Architecture Overview
| Layer | Purpose | Key Files |
|-------|---------|-----------|
| Data | Raw CSV ingestion & cleaning | `Resources/car_data.csv`, `src/csvReadIn.js`, `src/graphDataCleaning.js` |
| Processing | Transform grouped metrics, derive brand/model aggregates | `src/Graph*.js`, `src/SelectBrandModel.js` |
| Visualization | Interactive D3 charts (drill-down) | `src/ChartMaker.js`, `src/Diagrams.js` |
| UI Shell | Page layout, entry HTML/CSS | `index.html`, `style.css` |
| Runtime | Dev server & bundling (Vite) | `vite.config.js`, `package.json` |

Data flows: CSV → Clean/Filter → Aggregated arrays → Chart components → User interactions (click) → State updates → Final filtered result list.

## ⚙️ Configuration & Scripts
Available npm scripts (see `package.json`):
```bash
npm run dev      # 启动本地开发服务器 (Vite)
npm run build    # 生产构建（压缩与优化）
npm run preview  # 预览生产构建
```

## 📊 Data Schema (Simplified)
| Field | Description |
|-------|-------------|
| `brand` | 品牌名称 |
| `model` | 车型 |
| `price_rubles` | 价格（卢布） |
| `mileage` | 里程数 |
| `fuel_type` | 油种 |
| `transmission` | 变速箱类型 |
| `drive` | 驱动形式 |
| `engine_capacity` | 排量 |
| `horsepower` | 马力 |
| `age_years` | 车龄 |
| `city` | 销售城市 |

## 🧪 Quality & Validation
建议后续添加：
- 数据 schema 校验（如使用 Zod / TypeScript）
- 空值与异常值过滤（极端价格点）
- 交互测试（通过 Cypress 针对图表点击流程）

## 🛡 Performance Tips
- 大数据集渲染前进行分组与预聚合，减少每次点击重新扫描。
- 使用 requestAnimationFrame 控制大量元素更新节奏。
- 仅在图表视图内挂载事件监听，卸载离开页面的对象。

## ♿ Accessibility / 可访问性
- 为交互元素添加 `aria-label`。
- 图表颜色对比度遵循 WCAG 建议。
- 提供文本摘要：最终结果列表可导出纯文本。

## 🌐 Internationalization / 国际化
当前为英文界面，可扩展：
1. 添加 `i18n.js` 配置映射。
2. 以 `data-lang` 属性标记可替换节点。
3. 用户选择语言后动态替换文案。

## 🔄 Drill-Down Interaction (细化说明)
1. 初始页面：展示总览入口。
2. 价格选择 → 车型/品牌过滤 → 里程/年龄 → 传动 / 驱动 → 最终候选集合。
3. 点击节点记录选定条件；滚动回溯重新调整过滤。

伪代码示例：
```js
function applyFilters(baseData, state) {
	return baseData
		.filter(car => car.price_rubles >= state.price.min && car.price_rubles <= state.price.max)
		.filter(car => !state.brand || car.brand === state.brand)
		.filter(car => !state.model || car.model === state.model)
		.filter(car => !state.mileage || car.mileage <= state.mileage)
		.filter(car => !state.age || car.age_years <= state.age);
}
```

## 🧩 Future Ideas / 后续规划
- [ ] 添加收藏/对比功能
- [ ] 增加统计卡片（均价/中位价/车龄分布）
- [ ] 支持导出结果为 CSV
- [ ] 引入 TypeScript 强化类型安全
- [ ] 增加单元 + 端到端测试

## 📄 License & Citation
License: MIT (见 `LICENSE`)
Dataset Citation: Kaggle 数据集引用于上方链接。

## 🤝 Contribution / 贡献
欢迎提交：性能优化、图表类型扩展（箱线图、散点矩阵）、改进数据清洗逻辑。
PR 前建议：
```bash
npm run build || echo "Build check done"
```


