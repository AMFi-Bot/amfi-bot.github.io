import{d as w,y as k,z as B,A as S,B as g,o as a,c as b,h as y,f as i,t as v,b as n,e as p,s as j,n as d,i as $,F as T,C as G,E as P,G as H,g as f,H as z,I as L,J as N,K as M,L as O,k as E,v as I,M as x,N as R,O as V,P as q}from"./index.3ce6f5ab.js";const F={class:"title"},J=["onClick"],K=["src"],Y={key:1,class:"name"},Q={key:2,class:"name"},U={key:3,class:"value"},W=w({__name:"DropdownChooseComponent",props:{clickButtonTitle:null,dropdownContent:null,initChoosedElement:null,useChoosedElementAsTitle:{type:Boolean},refChoosedElement:null,position:null,elem_class:null,title_class:null,content_class:null,noHideOnClickContent:{type:Boolean},useArrow:{type:Boolean},arrowAnimationSide:null,disableArrowAnimation:{type:Boolean}},emits:["choose"],setup(t,{emit:l}){const s=t;k(!1);const o=B(()=>({position:s.position,elem_class:s.elem_class,title_class:s.title_class,content_class:s.content_class,noHideOnClickContent:s.noHideOnClickContent,useArrow:s.useArrow||!0,arrowAnimationSide:s.arrowAnimationSide,disableArrowAnimation:s.disableArrowAnimation})),{dropdownContent:r,refChoosedElement:u}=S(s),_=s.refChoosedElement&&u?u:k(g.cloneDeep(s.initChoosedElement||void 0));function C(m){if(!s.refChoosedElement||!u)_.value=m,l("choose",g.cloneDeep(_.value));else{const h=m;l("choose",g.cloneDeep(h))}}return(m,h)=>(a(),b(H,G(P({...n(o)})),{dropdownTitle:y(()=>[i("span",F,v(t.useChoosedElementAsTitle&&n(_)?typeof n(_)=="string"?n(_):n(_).name:t.clickButtonTitle),1)]),default:y(()=>[(a(!0),p(T,null,j(n(r),e=>(a(),p("div",{class:d(["dropdown_content_elem",n(g).isEqual(n(_),e)&&"choosed"]),key:typeof e=="string"?e:e.name,onClick:c=>C(e)},[typeof e!="string"&&e.icon?(a(),p("img",{key:0,class:"icon",src:e.icon},null,8,K)):$("",!0),typeof e!="string"&&e.name?(a(),p("span",Y,v(e.name),1)):$("",!0),typeof e=="string"?(a(),p("span",Q,v(e),1)):$("",!0),typeof e!="string"&&e.value?(a(),p("span",U,v(e.value),1)):$("",!0)],10,J))),128))]),_:1},16))}}),X={class:"title"},Z=["onClick"],ee={class:"element"},se=["src"],ne={key:1,class:"name"},oe={key:2,class:"name"},te={key:3,class:"value"},le=w({__name:"DropdownCheckboxComponent",props:{clickButtonTitle:null,dropdownContent:null,initChoosed:null,refChoosedElements:null,position:null,elem_class:null,title_class:null,content_class:null,noHideOnClickContent:{type:Boolean},useArrow:{type:Boolean},arrowAnimationSide:null,disableArrowAnimation:{type:Boolean}},emits:["choose"],setup(t,{emit:l}){const s=t;k(!1);const o=B(()=>({position:s.position,elem_class:s.elem_class,title_class:s.title_class,content_class:s.content_class,noHideOnClickContent:s.noHideOnClickContent,useArrow:s.useArrow||!0,arrowAnimationSide:s.arrowAnimationSide,disableArrowAnimation:s.disableArrowAnimation})),{dropdownContent:r,refChoosedElements:u}=S(s),_=s.refChoosedElements&&u&&typeof u.value<"u"?u:k(g.cloneDeep(s.initChoosed||[]));function C(m){const h=e=>(e=g.cloneDeep(e),e.filter(c=>g.isEqual(c,m))[0]?e=e.filter(c=>!g.isEqual(c,m)):e.push(m),e);if(!u||typeof u.value>"u")_.value=h(_.value),l("choose",g.cloneDeep(_.value));else{const e=h(u.value||[]);l("choose",g.cloneDeep(e))}}return(m,h)=>(a(),b(H,G(P({...n(o)})),{dropdownTitle:y(()=>[i("span",X,v(t.clickButtonTitle),1)]),default:y(()=>[(a(!0),p(T,null,j(n(r),e=>(a(),p("div",{class:"dropdown_content_elem",key:typeof e=="string"?e:e.name,onClick:c=>C(e)},[i("i",{class:d(["checkbox",n(_).filter(c=>n(g).isEqual(c,e))[0]?"checked":"unchecked"])},null,2),i("div",ee,[typeof e!="string"&&e.icon?(a(),p("img",{key:0,class:"icon",src:e.icon},null,8,se)):$("",!0),typeof e=="string"?(a(),p("span",ne,v(e),1)):(a(),p("span",oe,v(e.name),1)),typeof e!="string"&&e.value?(a(),p("span",te,v(e.value),1)):$("",!0)])],8,Z))),128))]),_:1},16))}}),ae=w({__name:"BaseInstance",props:{instanceName:null,instanceDescription:null,instanceBaseClass:null,instanceAboutClass:null,instanceBodyClass:null,hiddenable:{type:Boolean}},setup(t){const l=t,s=B(()=>l.hiddenable||!0),o=k(!s.value);return(r,u)=>(a(),p("div",{class:d([r.$style.instance,t.instanceBaseClass])},[i("div",{class:d([r.$style.instance_title,t.instanceAboutClass]),onClick:u[0]||(u[0]=_=>n(s)&&(o.value=!o.value))},[i("h2",{class:d(r.$style.title)},v(t.instanceName),3),i("p",{class:d(r.$style.description)},v(t.instanceDescription),3),i("div",{class:d(r.$style.dropdown_arrow)},[f(z,{"arrow-state-show":o.value,"arrow-animation-side":"left",width:"3px","side-size":"12px","animation-speed":"400ms"},null,8,["arrow-state-show"])],2)],2),f(O,null,{default:y(()=>[L(i("div",{class:d([r.$style.instance_body,t.instanceBodyClass])},[M(r.$slots,"default",{},void 0,!0)],2),[[N,o.value]])]),_:3})],2))}});const ie="_hover_1_5kjng_1",re="_hover_2_5kjng_9",de="_instance_5kjng_17",ce="_row_5kjng_25",ue="_instance_title_5kjng_29",_e="_title_5kjng_39",pe="_description_5kjng_43",he="_dropdown_arrow_5kjng_47",ve="_instance_body_5kjng_52",me={hover_1:ie,hover_2:re,instance:de,row:ce,instance_title:ue,title:_e,description:pe,dropdown_arrow:he,instance_body:ve},ge={$style:me},ye=E(ae,[["__cssModules",ge],["__scopeId","data-v-d9647f2a"]]),Ce=w({__name:"SaveChanges",setup(t){const l=k(!1),s=k(),o=B({get(){return l.value},set(e){e?(l.value&&(clearTimeout(s.value),s.value=void 0),l.value=!0,s.value=setTimeout(()=>l.value=!1,820)):l.value=!1}}),r=I(),{guild:u,oldGuild:_}=x(r),{syncGuild:C,resetGuildChanges:m}=r,h=B(()=>!(!(u.value&&_.value)||g.isEqual(u.value,_.value)));return R(()=>{if(h.value)return o.value=!0,!1}),(e,c)=>(a(),b(O,null,{default:y(()=>[L(i("div",{class:d([e.$style.saveChangesAlert,n(o)&&e.$style["unsaved-changes-shake"]])},[i("div",{class:d(e.$style.unsavedText),onClick:c[0]||(c[0]=A=>o.value=!0)}," Careful! You have unsaved changes ",2),i("div",{class:d(e.$style.saveButtons)},[i("div",{class:d(e.$style.resetChangesButton),onClick:c[1]||(c[1]=(...A)=>n(m)&&n(m)(...A))}," Reset ",2),i("div",{class:d(e.$style.saveChangesButton),onClick:c[2]||(c[2]=(...A)=>n(C)&&n(C)(...A))}," Save changes ",2)],2)],2),[[N,n(h)]])]),_:1}))}}),fe="_hover_1_1c3ge_1",we="_hover_2_1c3ge_9",$e="_saveChangesAlert_1c3ge_17",ke="_saveButtons_1c3ge_17",Be="_saveChangesButton_1c3ge_17",be="_unsavedText_1c3ge_45",Ae="_resetChangesButton_1c3ge_54",Ee="_shake_1c3ge_1",De={hover_1:fe,hover_2:we,saveChangesAlert:$e,saveButtons:ke,saveChangesButton:Be,unsavedText:be,resetChangesButton:Ae,"unsaved-changes-shake":"_unsaved-changes-shake_1c3ge_72",shake:Ee};const Te={$style:De},Me=E(Ce,[["__cssModules",Te],["__scopeId","data-v-b3afed63"]]),Se=w({__name:"BaseModule",props:{moduleName:null,moduleDescriprion:null,moduleBaseClass:null,moduleAboutClass:null,moduleBodyClass:null},setup(t){return(l,s)=>(a(),p(T,null,[i("div",{class:d(["discord-guild-module",[l.$style.module,t.moduleBaseClass]])},[i("div",{class:d([l.$style.module_about,t.moduleAboutClass])},[i("h1",null,v(t.moduleName),1),i("p",null,v(t.moduleDescriprion),1)],2),i("div",{class:d([l.$style.module_body,t.moduleBodyClass])},[M(l.$slots,"default")],2)],2),f(Me)],64))}}),je="_hover_1_1n47n_1",Ge="_hover_2_1n47n_9",Pe="_module_1n47n_17",He="_module_about_1n47n_23",Le="_module_body_1n47n_43",Ne={hover_1:je,hover_2:Ge,module:Pe,module_about:He,module_body:Le};const Oe={$style:Ne},Ie=E(Se,[["__cssModules",Oe]]),xe=w({__name:"BaseElement",props:{elementTitle:null,elementDescription:null,elementBaseClass:null,elementAboutClass:null,elementBodyClass:null,flexDirection:null,justifyContent:null},setup(t){const l=t,s=B(()=>l.flexDirection||"row"),o=B(()=>l.justifyContent||(s.value==="column"?"flex-start":"space-between"));return(r,u)=>(a(),p("div",{class:d(r.$style.element),style:V({flexDirection:n(s),justifyContent:n(o)})},[i("div",{class:d(r.$style.element_title)},[i("span",{class:d(r.$style.title)},v(t.elementTitle),3),t.elementDescription?(a(),p("span",{key:0,class:d(r.$style.description)},v(t.elementDescription),3)):$("",!0)],2),i("div",{class:d(r.$style.element_body)},[M(r.$slots,"default")],2)],6))}}),ze="_hover_1_p9nfd_1",Re="_hover_2_p9nfd_9",Ve="_element_p9nfd_17",qe="_row_p9nfd_25",Fe="_sbtw_p9nfd_29",Je="_element_title_p9nfd_32",Ke="_title_p9nfd_39",Ye="_description_p9nfd_43",Qe={hover_1:ze,hover_2:Re,element:Ve,row:qe,sbtw:Fe,element_title:Je,title:Ke,description:Ye},Ue={$style:Qe},D=E(xe,[["__cssModules",Ue]]),We={key:0},Xe=w({__name:"GeneralModule",setup(t){const l=[{name:"messageCreate",id:"messageCreate"}],s=I(),{guild:o,loading:r}=x(s),{loadModule:u,updateModule:_,updateModuleProperty:C}=s;if(!o)throw Error("Guild not loaded");return o.value&&!o.value.module_general&&u("general"),(m,h)=>(a(),b(Ie,{"module-name":"General","module-descriprion":`        Bot general settings module. Here you can configure most of the
        important settings on your server.`},{default:y(()=>[n(o)&&n(o).module_general?(a(),p("div",We,[f(ye,{"instance-name":"Logs","instance-description":"Here you can setup logs sending by bot"},{default:y(()=>[f(D,{"element-title":"Log channel:","element-description":"Please choose a log channel where bot may send logs"},{default:y(()=>[f(W,{clickButtonTitle:"Choose a channel",useChoosedElementAsTitle:!0,refChoosedElement:n(o).channels.filter(e=>e.id===(n(o)&&n(o).module_general?n(o).module_general.logChannel:void 0))[0],position:"bottom-right",dropdownContent:n(o).channels.filter(e=>e.type===0),onChoose:h[0]||(h[0]=e=>{n(s).updateModuleProperty("general","logChannel",typeof e=="string"?e:e.id)})},null,8,["refChoosedElement","dropdownContent"])]),_:1}),f(D,{"element-title":"Log types:","element-description":"Please select types of logs to handle:"},{default:y(()=>[f(le,{clickButtonTitle:"Choose types",refChoosedElements:n(o).module_general.logTypes?n(o).module_general.logTypes.map(e=>l.find(c=>c.id===e)||e):[],dropdownContent:l,position:"bottom-right","no-hide-on-click-content":!0,onChoose:h[1]||(h[1]=e=>{n(s).updateModuleProperty("general","logTypes",e.map(c=>typeof c=="string"?c:c.id))})},null,8,["refChoosedElements"])]),_:1}),f(D,{"element-title":"Log state:"},{default:y(()=>[i("div",{class:d(["state_checkbox",n(o).module_general.logEnabled?"enabled":"disabled"]),onClick:h[2]||(h[2]=e=>n(o)&&n(o).module_general&&(n(o).module_general.logEnabled?n(C)("general","logEnabled",!1):n(C)("general","logEnabled",!0)))},null,2)]),_:1})]),_:1})])):(a(),b(q,{key:1,"loader-type":"dotted"}))]),_:1},8,["module-descriprion"]))}}),es=w({__name:"GeneralView",setup(t){return(l,s)=>(a(),b(Xe))}});export{es as default};
