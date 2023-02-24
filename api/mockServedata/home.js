import Mock from 'mockjs'
let List = []
export default {
  getData: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          苹果: Mock.Random.float(100, 8000, 0, 0),
          vivo: Mock.Random.float(100, 8000, 0, 0),
          oppo: Mock.Random.float(100, 8000, 0, 0),
          魅族: Mock.Random.float(100, 8000, 0, 0),
          三星: Mock.Random.float(100, 8000, 0, 0),
          小米: Mock.Random.float(100, 8000, 0, 0)
        })
      )
    }
    return {
      code: 20000,
      data: {
        // 饼图，展示设备数据
        videoData: {
          title: '用户设备源',
          data: [
            {
              name: '小米',
              value: 2999
            },
            {
              name: '苹果',
              value: 5999
            },
            {
              name: 'vivo',
              value: 1500
            },
            {
              name: 'oppo',
              value: 1999
            },
            {
              name: '魅族',
              value: 2200
            },
            {
              name: '三星',
              value: 4500
            }
          ]
        },
        // 柱状图，展示用户活跃数据
        userData: {
          title: '用户量',
          data: [
            {
              date: '周一',
              new: 5,
              active: 200
            },
            {
              date: '周二',
              new: 10,
              active: 500
            },
            {
              date: '周三',
              new: 12,
              active: 550
            },
            {
              date: '周四',
              new: 60,
              active: 800
            },
            {
              date: '周五',
              new: 65,
              active: 550
            },
            {
              date: '周六',
              new: 53,
              active: 770
            },
            {
              date: '周日',
              new: 33,
              active: 170
            }
          ]
        },
        // 折线图，展示不同日期销量
        orderData: {
          title: '产品销量',
          date: [
            '20191001',
            '20191002',
            '20191003',
            '20191004',
            '20191005',
            '20191006',
            '20191007'
          ],
          data: List
        },
        //列表展示购买数据
        tableData: [
          {
            name: 'oppo',
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000
          },
          {
            name: 'vivo',
            todayBuy: 300,
            monthBuy: 2200,
            totalBuy: 24000
          },
          {
            name: '苹果',
            todayBuy: 800,
            monthBuy: 4500,
            totalBuy: 65000
          },
          {
            name: '小米',
            todayBuy: 1200,
            monthBuy: 6500,
            totalBuy: 45000
          },
          {
            name: '三星',
            todayBuy: 300,
            monthBuy: 2000,
            totalBuy: 34000
          },
          {
            name: '魅族',
            todayBuy: 350,
            monthBuy: 3000,
            totalBuy: 22000
          }
        ],
        tableLabel: {
          name: '课程',
          todayBuy: '今日购买',
          monthBuy: '本月购买',
          totalBuy: '总购买'
        },
        //flex盒子展示订单数据
        countData: [
          {
            name: '今日支付订单',
            value: 1234,
            icon: 'SuccessFilled',
            color: '#2ec7c9'
          },
          {
            name: '今日收藏订单',
            value: 210,
            icon: 'StarFilled',
            color: '#ffb980'
          },
          {
            name: '今日未支付订单',
            value: 1234,
            icon: 'GoodsFilled',
            color: '#5ab1ef'
          },
          {
            name: '本月支付订单',
            value: 1234,
            icon: 'SuccessFilled',
            color: '#2ec7c9'
          },
          {
            name: '本月收藏订单',
            value: 210,
            icon: 'StarFilled',
            color: '#ffb980'
          },
          {
            name: '本月未支付订单',
            value: 1234,
            icon: 'GoodsFilled',
            color: '#5ab1ef'
          }
        ]
      }
    }
  }
}
