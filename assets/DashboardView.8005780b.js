/* empty css                  */import{d as m,u as g,a as u,b as t,e as i,f as s,n,c as r,g as c,h as p,r as h,o,i as _}from"./index.8630de63.js";const v="/img/tg_logo.svg",b="/img/discord_logo.svg",k={key:0,id:"dashboard",class:"dashboard"},f={class:"setupMessengers"},x={class:"setupMessenger setupTelegram"},L=s("div",{class:"msgDesc"},[s("h2",{class:"mainText"},"Set up Telegram"),s("img",{class:"msgLogo",src:v,width:"50",height:"50",alt:""}),s("p",{class:"desc"}," Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, impedit. ")],-1),y=_(" Set up "),C={key:1},D=s("div",{class:"telegram_login_mount"},[s("div",null,"Loading telegram authenticating...")],-1),M=[D],S={class:"setupMessenger setupDiscord"},w=s("div",{class:"msgDesc"},[s("h2",{class:"mainText"},"Set up Discord"),s("img",{class:"msgLogo",src:b,width:"70",height:"70",alt:"",style:{"margin-bottom":"-10px","margin-top":"-5px"}}),s("p",{class:"desc"}," Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, impedit. ")],-1),T=_(" Set up "),z=m({__name:"DashboardView",setup(B){const e=g();return e.telegram_id||u(()=>{e.load_telegram_widget_script("telegram_login_mount")}),(V,a)=>{const d=h("RouterLink");return t(e)?(o(),i("div",k,[s("div",f,[s("div",x,[L,s("div",{class:n(["setup_button",t(e).telegram_id?"green_button":""])},[t(e).telegram_id?(o(),r(d,{key:0,to:"/telegram/dashboard"},{default:c(()=>[y]),_:1})):(o(),i("div",C,M))],2)]),s("div",S,[w,s("div",{class:n(["setup_button",t(e).discord_id?"green_button":"darkblue_button"])},[t(e).discord_id?(o(),r(d,{key:0,to:"/discord/dashboard"},{default:c(()=>[T]),_:1})):(o(),i("div",{key:1,onClick:a[0]||(a[0]=(...l)=>t(e).login_discord&&t(e).login_discord(...l))}," Log In Discord and set up "))],2)])])])):p("",!0)}}});export{z as default};