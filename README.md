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

