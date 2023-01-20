import{l as n}from"./loadUserGuilds-62d26ffa.js";import{u as r}from"./jwt-dc6be0b0.js";import{b as _}from"./vue-router-1dd73624.js";import{a as u}from"./loginGuild-d01a31f7.js";import{d as c,p as g,o as e,c as o,n as t,b as i,F as y,r as p,H as h,t as b,f as m,w as v,a as $,u as a}from"./runtime-core.esm-bundler-3e803943.js";import{_ as k}from"./_plugin-vue_export-helper-c27b6911.js";import"./index-2ecccbb3.js";const f=["src"],w={key:1},C=["onClick"],V=c({__name:"DashboardView",setup(P){const d=g("loading");return n("bot").then(s=>d.value=s).catch(s=>{console.error(s),r().addError("Oops something went wrong and we cannot get your guilds list."),d.value="error"}),(s,R)=>(e(),o("div",{class:t(s.$style.discord_dashboard)},[d.value=="loading"?(e(),o("div",{key:0,class:t(s.$style.guilds_loading)}," Loading guilds... ",2)):d.value=="error"?(e(),o("div",{key:1,class:t(s.$style.guilds_load_error)}," Something went wrong! Try again ",2)):d.value.length!==0?(e(),o("div",{key:2,class:t(s.$style.guild_list)},[i("div",{class:t(s.$style.guild_list_title)},"Please choose a guild to setup",2),(e(!0),o(y,null,p(d.value,l=>(e(),o("div",{key:l.id},[i("div",{class:t(s.$style.guild)},[i("div",{class:t(s.$style.guild_desc)},[l.icon?(e(),o("img",{key:0,class:t(s.$style.guild_icon),src:`https://cdn.discordapp.com/icons/${l.id}/${l.icon}.png`,width:"40",height:"40"},null,10,f)):(e(),o("div",w,"N")),i("div",{class:t(s.$style.guild_name)},b(l.name),3)],2),l.bot_exists?(e(),m(a(_),{key:0,class:t([s.$style.guild_setup,s.$style.green_button,s.$style.setup_button]),to:`/discord/guilds/${l.id}`},{default:v(()=>[$(" Set up ")]),_:2},1032,["class","to"])):(e(),o("div",{key:1,class:t([s.$style.guild_setup,s.$style.darkblue_button,s.$style.setup_button]),onClick:()=>{a(u)(l.id)}}," Login bot ",10,C))],2)]))),128))],2)):d.value.length==0?(e(),o("div",{key:3,class:t(s.$style.no_guild_alert)}," Oops you dont have any guilds ",2)):h("",!0)],2))}}),B="_hover_1_tlsd7_1",L="_hover_2_tlsd7_9",N="_discord_dashboard_tlsd7_17",S="_guild_list_tlsd7_17",D="_guild_tlsd7_17",E="_setup_button_tlsd7_17",G="_green_button_tlsd7_17",F="_darkblue_button_tlsd7_32",M="_guild_list_title_tlsd7_61",O="_guild_desc_tlsd7_80",T="_guild_icon_tlsd7_87",z={hover_1:B,hover_2:L,discord_dashboard:N,guild_list:S,guild:D,setup_button:E,green_button:G,darkblue_button:F,guild_list_title:M,guild_desc:O,guild_icon:T},H={$style:z},Q=k(V,[["__cssModules",H]]);export{Q as default};