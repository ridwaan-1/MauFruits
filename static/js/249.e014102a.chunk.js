"use strict";(self.webpackChunkmaufruits_webapp=self.webpackChunkmaufruits_webapp||[]).push([[249],{1974:function(e,a,t){t(2791),t(3037);var n=t(184);a.Z=function(e){var a=e.placeholder,t=e.valid,s=void 0===t||t,r=e.type,c=void 0===r?"text":r,l=e.name,i=e.value,o=void 0===i?"":i,u=e.onChange,d=e.children;return(0,n.jsxs)("div",{className:"input-data input-data-input ".concat(s?"":"invalid"),children:[(0,n.jsx)("input",{type:c,name:l,defaultValue:o,placeholder:a,onChange:u,required:!0}),d]})}},3062:function(e,a,t){t.d(a,{K:function(){return n}});var n="https://maufruits-api.herokuapp.com/api"},5249:function(e,a,t){t.r(a),t.d(a,{default:function(){return j}});var n=t(4942),s=t(1413),r=t(885),c=t(1974),l=t(2791),i=(t(3037),t(184)),o=function(e){var a=e.placeholder,t=e.value,n=void 0===t?"":t,s=e.onChange,r=e.name;return(0,i.jsx)("div",{className:"input-data input-data-textarea",children:(0,i.jsx)("textarea",{type:"text",defaultValue:n,name:r,onChange:s,placeholder:a,required:!0})})},u=t(7513),d=t(6053),m=t(9126),h=t(828),p=t(2868),f=t(8524),x=t(9434),v=t(3062),j=function(){var e=(0,x.v9)((function(e){return e.user})),a=(0,p.Z)(),t=a.loading,j=a.fetchData,g=(0,l.useState)({}),N=(0,r.Z)(g,2),Z=N[0],b=N[1],w=(0,l.useState)({fname:"",othername:"",email:e.registered?e.auth.email:"",subject:"",message:""}),y=(0,r.Z)(w,2),C=y[0],k=y[1],S=function(e){var a=e.target,t=a.name,r=a.value;k((0,s.Z)((0,s.Z)({},C),{},(0,n.Z)({},t,r)))};return(0,i.jsxs)("main",{children:[(0,i.jsxs)("div",{className:"color-w center-text m-top-30",children:[(0,i.jsx)("h1",{children:"Get in touch"}),(0,i.jsx)("p",{className:"m-top-10",children:"If you have any questions or remarks, just write us a message."})]}),(0,i.jsxs)("div",{className:"contactUs-container flex",children:[(0,i.jsxs)("div",{className:"contact-info",children:[(0,i.jsx)("h2",{children:"Contact Information"}),(0,i.jsx)("p",{className:"m-top-10",children:"Fill up the form and we will get back to you as soon as possible"}),(0,i.jsxs)("div",{className:"contact-details",children:[(0,i.jsxs)("div",{className:"each-contact-detail flex center-v m-top-30",children:[(0,i.jsx)(m.lfG,{className:"contactIcon"}),(0,i.jsxs)("div",{children:[(0,i.jsx)("p",{children:"+2305938349"}),(0,i.jsx)("p",{children:"+2309839982"})]})]}),(0,i.jsxs)("div",{className:"each-contact-detail flex center-v m-top-20",children:[(0,i.jsx)(d.tzA,{className:"contactIcon"}),(0,i.jsx)("p",{children:"maufruits@gmail.com"})]}),(0,i.jsxs)("div",{className:"each-contact-detail flex center-v m-top-20",children:[(0,i.jsx)(h.VFp,{className:"contactIcon"}),(0,i.jsx)("p",{children:"maufruits@gmail.com"})]})]})]}),(0,i.jsxs)("form",{onSubmit:function(e){e.preventDefault(),j({url:"".concat(v.K,"/contact/sendmail"),method:"POST",headers:{"content-type":"application/json"},body:C},(function(e){b(e)}))},className:"contactUs-form",children:[t&&(0,i.jsx)(f.Z,{}),(0,i.jsx)("h2",{children:"Send us a message"}),Z&&(0,i.jsx)("h3",{className:"green-text m-top-10",children:Z.message}),(0,i.jsxs)("div",{className:"name-field flex",children:[(0,i.jsx)(c.Z,{value:C.fname,onChange:S,name:"fname",placeholder:"First Name"}),(0,i.jsx)(c.Z,{value:C.othername,onChange:S,name:"othername",placeholder:"Other Names"})]}),(0,i.jsx)(c.Z,{value:C.email,onChange:S,name:"email",placeholder:"Your email",type:"email"}),(0,i.jsx)(c.Z,{value:C.subject,onChange:S,name:"subject",placeholder:"Subject"}),(0,i.jsx)(o,{value:C.message,onChange:S,name:"message",placeholder:"Your message"}),(0,i.jsx)(u.Z,{type:"submit",children:"Send message"})]})]})]})}},2868:function(e,a,t){var n=t(1413),s=t(5861),r=t(885),c=t(7757),l=t.n(c),i=t(2791);a.Z=function(){var e=(0,i.useState)(!1),a=(0,r.Z)(e,2),t=a[0],c=a[1],o=(0,i.useState)(null),u=(0,r.Z)(o,2),d=u[0],m=u[1],h=(0,i.useCallback)(function(){var e=(0,s.Z)(l().mark((function e(a,t){var s,r;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c(!0),m(null),e.prev=2,e.next=5,fetch(a.url,{method:a.method?a.method:"GET",headers:a.headers?a.headers:{},body:JSON.stringify(a.body)});case 5:return s=e.sent,e.next=8,s.json();case 8:if(r=e.sent,s.ok){e.next=12;break}throw m((0,n.Z)((0,n.Z)({},r),{},{statusCode:s.status})),new Error("Request failed!");case 12:t(r),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(2),m((function(e){return e||{message:"Something went wrong with our server. Please try again later",statusCode:500}}));case 18:c(!1);case 19:case"end":return e.stop()}}),e,null,[[2,15]])})));return function(a,t){return e.apply(this,arguments)}}(),[]);return{loading:t,setError:m,error:d,fetchData:h}}},3037:function(){}}]);
//# sourceMappingURL=249.e014102a.chunk.js.map