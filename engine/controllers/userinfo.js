$(document).ready(function() {
window.web3e = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"))

  function numberCorrection(string) {
    const num = Number(string)
    if (num > 999) {
      return (num / 1000) + 'k'
    } else if (num < 0.01) {
      return num.toFixed(6)
    } else {
      return num.toFixed(6)
    }
  }


    $( "#showUserInfo" ).click(function() {
    $('.check_result').html()
    userAddress = document.getElementById('userInfoAddressInput').value
    address = '0x000000000000000000000000' + userAddress.slice(2)
    getInfo(address)
  })

    // получаем информацию о вкладах, выплатах и ревералах из EtherscanAPI
    const getInfo = function(address) {
    const getInvestment = 'https://api.etherscan.io/api?module=logs' +
    '&action=getLogs&fromBlock=' + contractBlock +
    '&toBlock=latest&address=' + contractAddress +
    '&topic0=' + eventInvestment + '&topic1=' + address + '&apikey=YourApiKeyToken'
    if(debugMode == 'true') nInfo('getInvest Request = ', 'https://api.etherscan.io/api?module=logs&...', getInvestment);

    const getIncome = 'https://api.etherscan.io/api?module=logs' +
    '&action=getLogs&fromBlock=' + contractBlock +
    '&toBlock=latest&address=' + contractAddress +
    '&topic0=' + eventIncome + '&topic1=' + address + '&apikey=YourApiKeyToken'
    if(debugMode == 'true') nInfo('getIncome Request = ', 'https://api.etherscan.io/api?module=logs...', getIncome);
    
    const getReferralInvestment = 'https://api.etherscan.io/api?module=logs' +
    '&action=getLogs&fromBlock=' + contractBlock +
    '&toBlock=latest&address=' + contractAddress +
    '&topic0=' + eventReferralInvestment + '&topic1=' + address + '&apikey=YourApiKeyToken'


    // user investment history
    $.get( getInvestment, function (data) {
      if (!data || !data.status === '1') nError('Etherscan', 'Ошибка соединения. Попробуйте ещё раз.');
      const array = data.result.reverse()
      var total = 0

      let investmentTime
      for ( i = 0; i < array.length; i++ ) {
        if (array[i]) {
          var dateandtime = web3e.utils.hexToNumberString(array[i].timeStamp) 
          var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var date = new Date(dateandtime*1000);
          var year = date.getFullYear();
          var month = months_arr[date.getMonth()];
          var day = date.getDate();
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var dateandtime_str = hours+':'+minutes+' '+day+' '+month+' '+year;

          investmentTime = web3e.utils.hexToNumberString(array[0].timeStamp) * 1000
          const block = web3e.utils.hexToNumber(array[i].blockNumber)
          const amountDataSlice = array[i].data.slice(2, 66)
          var amountDataInt = parseInt(amountDataSlice, 16);
          const amount = (web3e.utils.fromWei(web3e.utils.hexToNumberString(amountDataInt), 'ether'))
          total = total + Number(amount)
           
          $('#userInvestment').append(numberCorrection(amount))
        }
      }
     
    apiETHUSD = 'https://api.kraken.com/0/public/Ticker?pair=ETHUSD'
    $.get( apiETHUSD, function (data) {
      const ETHUSD = Number(data.result.XETHZUSD.b[0])
      const totalUSD = Math.round(total * ETHUSD * 100) / 100
       $("#checkResult").html('<p class="check_result text-center">Ваш вклад составляет <span"><b>'+numberCorrection(total)+'</b></span> ETH (<span>'+totalUSD+'</span> USD)</p>')})
    
    $.get( getIncome, function (data) {
      if (!data || !data.status === '1') nError('Etherscan', 'Ошибка соединения, попробуйте ещё раз.')
      const array = data.result.reverse()
      var total = 0


        let noWithdrawalEvent = false
        let stopper = true
      for ( i = 0; i < array.length; i++ ) {
        if (array[i]) {

          // old code
          const block = web3e.utils.hexToNumberString(array[i].blockNumber)
          const amountRaw = array[i].data.slice(2, 66)
          const amount = web3e.utils.fromWei(web3e.utils.hexToNumberString(amountRaw), 'ether')
          var type

          if (array[i].topics[2] === '0xfe7a30932c603073539b5550117ca9b29d73e38ae68d5e096d811e6cb3eaa71f') {
            type = 'referral'
          } else if (array[i].topics[2] === '0xcd13ac303d5d39abe59dadbd9939c261224cd9968056e630c4472fb131ab2f6c') {
            type = 'withdrawal'
          } else {
            type = 'Выплата'
          }

          $('#userIncome').append(numberCorrection(amount))
          total = total + Number(amount)
        }
      }

        if (!noWithdrawalEvent || array.length === 0) {
          const currentTimestamp = +new Date()
          const delta = Math.abs(currentTimestamp - investmentTime) / 1000;
          const days = Math.floor(delta / 86400);
          const currenctRate = 1.23 + (0.01 * days)
          $("#currentRate").html(Math.round(currenctRate))
        }
      $('#userIncomeTotal').append(numberCorrection(total))
    })
    }) 
  }
})