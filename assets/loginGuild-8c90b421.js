import{b as t,u as e}from"./jwt-ffe93801.js";import{r as n}from"./index-77d425ef.js";async function l(o){const r=`localhost:6001/api/discord/guilds/auth/redirect?discordGuildId=${o}`,a=window.open(r,"","width=500,height=900");a&&(await new Promise(i=>{const s=setInterval(async()=>{a.closed&&(clearInterval(s),i(void 0))},500)}),n.push(`/discord/guilds/${o}`))}async function u(o){try{await t.get(`/api/discord/guilds/auth/callback?${o.replace(/^\?/,"")}`),window.close()}catch(r){console.error(r),e().addError("Oops something went wrong and we cannot load guild.")}}export{l as a,u as l};
