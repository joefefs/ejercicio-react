const payloadOrder = {
    "partnerId": "bonnus-test",
    "ipAddress": "192.168.0.1",
    "userAgent": "Browser",
    "userId": null,
    "currency": "MXN",
    "amountCart": 25000,
    "discountCode":"PROMO01_P",
    "cart": [
              {
                  "giftcardId" :"Flux-Test-Cantidad",
                  "amount": 50000,
                  "style": "4",
                  "isScheduled": false,
                  "scheduledDate": null,
                  "isGift": false,
                  "toName": "",
                  "toEmail": "",
                  "toMessage": "",
                  "toPhone":""
              },
              {
                  "giftcardId" :"Flux-Test-Porcentaje",
                  "amount": 50000,
                  "style": "4",
                  "isScheduled": false,
                  "scheduledDate": null,
                  "isGift": false,
                  "toName": "",
                  "toEmail": "",
                  "toMessage": "",
                  "toPhone":""
              }
  
          ]
  }

  export default payloadOrder;