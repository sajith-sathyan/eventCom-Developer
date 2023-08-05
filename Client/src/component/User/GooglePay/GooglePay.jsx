import React from 'react'
import GooglePayButton from '@google-pay/button-react'
import axiosInstance from "../../../Helper/axiosInstance"
function GooglePay() {
  return (
    <>
     <GooglePayButton
      environment="TEST"
      paymentRequest={{
        apiVersion:2,
        apiVersionMinor:0,
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"],
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'example',
                gatewayMerchantId: 'exampleGatewayMerchantId',
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: '12345678901234567890',
          merchantName: 'Demo Merchant',
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPriceLabel: 'Total',
          totalPrice: '10.00',
          currencyCode: 'USD',
          countryCode: 'US',
        },
        shippingAddressRequired:true,
        callbackIntents:["PAYMENT_AUTHORIZATION"] 
      }}
      onLoadPaymentData={paymentRequest => {
        console.log('load payment data', paymentRequest);
      }}
      onPaymentAuthorized={paymentData=>{
        console.log(paymentData)
        return {transactionState:"SUCCESS"}
      }}
      existingPaymentMethodRequired = "false"
      buttonColor="Black"
      buttonType="buy"
      >

      </GooglePayButton></>
  )
}

export default GooglePay