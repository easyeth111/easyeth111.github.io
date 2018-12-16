$(document).ready(function() {

    // utils
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  window.web33 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"))

    const current = + (new Date() / 1000)
    const days = Math.floor((current - contractTimestamp) / (60 * 60 * 40))
    
    const getInvestment = 'https://api.etherscan.io/api?module=logs' +
    '&action=getLogs&fromBlock=' + contractBlock +
    '&toBlock=latest&address=' + contractAddress +
    '&topic0=' + eventInvestment + '&apikey=YourApiKeyToken'

    // get json data
    $.get( getInvestment, function (data) {
      if (!data || !data.status === '1') console.log('Etherscan troubles')
      const array = data.result
      var total = 0
      var addressArray = []
      var chartArray = ['Year', 'ETH', 'Investors']
      var currenctDay = 0
      for ( i = 0; i < array.length; i++ ) {
        if (array[i]) {
          const time = new Date(web33.utils.hexToNumber(array[i].timeStamp) * 1000)
          const timeObj = {
            minutes: time.getMinutes(),
            hour: time.getUTCHours(),
            day: time.getUTCDate(),
            month: time.getMonth() + 1,
            year: time.getFullYear()
          }

          const amount = web33.utils.fromWei(web33.utils.hexToNumberString(array[i].data.slice(2,66)), 'ether')
          total = total + Number(amount)
          const address = '0x' + array[i].topics[1].slice(26,66)
          if (!addressArray.find(function(itemAddress) { return itemAddress === address })) addressArray.push(address)

          if (currenctDay !== timeObj.day) {
            if (chartArray.find(function(itemArray) {
              if (itemArray[0] !== 'Year') {
                const dateFromChart = itemArray[0].split('. ')
                return (Number(dateFromChart[0]) !== timeObj.day) || (dateFromChart[1] !== monthNames[timeObj.month - 1])
              }
            })) {
              chartArray.push([timeObj.day+'. '+monthNames[timeObj.month - 1], Math.round(total * 100) / 100, addressArray.length])
              currenctDay = timeObj.day
            }
          }
        }
      }
      var contractBalance = 0
      const contractBalanceURL = 'https://api.etherscan.io/api?module=account&action=balance&address='+contractAddress+'&apikey=YourApiKeyToken'
      $.get( contractBalanceURL, function (data) {
        contractBalance = Number(web33.utils.fromWei(data.result, 'ether'))
      })

      // Конвертация ETH в USD
      apiETHUSD = 'https://api.kraken.com/0/public/Ticker?pair=ETHUSD'
      $.get( apiETHUSD, function (data) {
        const ETHUSD = Number(data.result.XETHZUSD.b[0])
        const totalUSD = Math.round(total * ETHUSD * 100) / 100

      // Вычисление общего количества выплат
      const diff = Math.round(((total) - contractBalance) * 100000) / 100000
      const diffUSD = Math.round(diff * ETHUSD * 100) / 100


      // -------STATISTIC-OUTPUT >> ------- // 

      $('#statWithdrawUSD').append(diffUSD) // Общее количество выплат в долларах
      $('#statWithdraw').append(diff) // Общее количество выплат
      $('#statBalanceUSD').append(totalUSD)}) // Баланс кошелька в долларах
      $('#statBalance').append(Math.round(total * 100) / 100) // Баланс кошелька
      $('#statDays').append(days) // Количество дней работы проекта
      $('#statInvestors').append(addressArray.length) // Количество инвесторов
      console.log(contractAddress);
      
    })
      console.log(days);
})
