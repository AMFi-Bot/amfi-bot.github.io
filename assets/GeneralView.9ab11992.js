import{d as b,v as m,x as B,_,y as k,e as i,f as s,n as w,t as p,b as n,F as D,p as T,z as x,A as L,o as a,h as f,q as S,B as A,C as $,c as G,L as M}from"./index.ae03d8e4.js";const P={class:"dropdown_elem"},V={class:"title"},F={class:"dropdown_content"},N=["onClick"],q=["src"],z={key:1,class:"name"},H={key:2,class:"name"},R={key:3,class:"value"},j=b({__name:"DropdownComponent",props:{clickButtonTitle:null,dropdownContent:null,initChoosedElement:null,useChoosedElementAsTitle:{type:Boolean},refChoosedElement:null},emits:["choose"],setup(v,{emit:h}){const c=v,o=m(!1),{dropdownContent:C,refChoosedElement:u}=B(c),r=c.refChoosedElement&&u?u:m(_.cloneDeep(c.initChoosedElement||void 0));function g(d){if(!c.refChoosedElement||!u)r.value=d,h("choose",_.cloneDeep(r.value));else{const t=d;h("choose",_.cloneDeep(t))}}function y(){o.value=!1}return(d,t)=>{const l=L("click-away");return k((a(),i("div",P,[s("div",{class:"dropdown_title",onClick:t[0]||(t[0]=e=>o.value=!o.value),onFocusout:t[1]||(t[1]=e=>o.value=!o.value)},[s("i",{class:w(["dropdown_arrow",o.value?"dropdown_arrow_shown":"dropdown_arrow_hidden"])},null,2),s("span",V,p(v.useChoosedElementAsTitle&&n(r)?typeof n(r)=="string"?n(r):n(r).name:v.clickButtonTitle),1)],32),k(s("div",F,[(a(!0),i(D,null,T(n(C),e=>(a(),i("div",{class:w(["dropdown_content_elem",n(_).isEqual(n(r),e)&&"choosed"]),key:typeof e=="string"?e:e.name,onClick:E=>g(e)},[typeof e!="string"&&e.icon?(a(),i("img",{key:0,class:"icon",src:e.icon},null,8,q)):f("",!0),typeof e!="string"&&e.name?(a(),i("span",z,p(e.name),1)):f("",!0),typeof e=="string"?(a(),i("span",H,p(e),1)):f("",!0),typeof e!="string"&&e.value?(a(),i("span",R,p(e.value),1)):f("",!0)],10,N))),128))],512),[[x,o.value]])])),[[l,y]])}}}),I={class:"dropdown_elem"},J={class:"title"},K={class:"dropdown_content"},O=["onClick"],Q={class:"element"},U=["src"],W={key:1,class:"name"},X={key:2,class:"name"},Y={key:3,class:"value"},Z=b({__name:"DropdownCheckboxComponent",props:{clickButtonTitle:null,dropdownContent:null,initChoosed:null,refChoosedElements:null},emits:["choose"],setup(v,{emit:h}){const c=v,o=m(!1),{dropdownContent:C,refChoosedElements:u}=B(c),r=c.refChoosedElements&&u&&typeof u.value<"u"?u:m(_.cloneDeep(c.initChoosed||[]));function g(d){const t=l=>(l=_.cloneDeep(l),l.filter(e=>_.isEqual(e,d))[0]?l=l.filter(e=>!_.isEqual(e,d)):l.push(d),l);if(!u||typeof u.value>"u")r.value=t(r.value),h("choose",_.cloneDeep(r.value));else{const l=t(u.value||[]);h("choose",_.cloneDeep(l))}}function y(){o.value=!1}return(d,t)=>{const l=L("click-away");return k((a(),i("div",I,[s("div",{class:"dropdown_title",onClick:t[0]||(t[0]=e=>o.value=!o.value)},[s("i",{class:w(["dropdown_arrow",o.value?"dropdown_arrow_shown":"dropdown_arrow_hidden"])},null,2),s("span",J,p(v.clickButtonTitle),1)]),k(s("div",K,[(a(!0),i(D,null,T(n(C),e=>(a(),i("div",{class:"dropdown_content_elem",key:typeof e=="string"?e:e.name,onClick:E=>g(e)},[s("i",{class:w(["checkbox",n(r).filter(E=>n(_).isEqual(E,e))[0]?"checked":"unchecked"])},null,2),s("div",Q,[typeof e!="string"&&e.icon?(a(),i("img",{key:0,class:"icon",src:e.icon},null,8,U)):f("",!0),typeof e=="string"?(a(),i("span",W,p(e),1)):(a(),i("span",X,p(e.name),1)),typeof e!="string"&&e.value?(a(),i("span",Y,p(e.value),1)):f("",!0)])],8,O))),128))],512),[[x,o.value]])])),[[l,y]])}}}),ee={class:"general instance"},oe=s("div",{class:"about_instance"},[s("h1",null,"General"),s("p",null," Bot general settings module. Here you can configure most of the important settings on your server. ")],-1),se={key:0,class:"instance_config"},ne={class:"log_channel instance_elem column"},te=s("div",{class:"instance_elem_title"},[s("span",{class:"title"},"Logs"),s("span",{class:"description"},"Here you can setup logs sending by bot")],-1),le={class:"instance_sub_elem row sbtw"},ae=s("div",{class:"instance_sub_elem_title"},[s("span",{class:"title"},"Log channel:"),s("span",{class:"description"},"Please choose a log channel where bot may send logs")],-1),ie={class:"instance_sub_elem row sbtw"},de=s("div",{class:"instance_sub_elem_title"},[s("span",{class:"title"},"Log types:"),s("span",{class:"description"},"Please choose types of logs to handle:")],-1),ce={class:"instance_sub_elem row sbtw"},re=s("div",{class:"instance_sub_elem_title"},[s("span",{class:"title"},"Log state:")],-1),_e=b({__name:"GeneralView",setup(v){const h=[{name:"messageCreate",id:"messageCreate"}],c=S(),{guild:o,loading:C}=A(c),{loadModule:u,updateModule:r,updateModuleProperty:g}=c;if(!o)throw Error("Guild not loaded");return o.value&&!o.value.module_general&&u("general"),(y,d)=>(a(),i("div",ee,[oe,n(o)&&n(o).module_general?(a(),i("div",se,[s("div",ne,[te,s("div",le,[ae,$(j,{clickButtonTitle:"Choose a channel",useChoosedElementAsTitle:!0,refChoosedElement:n(o).channels.filter(t=>t.id===(n(o)&&n(o).module_general?n(o).module_general.logChannel:void 0))[0],dropdownContent:n(o).channels.filter(t=>t.type===0),onChoose:d[0]||(d[0]=t=>{n(c).updateModuleProperty("general","logChannel",typeof t=="string"?t:t.id)})},null,8,["refChoosedElement","dropdownContent"])]),s("div",ie,[de,$(Z,{clickButtonTitle:"Choose types",refChoosedElements:n(o).module_general.logTypes?n(o).module_general.logTypes.map(t=>h.find(l=>l.id===t)||t):[],dropdownContent:h,onChoose:d[1]||(d[1]=t=>{n(c).updateModuleProperty("general","logTypes",t.map(l=>typeof l=="string"?l:l.id))})},null,8,["refChoosedElements"])]),s("div",ce,[re,s("div",{class:w(["slider",n(o).module_general.logEnabled?"enabled":"disabled"]),onClick:d[2]||(d[2]=t=>n(o)&&n(o).module_general&&(n(o).module_general.logEnabled?n(g)("general","logEnabled",!1):n(g)("general","logEnabled",!0)))}," State: "+p(n(o).module_general.logEnabled?"enabled":"disabled")+" Click me! ",3)])])])):(a(),G(M,{key:1}))]))}});export{_e as default};
