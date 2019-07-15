import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var highlight = '#000';

  var demoData = [
    { name: '精英金卡', value: 65, unit: '%', pos: ['23%', '50%'], range: [0, 100], colora: '#0c1d64', colorb: '#0c1d64' },
    { name: 'PPS俱乐部', value: 80, unit: '%', pos: ['77%', '50%'], range: [0, 100], colora: '#0c1d64', colorb: '#0c1d64' },
  ];
  var option = {
    series: (function () {
      var result = [];
      demoData.forEach(function (item) {
        result.push(
          // 内侧指针、数值显示
          {
            name: item.name,
            type: 'gauge',
            center: item.pos,
            radius: '85%',
            startAngle: 225,
            endAngle: -45,
            min: 0,
            max: 100,
            axisLine: {
              show: true,
              lineStyle: {
                width: 4,
                color: [
                  [
                    item.value / 100, new echarts.graphic.LinearGradient(
                      0, 0, 1, 0, [{
                        offset: 0,
                        color: item.colora,
                      },
                      {
                        offset: 1,
                        color: item.colora,
                      }
                      ]
                    )
                  ],
                  [
                    1, '#ddd'
                  ]
                ]
              }
            },
            axisTick: {
              show: 0,
            },
            splitLine: {
              show: 0,
            },
            axisLabel: {
              show: 0
            },
            pointer: {
              show: false,
              length: '105%'
            },
            detail: {
              show: true,
              offsetCenter: [0, '10%'],
              textStyle: {
                fontSize: 25,
                lineHeight: 50,
                color: 'crimson'
              },
              formatter: [
                '{name|' + item.name + '}',
                '{value} ' + (item.unit || '')
              ].join('\n'),
              rich: {
                name: {
                  fontSize: 14,
                  lineHeight: 30,
                  color: '#333',
                }
              }
            },
            itemStyle: {
              normal: {
                color: highlight,
              }
            },
            data: [{
              value: item.value
            }]
          }
        );
      });

      return result;
    })()
  };

  chart.setOption(option, true);

  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
  }
});
