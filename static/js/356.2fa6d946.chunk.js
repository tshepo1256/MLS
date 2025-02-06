"use strict";(self.webpackChunkcase_management_system=self.webpackChunkcase_management_system||[]).push([[356],{7356:(e,t,n)=>{n.r(t),n.d(t,{default:()=>V});var r=n(9379),a=n(5043),s=n(6446),i=n(5865),l=n(1906),o=n(2110),d=n(8903),c=n(9650),u=n(1806),A=n(4882),h=n(8076),x=n(39),m=n(3460),j=n(3845),v=n(7392),y=n(1081),p=n(6600),f=n(5316),g=n(8533),b=n(9347),C=n(3193),S=n(9190),w=n(2221),D=n(2143),M=n(5795),R=n(6734),T=n(579);const k=(0,R.A)((0,T.jsx)("path",{d:"M6 6h12v12H6z"}),"Stop"),W=(0,R.A)((0,T.jsx)("path",{d:"M8 5v14l11-7z"}),"PlayArrow");var E=n(141);const I=(0,R.A)((0,T.jsx)("path",{d:"M9 1h6v2H9zm10.03 6.39 1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61M13 14h-2V8h2z"}),"Timer");var N=n(3560),z=n(3768);const P=[{id:1,matter:"Smith vs. Johnson",activity:"Document Review",date:"2024-03-20",duration:120,rate:3750,status:"billed",attorney:"Emma Wilson"},{id:2,matter:"Williams Estate",activity:"Client Meeting",date:"2024-03-20",duration:60,rate:3750,status:"unbilled",attorney:"James Parker"},{id:3,matter:"Chen Contract Review",activity:"Contract Analysis",date:"2024-03-19",duration:90,rate:3750,status:"unbilled",attorney:"Emma Wilson"}],V=()=>{const[e,t]=(0,a.useState)(!1),[n,R]=(0,a.useState)(null),[V,F]=(0,a.useState)(!1),[J,_]=(0,a.useState)(0),[H,L]=(0,a.useState)(!1),[U,Z]=(0,a.useState)(null),[B,O]=(0,a.useState)(P),q=(0,a.useRef)(null);(0,a.useEffect)((()=>(V?q.current=setInterval((()=>{_((e=>e+1))}),6e4):q.current&&clearInterval(q.current),()=>{q.current&&clearInterval(q.current)})),[V]);const G=function(){R(arguments.length>0&&void 0!==arguments[0]?arguments[0]:null),t(!0)},K=()=>{R(null),t(!1)},Q=e=>{const t=Math.floor(e/60),n=e%60;return"".concat(t,"h ").concat(n,"m")},X=e=>new Intl.NumberFormat("en-ZA",{style:"currency",currency:"ZAR",minimumFractionDigits:2,maximumFractionDigits:2}).format(e);return(0,T.jsxs)(s.A,{sx:{p:3},children:[(0,T.jsxs)(s.A,{sx:{display:"flex",justifyContent:"space-between",mb:4},children:[(0,T.jsx)(i.A,{variant:"h4",children:"Time Tracking"}),(0,T.jsxs)(s.A,{sx:{display:"flex",gap:2},children:[(0,T.jsx)(l.A,{variant:"contained",color:V?"error":"success",startIcon:V?(0,T.jsx)(k,{}):(0,T.jsx)(W,{}),onClick:V?()=>{F(!1),J>0&&G({matter:"",activity:"",date:(new Date).toISOString().split("T")[0],duration:J,rate:3750,status:"unbilled",attorney:"Emma Wilson"})}:()=>{F(!0),_(0)},children:V?"Stop Timer":"Start Timer"}),(0,T.jsx)(l.A,{variant:"contained",startIcon:(0,T.jsx)(E.A,{}),onClick:()=>G(),children:"Add Time Entry"})]})]}),V&&(0,T.jsx)(o.A,{sx:{mb:3,p:3,bgcolor:"primary.light"},children:(0,T.jsxs)(s.A,{sx:{display:"flex",alignItems:"center",gap:2},children:[(0,T.jsx)(I,{sx:{fontSize:40}}),(0,T.jsx)(i.A,{variant:"h4",children:Q(J)})]})}),(0,T.jsx)(d.Ay,{container:!0,spacing:3,children:(0,T.jsx)(d.Ay,{item:!0,xs:12,children:(0,T.jsx)(o.A,{children:(0,T.jsx)(c.A,{children:(0,T.jsxs)(u.A,{children:[(0,T.jsx)(A.A,{children:(0,T.jsxs)(h.A,{children:[(0,T.jsx)(x.A,{children:"Date"}),(0,T.jsx)(x.A,{children:"Matter"}),(0,T.jsx)(x.A,{children:"Activity"}),(0,T.jsx)(x.A,{children:"Attorney"}),(0,T.jsx)(x.A,{align:"right",children:"Duration"}),(0,T.jsx)(x.A,{align:"right",children:"Rate"}),(0,T.jsx)(x.A,{align:"right",children:"Amount"}),(0,T.jsx)(x.A,{children:"Status"}),(0,T.jsx)(x.A,{align:"right",children:"Actions"})]})}),(0,T.jsx)(m.A,{children:B.map((e=>{return(0,T.jsxs)(h.A,{children:[(0,T.jsx)(x.A,{children:new Date(e.date).toLocaleDateString()}),(0,T.jsx)(x.A,{children:e.matter}),(0,T.jsx)(x.A,{children:e.activity}),(0,T.jsx)(x.A,{children:e.attorney}),(0,T.jsx)(x.A,{align:"right",children:Q(e.duration)}),(0,T.jsxs)(x.A,{align:"right",children:[X(e.rate),"/hr"]}),(0,T.jsx)(x.A,{align:"right",children:X((t=e.duration,n=e.rate,t/60*n))}),(0,T.jsx)(x.A,{children:(0,T.jsx)(j.A,{label:e.status,color:"billed"===e.status?"success":"warning",size:"small"})}),(0,T.jsxs)(x.A,{align:"right",children:[(0,T.jsx)(v.A,{size:"small",onClick:()=>G(e),children:(0,T.jsx)(N.A,{})}),(0,T.jsx)(v.A,{size:"small",color:"error",onClick:()=>(e=>{Z(e),L(!0)})(e),children:(0,T.jsx)(z.A,{})})]})]},e.id);var t,n}))})]})})})})}),(0,T.jsxs)(y.A,{open:H,onClose:()=>L(!1),children:[(0,T.jsx)(p.A,{children:"Confirm Delete"}),(0,T.jsx)(f.A,{children:(0,T.jsx)(g.A,{children:"Are you sure you want to delete this time entry? This action cannot be undone."})}),(0,T.jsxs)(b.A,{children:[(0,T.jsx)(l.A,{onClick:()=>L(!1),children:"Cancel"}),(0,T.jsx)(l.A,{onClick:()=>{O(B.filter((e=>e.id!==U.id))),L(!1),Z(null)},color:"error",variant:"contained",children:"Delete"})]})]}),(0,T.jsxs)(y.A,{open:e,onClose:K,maxWidth:"sm",fullWidth:!0,children:[(0,T.jsx)(p.A,{children:n?"Edit Time Entry":"Add Time Entry"}),(0,T.jsx)(f.A,{children:(0,T.jsx)(s.A,{component:"form",sx:{mt:1},children:(0,T.jsxs)(d.Ay,{container:!0,spacing:3,children:[(0,T.jsx)(d.Ay,{item:!0,xs:12,md:6,children:(0,T.jsxs)(C.A,{fullWidth:!0,children:[(0,T.jsx)(S.A,{id:"matter-label",children:"Matter"}),(0,T.jsxs)(w.A,{labelId:"matter-label",label:"Matter",defaultValue:(null===n||void 0===n?void 0:n.matter)||"",name:"matter",children:[(0,T.jsx)(D.A,{value:"Smith vs. Johnson",children:"Smith vs. Johnson"}),(0,T.jsx)(D.A,{value:"Williams Estate",children:"Williams Estate"}),(0,T.jsx)(D.A,{value:"Chen Contract Review",children:"Chen Contract Review"})]})]})}),(0,T.jsx)(d.Ay,{item:!0,xs:12,md:6,children:(0,T.jsx)(M.A,{fullWidth:!0,label:"Activity",name:"activity",defaultValue:null===n||void 0===n?void 0:n.activity})}),(0,T.jsx)(d.Ay,{item:!0,xs:12,md:6,children:(0,T.jsx)(M.A,{fullWidth:!0,label:"Date",type:"date",name:"date",defaultValue:null===n||void 0===n?void 0:n.date,InputLabelProps:{shrink:!0}})}),(0,T.jsx)(d.Ay,{item:!0,xs:12,md:6,children:(0,T.jsx)(M.A,{fullWidth:!0,label:"Duration (minutes)",type:"number",name:"duration",defaultValue:null===n||void 0===n?void 0:n.duration,inputProps:{min:0}})}),(0,T.jsx)(d.Ay,{item:!0,xs:12,md:6,children:(0,T.jsx)(M.A,{fullWidth:!0,label:"Rate (per hour)",type:"number",name:"rate",defaultValue:null===n||void 0===n?void 0:n.rate,InputProps:{startAdornment:"R"},inputProps:{min:0,step:"0.01"}})}),(0,T.jsx)(d.Ay,{item:!0,xs:12,md:6,children:(0,T.jsxs)(C.A,{fullWidth:!0,children:[(0,T.jsx)(S.A,{id:"status-label",children:"Status"}),(0,T.jsxs)(w.A,{labelId:"status-label",label:"Status",name:"status",defaultValue:(null===n||void 0===n?void 0:n.status)||"unbilled",children:[(0,T.jsx)(D.A,{value:"unbilled",children:"Unbilled"}),(0,T.jsx)(D.A,{value:"billed",children:"Billed"})]})]})})]})})}),(0,T.jsxs)(b.A,{children:[(0,T.jsx)(l.A,{onClick:K,children:"Cancel"}),(0,T.jsx)(l.A,{variant:"contained",onClick:e=>{e.preventDefault();const t=e.target.closest("form"),a={matter:t.matter.value,activity:t.activity.value,date:t.date.value,duration:parseInt(t.duration.value,10),rate:parseFloat(t.rate.value),status:t.status.value,attorney:"Emma Wilson"};n?(e=>{O(B.map((t=>t.id===n.id?(0,r.A)((0,r.A)({},t),e):t))),K()})(a):(e=>{const t=(0,r.A)({id:B.length+1},e);O([t,...B]),K()})(a)},children:n?"Update Entry":"Add Entry"})]})]})]})}},2110:(e,t,n)=>{n.d(t,{A:()=>v});var r=n(8168),a=n(8587),s=n(5043),i=n(8387),l=n(8610),o=n(5658),d=n(7864),c=n(3336),u=n(2532),A=n(2372);function h(e){return(0,A.Ay)("MuiCard",e)}(0,u.A)("MuiCard",["root"]);var x=n(579);const m=["className","raised"],j=(0,o.Ay)(c.A,{name:"MuiCard",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({overflow:"hidden"}))),v=s.forwardRef((function(e,t){const n=(0,d.A)({props:e,name:"MuiCard"}),{className:s,raised:o=!1}=n,c=(0,a.A)(n,m),u=(0,r.A)({},n,{raised:o}),A=(e=>{const{classes:t}=e;return(0,l.A)({root:["root"]},h,t)})(u);return(0,x.jsx)(j,(0,r.A)({className:(0,i.A)(A.root,s),elevation:o?8:void 0,ref:t,ownerState:u},c))}))},8533:(e,t,n)=>{n.d(t,{A:()=>v});var r=n(8587),a=n(8168),s=n(5043),i=n(8387),l=n(8610),o=n(5658),d=n(7864),c=n(5865),u=n(2532),A=n(2372);function h(e){return(0,A.Ay)("MuiDialogContentText",e)}(0,u.A)("MuiDialogContentText",["root"]);var x=n(579);const m=["children","className"],j=(0,o.Ay)(c.A,{shouldForwardProp:e=>(0,o.ep)(e)||"classes"===e,name:"MuiDialogContentText",slot:"Root",overridesResolver:(e,t)=>t.root})({}),v=s.forwardRef((function(e,t){const n=(0,d.A)({props:e,name:"MuiDialogContentText"}),{className:s}=n,o=(0,r.A)(n,m),c=(e=>{const{classes:t}=e,n=(0,l.A)({root:["root"]},h,t);return(0,a.A)({},t,n)})(o);return(0,x.jsx)(j,(0,a.A)({component:"p",variant:"body1",color:"text.secondary",ref:t,ownerState:o,className:(0,i.A)(c.root,s)},n,{classes:c}))}))},6600:(e,t,n)=>{n.d(t,{A:()=>j});var r=n(8168),a=n(8587),s=n(5043),i=n(8387),l=n(8610),o=n(5865),d=n(5658),c=n(7864),u=n(7034),A=n(2563),h=n(579);const x=["className","id"],m=(0,d.Ay)(o.A,{name:"MuiDialogTitle",slot:"Root",overridesResolver:(e,t)=>t.root})({padding:"16px 24px",flex:"0 0 auto"}),j=s.forwardRef((function(e,t){const n=(0,c.A)({props:e,name:"MuiDialogTitle"}),{className:o,id:d}=n,j=(0,a.A)(n,x),v=n,y=(e=>{const{classes:t}=e;return(0,l.A)({root:["root"]},u.t,t)})(v),{titleId:p=d}=s.useContext(A.A);return(0,h.jsx)(m,(0,r.A)({component:"h2",className:(0,i.A)(y.root,o),ownerState:v,ref:t,variant:"h6",id:null!=d?d:p},j))}))}}]);
//# sourceMappingURL=356.2fa6d946.chunk.js.map