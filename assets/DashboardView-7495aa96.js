import{d as n,r as _,p as r,l as u,o as t,f as l,n as e,h as i,F as c,q as g,s as y,t as h,c as p,w as v,v as b,x as a,R as $,i as k}from"./index-d0858e35.js";import{a as m}from"./loginGuild-003c10c1.js";const f=["src"],w={key:1},C=["onClick"],V=n({__name:"DashboardView",setup(z){const d=_("loading");return r("api").then(s=>d.value=s).catch(s=>{console.error(s),u().addError("Oops something went wrong and we cannot get your guilds list."),d.value="error"}),(s,P)=>(t(),l("div",{class:e(s.$style.discord_dashboard)},[d.value=="loading"?(t(),l("div",{key:0,class:e(s.$style.guilds_loading)}," Loading guilds... ",2)):d.value=="error"?(t(),l("div",{key:1,class:e(s.$style.guilds_load_error)}," Something went wrong! Try again ",2)):d.value.length!==0?(t(),l("div",{key:2,class:e(s.$style.guild_list)},[i("div",{class:e(s.$style.guild_list_title)},"Please choose a guild to setup",2),(t(!0),l(c,null,g(d.value,o=>(t(),l("div",{key:o.id},[i("div",{class:e(s.$style.guild)},[i("div",{class:e(s.$style.guild_desc)},[o.icon?(t(),l("img",{key:0,class:e(s.$style.guild_icon),src:`https://cdn.discordapp.com/icons/${o.id}/${o.icon}.png`,width:"40",height:"40"},null,10,f)):(t(),l("div",w,"N")),i("div",{class:e(s.$style.guild_name)},h(o.name),3)],2),o.bot_exists?(t(),p(a($),{key:0,class:e([s.$style.guild_setup,s.$style.green_button,s.$style.setup_button]),to:`/discord/guilds/${o.id}`},{default:v(()=>[b(" Set up ")]),_:2},1032,["class","to"])):(t(),l("div",{key:1,class:e([s.$style.guild_setup,s.$style.darkblue_button,s.$style.setup_button]),onClick:()=>{a(m)(o.id)}}," Login bot ",10,C))],2)]))),128))],2)):d.value.length==0?(t(),l("div",{key:3,class:e(s.$style.no_guild_alert)}," Oops you dont have any guilds ",2)):y("",!0)],2))}}),B="_hover_1_tlsd7_1",L="_hover_2_tlsd7_9",N="_discord_dashboard_tlsd7_17",S="_guild_list_tlsd7_17",D="_guild_tlsd7_17",E="_setup_button_tlsd7_17",G="_green_button_tlsd7_17",F="_darkblue_button_tlsd7_32",M="_guild_list_title_tlsd7_61",O="_guild_desc_tlsd7_80",R="_guild_icon_tlsd7_87",T={hover_1:B,hover_2:L,discord_dashboard:N,guild_list:S,guild:D,setup_button:E,green_button:G,darkblue_button:F,guild_list_title:M,guild_desc:O,guild_icon:R},q={$style:T},A=k(V,[["__cssModules",q]]);export{A as default};
