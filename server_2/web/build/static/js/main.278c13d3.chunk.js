(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{24:function(e,t,a){e.exports=a(38)},29:function(e,t,a){},38:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(8),c=a.n(l),o=(a(29),a(30),a(18)),u=a(14),i=a(11),s=a(12),h=a(16),m=a(7),v=a(17);var f=function(){var e=Object(n.useState)([]),t=Object(s.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)([]),o=Object(s.a)(c,2),u=o[0],f=o[1],p=Object(n.useState)([]),g=Object(s.a)(p,2),d=g[0],E=g[1],b=Object(n.useState)([]),S=Object(s.a)(b,2),y=S[0],j=S[1];function O(){fetch("http://18.188.146.17:5000/usage").then((function(e){return e.json()})).then((function(e){l((function(t){if(t.length>0){var a=Object(i.a)(t);if(10===t.length){for(var n=0;n<a.length-1;n++)a[n][1]=a[n+1][1];a[9]=[9,parseInt(e.ram)]}else a.push([a.length,parseInt(e.ram)]);return a}return[[0,parseInt(e.ram)]]})),E((function(t){if(t.length>0){var a=Object(i.a)(t);if(10===t.length){for(var n=0;n<a.length-1;n++)a[n][1]=a[n+1][1];a[9]=[9,parseInt(e.cpu)]}else a.push([a.length,parseInt(e.cpu)]);return a}return[[0,parseInt(e.cpu)]]}))})).catch((function(e){return console.log(e)}))}function w(){fetch("http://52.15.159.171:5000/usage").then((function(e){return e.json()})).then((function(e){f((function(t){if(t.length>0){var a=Object(i.a)(t);if(10===t.length){for(var n=0;n<a.length-1;n++)a[n][1]=a[n+1][1];a[9]=[9,parseInt(e.ram)]}else a.push([a.length,parseInt(e.ram)]);return a}return[[0,parseInt(e.ram)]]})),j((function(t){if(t.length>0){var a=Object(i.a)(t);if(10===t.length){for(var n=0;n<a.length-1;n++)a[n][1]=a[n+1][1];a[9]=[9,parseInt(e.cpu)]}else a.push([a.length,parseInt(e.cpu)]);return a}return[[0,parseInt(e.cpu)]]}))})).catch((function(e){return console.log(e)}))}Object(n.useEffect)((function(){O(),w(),setInterval(O,1e3),setInterval(w,1e3)}),[]);var I=r.a.useMemo((function(){return[{label:"Series 1",data:a},{label:"Series 2",data:u}]}),[a,u]),x=r.a.useMemo((function(){return[{primary:!0,type:"linear",position:"bottom",hardMin:0,hardMax:9.1,show:!1},{type:"linear",position:"left",hardMin:0,hardMax:100}]}),[]),M=r.a.createElement("div",{style:{width:"400px",height:"300px"}},r.a.createElement(h.Chart,{data:I,axes:x})),k=r.a.useMemo((function(){return[{label:"Series 1",data:d},{label:"Series 2",data:y}]}),[d,y]),B=r.a.useMemo((function(){return[{primary:!0,type:"linear",position:"bottom",hardMin:0,hardMax:9.1,show:!1},{type:"linear",position:"left",hardMin:0,hardMax:100}]}),[]),A=r.a.createElement("div",{style:{width:"400px",height:"300px"}},r.a.createElement(h.Chart,{data:k,axes:B}));return r.a.createElement(m.a,{className:"m-4"},r.a.createElement(v.a,{sm:!0},r.a.createElement("h3",null,"RAM"),r.a.createElement("div",null,M),r.a.createElement("p",null,r.a.createElement("strong",{style:{color:"#6ab4e9"}},"Server A:"),a.length>0&&" "+a[a.length-1][1]+"%"),r.a.createElement("p",null,r.a.createElement("strong",{style:{color:"#e2756c"}},"Server B:"),u.length>0&&" "+u[u.length-1][1]+"%")),r.a.createElement(v.a,{sm:!0},r.a.createElement("h3",null,"CPU"),r.a.createElement("div",null,A),r.a.createElement("p",null,r.a.createElement("strong",{style:{color:"#6ab4e9"}},"Server A:"),d.length>0&&" "+d[d.length-1][1]+"%"),r.a.createElement("p",null,r.a.createElement("strong",{style:{color:"#e2756c"}},"Server B:"),y.length>0&&" "+y[y.length-1][1]+"%")))},p=a(20),g=a(21),d=a(9),E=a(23),b=a(22),S=a(6),y=function(e){Object(E.a)(a,e);var t=Object(b.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).state={value:"ServidorA",publications:[]},n.handleChange=n.handleChange.bind(Object(d.a)(n)),n.getServerAData=n.getServerAData.bind(Object(d.a)(n)),n.getServerBData=n.getServerBData.bind(Object(d.a)(n)),n}return Object(g.a)(a,[{key:"getServerAData",value:function(){var e=this;fetch("http://18.188.146.17:5000/sentence").then((function(e){return e.json()})).then((function(t){var a=t.map((function(e){return r.a.createElement(m.a,{className:"m-2",key:e.date},r.a.createElement(S.a,{style:{width:"100%"}},r.a.createElement(S.a.Body,null,r.a.createElement(S.a.Title,null,e.author),r.a.createElement(S.a.Subtitle,{className:"mb-2 text-muted"},e.date),r.a.createElement(S.a.Text,null,e.sentence))))}));e.setState({publications:a})})).catch((function(e){return console.log(e)}))}},{key:"getServerBData",value:function(){var e=this;fetch("http://52.15.159.171:5000/sentence").then((function(e){return e.json()})).then((function(t){var a=t.map((function(e){return r.a.createElement(m.a,{className:"m-2",key:e.date},r.a.createElement(S.a,{style:{width:"100%"}},r.a.createElement(S.a.Body,null,r.a.createElement(S.a.Title,null,e.author),r.a.createElement(S.a.Subtitle,{className:"mb-2 text-muted"},e.date),r.a.createElement(S.a.Text,null,e.sentence))))}));e.setState({publications:a})})).catch((function(e){return console.log(e)}))}},{key:"handleChange",value:function(e){this.setState({value:e.target.value}),"ServidorA"===e.target.value?this.getServerAData():this.getServerBData()}},{key:"componentDidMount",value:function(){this.getServerAData()}},{key:"render",value:function(){return r.a.createElement(m.a,{className:"m-4"},r.a.createElement(u.a,null,r.a.createElement(m.a,{className:"m-2"}," ",r.a.createElement("h3",null,"Publications"),r.a.createElement("select",{value:this.state.value,onChange:this.handleChange,className:"ml-5"},r.a.createElement("option",{value:"ServidorA"},"Servidor A"),r.a.createElement("option",{value:"ServidorB"},"Servidor B"))),this.state.publications))}}]),a}(r.a.Component);var j=function(){return r.a.createElement("div",null,r.a.createElement(o.a,{bg:"dark",variant:"dark"},r.a.createElement(o.a.Brand,null,"System Info")),r.a.createElement(u.a,{className:"mt-4"},r.a.createElement(f,null),r.a.createElement(y,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[24,1,2]]]);
//# sourceMappingURL=main.278c13d3.chunk.js.map