!function(){function e(){u&&function(e){function a(r){"readystatechange"==r.type&&"complete"!=n.readyState||(("load"==r.type?t:n)[u](c+r.type,a,!1),!s&&(s=!0)&&e.call(t,r.type||r))}var l=n.addEventListener,s=!1,i=!0,o=l?"addEventListener":"attachEvent",u=l?"removeEventListener":"detachEvent",c=l?"":"on";if("complete"==n.readyState)e.call(t,"lazy");else{if(n.createEventObject&&r.doScroll){try{i=!t.frameElement}catch(e){}i&&function e(){try{r.doScroll("left")}catch(n){return void t.setTimeout(e,50)}a("poll")}()}n[o](c+"DOMContentLoaded",a,!1),n[o](c+"readystatechange",a,!1),t[o](c+"load",a,!1)}}(function(){var e=p.length;m(e?function(){for(var n=0;n<e;++n)!function(e){t.setTimeout(function(){t.exports[p[e]].apply(t,arguments)},0)}(n)}:void 0)})}for(var t=window,n=document,r=n.documentElement,a=n.head||n.getElementsByTagName("head")[0]||r,l="",s=(h=n.getElementsByTagName("script")).length;0<=--s;){var i=h[s],o=i.src.match(/^[^?#]*\/run_prettify\.js(\?[^#]*)?(?:#.*)?$/);if(o){l=o[1]||"",i.parentNode.removeChild(i);break}}var u=!0,c=[],d=[],p=[];for(l.replace(/[?&]([^&=]+)=([^&]+)/g,function(e,t,n){n=decodeURIComponent(n),"autorun"==(t=decodeURIComponent(t))?u=!/^[0fn]/i.test(n):"lang"==t?c.push(n):"skin"==t?d.push(n):"callback"==t&&p.push(n)}),s=0,l=c.length;s<l;++s)!function(){var r=n.createElement("script");r.onload=r.onerror=r.onreadystatechange=function(){!r||r.readyState&&!/loaded|complete/.test(r.readyState)||(r.onerror=r.onload=r.onreadystatechange=null,--f||t.setTimeout(e,0),r.parentNode&&r.parentNode.removeChild(r),r=null)},r.type="text/javascript",r.src=encodeURIComponent(c[s])+".js",a.insertBefore(r,a.firstChild)}(c[s]);var f=c.length,h=[];for(s=0,l=d.length;s<l;++s)h.push(encodeURIComponent(d[s])+".css");h.push(window.location.origin+"/libraries/code-prettify/prettify.css"),function(e){var t=e.length;!function r(l){if(l!==t){var s=n.createElement("link");s.rel="stylesheet",s.type="text/css",l+1<t&&(s.error=s.onerror=function(){r(l+1)}),s.href=e[l],a.appendChild(s)}}(0)}(h);var g,m=("undefined"!=typeof window&&(window.PR_SHOULD_USE_CONTINUATION=!0),function(){function e(e,t,n,r,a){n&&(r(e={h:e,l:1,j:null,m:null,a:n,c:null,i:t,g:null}),a.push.apply(a,e.g))}function t(e){for(var t=void 0,n=e.firstChild;n;n=n.nextSibling){var r=n.nodeType;t=1===r?t?e:n:3===r&&y.test(n.nodeValue)?e:t}return t===e?void 0:t}function n(t,n){var r,a={};!function(){for(var e=t.concat(n),l=[],s={},i=0,o=e.length;i<o;++i){var u=e[i],c=u[3];if(c)for(var d=c.length;0<=--d;)a[c.charAt(d)]=u;c=""+(u=u[1]),s.hasOwnProperty(c)||(l.push(u),s[c]=null)}l.push(/[\0-\uffff]/),r=function(e){function t(e){var t=e.charCodeAt(0);if(92!==t)return t;var n=e.charAt(1);return(t=d[n])?t:"0"<=n&&"7">=n?parseInt(e.substring(1),8):"u"===n||"x"===n?parseInt(e.substring(2),16):e.charCodeAt(1)}function n(e){return 32>e?(16>e?"\\x0":"\\x")+e.toString(16):"\\"===(e=String.fromCharCode(e))||"-"===e||"]"===e||"^"===e?"\\"+e:e}function r(e){var r=e.substring(1,e.length-1).match(RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]","g"));e=[];var a=["["];(l="^"===r[0])&&a.push("^");for(var l=l?1:0,s=r.length;l<s;++l){var i,o=r[l];/\\[bdsw]/i.test(o)?a.push(o):(o=t(o),l+2<s&&"-"===r[l+1]?(i=t(r[l+2]),l+=2):i=o,e.push([o,i]),65>i||122<o||(65>i||90<o||e.push([32|Math.max(65,o),32|Math.min(i,90)]),97>i||122<o||e.push([-33&Math.max(97,o),-33&Math.min(i,122)])))}for(e.sort(function(e,t){return e[0]-t[0]||t[1]-e[1]}),r=[],s=[],l=0;l<e.length;++l)(o=e[l])[0]<=s[1]+1?s[1]=Math.max(s[1],o[1]):r.push(s=o);for(l=0;l<r.length;++l)o=r[l],a.push(n(o[0])),o[1]>o[0]&&(o[1]+1>o[0]&&a.push("-"),a.push(n(o[1])));return a.push("]"),a.join("")}function a(e){for(var t=e.source.match(RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)","g")),a=t.length,i=[],o=0,u=0;o<a;++o){var c=t[o];"("===c?++u:"\\"===c.charAt(0)&&(c=+c.substring(1))&&(c<=u?i[c]=-1:t[o]=n(c))}for(o=1;o<i.length;++o)-1===i[o]&&(i[o]=++l);for(u=o=0;o<a;++o)"("===(c=t[o])?i[++u]||(t[o]="(?:"):"\\"===c.charAt(0)&&(c=+c.substring(1))&&c<=u&&(t[o]="\\"+i[c]);for(o=0;o<a;++o)"^"===t[o]&&"^"!==t[o+1]&&(t[o]="");if(e.ignoreCase&&s)for(o=0;o<a;++o)e=(c=t[o]).charAt(0),2<=c.length&&"["===e?t[o]=r(c):"\\"!==e&&(t[o]=c.replace(/[a-zA-Z]/g,function(e){return e=e.charCodeAt(0),"["+String.fromCharCode(-33&e,32|e)+"]"}));return t.join("")}for(var l=0,s=!1,i=!1,o=0,u=e.length;o<u;++o){var c=e[o];if(c.ignoreCase)i=!0;else if(/[a-z]/i.test(c.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi,""))){s=!0,i=!1;break}}var d={b:8,t:9,n:10,v:11,f:12,r:13},p=[];for(o=0,u=e.length;o<u;++o){if((c=e[o]).global||c.multiline)throw Error(""+c);p.push("(?:"+a(c)+")")}return new RegExp(p.join("|"),i?"gi":"g")}(l)}();var l=n.length;return function t(i){for(var o=i.i,u=i.h,c=[o,"pln"],d=0,p=i.a.match(r)||[],f={},h=0,g=p.length;h<g;++h){var m,y=p[h],v=f[y],b=void 0;if("string"==typeof v)m=!1;else{var w=a[y.charAt(0)];if(w)b=y.match(w[1]),v=w[0];else{for(m=0;m<l;++m)if(w=n[m],b=y.match(w[1])){v=w[0];break}b||(v="pln")}!(m=5<=v.length&&"lang-"===v.substring(0,5))||b&&"string"==typeof b[1]||(m=!1,v="src"),m||(f[y]=v)}if(w=d,d+=y.length,m){m=b[1];var x=y.indexOf(m),S=x+m.length;b[2]&&(x=(S=y.length-b[2].length)-m.length),v=v.substring(5),e(u,o+w,y.substring(0,x),t,c),e(u,o+w+x,m,s(v,m),c),e(u,o+w+S,y.substring(S),t,c)}else c.push(o+w,v)}i.g=c}}function r(e){var t=[],r=[];e.tripleQuotedStrings?t.push(["str",/^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,null,"'\""]):e.multiLineStrings?t.push(["str",/^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,null,"'\"`"]):t.push(["str",/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,null,"\"'"]),e.verbatimStrings&&r.push(["str",/^@\"(?:[^\"]|\"\")*(?:\"|$)/,null]);var a=e.hashComments;if(a&&(e.cStyleComments?(1<a?t.push(["com",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,null,"#"]):t.push(["com",/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,null,"#"]),r.push(["str",/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,null])):t.push(["com",/^#[^\r\n]*/,null,"#"])),e.cStyleComments&&(r.push(["com",/^\/\/[^\r\n]*/,null]),r.push(["com",/^\/\*[\s\S]*?(?:\*\/|$)/,null])),a=e.regexLiterals){var l=(a=1<a?"":"\n\r")?".":"[\\S\\s]";r.push(["lang-regex",RegExp("^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*(/(?=[^/*"+a+"])(?:[^/\\x5B\\x5C"+a+"]|\\x5C"+l+"|\\x5B(?:[^\\x5C\\x5D"+a+"]|\\x5C"+l+")*(?:\\x5D|$))+/)")])}return(a=e.types)&&r.push(["typ",a]),(a=(""+e.keywords).replace(/^ | $/g,"")).length&&r.push(["kwd",new RegExp("^(?:"+a.replace(/[\s,]+/g,"|")+")\\b"),null]),t.push(["pln",/^\s+/,null," \r\n\t "]),a="^.[^\\s\\w.$@'\"`/\\\\]*",e.regexLiterals&&(a+="(?!s*/)"),r.push(["lit",/^@[a-z_$][a-z_$@0-9]*/i,null],["typ",/^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/,null],["pln",/^[a-z_$][a-z_$@0-9]*/i,null],["lit",/^(?:0x[a-f0-9]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+\-]?\d+)?)[a-z]*/i,null,"0123456789"],["pln",/^\\[\s\S]?/,null],["pun",new RegExp(a),null]),n(t,r)}function a(e,t,n){function r(e){var t=e.nodeType;if(1!=t||l.test(e.className)){if((3==t||4==t)&&n){var o=e.nodeValue,u=o.match(s);u&&(t=o.substring(0,u.index),e.nodeValue=t,(o=o.substring(u.index+u[0].length))&&e.parentNode.insertBefore(i.createTextNode(o),e.nextSibling),a(e),t||e.parentNode.removeChild(e))}}else if("br"===e.nodeName.toLowerCase())a(e),e.parentNode&&e.parentNode.removeChild(e);else for(e=e.firstChild;e;e=e.nextSibling)r(e)}function a(e){for(;!e.nextSibling;)if(!(e=e.parentNode))return;e=function e(t,n){var r=n?t.cloneNode(!1):t;if(a=t.parentNode){var a=e(a,1),l=t.nextSibling;a.appendChild(r);for(var s=l;s;s=l)l=s.nextSibling,a.appendChild(s)}return r}(e.nextSibling,0);for(var t;(t=e.parentNode)&&1===t.nodeType;)e=t;u.push(e)}for(var l=/(?:^|\s)nocode(?:\s|$)/,s=/\r\n?|\n/,i=e.ownerDocument,o=i.createElement("li");e.firstChild;)o.appendChild(e.firstChild);for(var u=[o],c=0;c<u.length;++c)r(u[c]);t===(0|t)&&u[0].setAttribute("value",t);var d=i.createElement("ol");d.className="linenums",t=Math.max(0,t-1|0)||0,c=0;for(var p=u.length;c<p;++c)(o=u[c]).className="L"+(c+t)%10,o.firstChild||o.appendChild(i.createTextNode(" ")),d.appendChild(o);e.appendChild(d)}function l(e,t){for(var n=t.length;0<=--n;){var r=t[n];b.hasOwnProperty(r)?c.console&&console.warn("cannot override language handler %s",r):b[r]=e}}function s(e,t){return e&&b.hasOwnProperty(e)||(e=/^\s*</.test(t)?"default-markup":"default-code"),b[e]}function i(e){var t=e.j;try{var n=(u=function(e,t){var n=/(?:^|\s)nocode(?:\s|$)/,r=[],a=0,l=[],s=0;return function e(i){var o=i.nodeType;if(1==o){if(!n.test(i.className)){for(o=i.firstChild;o;o=o.nextSibling)e(o);"br"!==(o=i.nodeName.toLowerCase())&&"li"!==o||(r[s]="\n",l[s<<1]=a++,l[s++<<1|1]=i)}}else 3!=o&&4!=o||(o=i.nodeValue).length&&(o=t?o.replace(/\r\n?/g,"\n"):o.replace(/[ \t\r\n]+/g," "),r[s]=o,l[s<<1]=a,a+=o.length,l[s++<<1|1]=i)}(e),{a:r.join("").replace(/\n$/,""),c:l}}(e.h,e.l)).a;e.a=n,e.c=u.c,e.i=0,s(t,n)(e);var r,a,l=(l=/\bMSIE\s(\d+)/.exec(navigator.userAgent))&&8>=+l[1],i=(t=/\n/g,e.a),o=i.length,u=0,d=e.c,p=d.length,f=(n=0,e.g),h=f.length,g=0;for(f[h]=o,a=r=0;a<h;)f[a]!==f[a+2]?(f[r++]=f[a++],f[r++]=f[a++]):a+=2;for(h=r,a=r=0;a<h;){for(var m=f[a],y=f[a+1],v=a+2;v+2<=h&&f[v+1]===y;)v+=2;f[r++]=m,f[r++]=y,a=v}f.length=r;var b=e.h;e="",b&&(e=b.style.display,b.style.display="none");try{for(;n<p;){var w,x=d[n+2]||o,S=f[g+2]||o,C=(v=Math.min(x,S),d[n+1]);if(1!==C.nodeType&&(w=i.substring(u,v))){l&&(w=w.replace(t,"\r")),C.nodeValue=w;var N=C.ownerDocument,E=N.createElement("span");E.className=f[g+1];var _=C.parentNode;_.replaceChild(E,C),E.appendChild(C),u<x&&(d[n+1]=C=N.createTextNode(i.substring(v,x)),_.insertBefore(C,E.nextSibling))}(u=v)>=x&&(n+=2),u>=S&&(g+=2)}}finally{b&&(b.style.display=e)}}catch(e){c.console&&console.log(e&&e.stack||e)}}var o,u,c="undefined"!=typeof window?window:{},d=[o=[[u=["break,continue,do,else,for,if,return,while"],"auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,restrict,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],"abstract,assert,boolean,byte,extends,finally,final,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],p=[o,"abstract,add,alias,as,ascending,async,await,base,bool,by,byte,checked,decimal,delegate,descending,dynamic,event,finally,fixed,foreach,from,get,global,group,implicit,in,interface,internal,into,is,join,let,lock,null,object,out,override,orderby,params,partial,readonly,ref,remove,sbyte,sealed,select,set,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,value,var,virtual,where,yield"],f=[u,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],h=[u,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],m=/^(DIR|FILE|array|vector|(de|priority_)?queue|(forward_)?list|stack|(const_)?(reverse_)?iterator|(unordered_)?(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,y=/\S/,v=r({keywords:[w=[o,"alignas,alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,noexcept,noreturn,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],p,d,o=[o,"abstract,async,await,constructor,debugger,enum,eval,export,from,function,get,import,implements,instanceof,interface,let,null,of,set,undefined,var,with,yield,Infinity,NaN"],"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",f,h,u=[u,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"]],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),b={};l(v,["default-code"]),l(n([],[["pln",/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],["com",/^<\!--[\s\S]*?(?:-\->|$)/],["lang-",/^<\?([\s\S]+?)(?:\?>|$)/],["lang-",/^<%([\s\S]+?)(?:%>|$)/],["pun",/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),"default-markup htm html mxml xhtml xml xsl".split(" ")),l(n([["pln",/^[\s]+/,null," \t\r\n"],["atv",/^(?:\"[^\"]*\"?|\'[^\']*\'?)/,null,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],["pun",/^[=<>\/]+/],["lang-js",/^on\w+\s*=\s*\"([^\"]+)\"/i],["lang-js",/^on\w+\s*=\s*\'([^\']+)\'/i],["lang-js",/^on\w+\s*=\s*([^\"\'>\s]+)/i],["lang-css",/^style\s*=\s*\"([^\"]+)\"/i],["lang-css",/^style\s*=\s*\'([^\']+)\'/i],["lang-css",/^style\s*=\s*([^\"\'>\s]+)/i]]),["in.tag"]),l(n([],[["atv",/^[\s\S]+/]]),["uq.val"]),l(r({keywords:w,hashComments:!0,cStyleComments:!0,types:m}),"c cc cpp cxx cyc m".split(" ")),l(r({keywords:"null,true,false"}),["json"]),l(r({keywords:p,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:m}),["cs"]),l(r({keywords:d,cStyleComments:!0}),["java"]),l(r({keywords:u,hashComments:!0,multiLineStrings:!0}),["bash","bsh","csh","sh"]),l(r({keywords:f,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),["cv","py","python"]),l(r({keywords:"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",hashComments:!0,multiLineStrings:!0,regexLiterals:2}),["perl","pl","pm"]),l(r({keywords:h,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb","ruby"]),l(r({keywords:o,cStyleComments:!0,regexLiterals:!0}),["javascript","js","ts","typescript"]),l(r({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]),l(n([],[["str",/^[\s\S]+/]]),["regex"]);var w,x=c.PR={createSimpleLexer:n,registerLangHandler:l,sourceDecorator:r,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:"com",PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",PR_NOCODE:"nocode",PR_PLAIN:"pln",PR_PUNCTUATION:"pun",PR_SOURCE:"src",PR_STRING:"str",PR_TAG:"tag",PR_TYPE:"typ",prettyPrintOne:function(e,t,n){n=n||!1,t=t||null;var r=document.createElement("div");return r.innerHTML="<pre>"+e+"</pre>",r=r.firstChild,n&&a(r,n,!0),i({j:t,m:n,h:r,l:1,a:null,i:null,c:null,g:null}),r.innerHTML},prettyPrint:g=function(e,n){for(var r=(l=n||document.body).ownerDocument||document,l=[l.getElementsByTagName("pre"),l.getElementsByTagName("code"),l.getElementsByTagName("xmp")],s=[],o=0;o<l.length;++o)for(var u=0,d=l[o].length;u<d;++u)s.push(l[o][u]);l=null;var p=Date;p.now||(p={now:function(){return+new Date}});var f=0,h=/\blang(?:uage)?-([\w.]+)(?!\S)/,g=/\bprettyprint\b/,m=/\bprettyprinted\b/,y=/pre|xmp/i,v=/^code$/i,b=/^(?:pre|code|xmp)$/i,w={};!function n(){for(var l=c.PR_SHOULD_USE_CONTINUATION?p.now()+250:1/0;f<s.length&&p.now()<l;f++){for(var o=s[f],u=w,d=o;(d=d.previousSibling)&&((C=(7===(x=d.nodeType)||8===x)&&d.nodeValue)?/^\??prettify\b/.test(C):3===x&&!/\S/.test(d.nodeValue));)if(C){u={},C.replace(/\b(\w+)=([\w:.%+-]+)/g,function(e,t,n){u[t]=n});break}if(d=o.className,(u!==w||g.test(d))&&!m.test(d)){for(x=!1,C=o.parentNode;C;C=C.parentNode)if(b.test(C.tagName)&&C.className&&g.test(C.className)){x=!0;break}if(!x){var x,S;if(o.className+=" prettyprinted",(x=u.lang)||(!(x=d.match(h))&&(S=t(o))&&v.test(S.tagName)&&(x=S.className.match(h)),x&&(x=x[1])),y.test(o.tagName))C=1;else{var C=o.currentStyle,N=r.defaultView;C=(C=C?C.whiteSpace:N&&N.getComputedStyle?N.getComputedStyle(o,null).getPropertyValue("white-space"):0)&&"pre"===C.substring(0,3)}(N="true"===(N=u.linenums)||+N)||(N=!!(N=d.match(/\blinenums\b(?::(\d+))?/))&&(!N[1]||!N[1].length||+N[1])),N&&a(o,N,C),i({j:x,h:o,m:N,l:C,a:null,i:null,c:null,g:null})}}}f<s.length?c.setTimeout(n,250):"function"==typeof e&&e()}()}};"function"==typeof(w=c.define)&&w.amd&&w("google-code-prettify",[],function(){return x})}(),g);f||t.setTimeout(e,0)}();