import{d as g,y as k,z as B,A as T,B as y,o as a,c as b,h as f,f as r,t as d,b as n,e as i,s as M,n as c,i as v,F as z,C as S,E as H,G as P,H as E,k as D,I as G,v as L,J as N,g as $,L as O}from"./index.9756dbd0.js";const j={class:"title"},V=["onClick"],x=["src"],I={key:1,class:"name"},R={key:2,class:"name"},F={key:3,class:"value"},q=g({__name:"DropdownChooseComponent",props:{clickButtonTitle:null,dropdownContent:null,initChoosedElement:null,useChoosedElementAsTitle:{type:Boolean},refChoosedElement:null,position:null,elem_class:null,title_class:null,content_class:null,noHideOnClickContent:{type:Boolean},useArrow:{type:Boolean},arrowAnimationSide:null,disableArrowAnimation:{type:Boolean}},emits:["choose"],setup(s,{emit:t}){const o=s;k(!1);const l=B(()=>({position:o.position,elem_class:o.elem_class,title_class:o.title_class,content_class:o.content_class,noHideOnClickContent:o.noHideOnClickContent,useArrow:o.useArrow||!0,arrowAnimationSide:o.arrowAnimationSide,disableArrowAnimation:o.disableArrowAnimation})),{dropdownContent:h,refChoosedElement:u}=T(o),_=o.refChoosedElement&&u?u:k(y.cloneDeep(o.initChoosedElement||void 0));function w(C){if(!o.refChoosedElement||!u)_.value=C,t("choose",y.cloneDeep(_.value));else{const p=C;t("choose",y.cloneDeep(p))}}return(C,p)=>(a(),b(P,S(H({...n(l)})),{dropdownTitle:f(()=>[r("span",j,d(s.useChoosedElementAsTitle&&n(_)?typeof n(_)=="string"?n(_):n(_).name:s.clickButtonTitle),1)]),default:f(()=>[(a(!0),i(z,null,M(n(h),e=>(a(),i("div",{class:c(["dropdown_content_elem",n(y).isEqual(n(_),e)&&"choosed"]),key:typeof e=="string"?e:e.name,onClick:m=>w(e)},[typeof e!="string"&&e.icon?(a(),i("img",{key:0,class:"icon",src:e.icon},null,8,x)):v("",!0),typeof e!="string"&&e.name?(a(),i("span",I,d(e.name),1)):v("",!0),typeof e=="string"?(a(),i("span",R,d(e),1)):v("",!0),typeof e!="string"&&e.value?(a(),i("span",F,d(e.value),1)):v("",!0)],10,V))),128))]),_:1},16))}}),J={class:"title"},K=["onClick"],Q={class:"element"},U=["src"],W={key:1,class:"name"},X={key:2,class:"name"},Y={key:3,class:"value"},Z=g({__name:"DropdownCheckboxComponent",props:{clickButtonTitle:null,dropdownContent:null,initChoosed:null,refChoosedElements:null,position:null,elem_class:null,title_class:null,content_class:null,noHideOnClickContent:{type:Boolean},useArrow:{type:Boolean},arrowAnimationSide:null,disableArrowAnimation:{type:Boolean}},emits:["choose"],setup(s,{emit:t}){const o=s;k(!1);const l=B(()=>({position:o.position,elem_class:o.elem_class,title_class:o.title_class,content_class:o.content_class,noHideOnClickContent:o.noHideOnClickContent,useArrow:o.useArrow||!0,arrowAnimationSide:o.arrowAnimationSide,disableArrowAnimation:o.disableArrowAnimation})),{dropdownContent:h,refChoosedElements:u}=T(o),_=o.refChoosedElements&&u&&typeof u.value<"u"?u:k(y.cloneDeep(o.initChoosed||[]));function w(C){const p=e=>(e=y.cloneDeep(e),e.filter(m=>y.isEqual(m,C))[0]?e=e.filter(m=>!y.isEqual(m,C)):e.push(C),e);if(!u||typeof u.value>"u")_.value=p(_.value),t("choose",y.cloneDeep(_.value));else{const e=p(u.value||[]);t("choose",y.cloneDeep(e))}}return(C,p)=>(a(),b(P,S(H({...n(l)})),{dropdownTitle:f(()=>[r("span",J,d(s.clickButtonTitle),1)]),default:f(()=>[(a(!0),i(z,null,M(n(h),e=>(a(),i("div",{class:"dropdown_content_elem",key:typeof e=="string"?e:e.name,onClick:m=>w(e)},[r("i",{class:c(["checkbox",n(_).filter(m=>n(y).isEqual(m,e))[0]?"checked":"unchecked"])},null,2),r("div",Q,[typeof e!="string"&&e.icon?(a(),i("img",{key:0,class:"icon",src:e.icon},null,8,U)):v("",!0),typeof e=="string"?(a(),i("span",W,d(e),1)):(a(),i("span",X,d(e.name),1)),typeof e!="string"&&e.value?(a(),i("span",Y,d(e.value),1)):v("",!0)])],8,K))),128))]),_:1},16))}}),ee=g({__name:"BaseInstance",props:{instanceName:null,instanceDescription:null,instanceBaseClass:null,instanceAboutClass:null,instanceBodyClass:null},setup(s){return(t,o)=>(a(),i("div",{class:c([t.$style.instance,s.instanceBaseClass])},[r("div",{class:c([t.$style.instance_title,s.instanceAboutClass])},[r("h2",{class:c(t.$style.title)},d(s.instanceName),3),r("p",{class:c(t.$style.description)},d(s.instanceDescription),3)],2),r("div",{class:c([t.$style.instance_body,s.instanceBodyClass])},[E(t.$slots,"default")],2)],2))}}),oe="_hover_1_nu6u0_1",ne="_hover_2_nu6u0_9",se="_instance_nu6u0_17",te="_row_nu6u0_25",le="_instance_title_nu6u0_29",ae="_title_nu6u0_36",ie="_description_nu6u0_40",ce={hover_1:oe,hover_2:ne,instance:se,row:te,instance_title:le,title:ae,description:ie},re={$style:ce},de=D(ee,[["__cssModules",re]]),ue=g({__name:"BaseModule",props:{moduleName:null,moduleDescriprion:null,moduleBaseClass:null,moduleAboutClass:null,moduleBodyClass:null},setup(s){return(t,o)=>(a(),i("div",{class:c([t.$style.module,s.moduleBaseClass])},[r("div",{class:c([t.$style.module_about,s.moduleAboutClass])},[r("h1",null,d(s.moduleName),1),r("p",null,d(s.moduleDescriprion),1)],2),r("div",{class:c([t.$style.module_body,s.moduleBodyClass])},[E(t.$slots,"default")],2)],2))}}),_e="_hover_1_1n47n_1",pe="_hover_2_1n47n_9",me="_module_1n47n_17",he="_module_about_1n47n_23",ye="_module_body_1n47n_43",Ce={hover_1:_e,hover_2:pe,module:me,module_about:he,module_body:ye};const fe={$style:Ce},ve=D(ue,[["__cssModules",fe]]),ge=g({__name:"BaseElement",props:{elementTitle:null,elementDescription:null,elementBaseClass:null,elementAboutClass:null,elementBodyClass:null,flexDirection:null,justifyContent:null},setup(s){const t=s,o=B(()=>t.flexDirection||"row"),l=B(()=>t.justifyContent||(o.value==="column"?"flex-start":"space-between"));return(h,u)=>(a(),i("div",{class:c(h.$style.element),style:G({flexDirection:n(o),justifyContent:n(l)})},[r("div",{class:c(h.$style.element_title)},[r("span",{class:c(h.$style.title)},d(s.elementTitle),3),s.elementDescription?(a(),i("span",{key:0,class:c(h.$style.description)},d(s.elementDescription),3)):v("",!0)],2),r("div",{class:c(h.$style.element_body)},[E(h.$slots,"default")],2)],6))}}),we="_hover_1_1eazv_1",$e="_hover_2_1eazv_9",be="_element_1eazv_17",ke="_row_1eazv_26",Be="_sbtw_1eazv_30",Ae="_element_title_1eazv_33",Ee="_title_1eazv_40",De="_description_1eazv_44",Te={hover_1:we,hover_2:$e,element:be,row:ke,sbtw:Be,element_title:Ae,title:Ee,description:De},Me={$style:Te},A=D(ge,[["__cssModules",Me]]),ze={key:0},Se=g({__name:"GeneralModule",setup(s){const t=[{name:"messageCreate",id:"messageCreate"}],o=L(),{guild:l,loading:h}=N(o),{loadModule:u,updateModule:_,updateModuleProperty:w}=o;if(!l)throw Error("Guild not loaded");return l.value&&!l.value.module_general&&u("general"),(C,p)=>(a(),b(ve,{"module-name":"General","module-descriprion":`        Bot general settings module. Here you can configure most of the
        important settings on your server.`},{default:f(()=>[n(l)&&n(l).module_general?(a(),i("div",ze,[$(de,{"instance-name":"Logs","instance-description":"Here you can setup logs sending by bot"},{default:f(()=>[$(A,{"element-title":"Log channel:","element-description":"Please choose a log channel where bot may send logs"},{default:f(()=>[$(q,{clickButtonTitle:"Choose a channel",useChoosedElementAsTitle:!0,refChoosedElement:n(l).channels.filter(e=>e.id===(n(l)&&n(l).module_general?n(l).module_general.logChannel:void 0))[0],position:"bottom-right",dropdownContent:n(l).channels.filter(e=>e.type===0),onChoose:p[0]||(p[0]=e=>{n(o).updateModuleProperty("general","logChannel",typeof e=="string"?e:e.id)})},null,8,["refChoosedElement","dropdownContent"])]),_:1}),$(A,{"element-title":"Log types:","element-description":"Please select types of logs to handle:"},{default:f(()=>[$(Z,{clickButtonTitle:"Choose types",refChoosedElements:n(l).module_general.logTypes?n(l).module_general.logTypes.map(e=>t.find(m=>m.id===e)||e):[],dropdownContent:t,position:"bottom-right","no-hide-on-click-content":!0,onChoose:p[1]||(p[1]=e=>{n(o).updateModuleProperty("general","logTypes",e.map(m=>typeof m=="string"?m:m.id))})},null,8,["refChoosedElements"])]),_:1}),$(A,{"element-title":"Log state:"},{default:f(()=>[r("div",{class:c(["state_checkbox",n(l).module_general.logEnabled?"enabled":"disabled"]),onClick:p[2]||(p[2]=e=>n(l)&&n(l).module_general&&(n(l).module_general.logEnabled?n(w)("general","logEnabled",!1):n(w)("general","logEnabled",!0)))},null,2)]),_:1})]),_:1})])):(a(),b(O,{key:1,"loader-type":"dotted"}))]),_:1},8,["module-descriprion"]))}}),Pe=g({__name:"GeneralView",setup(s){return(t,o)=>(a(),b(Se))}});export{Pe as default};
