## 企业微信



### 服务端API
1、[获取access_token](https://open.work.weixin.qq.com/api/doc/90000/90135/91039)

:::warning
每个应用有独立的secret，获取到的access_token只能本应用使用，所以每个应用的access_token应该分开来获取
:::

请求方式:get(https)

请求地址:https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ID&corpsecret=SECRET

<code>corpid</code>

管理后台 "我的企业" - "企业信息" 下查看 "企业ID"

<code>corpsecret</code>
* 自建应用secret。在管理后台->“应用与小程序”->“应用”->“自建”，点进某个应用，即可看到。
* 基础应用secret。某些基础应用（如“审批”“打卡”应用），支持通过API进行操作。在管理后台->“应用与小程序”->“应用->”“基础”，点进某个应用，点开“API”小按钮，即可看到。
* 通讯录管理secret。在“管理工具”-“通讯录同步”里面查看（需开启“API接口同步”）；
* 外部联系人管理secret。在“客户联系”栏，点开“API”小按钮，即可看到。