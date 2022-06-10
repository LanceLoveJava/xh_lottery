<template>
  <div class="content">
    <div class="btn">
      <button @click="stopLot">停止</button>
      <button @click="start">启动</button>
    </div>
    <div ref="war_box" class="war">
      <ul ref="ul_obj" class="fx-c" :style="ulStyle">
        <li class="fx-c" v-for="(item, index) in users" :key="index" :style="liStyle">
          <img :src="item.avatar" alt="" :class="activeIndex === index ? 'scale' : ''" />
        </li>
      </ul>
    </div>
    <div v-show="showMask" class="mask">
      <img class="img-bk" src="@/assets/images/winerbg.png" alt="" />
      <ul class="fx-r">
        <li v-for="(item,index) in lotteryArray" :key="index" class="item">
          <img :src="item.avatar" alt="" />
          <img class="ani-rotate" src="@/assets/images/usercircle4.png" alt="" />
          <p>{{ item.nickname }}</p>
        </li>
      </ul>
      <img class="img-close" src="@/assets/images/closebtn.png" alt="" @click="showMask = false" />
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, onMounted, nextTick, watch } from "vue";
const pageData = reactive({
  animateOff: true,
  animateDistance: 0,
  animateLR: true,
  animateStep: 30,
  liColNumber: 6,
  showMask: false,
  war_box: null,
  ulStyle: {
    transform: "translateX(0px)",
    transitionProperty: "all",
    transitionDuration: "0.3s",
    transitionTimingFunction: "linear",
  },
  liStyle: {
    width: "60px",
    height: "60px",
  },
  ul_obj: null,
  timeObj: null,
  activeIndex: 0,
  lotteryArray: [],
  users: [
    {
      nickname: "。。。",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/9zDgoFiclCic04Aqibicf62muicXeVNEve4PVP12HWBkAXicYLriaaAXk9Xn5IZS2cOaSoQmht1RSU7usPgiaeeKU6Uydg/132",
    },
    {
      nickname: "郭思雨",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLZlG6Z7ibxbJw8dDePKdB4a2Pplv0jOQUia899a07HXTEFGibkqXBHMpksygAibA3P0ibCumbpyD2XsCg/132",
    },
    {
      nickname: "🇨🇳春光",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIIfQibLWoibY0qgDiciaW7C1pSENfOWbXlQ6D7dX2B3n5Gca5PlZn58zNPWjypYVVfFVLYgD00LU775g/132",
    },
    {
      nickname: "李涛君",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJkH6gicNPvQ459pumYudj1Ro3ZcgjNIfjrsSqYOnH79Eb8h1iaxc89v1qAkZX4urjVIvlJTgjtloxA/132",
    },
    {
      nickname: "齐德隆",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep2CHFTx4dRJwKILl8OC3urzSZOGxkHWgMIPRyeffLibzXGH3EbuI9dPQPzYrvb6HJkT3ibDMvu4Taw/132",
    },
    {
      nickname: "大蓝鲸梦幻王国",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erJ4zHKFcOQ3OXyJwKfopuLNM4JttG7T0Rvl3XicLfpg84JsJMnO7XRaHoj2WdcYwQ9MTmTTG9WIVw/132",
    },
    {
      nickname: "平安",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJvLAh2MJxgqiaM2iccIA2neE8uw3kVHUeA3fGrSlEWxqQ9tAR7kibIBWoSficCceufw1NLPHqaZnQQdQ/132",
    },
    {
      nickname: "鱼鳞",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJd4qPDEPyyB3IZphvmeEvJ6824bq5wmEMn6mYMgObYZKXKZzmdvO5WWQ7ibeG09zDZpQzHSdN3lPw/132",
    },
    {
      nickname: "Wen🇨🇳quan 666🐾",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLxFknmljwzmLllqibmxWMKdQnoic9xLdickHN01ckicSvEVwG1IeNREruN1Txicz2VAFtDVZhKibBHKaJA/132",
    },
    {
      nickname: "怀念青春、",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/icHmZWxlnVrBzr3ysZSBsqiaTzRPtqeb8iaib5Ubm4xHTvr9II794aUlReHXagDkJHzd37smj9JGJzhENlKnwuNXgg/132",
    },
    {
      nickname: "泰和 ^易经文化（讲师主持@音乐）",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLcnz4icAAoAA4Yq407cI9lAZIhles0t7VlmnzQIG5d0nics9uaPZQS3S5bUyEibYTWcBwMKs9abnYVg/132",
    },
    {
      nickname: "陶海磊",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJyaA0WYnJ4RgSsmTPE4AvdMibLoHGrrDpZ6d9dWR3zwJ2q2TrK9ic6OeNYic8KVnvqd7kAttj5ib6hxA/132",
    },
    {
      nickname: "亿路邮你",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/aMqDygo0bnFQMp5mZlcfhdItoqpRY9FPWJEMsCwTPefqhMeleGyatnthGmD7KbK26UmqutlU8T9gv93zeOVerA/132",
    },
    {
      nickname: "天天婚车",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/icle1HfESWDrbWv1jaTcz51gERtsOkAVQNoNWQ2ERmrW5WxBqH1PmibAtdNpWms3LqXzia8dmGkZibiboCicFI64TkCg/132",
    },
    {
      nickname: "小芃",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKkrYj20oMfrhVeOMNe6lGt4Nicf6IfpQXicYW6KDw0TrsKCMZicteqnAoAokBLOA6UFqtpIUlehqvOg/132",
    },
    {
      nickname: "百强 一个人的武林1590977 6428",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/dAjdFoG3JSQzjhkFO3EGibcdwsj1bicTqypgqMGv04hZJEuRauAIjY2RW2f4ZXGDGS7BSdrcJGU4OfXfmE0I6iang/132",
    },
    {
      nickname: "阿琴🍭",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/kN38lLF5fCuMiaiaXOI2P8a9pPJSjUTqceq9sOPGerDeFd74shicpk3DQmhRcTibZLKicUicF91b8Otumia1e7wrnCEeA/132",
    },
    {
      nickname: "刘治波",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erlibY4XN90PsicKg96TicJ37zekgbpUKpVxhkEC2X7nTlcaAMZTPhpicjntnzVyWTwlQibfp4VfM37OWA/132",
    },
    {
      nickname: "王洋13623418785",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJFe48os6IDguO5Wf8uzVPUaJAWATaJnA5qlVq1wNbBLCTnQ6DzUEstib48GGbPH6f9uKVXV9a2XvA/132",
    },
    {
      nickname: "Betty～岩",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLpW0WxUqM1ic825sUb2aZMrIEpQvWibnoNialFvFnWpFm9daLbT8AI7X1KJtevRxeTic0wyhAjKdBteA/132",
    },
    {
      nickname: "鼓韵传媒",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eribDDGmA2icM53NYfdroEqaFmN0pDic1FastlYjOJR7AvkDT5p3icSNsHxJ7TkYwvgvk9rEQ3fMqDt9g/132",
    },
    {
      nickname: "Tim",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Gkh2zhb7BboW15BkqZ7q7CIpicFMCbI9KphRHORlYVlyhQ2iaL5iawZGx5rYkx7ULdGSuuEzAOxnjexIDT0ojXeIQ/132",
    },
    {
      nickname: "Constance",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIvLxuLaIS8tgkDeLS1urEBY9woKQZDyN5zQn9CLJnx37csh3KX6icHUE3YpnfmQfyRMPVfBUDsUBw/132",
    },
    {
      nickname: "LN",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKiaNDFLxRqCJavTHpmQ7ibsemfLoTYch5JKtfheKDHfMMSoCsxaQiayP4VupE7faSgsmaLiaz4LpK7QQ/132",
    },
    {
      nickname: "陈敏婷陈晴晴",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKeiboWJ8dxcRrSzsuUj8oIujd9hx4WsZoBK1poP4UMy1frQ6Kn9wYo0Hn4TY5M9xXtVMibJboibmvWg/132",
    },
    {
      nickname: "保利威林鑫鹏-18027415871",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/YpNcnfObBW6hH7AL5ptFLic9xRJGBib0Mr51y5Dv4DBySpiaEHRvC80SaDeU4AtTWFOgSpocrGC4m5WDS3HA1eoPA/132",
    },
    {
      nickname: "全玲嫚平安理财～贷款（寿险车险）",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/owzhhRKKraMhkficwHsQRoa1Yeu2ZBNNQeVz3rouMqTjwyMj6VZqicz9dVqfPDoDcgTdgrMu5DCcuoXmria0FLUtw/132",
    },
    {
      nickname: "🐰",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKkbGPw0YzbTu7VcpzdJspsNGMNmJELReQIXZaMPUDicrNwA3U7X4cu4rZQJa6xX7WY7VxlzV7Iw0w/132",
    },
    {
      nickname: "时光斑驳、记忆",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKettA8iaVU9MDnficBWtSeyu17QNphIhiantiaEp01wc2p79NTfzkhE0rOhbBgs4agXPmg818ciaX81Fw/132",
    },
    {
      nickname: "博伦孟庆竹",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/ich0trDxWeyfrCeNichdIaeNtsNzV83rDdFSopDQIBUHkibC0zRZfJ5VAyGoTcNTsr7ZMBlwjq7ot9cM1pfh0OvaA/132",
    },
    {
      nickname: "凌晨两点的火车",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/IjFRWDxE5DXz5mRvELmhibiabI4zkKN1vSLibCOMYSlmFl1bbjDqY6KazTW3yckQb1HpDmwR7bCpAhxibLLibojJibbw/132",
    },
    {
      nickname: "不想透露姓氏的陈小姐",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/wSibQGUPVRl9qSYV5kP9t0RkIo4JM1aaVShw8366P7Bv6zHrONIpcjoEBXuv4ic3ObTOp5CLTGvx33suFmAR2cTg/132",
    },
    {
      nickname: "@刘司令",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erUMMo9b9oXWxN9a9EpIVkUjrdB2EBkXoOkuwJO5LY0VGPia5yXN7WiaDOGZXyiaE5F01UdUvSibpKHfQ/132",
    },
    {
      nickname: "Layman",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/HeKlJZ3TMVEEWDNnr8s6F6paav3EibegqhPIzzFEqszNicmmzibeJibtcnLicic5SfwkdwyscXptVZiaeDKTVuRlODIlg/132",
    },
    {
      nickname: "营销策划苗苗",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELhDde1mwiboTxFpDHgZCg5kbibXJc5MMj8wHhZCYsWia8dB5v3yUMichpXmNjqTe19CW0WYPKiaUu35cg/132",
    },
    {
      nickname: "那些亲爱的小时光",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ8z22CGDX5G0tDmghHt1lLPEgCnxNvyRVvdJYqCCAPpMtDP3IHavu21ibUSRG7Zwmeicdlhkicib7wiaQ/132",
    },
    {
      nickname: "Alin_",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Ll8kEtGB7z7CtYYREEAia4PThaj1afvv7P38RTOZSEWic6wAax4ibxYqtKY0zicAEgsVjH84a95iabrQrIPZhicJjrCA/132",
    },
    {
      nickname: "梁翠翠🎀",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/k5nWMuIIyBFXBHxuebbnTQPbvDjy0DjOJGLwuibZTHBXR93OwXgKH93fggSe7n7HQjicib3wFictASsuSk9gZiaPyGw/132",
    },
    {
      nickname: "Chonny",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/eS7zia2XcymneCsoA4jQHALribtJsp1ZicCiaauk7uOnn1S5iaQH7etTYzE8V3oywibdmPm1PssYktc7phAWB83cGCsg/132",
    },
    {
      nickname: "Kay.T",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/gAJV7IEibKNXCbMOnpt4VDHicnMDRBHERCY5OGSlwzzFsNgicwmgyoQ9LQVPmvYGQy22lml71drHbfmTU8y4NN4MA/132",
    },
    {
      nickname: "珏",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/ib70thJLA1yHS74ibJRuRnDDdxUDNsibkBw6BnWay9jYicpibyqlvvDzBe4a2ZXB7vEfoHxS9XGGfWrleOHkuczVLHA/132",
    },
    {
      nickname: "北群一部济南周清晨",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/QnnDUhl3iat9cufSn42yWy3tCft117p6vLlBaicpmoblvVo5QiciauszvkS47mOthk3FNzfdwxEnvnhG9QRZRhqZgw/132",
    },
    {
      nickname: "程",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIolesbbPdZ47QEgDw6ag7BjfU2WTwLFhMys6ArwPsLvfmqrBiaYQq1jS5NX5p4hFpgcnLYVmHtrxw/132",
    },
    {
      nickname: "苏华",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/XQ0nWK99Lecur84Z7KquGkLb6ZyKGArsxGsB4MDCbTHJFUU6aAa3kTZs6uMRoLah1F34pwRfnicpqGOQVyiaiaJAw/132",
    },
    {
      nickname: "llling.",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKWVGKakkmgcgiatsejSgGjHnHcg3dLBXBrMlia6ydhLvhmKYteacCc1NMnhNLE4qicOZ4WPiaibJsXSng/132",
    },
    {
      nickname: "Roger Luo",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/g3CIibKkJHHbMKvKJwDichaRFjic3SGB7CXdhIKCfsy65EzfibndQmWmAZzQzicJ3eEibVF8q7T05ssJahibQeYO454oQ/132",
    },
    {
      nickname: "朱磊 15247219142",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/LVZjBw5rcgCbrw28zrG75FUd1l9ibzhKAAGh854LNYbq81gme5IgCkWQTrN9XVjPVFmupwKWH0UH2utOpAbjicVw/132",
    },
    {
      nickname: "哇呀",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/IicgJ4icRftJv0pu8YQ6rXQVeicdVAXla7Z0sO1lFpIc6QMm0WDCcfBzQ3naSMXVLoGWffKuee30uA40JqBn6KYXg/132",
    },
    {
      nickname: "一只向",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoCmTYtaiaicIgG86lJXDgXEiaLbpEOYpNtnSgiaoYA5FqwxmU4iaNwQWezYiblN1mfWKUdRK9wYcaLkqgA/132",
    },
    {
      nickname: "外汇客服-小汇",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/UtpBPTBJBnP9aLS2IQzhndnWjF4Fr05lD1F5eyUmmjQcwAR3GVIYC92Yia0WQAW29n8L8YOuDT9YGIaOOhjx3bA/132",
    },
    {
      nickname: "yang",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJhgiavVJC7pSg8bBH6mgEG4k1pdic3vrfh5RXMLgP1vezy6xbwLs79LVfc85bJSYTwXV7Pbo2u5I6g/132",
    },
    {
      nickname: "思儿",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/52eZlEWhZMnAV224RoOAc9mgpVa4czBIARkOYhgMd1GobrWWV0ibHPm1jYkut9UutfnngegswaM7anEPwfWr2Gg/132",
    },
    {
      nickname: "柠檬拥抱🍋",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJOdfwVKu3CsoiaaZia3YMuHGibyA6Tu7Aa2Oq0rlhP6lJtW6pdXus9iatKhBCbgiaJI4ZPKKic5RG4iblHg/132",
    },
    {
      nickname: "因弗卡吉尔",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIibTHeQYKnic46RDy7CSqwFI1m2eMGVJzP3SDpzxSEbE2TOiaggUjqgVicXWJ45svC01tv2fKYyiarbhA/132",
    },
    {
      nickname: "冷暖自知",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/0iaIWczXBpgkjCibnuhJgAtbAskk0Ygvu2hPwcERZ118PJYyoazeTCEyPgibGB6EsatlUeuAL603z7cwpGB3eCibfw/132",
    },
    {
      nickname: "张老师全能！",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI5NibzqOYLRdoibqLDwz75gEPicb92nbTXtVVbubCFryDa0PSSnic5vXw2UvysjuQolPa2c67QicicpwWw/132",
    },
    {
      nickname: "四川汇旅李元",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/c1OXUXicey7iahgsJLb4ib9A5oZpphREG617ODGN9AVS2yYjd9u8XBeE8uAYTKYLYAMDSqIQia9FlSSmjdLaOdwZ8g/132",
    },
    {
      nickname: "吴科金",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqWsEq8AODVibGkNlGYibvw7HvogOuDibTP545EjG5iau7TKph2vjxknE8IfeiaYVNvHsiaJKEDyrAyea5A/132",
    },
    {
      nickname: "神经蛙",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM62cBmcz2lRX8fq3ribkymfrd7c9p3heKcRlVYeLNuUAePpqJDDWaAj7Fla4PUL0bsX16PtZhvUV5w/132",
    },
    {
      nickname: "飞",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI9wNTr4tx3G8Q3eDPkuSFMfBibNzMB2vsrqlvUqwCCY2ckZlrrrk8RlniaXfRyMrBJbdib68qW6wh1A/132",
    },
    {
      nickname: "涵",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/iaZ2PQFuHU9OJ2ibGlQtofRameLP8cQvm2RBcCeMUIr9QyIETXK09yX43RBbO4YSNncYxJkK6icjpzP4oqb9Uchkg/132",
    },
    {
      nickname: "红柳",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIymfrLicicMiadG6ibqeoFiaWPOUicUddVPf91jqiczBgsK4hxicdibtOxCmKkHBK5XotolNkpibzhWaIwNHMg/132",
    },
    {
      nickname: "哦。然后呢",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erpPBHCCKTp8jKl4aosVdosl3cfd4v8jgicQ1TJ9tdHoXyBd6xgPMUZjeiaUa87ksuoShib6y6ztb3wQ/132",
    },
    {
      nickname: "阿良",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoiaY2yU99UPeibXHibsjgs6s2w6RpMgLv0DVd9D7iaiaWJp8UPSegLc9L6U1djKtz4OJgKlMReh5cr07A/132",
    },
    {
      nickname: "琳",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/a5FMF6AyAo9qpN3yYMkoZCpbmKZ94BeiaDNd2ODvSIWLM8A4WNMW2KfTSIDgzlIMdNbJ2BXEqoZBjVWkgJmZuYA/132",
    },
    {
      nickname: "宋姝红℡¹⁸⁶⁷⁸⁹⁰³⁶²⁷",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqWys7zGibGVQnZnLDEiagvLVx4ucd013dDp9Hy6icu0lXvx8y7VOJrOAd8y0icq3oaMicWakVDOU5MStA/132",
    },
    {
      nickname: "曹高坤15857953407",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/vZFric6HV93h4qJC0fF4W1iaNZWOKM7RPiaTrvMwhXaniaYxYicHscRia4Z93T5JiaJ9NulUpLgQp57D96LCyibWpH04ZQ/132",
    },
    {
      nickname: "沈云峰",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKyw8AYCdRSibMzJ0Odnep8n41hAfSkkHBMBtx01X5ddjoU9tImW6S1wgqaibXuUAa66XuibRVCv45Iw/132",
    },
    {
      nickname: "哎呀，呀呀",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/kTb9hNveA5xLaTo3uDwM3MtxMXqzxqgaFAcYxXy8ImfQFUrLKS3QRTCqKLOY2tO3D4TfsGbOJlYSMzyBLsKvGA/132",
    },
    {
      nickname: "三疯",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKeg1ABFDjDTbabt3Q5xiajiayk9JeUxtFvpmhkm9cZ5kbW9yZb5tx9suHTPcyJXyZZicBGBaUrYN98w/132",
    },
    {
      nickname: "🤔",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/M8nV7e3c50QBL4YxichTslMgog1y7hnlf5GI0YJPAWow643tMHjNxAmvXhrbK1j9sPlTN4QcZU7V6SldXXciccXA/132",
    },
    {
      nickname: "未来可期🥳",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLftVZzpm2Q6mlF56JFnnTVAbsrJJWpme1nDWbZqYRvXBRskc84n5pxCKn36LJFgWEZLkOM0sPDpg/132",
    },
    {
      nickname: "Sabrina 谢芳芳",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK1BsyCNayXtBgWlfictTInbvgYc19UBvxFkBLPVXtgdLiafq5EOxTFFlMLlpO3BZl6fWuR3grDw2Gg/132",
    },
    {
      nickname: "闫在驰",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELcMhLZJDKicIPBpf3xJSeGdiaoTdcPKdKutibxzzt8KbxVjaRGS99WwfMhvibEWSA0bhrUDDukdX9Bng/132",
    },
    {
      nickname: "AfterJudy艾福朱迪",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLlqV4hemL5Vwia6LOyLRtPMVGsh52yGyCIA9RmVM7n0Tx1WHh2btRg9vJU7IQtmoPatriawwj65rZA/132",
    },
    {
      nickname: "沈 caleb",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eptl8NX3VaO0F14B7yg9J18kr3iaQ6ZJxbcfqXic7jsvxibmV4NYNBXbN2HCpgRCticVTuia7VuXe7VicHQ/132",
    },
    {
      nickname: "赵龙13323761038",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoLGeMqUMB3ZyPBRJv5XvtsDWv2JHSRsia5Giaqp9wSbtzvvrOibdyCGic08gLTgOc3jgVXMO8pqtyymA/132",
    },
    {
      nickname: "素水",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTICnRib8mVpbHciaAD0jt0n8hKagQ9oyYOgtnz7ibDibTq9IvVux3Cdrk814icRp7yMfzS5FA5VicJk8oRA/132",
    },
    {
      nickname: "为了大家",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/N0OM71nEAIZVwJjCwhJOgSwd9JEc8uMmPOia3pMdjHVot0HGs87OQFduj0IZDnGspUZyHEvq6nTPkjZh9PtIiaPw/132",
    },
    {
      nickname: "Miss 李",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/9OGbiaUOA5J1lXw7sEmibIBWliaTtbNDia4cYPdK4rI5vibAFM3sibCv59OicGfbDjD0go9yH5VibjUx0LBcR0evCCW8rQ/132",
    },
    {
      nickname: "Dwyane.JK",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEItbmgpAhnAia9lc7j536HodfqPKziae2qLYFM3Mywn5ib16Y6Q2BVlYIG8YicTOvypB2J1E0cfuUDI8w/132",
    },
    {
      nickname: "传扬-龙稳",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJVJZYWoQ3UH8Kmd1JtdGwQPws8ImGkdV3NicM6RQmziazUdNhsicLsjTJoZcib1eB41jy6Qvfaq2Bj6Q/132",
    },
    {
      nickname: "冯冬冬",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaELtFEetkic9yKCKicxPGj3yMKX0B1RYKLk7nAmDSzs1b3Ka2VseyHJia3wzgzY5NAYlyRJpGIqI2C9Mg/132",
    },
    {
      nickname: "额、",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ercrNLHgasCdzt7BL8l53GJAoZricv4ABFvcGI3fOAiaAqWLDJlBhLFwCzibZyibqb8o5nKuTwxy7YlIw/132",
    },
    {
      nickname: "哄哄",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM61WwUuhicy2XHEKkQC80tR5RlTtG6wz3Hqx13hsmpoOZGomHznFYsibNbahLX16bjqhz0SDWTyRvPw/132",
    },
    {
      nickname: "心缘舞美",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqLTcpJToJicUpxNfG4bcYMRGCLB4FicKQ0tCUAzB1iaicM8OUCsL19MfjhQs2CeCNzzOEnRibxsKbhXEw/132",
    },
    {
      nickname: "珍惜眼前所拥有的",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/ZjKM3jhseV7Abs16sbXCl38xl0rO1OibMOhHbQteg2djiaAbCWmriaMsN5zEGOWbVkGAR0g3icaVHkh9KpVLE8Xufw/132",
    },
    {
      nickname: "鹿鹿张🦌",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/lGmpt34icnSjRianw2p5Fx5ADg0ZDsFDghz5c2yOiajI3VXa36BftRjknqlibdFR1icBO3QwuHWVD8nJRKQAP5yuMOw/132",
    },
    {
      nickname: "一東四部督导娇娇",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Uow3W7jQkYudC6TYmJzLgjby3CYYJ8BEiaA8mhY4JfkaSSfkQt7ia7F0up0Q4RcWuIKFSAvM7GB9sYSo7ibO1vhkQ/132",
    },
    {
      nickname: "一東四部督导越越",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIuibQTH8fIMZ4Dt1spefgrYoswUoRdAEl6p1916my7CPibiatCWZcb8yjtfSUCt7psM9dUBDJ7Q8a3A/132",
    },
    {
      nickname: "一東督导 陈陈",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/TMQQY5DthD0Cye2Uib2Lq0OYt6otq8FrHbOR1qjpMmvRCpLdfGQ1icQhNPRjKuK7hBaebnuAITTUuPYPdCyU7lkg/132",
    },
    {
      nickname: "一東督导·唐思佳",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/bBia1LLVBHncRlw2cPODia5RWOHgYQR60CGEibWxEt5qIZYB1CdC3vfrmGpb79xx3qOn43mrYK9FwAibibV3XdS6mNw/132",
    },
    {
      nickname: "随缘",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/O8tftUHn1UScWMiafW3sjpY5UNzqk2DB2aPBiaTSqpoGwiaoVpP2bMd0SwQ7cNfSFyOHkCgURD649iby2UDyq6AiaxQ/132",
    },
    {
      nickname: "何西18583313567",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/N2dbAzsXPnSP59cyyNONDtUtXzVMYxF5oauyUlW2icjfw23z0wHuibicguib3O7HyK4lZrHIhn6pAwVGO86HQpN4Hw/132",
    },
    {
      nickname: "我的微信",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKRKfIfaPknhflNddleKbvf3icia1icibvoWp8eQMdU48TUWhGarNFqAACxroNyMakZ35Te45ib8PzEy3A/132",
    },
    {
      nickname: "李可乐🥤",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIkDBdjQqpyn4PKr8vV9yDsmIfiaOy46aaDITRKhicwl4SvFH1icZozSmOp2LqdJDb30ibsabzPmxr28A/132",
    },
    {
      nickname: "王博华 15253311151",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ernNUoibsFjCLHymxHV7gkhic4vQhqT9ZXUsuNrcPwYHQjHmSI5jJTUQXcc96icHzYdrLrItVA2AMasg/132",
    },
    {
      nickname: "🦉超壹传媒cc",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLCvItxibdyKDV4JeEWwiarhnjPmHbkBYiacw8brvnxoo2lbmd9VgyFtAic4Ha7GYI6QGhOBIhamK2A4w/132",
    },
    {
      nickname: "黄昊阳",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erZqsrOEQpL3VqcfzZy6dTMiacZWfyVJhYvLjfokZ4Egib5ySicsMSCQyEXudtBiatMialU3zo4e5uiaFag/132",
    },
    {
      nickname: "momo",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM48HoEF4aGpwAqA3Sg74Qg6Vu913D35hX1CrcQVVoRw5BUc27HpiaOldahAjUHKg6bn2a7Ta184kuQ/132",
    },
    {
      nickname: "嗨森",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ermWwdMAZbNnB6SHZGcEGsBtyBo9u6wRkrE6KCOIMKC5yFnRZfkbYR1H2HzW7AUPf3wWZS8qYNd8A/132",
    },
    {
      nickname: "搁浅的人",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/CS6eiclYqhdRtrKH1pejWMYzibTF6Xvmoc9oOOHnyTmIRWe7L9ibxSxtTjRbZORQ0plFNNlXCC3kmiamnZbw3icRL6A/132",
    },
    {
      nickname: "bill",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIznHBXemnMxmD97wqBib0iawtH9mOLrNnwEpI5iaJCJ1zsZ7krH7sEYkIm5mianwjysRsocy0ia0EUSpw/132",
    },
    {
      nickname: "张欢Joan",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIo0NrDnZbJDMwkzf16H3hSGyD5dnc5RiaRGqG9BEQIR2knicjbrXPcGXaz4AvIcTQefyTf8waNqzDg/132",
    },
    {
      nickname: "°Tracy-McGrady👈",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/dicU2DzHQsjNNHicCDDeVI6eC90hic84ytCUu4hlwBG1OhKTXyQj0ooGqvubb9fopiclEZKlwfDL7H5sEf5X5Pk9dA/132",
    },
    {
      nickname: "陈丽娟17773055850",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/LzBl3yLT7CreE2Tf56DISNm6g0q0IdGpwwTBOC8wctYEuCsNXRgegXeM5ekCG5Rhhfy8k9rA6YqyibOibibdbIjtw/132",
    },
    {
      nickname: "孽缘",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJp8jlSaS1S7vsYVKXxDWVd4cpCwgZfq1X9sd1caRW99nahX4YTYiaA67xkOV1RjnuKJHGKdXBWJzw/132",
    },
    {
      nickname: "李源",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epcUaNrHdyYOibghjicpzafZ4UZX5dbBvwb4LYicibIlibGZcbjKIjOYq3wSReug0K0OeMvKeK9VByBr2A/132",
    },
    {
      nickname: "荔荔",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/p1ZbI9c1Rwrsu6rPeLyEaPpMsbQiagKYHuxmLFbwZNmTgaouTXw3wK33iaPsV4d1AGhy5NcG065MUxuS5avwhc2A/132",
    },
    {
      nickname: "肖琤",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep9XrglR5C13k5C3YmWD4sqkLpNOYNt3hdEzKratSx1HcQr1HgLD0Xlgcb01Q66vgbDxDqIbA3jaQ/132",
    },
    {
      nickname: "滕肉肉🍥Yuri酱",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoEdDOib3raYNEHhrtR5cvgKbxtTibAbUrlHMibiaicX46xjwtoLv73dvcF6GhRw0QGSVMib8CWSFcaVekw/132",
    },
    {
      nickname: "张伟",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKs0tNLMmeErRDXMInCsh5JN8aLYK6icDvVsBmWe2F7QSAxIpLc36I4cMHWbCkvzvSlfN0WMDVuyQA/132",
    },
    {
      nickname: "元一",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLy0r11sJBpp0t4WMeuuLJhJ6x31zcib0vh6FzbLNQllG67AGzwYC469GgiaujcxGF4msq1Yl43tGkA/132",
    },
    {
      nickname: "天良",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJdLRNWVLrr4dx2iazlg8yIyna6qKJ0koqmPtHUtPp7OGPSTia7e48EQ8ia3wrQMNRnBJTlHq7OSGfmA/132",
    },
    {
      nickname: "无忧🍂",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJJAbbmbKTjCr7I6IbvX7d5oiaz65C3Kc6uibo0ic37Cm00BbiaJEcAZ8fqRUM7V7mne4DTIibhdzZU5og/132",
    },
    {
      nickname: "秦歌",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erNTb8vFvwAaIyGNs4P5s7o4NjEV2eUibpZTeKcSo9T3GqLuKKn4Cgw1g1bCcT51q22X54BkeoLLgA/132",
    },
    {
      nickname: "小叮当🎈",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/nicib8gqImzrC4Lr8bjOetdXicCOHI6HZEdglVh1jeqicMqf21QTfVm91TMvflp8YMSf4ZblaPDicIESZAMHXibiaIickQ/132",
    },
    {
      nickname: "Avery",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/6ZSKFP7FCBibZ0up13Mqgl9kfTMibXdKhc1ytTuxoHictR7iczZWGZoBV9mvbP0ypJ3Uffqn3dgHjCWqKokib8DUByw/132",
    },
    {
      nickname: "Y  J",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKOc4epzjCTkks6pibqVjiaxAPIccLicR3cOc3YDpXzia4ib0UFHOPFctG08Qdzicf3Jyic3ZkBEg4OWrWjg/132",
    },
    {
      nickname: "琳达",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJhF2keTvcWiaXKYaEV3ibN0sElcnIdic1bPrrWqiakefc9ATicxl2rlLcgHFgCfOsgPrEy8swib8W7FsIw/132",
    },
    {
      nickname: "涅槃。",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/zk1XSibWJENzf82Q2O109ygn3eguibSeU4lESxbweczbia1icUiaWT2wfic27HiamnHiaev7cohcDlscuJ9HX5eREEo9KA/132",
    },
    {
      nickname: "小马哥",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/0r5YrQ8eVkYnMb0yZzBicia1aECAkTbibrxxfyUjHCiaIeztX6JtRmhzUyqKjp7jXYLLC9kFF8tHwbvCdk0ibRjJpYA/132",
    },
    {
      nickname: "抖民科技💯💯",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eonom47UgryRzlGMry0iannoC63111WpjpWhic1l8yjP2S0UsuF8coB1FzJJPu9QmE91DO1K6AFeemw/132",
    },
    {
      nickname: "等",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEIkgMEdq7Kcge67fhpRCAlVlO1CyyAg7lJAjb7QA3J7LYicQXV05Af3tx9OygZSCARaiaXrQ4VR13fg/132",
    },
    {
      nickname: "A~蜜儿",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI4zFjdUbUD6wFGkw7lzEXVK1X3aQQhe7gesBT2MyTWWoCbUoKSWALibm1UNEWHyLVHIgRKLb2dQEQ/132",
    },
    {
      nickname: "沐林",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/TOJRylibkW2yhwxRicVewxD6jCPjBOar75OtptgO5ZHzQiaoqIs7LgWX7OB2vIMKiaIxZojOjMWHpLVdKYwiblicU59g/132",
    },
    {
      nickname: "ㅤ",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/rvQxUmekECgILK6ujickiajeOMxfELU6znpBG8dic3IEJnW8L6XvolPzoghZMcHSGBBPgtEAtppCHbF0kdU0deiaXA/132",
    },
    {
      nickname: "ㅤㅤ",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/fDtuicHPCoGbXhVrAWb2xsjpVeAT5h8icxlzJaicCiaRdwe2FgXiaEsSoJV3lmnPibAnShEg3q5sG3XoxThSLAU9dHPA/132",
    },
    {
      nickname: "X",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/hhSqSk1Gd1TVVMPCibqrB5Uf8qa970hgbIEcuqkw6XVjL58savkeJBE32vG7U1rTStxzBJ2WjwwYZyKEk1y7zDw/132",
    },
    {
      nickname: "💎朝朝💎",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJo19t8ZtXwk4POfZtiaHM5m5QUrQBT5PVr7nicLOWMA3EicyCd4lFWgG7pcFAkXzcSibXcCoiadLmZt1g/132",
    },
    {
      nickname: "Moran   🐱  cat",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIPaILq1Tq7aCPuniasicuia5pjHTEnd4icOYKJyr9C6IeiaYlO9ic9nmibwZQ5xHLHhREtogbWItSQJAHzg/132",
    },
    {
      nickname: "杨脱俗",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJdzQq1MmnHzEhKLlb1jPDhDmsmoG5DY2UwoQwgTaDNAbrVa02EMKq4A9DykEYSBVZGdpAmdnDcWw/132",
    },
    {
      nickname: "讨个晚安",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/VdwcS0Z82azXQKP2WTrwRIfYpiaialjLFr8qcTFSvx3vv6Fn4zETKa5sx9ibONCzTnywK52zgibWbTH4cVfwFqKgjw/132",
    },
    {
      nickname: "ㅤㅤㅤㅤ",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq3NMyialhNDcdNI4xGxycEicoQlzLVgzlQlkaN7iapt0ZECVrybultFhQQOIaqy0KJPooaxnSNSh1Nw/132",
    },
    {
      nickname: "阿巴阿巴",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/d8iagqXq1bWNR2Nibg3GicxJUXcZibL7L0HHOKMQKAtZxfWkiaxoGSPSKTVMqW8LlAkf1f9ewgiar5J2N4coxGsIIAbQ/132",
    },
    {
      nickname: "A_旧人不复🌞",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/S49eic03YuMTibcTUicIibyQuRbt9zsARun667ZVbF3IVMEseUC3EyOVvCRj6ibNib4tHticUib7EEPSvfgBHmNvbyemeg/132",
    },
    {
      nickname: "夏    天🍓",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ1rgwPYpiankCibbjAnVJb307TkQefW4zRZIVLbJmxfPl1BAUxFLWm9n9nfFbDBOD2R3I1Dt85yotg/132",
    },
    {
      nickname: "T哥哥",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erXhD8LUicSdrFaadwtjQ3nJeEN6y0C7HbQrfZTffSJ83KicDEblkXIXUqjFHBFZNA7Bx3v1BNzrlIQ/132",
    },
    {
      nickname: "l",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI8p21Ym6meC9e3k1AxkoEDlZz2RJgqVKFlwBY9KVaCPL8sZxmIXEWbBUSEV833Yqhe3wj10JZYLg/132",
    },
    {
      nickname: "长乐",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Ok9O43CskomsNEhSfejRKPTgpRab8ibRKzoXtueXmZhnP8ytHSyjRowyldbVSgRUnLY5WnuufHM3NancYNWw10Q/132",
    },
    {
      nickname: "Susu、",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK7lzKiadPtDv3DPw2uqPRsatOaWLbrFVO44ibQkVczum2HwQLDnKIicExseL3TlvWEJH59Pvsia7jlfw/132",
    },
    {
      nickname: "Yғᴏʀɪᴋ  N.",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/ibAZlEwB5f5tbGuZWt7W9aYprjWafdBtckuDH6ouBic6y1oY2UZXtwQRbUblPloPzIJ7lP6zia2ibwicu2amYhOgxzQ/132",
    },
    {
      nickname: "A·yangyang",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/k3t3FbiacN5oBcdltYW9Wo3PIhYhvmsIkmn2ib6GSuoOSy8KPW8zicB0pMl254KkhqTle6x7STzR1WbPdoN78icIew/132",
    },
    {
      nickname: "对方正在输入...",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/bvYl9Ax4UkIZCCbUE40JTTqagbAKSYh66jFHVfkics1oriagLZ4Zjq8K4tiaaLqsIcicO3oyWxgLVXL0O0cbDAOXsA/132",
    },
    {
      nickname: "A   朗朗🔅🦅",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKeg1ABFDjDTXm0kibuqeh46sGfmB6zV088H3ibw1uwRwIY8T3I3gcia07JSFAiaDb4nnjK9oM0s8sCeg/132",
    },
    {
      nickname: "喆贝勒",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/iaLBVibQxwvZEukv6n99lFtMFuaBPYiaJDsmHpBkttgdAGCvR8wTIFB2smkAvpcf1mia6Tsib91OkO6N7hBlzeiaQvZw/132",
    },
    {
      nickname: "九大爷",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/8mTxjpLQjcFGBk09eeHVR5IrORWTpJlHyXb8ENqTJj5TApPBtk8UjWrBw7xQ395WtVSw85q91h8ObIiaBFNoWaQ/132",
    },
    {
      nickname: "最初的 ぃ悸动",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/46AUkKhEV2b2ib222XB0x9MnYjCFw5OGbZqjjxGTwUUXbLHtdRYmFAWicicYUibX7eYElibF9xbMjdiap05FheNQh8GA/132",
    },
    {
      nickname: "布鲁布鲁楠~",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erGya3ugzy6JiafuBPOZhnQEdnicbqiaTfWiaBU8cEylicA0MH7zbE8oDcWJtCXO1gEK6bW9xKNfET4nYw/132",
    },
    {
      nickname: "80s",
      avatar:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/6flPEQadwnqUfHtBIsubuDvibzxZwuI3icDScqB4UrFBy2skVDxQCUvXxcTBLjcW8TVoGthLugnHGlI5g8fvicshw/132",
    },
  ],
});
const { users, activeIndex, war_box, ul_obj, liStyle, ulStyle, showMask, lotteryArray } = {
  ...toRefs(pageData),
};
watch(
  () => pageData.animateLR,
  (newVal) => {
    // return;
    if (!pageData.animateOff) return;
    if (newVal) {
      console.log("向左");
      pageData.animateDistance = pageData.ul_obj.scrollWidth - pageData.war_box.clientWidth;
    } else {
      console.log("向右");
      pageData.animateDistance = 0;
    }
    animationFun(pageData.ul_obj, -pageData.animateDistance);
  }
);
const start = () => {
  animationFun(pageData.ul_obj, -pageData.animateDistance)
  s_animation()
};
const stopLot = () => {
  pageData.showMask = true
  pageData.animateOff = false;
  clearInterval(pageData.timeObj);
  clearInterval(pageData.ul_obj.timeId);
  pageData.lotteryArray = pageData.users.slice(pageData.activeIndex, pageData.activeIndex + 5)
  pageData.activeIndex = null;
};
const initArray = async () => {
  if (pageData.war_box && pageData.ul_obj) {
    // 设置图片的大小
    let war_w = pageData.war_box.clientWidth;
    let war_h = pageData.war_box.clientHeight;
    let item_wh = Math.floor(war_h / pageData.liColNumber) - 20;
    pageData.liStyle.width = item_wh + "px";
    pageData.liStyle.height = item_wh + "px";
    await nextTick();
    // 设置动画距离,距离和步进这两个值都是初始化后就固定不变了,所以要改变的话就在初始的时候设置好
    pageData.animateDistance = pageData.ul_obj.scrollWidth - war_w;
    // 设置动画步进值,快慢
    pageData.animateStep = Math.ceil(pageData.animateDistance / pageData.animateStep);
    animationFun(pageData.ul_obj, -pageData.animateDistance);
  }
};
// 左右移动动画
const animationFun = (element, target = 0, fn) => {
  clearInterval(element.timeId);
  element.timeId = setInterval(function () {
    pageData.animateOff = true;
    let current = parseInt(getComputedStyle(element, null)["marginLeft"] || 0);
    let step = pageData.animateLR ? -pageData.animateStep : pageData.animateStep;
    current = current + step;
    if (pageData.animateLR) {
      current = Math.abs(current) >= Math.abs(target) ? target : current;
    } else {
      current = current >= target ? target : current;
    }
    element.style["marginLeft"] = current + "px";
    if (current != target) {
      pageData.animateOff = false;
    }
    if (pageData.animateOff) {
      clearInterval(element.timeId);
      setTimeout(() => {
        pageData.animateLR = !pageData.animateLR;
      }, 1000);
      if (fn) {
        fn();
      }
    }
  }, 100);
};
// 图片放大动画
const s_animation = () => {
  clearInterval(pageData.timeObj)
  pageData.timeObj = setInterval(() => {
    pageData.activeIndex = Math.round(Math.random() * pageData.users.length);
  }, 50);
}
onMounted(() => {
  initArray();
  s_animation()
});
</script>

