import{useDiscordGuildStore as e}from"./discordGuild-7fefc472.js";import{d as s,z as i,r as a}from"./index-bbf8b0ea.js";import"./loadUserGuilds-9c6c8c8e.js";const m=s({__name:"DashboardView",setup(d){const o=e(),r=i().params.guild_id,t=typeof r=="string"?r:r[0];return a(o.getGuild(t)),(n,u)=>"Dashboard"}});export{m as default};
