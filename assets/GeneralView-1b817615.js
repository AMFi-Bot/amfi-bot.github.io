import{d as $,z as B,A as j,r as A,C as g,o as i,c as E,w as C,h as r,t as h,v as n,f as v,F as S,p as G,n as d,q as k,D as P,E as H,G as L,a as f,H as V,g as N,j as M,I,T as O,i as D,J as R,K as z,M as q,N as F,P as J,L as K}from"./index-da9e7672.js";const Y={class:"title"},Q=["onClick"],U=["src"],W={key:1,class:"name"},X={key:2,class:"name"},Z={key:3,class:"value"},x=$({__name:"DropdownChooseComponent",props:{clickButtonTitle:{},dropdownContent:{},initChoosedElement:{},useChoosedElementAsTitle:{type:Boolean},refChoosedElement:{},position:{},elem_class:{},title_class:{},content_class:{},noHideOnClickContent:{type:Boolean},useArrow:{type:Boolean},arrowAnimationSide:{},disableArrowAnimation:{type:Boolean}},emits:["choose"],setup(y,{emit:t}){const s=y,l=B(()=>({position:s.position,elem_class:s.elem_class,title_class:s.title_class,content_class:s.content_class,noHideOnClickContent:s.noHideOnClickContent,useArrow:s.useArrow||!0,arrowAnimationSide:s.arrowAnimationSide,disableArrowAnimation:s.disableArrowAnimation})),{dropdownContent:o,refChoosedElement:a}=j(s),u=s.refChoosedElement&&a?a:A(g.cloneDeep(s.initChoosedElement||void 0));function w(_){if(!s.refChoosedElement||!(a!=null&&a.value))u.value=_,t("choose",g.cloneDeep(u.value));else{const m=_;t("choose",g.cloneDeep(m))}}return(_,m)=>(i(),E(L,P(H({...l.value})),{dropdownTitle:C(()=>[r("span",Y,h(_.useChoosedElementAsTitle&&n(u)?typeof n(u)=="string"?n(u):n(u).name:_.clickButtonTitle),1)]),default:C(()=>[(i(!0),v(S,null,G(n(o),e=>(i(),v("div",{class:d(["dropdown_content_elem",n(g).isEqual(n(u),e)&&"choosed"]),key:typeof e=="string"?e:e.name,onClick:c=>w(e)},[typeof e!="string"&&e.icon?(i(),v("img",{key:0,class:"icon",src:e.icon},null,8,U)):k("",!0),typeof e!="string"&&e.name?(i(),v("span",W,h(e.name),1)):k("",!0),typeof e=="string"?(i(),v("span",X,h(e),1)):k("",!0),typeof e!="string"&&e.value?(i(),v("span",Z,h(e.value),1)):k("",!0)],10,Q))),128))]),_:1},16))}}),ee={class:"title"},se=["onClick"],oe={class:"element"},ne=["src"],te={key:1,class:"name"},le={key:2,class:"name"},ae={key:3,class:"value"},ie=$({__name:"DropdownCheckboxComponent",props:{clickButtonTitle:{},dropdownContent:{},initChoosed:{},refChoosedElements:{},position:{},elem_class:{},title_class:{},content_class:{},noHideOnClickContent:{type:Boolean},useArrow:{type:Boolean},arrowAnimationSide:{},disableArrowAnimation:{type:Boolean}},emits:["choose"],setup(y,{emit:t}){const s=y,l=B(()=>({position:s.position,elem_class:s.elem_class,title_class:s.title_class,content_class:s.content_class,noHideOnClickContent:s.noHideOnClickContent,useArrow:s.useArrow||!0,arrowAnimationSide:s.arrowAnimationSide,disableArrowAnimation:s.disableArrowAnimation})),{dropdownContent:o,refChoosedElements:a}=j(s),u=s.refChoosedElements&&a&&typeof a.value<"u"?a:A(g.cloneDeep(s.initChoosed||[]));function w(_){const m=e=>(e=g.cloneDeep(e),e.filter(c=>g.isEqual(c,_))[0]?e=e.filter(c=>!g.isEqual(c,_)):e.push(_),e);if(!(a!=null&&a.value)||typeof a.value>"u")u.value=m(u.value),t("choose",g.cloneDeep(u.value));else{const e=m(a.value||[]);t("choose",g.cloneDeep(e))}}return(_,m)=>(i(),E(L,P(H({...l.value})),{dropdownTitle:C(()=>[r("span",ee,h(_.clickButtonTitle),1)]),default:C(()=>[(i(!0),v(S,null,G(n(o),e=>(i(),v("div",{class:"dropdown_content_elem",key:typeof e=="string"?e:e.name,onClick:c=>w(e)},[r("i",{class:d(["checkbox",n(u).filter(c=>n(g).isEqual(c,e))[0]?"checked":"unchecked"])},null,2),r("div",oe,[typeof e!="string"&&e.icon?(i(),v("img",{key:0,class:"icon",src:e.icon},null,8,ne)):k("",!0),typeof e=="string"?(i(),v("span",te,h(e),1)):(i(),v("span",le,h(e.name),1)),typeof e!="string"&&e.value?(i(),v("span",ae,h(e.value),1)):k("",!0)])],8,se))),128))]),_:1},16))}}),re=$({__name:"BaseInstance",props:{instanceName:{},instanceDescription:{},instanceBaseClass:{},instanceAboutClass:{},instanceBodyClass:{},hiddenable:{type:Boolean}},setup(y){const t=y,s=B(()=>t.hiddenable||!0),l=A(!s.value);return(o,a)=>(i(),v("div",{class:d([o.$style.instance,o.instanceBaseClass])},[r("div",{class:d([o.$style.instance_title,o.instanceAboutClass]),onClick:a[0]||(a[0]=u=>s.value&&(l.value=!l.value))},[r("h2",{class:d(o.$style.title)},h(o.instanceName),3),r("p",{class:d(o.$style.description)},h(o.instanceDescription),3),r("div",{class:d(o.$style.dropdown_arrow)},[f(V,{"arrow-state-show":l.value,"arrow-animation-side":"left",width:"3px","side-size":"12px","animation-speed":"400ms"},null,8,["arrow-state-show"])],2)],2),f(O,null,{default:C(()=>[N(r("div",{class:d([o.$style.instance_body,o.instanceBodyClass])},[M(o.$slots,"default",{},void 0,!0)],2),[[I,l.value]])]),_:3})],2))}});const de="_hover_1_5kjng_1",ce="_hover_2_5kjng_9",ue="_instance_5kjng_17",_e="_row_5kjng_25",pe="_instance_title_5kjng_29",ve="_title_5kjng_39",he="_description_5kjng_43",me="_dropdown_arrow_5kjng_47",ge="_instance_body_5kjng_52",ye={hover_1:de,hover_2:ce,instance:ue,row:_e,instance_title:pe,title:ve,description:he,dropdown_arrow:me,instance_body:ge},Ce={$style:ye},fe=D(re,[["__cssModules",Ce],["__scopeId","data-v-d9647f2a"]]),we=$({__name:"SaveChanges",setup(y){const t=A(!1),s=A(),l=B({get(){return t.value},set(e){e?(t.value&&(clearTimeout(s.value),s.value=void 0),t.value=!0,s.value=setTimeout(()=>t.value=!1,820)):t.value=!1}}),o=R(),{guild:a,oldGuild:u}=z(o),{syncGuild:w,resetGuildChanges:_}=o,m=B(()=>!(!(a.value&&u.value)||g.isEqual(a.value,u.value)));return q(()=>{if(m.value)return l.value=!0,!1}),(e,c)=>(i(),E(O,null,{default:C(()=>[N(r("div",{class:d([e.$style.saveChangesAlert,l.value&&e.$style["unsaved-changes-shake"]])},[r("div",{class:d(e.$style.unsavedText),onClick:c[0]||(c[0]=p=>l.value=!0)}," Careful! You have unsaved changes ",2),r("div",{class:d(e.$style.saveButtons)},[r("div",{class:d(e.$style.resetChangesButton),onClick:c[1]||(c[1]=(...p)=>n(_)&&n(_)(...p))}," Reset ",2),r("div",{class:d(e.$style.saveChangesButton),onClick:c[2]||(c[2]=(...p)=>n(w)&&n(w)(...p))}," Save changes ",2)],2)],2),[[I,m.value]])]),_:1}))}}),$e="_hover_1_1c3ge_1",ke="_hover_2_1c3ge_9",Be="_saveChangesAlert_1c3ge_17",be="_saveButtons_1c3ge_17",Ae="_saveChangesButton_1c3ge_17",Ee="_unsavedText_1c3ge_45",De="_resetChangesButton_1c3ge_54",Te="_shake_1c3ge_1",Se={hover_1:$e,hover_2:ke,saveChangesAlert:Be,saveButtons:be,saveChangesButton:Ae,unsavedText:Ee,resetChangesButton:De,"unsaved-changes-shake":"_unsaved-changes-shake_1c3ge_72",shake:Te};const Me={$style:Se},je=D(we,[["__cssModules",Me],["__scopeId","data-v-b3afed63"]]),Ge=$({__name:"BaseModule",props:{moduleName:{},moduleDescriprion:{},moduleBaseClass:{},moduleAboutClass:{},moduleBodyClass:{}},setup(y){return(t,s)=>(i(),v(S,null,[r("div",{class:d(["discord-guild-module",[t.$style.module,t.moduleBaseClass]])},[r("div",{class:d([t.$style.module_about,t.moduleAboutClass])},[r("h1",null,h(t.moduleName),1),r("p",null,h(t.moduleDescriprion),1)],2),r("div",{class:d([t.$style.module_body,t.moduleBodyClass])},[M(t.$slots,"default")],2)],2),f(je)],64))}}),Pe="_hover_1_1n47n_1",He="_hover_2_1n47n_9",Le="_module_1n47n_17",Ne="_module_about_1n47n_23",Ie="_module_body_1n47n_43",Oe={hover_1:Pe,hover_2:He,module:Le,module_about:Ne,module_body:Ie};const Re={$style:Oe},ze=D(Ge,[["__cssModules",Re]]),Ve=$({__name:"BaseElement",props:{elementTitle:{},elementDescription:{},elementBaseClass:{},elementAboutClass:{},elementBodyClass:{},flexDirection:{},justifyContent:{}},setup(y){const t=y,s=B(()=>t.flexDirection||"row"),l=B(()=>t.justifyContent||(s.value==="column"?"flex-start":"space-between"));return(o,a)=>(i(),v("div",{class:d(o.$style.element),style:F({flexDirection:s.value,justifyContent:l.value})},[r("div",{class:d(o.$style.element_title)},[r("span",{class:d(o.$style.title)},h(o.elementTitle),3),o.elementDescription?(i(),v("span",{key:0,class:d(o.$style.description)},h(o.elementDescription),3)):k("",!0)],2),r("div",{class:d(o.$style.element_body)},[M(o.$slots,"default")],2)],6))}}),qe="_hover_1_p9nfd_1",Fe="_hover_2_p9nfd_9",Je="_element_p9nfd_17",Ke="_row_p9nfd_25",Ye="_sbtw_p9nfd_29",Qe="_element_title_p9nfd_32",Ue="_title_p9nfd_39",We="_description_p9nfd_43",Xe={hover_1:qe,hover_2:Fe,element:Je,row:Ke,sbtw:Ye,element_title:Qe,title:Ue,description:We},Ze={$style:Xe},T=D(Ve,[["__cssModules",Ze]]),xe={key:0},es={key:1,style:{width:"100px",height:"100px","align-self":"center"}},ss=$({__name:"GeneralModule",setup(y){const t=[{name:"messageCreate",id:"messageCreate"}],s=R(),{guild:l,discordGuild:o}=z(s),{loadGuild:a,loadDiscordGuild:u,updateModuleProperty:w}=s,_=J(),m=typeof _.params.guild_id=="string"?_.params.guild_id:_.params.guild_id.join("");return l.value||a(m),o.value||u(m),(e,c)=>(i(),E(ze,{"module-name":"General","module-descriprion":`        Bot general settings module. Here you can configure most of the
        important settings on your server.`},{default:C(()=>[n(o)&&n(l)?(i(),v("div",xe,[f(fe,{"instance-name":"Logs","instance-description":"Here you can setup logs sending by bot"},{default:C(()=>[f(T,{"element-title":"Log channel:","element-description":"Please choose a log channel where bot may send logs"},{default:C(()=>[f(x,{clickButtonTitle:"Choose a channel",useChoosedElementAsTitle:!0,refChoosedElement:n(o).channels.filter(p=>p.id===(n(l)&&n(l).module_general?n(l).module_general.logChannel:void 0))[0],position:"bottom-right",dropdownContent:n(o).channels.filter(p=>p.type===0),onChoose:c[0]||(c[0]=p=>{n(s).updateModuleProperty("general","logChannel",typeof p=="string"?p:p.id)})},null,8,["refChoosedElement","dropdownContent"])]),_:1}),f(T,{"element-title":"Log types:","element-description":"Please select types of logs to handle:"},{default:C(()=>[f(ie,{clickButtonTitle:"Choose types",refChoosedElements:n(l).module_general.logTypes?n(l).module_general.logTypes.map(p=>t.find(b=>b.id===p)||p):[],dropdownContent:t,position:"bottom-right","no-hide-on-click-content":!0,onChoose:c[1]||(c[1]=p=>{n(s).updateModuleProperty("general","logTypes",p.map(b=>typeof b=="string"?b:b.id))})},null,8,["refChoosedElements"])]),_:1}),f(T,{"element-title":"Log state:"},{default:C(()=>[r("div",{class:d(["state_checkbox",n(l).module_general.logEnabled?"enabled":"disabled"]),onClick:c[2]||(c[2]=p=>n(l)&&n(l).module_general&&(n(l).module_general.logEnabled?n(w)("general","logEnabled",!1):n(w)("general","logEnabled",!0)))},null,2)]),_:1})]),_:1})])):(i(),v("div",es,[f(K,{"loader-type":"line"})]))]),_:1},8,["module-descriprion"]))}}),ns=$({__name:"GeneralView",setup(y){return(t,s)=>(i(),E(ss))}});export{ns as default};
