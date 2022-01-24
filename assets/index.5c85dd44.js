import{p as e,a as l,r as a,c as t,b as n,w as o,d as u,o as s,e as c,f as d,u as i,F as r,g as p,h,t as v,i as m,j as f,k as b,l as g,m as _}from"./vendor.cd0d86a0.js";const y=m();e("data-v-b16887a6");const V=f("减少机关"),k=f("增加机关"),U=f("求解"),j={key:0,class:"action"},w=d("i",{class:"el-icon-bottom"},null,-1);l();const E={setup(e){const l=a({type:"rotate",method:"neighbor",target:""}),m=t((()=>"rotate"==l.type?4:3)),f=t((()=>{switch(l.type){case"rotate":return["正","左","背","右"];case"count":return["一","二","三"]}}));class b{constructor(){this.state=0,this.connection=[]}static action(e,a){let t=e.split("").map((e=>parseInt(e))),n=[a];switch(l.method){case"neighbor":a-1>=0&&n.push(a-1),a+1<t.length&&n.push(a+1);break;case"neighbor_loop":n.push((a-1+t.length)%t.length),n.push((a+1)%t.length);break;case"custom":g.value[a].connection.forEach((e=>n.push(e)))}return n.forEach((e=>t[e]=(t[e]+1)%m.value)),t.join("")}}const g=n(Array.from({length:3},(()=>new b))),_=n(null);function E(){let e={},a=[g.value.map((e=>e.state)).join("")],t=l.target.toString()||null;for(e[a[0]]={};a.length;){let l=a.shift();if(l.split("").every(((e,l,a)=>e===(null!=t?t:a[0])))){let a=e=>e.split("").map((e=>f.value[e])).join(""),t=[],n=null;for(;l;){let{action:o,prev:u}=e[l];t.unshift({label:a(l),action:n}),n=o,l=u}return t[t.length-1].done=!0,void(_.value=t)}for(let t=0;t<g.value.length;++t){let n=b.action(l,t);void 0===e[n]&&(e[n]={prev:l,action:t},a.push(n))}}console.log(e),_.value=!1}return o((()=>l.type),(()=>{g.value.forEach((e=>e.state=0)),l.target=""})),o((()=>g.value.length),(()=>{g.value.forEach((e=>{let l=0;for(;l<e.connection.length;)e.connection[l]>=g.value.length?e.connection.splice(l,1):l+=1}))})),(e,a)=>{const t=u("el-option"),n=u("el-select"),o=u("el-form-item"),m=u("el-form"),C=u("el-button"),I=u("el-divider"),z=u("el-result"),A=u("el-card"),F=u("el-space");return s(),c(r,null,[d(m,{inline:""},{default:y((()=>[d(o,{label:"机关类型"},{default:y((()=>[d(n,{modelValue:i(l).type,"onUpdate:modelValue":a[1]||(a[1]=e=>i(l).type=e)},{default:y((()=>[d(t,{label:"旋转方块",value:"rotate"}),d(t,{label:"花瓣数量",value:"count"})])),_:1},8,["modelValue"])])),_:1}),d(o,{label:"关联方式"},{default:y((()=>[d(n,{modelValue:i(l).method,"onUpdate:modelValue":a[2]||(a[2]=e=>i(l).method=e)},{default:y((()=>[d(t,{label:"相邻",value:"neighbor"}),d(t,{label:"相邻 - 头尾相连",value:"neighbor_loop"}),d(t,{label:"自定义",value:"custom"})])),_:1},8,["modelValue"])])),_:1}),d(o,{label:"目标状态"},{default:y((()=>[d(n,{modelValue:i(l).target,"onUpdate:modelValue":a[3]||(a[3]=e=>i(l).target=e),placeholder:"均可",clearable:""},{default:y((()=>[(s(!0),c(r,null,p(i(f),((e,l)=>(s(),c(t,{key:l,value:l,label:e},null,8,["value","label"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),(s(!0),c(r,null,p(g.value,((e,a)=>(s(),c(m,{key:a,inline:"",class:"unit-form"},{default:y((()=>[d(o,{label:"机关 "+(a+1)},{default:y((()=>[d(n,{modelValue:g.value[a].state,"onUpdate:modelValue":e=>g.value[a].state=e},{default:y((()=>[(s(!0),c(r,null,p(i(f),((e,l)=>(s(),c(t,{key:l,value:l,label:e},null,8,["value","label"])))),128))])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:2},1032,["label"]),"custom"==i(l).method?(s(),c(o,{key:0,label:"关联机关"},{default:y((()=>[d(n,{modelValue:g.value[a].connection,"onUpdate:modelValue":e=>g.value[a].connection=e,multiple:"",placeholder:"请选择",class:"connect-unit"},{default:y((()=>[(s(!0),c(r,null,p(g.value,((e,l)=>(s(),c(r,null,[a!=l?(s(),c(t,{key:l,value:l,label:"机关 "+(l+1)},null,8,["value","label"])):h("",!0)],64)))),256))])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:2},1024)):h("",!0)])),_:2},1024)))),128)),d(C,{onClick:a[4]||(a[4]=e=>g.value.pop()),icon:"el-icon-minus",disabled:g.value.length<=3},{default:y((()=>[V])),_:1},8,["disabled"]),d(C,{onClick:a[5]||(a[5]=e=>g.value.push(new b)),icon:"el-icon-plus"},{default:y((()=>[k])),_:1}),d(C,{type:"primary",onClick:E},{default:y((()=>[U])),_:1}),d(I),!1===_.value?(s(),c(A,{key:0},{default:y((()=>[d(z,{icon:"error",title:"不可解","sub-title":"请检查是否正确输入机关状态"})])),_:1})):h("",!0),(s(!0),c(r,null,p(_.value,((e,l)=>(s(),c(r,{key:l},[d(A,{header:"状态"+(l+1)},{default:y((()=>[d(F,{size:"large"},{default:y((()=>[(s(!0),c(r,null,p(e.label,((l,a)=>(s(),c("span",{key:a,class:[{active:e.action==a,done:e.done},"unit"]},v(l),3)))),128))])),_:2},1024)])),_:2},1032,["header"]),null!=e.action?(s(),c("div",j,[w,d("span",null,"激活 机关 "+v(e.action+1),1)])):h("",!0)],64)))),128))],64)}},__scopeId:"data-v-b16887a6"};const C=d("h1",null,"岩脊解码器",-1),I=d("span",null,"原神 · 稻妻 · 方块机关解码器",-1);g({setup:e=>(e,l)=>{const a=u("el-header"),t=u("el-main"),n=u("el-container");return s(),c(n,null,{default:b((()=>[d(a,{class:"header"},{default:b((()=>[C,I])),_:1}),d(t,null,{default:b((()=>[d(E)])),_:1})])),_:1})}}).use(_).mount("#app");