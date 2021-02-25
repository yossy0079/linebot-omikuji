var CHANNEL_ACCESS_TOKEN = 'a4sCZduzzJqLuckkfNT8SaPjwRTa3Cuc33WWf8jg2AtTGRHJ6yHdoJpBPBFN6IViX3fwLpF+oVFRdqogLHhGQSd/2WIHyZBIzG354BIK8BONPHTJZ6ifuKgnEaBybm2Z6OGNHsywc6haa5mJaxneywdB04t89/1O/w1cDnyilFU='; // Channel_access_tokenを登録

var line_endpoint = 'https://api.line.me/v2/bot/message/reply';




    function myFunction() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  var result = '';
    result += ' ' + (sheet.getRange(Math.floor(Math.random()*6 + 1), 1,1,2).getValues());
  console.log(result);
  return result
}

function Random(){
    var luck=["大吉","中吉","小吉","吉","末吉","凶"];
    for(var i=1;i<=10;i++){
      Logger.log(luck[Math.floor(Math.random()*6)]);
    } 
    return luck[Math.floor(Math.random() * luck.length)] // luckの中からランダムに1つ値を取得して、戻り値として返しています
  }

       function doPost(e) {
          // JSONをパース
          var json = JSON.parse(e.postData.contents);
         
          // 送信されてきたメッセージを取得
          var user_message = json.events[0].message.text; 
         
          // 返信するためのトークンを取得
          var reply_token= json.events[0].replyToken;
          if (typeof reply_token === 'undefined') {
            return;
          }
      
          // 返信するメッセージを配列で用意する
          var reply_messages;
          if ('おみくじ' == user_message) {
            // 「ヘルプ」と入力されたときの返信メッセージ
            reply_messages = [myFunction()];
         
          }  else {
            // アイデアやメモが入力されたときの処理
            reply_messages = ['うるせぇ！\n＼ドン／'];
          }
         
          // メッセージを返信
           var messages = reply_messages.map(function (v) {
            return {'type': 'text', 'text': v};   
          }); 
          UrlFetchApp.fetch(line_endpoint, {
            'headers': {
              'Content-Type': 'application/json; charset=UTF-8',
              'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
            },
            'method': 'post',
            'payload': JSON.stringify({
              'replyToken': reply_token,
              'messages': messages,
            }),
          });
          return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
       }