<style scoped lang="less">
.content {
  width: 100vw;
  height: 100vh;
  background: radial-gradient(black, transparent);
}

.btn {
  text-align: center;
  padding: 20px 0;
  height: 100px;
  box-sizing: border-box;
  button {
    margin-left: 20px;
    font-size: 28px;
    border-radius: 30px;
    background: linear-gradient(90deg, #ffc107, #ff9800);
    padding: 10px 40px;
    color: #fff;
    border: none;
    &:active, &:hover {
      opacity: 0.4;
    }
    &:hover {
      opacity: 0.8;
    }
  }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;

  .img-bk {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  ul {
    position: absolute;
    top: 200px;
    width: 100%;
    height: 600px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
  }

  .item {
    width: 300px;
    height: 300px;
    color: #ffffff;
    font-size: 30px;
    text-align: center;
    position: relative;

    img:nth-of-type(1) {
      position: absolute;
      border-radius: 50%;
      width: 150px;
      height: 150px;
      top: 9%;
      left: 17%;
      border-radius: 50%;
    }

    .ani-rotate {
      position: absolute;
      width: 160px;
      height: 160px;
      top: 7%;
      left: 15%;
      animation: rotate-a 3s linear infinite;
    }

    p {
      position: absolute;
      width: 100%;
      height: 30%;
      bottom: -10px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-shadow: rgb(243 85 0) 1px 1px 20px, rgb(247 134 9) 0px 1px 20px, rgb(243 139 32) 1px 0px 20px, rgb(243 236 39 / 91%) 1px 1px 30px;

    }

    @keyframes rotate-a {
      0% {
        transform: rotate(0);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  }

  .img-close {
    position: absolute;
    top: 800px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.fx-r {
  display: flex;
  flex-flow: row wrap;
}

.fx-c {
  display: flex;
  flex-flow: column wrap;
}

.war {
  width: 100vw;
  height: calc(100vh - 100px - 50px);
  overflow: hidden;
  position: relative;

  ul {
    position: absolute;
    left: 0;
    height: 100%;
    align-content: flex-start;
    // animation: left-right 6s 1s linear infinite alternate;
  }

  li {
    align-items: center;
    padding: 10px;
    width: fit-content;
    display: inline-block;

    img {
      width: 100%;
      height: 100%;

      &:hover,
      &.scale {
        transform: scale(2);
      }
    }
  }
}
</style>
