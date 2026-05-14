const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, system } = req.body;
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system,
        messages
      })
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('*', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>مستشار القطاع الخاص</title>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Tajawal',sans-serif;background:#f4f6f5;min-height:100vh;display:flex;flex-direction:column}
.hdr{background:linear-gradient(135deg,#0a3d2e,#1a6b4a);padding:18px 28px;display:flex;align-items:center;gap:16px;position:sticky;top:0;z-index:100}
.hdr h1{color:#fff;font-size:17px;font-weight:700}
.hdr p{color:rgba(255,255,255,.7);font-size:12px}
.badge{margin-right:auto;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.9);padding:5px 12px;border-radius:20px;font-size:12px}
.main{display:flex;flex:1;max-width:1100px;margin:0 auto;width:100%;padding:20px 14px;gap:18px}
.sb{width:250px;flex-shrink:0}
.card{background:#fff;border-radius:14px;box-shadow:0 4px 20px rgba(10,61,46,.08);overflow:hidden;margin-bottom:14px}
.ctitle{background:#e8f5ef;padding:12px 14px;font-size:12px;font-weight:700;color:#0a3d2e;border-bottom:1px solid #e0e8e4}
.nbtn{width:100%;background:linear-gradient(135deg,#1a6b4a,#2d9b6b);color:#fff;border:none;padding:13px;font-family:'Tajawal',sans-serif;font-size:14px;font-weight:700;cursor:pointer;border-radius:14px;margin-bottom:14px;transition:.2s}
.nbtn:hover{transform:translateY(-1px)}
.hist{list-style:none;padding:6px}
.hist li{padding:9px 11px;border-radius:9px;cursor:pointer;font-size:12px;color:#3a5a4a;transition:.15s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hist li:hover,.hist li.act{background:#e8f5ef;color:#0a3d2e}
.qqs{padding:6px}
.qq{width:100%;background:none;border:1px solid #e0e8e4;border-radius:9px;padding:9px 11px;font-family:'Tajawal',sans-serif;font-size:11px;color:#3a5a4a;cursor:pointer;text-align:right;margin-bottom:5px;transition:.15s;line-height:1.4}
.qq:hover{background:#e8f5ef;color:#0a3d2e}
.ca{flex:1;display:flex;flex-direction:column;min-width:0}
.wlc{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 20px;background:#fff;border-radius:14px;box-shadow:0 4px 20px rgba(10,61,46,.08)}
.wlc h2{font-size:22px;font-weight:800;color:#0a3d2e;margin-bottom:10px}
.wlc p{font-size:14px;color:#6b8c7a;max-width:380px;line-height:1.7;margin-bottom:20px}
.div{width:50px;height:3px;background:linear-gradient(90deg,#1a6b4a,#c8a951);border-radius:2px;margin:0 auto 20px}
.stats{display:flex;gap:20px;justify-content:center;margin-bottom:28px}
.sn{font-size:26px;font-weight:800;color:#1a6b4a}
.sl{font-size:11px;color:#6b8c7a;margin-top:2px}
.cw{flex:1;display:none;flex-direction:column;background:#fff;border-radius:14px;box-shadow:0 4px 20px rgba(10,61,46,.08);overflow:hidden}
.cw.act{display:flex}
.msgs{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:14px;min-height:400px}
.msg{display:flex;gap:10px;max-width:85%;animation:fu .3s ease}
@keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.msg.u{align-self:flex-start;flex-direction:row-reverse}
.msg.a{align-self:flex-end}
.av{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
.msg.u .av{background:#e8f5ef}
.msg.a .av{background:linear-gradient(135deg,#1a6b4a,#2d9b6b)}
.bbl{padding:12px 16px;border-radius:14px;font-size:13px;line-height:1.7}
.msg.u .bbl{background:#e8f5ef;color:#0d1f18;border-top-right-radius:4px}
.msg.a .bbl{background:linear-gradient(135deg,#0a3d2e,#1a6b4a);color:#fff;border-top-left-radius:4px}
.typ{display:flex;gap:4px;align-items:center;padding:4px 0}
.typ span{width:7px;height:7px;background:rgba(255,255,255,.6);border-radius:50%;animation:b 1s infinite}
.typ span:nth-child(2){animation-delay:.15s}.typ span:nth-child(3){animation-delay:.3s}
@keyframes b{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
.inp{padding:14px 18px;border-top:1px solid #e0e8e4;background:#fff;display:flex;gap:8px;align-items:flex-end}
.inpw{flex:1;background:#f4f6f5;border:1.5px solid #e0e8e4;border-radius:11px;display:flex;align-items:center;padding:0 12px;transition:.2s}
.inpw:focus-within{border-color:#2d9b6b;background:#fff}
#ui{flex:1;background:none;border:none;outline:none;font-family:'Tajawal',sans-serif;font-size:13px;color:#0d1f18;padding:13px 0;resize:none;min-height:46px;max-height:120px}
#ui::placeholder{color:#6b8c7a}
.sbtn{width:46px;height:46px;background:linear-gradient(135deg,#1a6b4a,#2d9b6b);border:none;border-radius:11px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;transition:.2s;flex-shrink:0}
.sbtn:hover{transform:scale(1.05)}.sbtn:disabled{opacity:.5;cursor:not-allowed;transform:none}
@media(max-width:768px){.sb{display:none}.main{padding:10px}}
</style>
</head>
<body>
<header class="hdr">
  <div style="font-size:36px">🏛️</div>
  <div><h1>مستشار برنامج القطاع الخاص</h1><p>أمانة منطقة الرياض</p></div>
  <div class="badge">🟢 متصل</div>
</header>
<main class="main">
  <aside class="sb">
    <button class="nbtn" onclick="newChat()">+ محادثة جديدة</button>
    <div class="card">
      <div class="ctitle">💬 المحادثات</div>
      <ul class="hist" id="hist"><li style="color:#6b8c7a;font-size:12px;padding:12px;">لا توجد محادثات سابقة</li></ul>
    </div>
    <div class="card">
      <div class="ctitle">⚡ أسئلة سريعة</div>
      <div class="qqs">
        <button class="qq" onclick="askQ('كم عدد التحديات الواردة؟')">كم عدد التحديات الواردة؟</button>
        <button class="qq" onclick="askQ('ما أبرز تحديات الاستثمار؟')">أبرز تحديات الاستثمار</button>
        <button class="qq" onclick="askQ('ما التحديات التي تم تنفيذها؟')">التحديات المنفذة</button>
        <button class="qq" onclick="askQ('ما التحديات المرفوضة؟')">التحديات المرفوضة</button>
        <button class="qq" onclick="askQ('ما تحديات التحول الرقمي؟')">تحديات التحول الرقمي</button>
        <button class="qq" onclick="askQ('ما مقترحات المقاولين؟')">مقترحات المقاولين</button>
      </div>
    </div>
  </aside>
  <section class="ca">
    <div class="wlc" id="ws">
      <div style="font-size:56px;margin-bottom:16px">🏛️</div>
      <h2>مرحباً بك في مستشار برنامج القطاع الخاص</h2>
      <div class="div"></div>
      <p>أنا هنا لمساعدتك بكل ما يتعلق ببرنامج أمانة منطقة الرياض مع القطاع الخاص</p>
      <div class="stats">
        <div><div class="sn">429</div><div class="sl">مدخل في قاعدة البيانات</div></div>
        <div><div class="sn">6</div><div class="sl">مصادر بيانات</div></div>
        <div><div class="sn">2023-2026</div><div class="sl">الفترة الزمنية</div></div>
      </div>
      <button class="nbtn" style="width:auto;padding:13px 28px" onclick="newChat()">ابدأ محادثة جديدة +</button>
    </div>
    <div class="cw" id="cw">
      <div class="msgs" id="msgs"></div>
      <div class="inp">
        <div class="inpw">
          <textarea id="ui" placeholder="اسأل عن أي تحدٍ أو مبادرة..." rows="1"
            onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();send();}"
            oninput="this.style.height='auto';this.style.height=this.scrollHeight+'px'"></textarea>
        </div>
        <button class="sbtn" id="sb" onclick="send()">➤</button>
      </div>
    </div>
  </section>
</main>
<script>
var convs=[],cur=null,loading=false;
var D=[
{id:1,t:"صعوبة تواصل المقاولين مع الأمانة لكثرة الإدارات",s:"ورشة عمل المقاولين",y:2024,st:"-",c:"التواصل"},
{id:2,t:"ضعف التواصل بين إدارة المشاريع والجهات الرقابية",s:"ورشة عمل المقاولين",y:2024,st:"-",c:"التواصل"},
{id:3,t:"إلزام مقاولي الطرق بفتح سجل نقل منفصل عند أكثر من 7 معدات",s:"ورشة عمل المقاولين",y:2024,st:"-",c:"التراخيص"},
{id:4,t:"صعوبة صرف المستحقات المالية للمقاولين",s:"ورشة عمل المقاولين",y:2024,st:"-",c:"المالية"},
{id:5,t:"شح الأراضي المناسبة داخل الرياض لمشاريع المقاولين",s:"ورشة عمل المقاولين",y:2024,st:"-",c:"الأراضي"},
{id:6,t:"محدودية وقت أعمال الصيانة من إدارة المرور",s:"ورشة عمل المقاولين",y:2024,st:"-",c:"التشغيل"},
{id:7,t:"إغلاق مكبات النفايات ليلاً",s:"ورشة عمل المقاولين",y:2024,st:"-",c:"التشغيل"},
{id:8,t:"اشتراط ترخيص منفصل لكل رقعة صيانة",s:"ورشة عمل المقاولين",y:2024,st:"-",c:"التراخيص"},
{id:9,t:"صعوبة التواصل مع الجهات الخدمية كهرباء ومياه واتصالات",s:"ورشة عمل المقاولين",y:2024,st:"-",c:"التواصل"},
{id:11,t:"تعدد الجهات المصدرة للمخالفات وإيقاف الرخصة أثناء الاعتراض",s:"ورشة عمل المقاولين",y:2024,st:"-",c:"المخالفات"},
{id:15,t:"اشتراط موعد مسبق في كل زيارة يعيق المكاتب الهندسية",s:"ورشة عمل المكاتب الهندسية",y:2024,st:"-",c:"الإجراءات"},
{id:17,t:"اللوائح غير متاحة كاملة على موقع الأمانة",s:"ورشة عمل المكاتب الهندسية",y:2024,st:"-",c:"الشفافية"},
{id:19,t:"غموض تشريعات الأمانة - مطلوب أدلة تفصيلية",s:"ورشة عمل المكاتب الهندسية",y:2024,st:"-",c:"التشريعات"},
{id:20,t:"عمليات تقديم المخططات ورقية - مطلوب اتمتة",s:"ورشة عمل المكاتب الهندسية",y:2024,st:"-",c:"التحول الرقمي"},
{id:37,t:"الوصول لأنظمة البناء إلكترونياً - متاح",s:"لقاء القطاع الخاص الأول",y:2023,st:"تم التنفيذ",c:"التحول الرقمي"},
{id:38,t:"استخدام اللغة العربية فقط للمخططات",s:"لقاء القطاع الخاص الأول",y:2023,st:"لم يتم",c:"الإجراءات"},
{id:40,t:"طول المدة في الاشتراطات التخطيطية - تم تفعيل منصة اعتماد المخططات",s:"لقاء القطاع الخاص الأول",y:2023,st:"تم التنفيذ",c:"الإجراءات"},
{id:44,t:"عدم وضوح مدة معالجة المعاملة - متاح حالة الطلب",s:"لقاء القطاع الخاص الأول",y:2023,st:"تم التنفيذ",c:"الشفافية"},
{id:46,t:"عدم طرح أراضي لمجمعات مخازن - 321 فرصة استثمارية",s:"لقاء القطاع الخاص الأول",y:2023,st:"تم التنفيذ",c:"الاستثمار"},
{id:47,t:"عدم وضوح آلية طرح المشاريع الاستثمارية - ربع سنوي",s:"لقاء القطاع الخاص الأول",y:2023,st:"تم التنفيذ",c:"الاستثمار"},
{id:48,t:"صعوبات القطاع الترفيهي في الحصول على مواقع - الترفيه 33%",s:"غرفة الرياض",y:2025,st:"لم يتم",c:"الترفيه"},
{id:53,t:"قُصر مدة الاعتراض على المخالفات - مقترح 30 يوماً",s:"لقاء القطاع الخاص الأول",y:2023,st:"لم يتم",c:"المخالفات"},
{id:54,t:"غياب حملات توعوية قبل المخالفات - تم تنفيذ مبادرات",s:"غرفة الرياض",y:2025,st:"تم التنفيذ",c:"الامتثال"},
{id:76,t:"قلة الوعي قبل طرح الفرص الاستثمارية - جاري العمل",s:"ورشة عمل التجمع التجاري والاستثماري",y:2025,st:"جاري العمل",c:"الاستثمار"},
{id:77,t:"عدم توفر فرص استثمارية متكاملة جاهزة",s:"ورشة عمل التجمع الإنتاجي واللوجستي",y:2025,st:"تم التنفيذ",c:"الاستثمار"},
{id:79,t:"محدودية تراخيص سكن العمالة داخل المدينة",s:"ورشة عمل التجمع الإنتاجي واللوجستي",y:2025,st:"لم يتم",c:"سكن العمالة"},
{id:83,t:"تأخر إصدار الرخص - منصة موحدة 15 يوماً",s:"ورشة عمل التجمع العقاري والسياحي",y:2025,st:"موافق",c:"التراخيص"},
{id:85,t:"غياب آلية موحدة لري الحدائق - دليل موحد",s:"ورشة عمل التجمع الإنتاجي واللوجستي",y:2025,st:"قيد الدراسة",c:"التشغيل"},
{id:86,t:"محدودية تراخيص سكن العمالة - تم إصدار لائحة جديدة",s:"ورشة عمل التجمع الإنتاجي واللوجستي",y:2025,st:"تم التنفيذ",c:"سكن العمالة"},
{id:90,t:"انخفاض الوعي بمخاطر القطاعات التجارية - برامج تعليمية",s:"ورشة عمل التجمع التجاري والاستثماري",y:2025,st:"موافق",c:"الوعي"},
{id:91,t:"ارتفاع تكلفة دخول السوق للمنشآت الصغيرة - 25% للغرامات",s:"ورشة عمل التجمع التجاري والاستثماري",y:2025,st:"موافق جزئياً",c:"المنشآت الصغيرة"},
{id:92,t:"تعدد اللوائح وغياب مشاركة القطاع الخاص - منصة استطلاع",s:"ورشة عمل التجمع التجاري والاستثماري",y:2025,st:"موافق",c:"التشريعات"},
{id:93,t:"الاشتراطات غير مفهومة - أدلة إرشادية",s:"ورشة عمل التجمع التجاري والاستثماري",y:2025,st:"موافق",c:"الامتثال"},
{id:96,t:"تعدد الجهات المحصلة لرسوم النظافة - غير صحيح",s:"ورشة عمل التجمع الصحي والتعليمي",y:2025,st:"غير موافق",c:"النظافة"},
{id:98,t:"احتكار الشهادات الصحية من شركة واحدة - فتح المنافسة",s:"ورشة عمل التجمع الصحي والتعليمي",y:2025,st:"موافق",c:"الصحة"},
{id:104,t:"إلزام المنشآت بالزي الموحد - موافق مع مرونة",s:"ورشة عمل التجمع الإنتاجي واللوجستي",y:2025,st:"موافق",c:"الامتثال"},
{id:108,t:"توحيد الغرامات دون مراعاة حجم المنشأة - 25% للصغيرة",s:"ورشة عمل التجمع الإنتاجي واللوجستي",y:2025,st:"موافق",c:"المخالفات"},
{id:109,t:"عدم وضوح رحلة الطلب للمستفيدين",s:"ورشة عمل التجمع الإنتاجي واللوجستي",y:2025,st:"موافق",c:"الشفافية"},
{id:110,t:"عدم توحيد المراكز التجارية وغياب إطار للشاشات الإعلانية",s:"ورشة عمل التجمع العقاري والسياحي",y:2025,st:"موافق",c:"التجارة"},
{id:111,t:"تفاوت إجراءات التفتيش البلدي - دليل موحد",s:"ورشة عمل التجمع العقاري والسياحي",y:2025,st:"موافق",c:"الرقابة"},
{id:113,t:"عدم وضوح التشريعات وضعف التوعية بها",s:"ورشة عمل التجمع العقاري والسياحي",y:2025,st:"موافق",c:"التشريعات"},
{id:114,t:"عدم وضوح اشتراطات الفنادق - دليل خاص",s:"ورشة عمل التجمع العقاري والسياحي",y:2025,st:"موافق",c:"السياحة"},
{id:117,t:"ضعف تطبيق إجراءات السلامة في مواقع العمل",s:"ورشة عمل التجمع العقاري والسياحي",y:2025,st:"موافق",c:"السلامة"},
];
function srch(q){var ws=q.toLowerCase().replace(/[،,.]/g,'').split(' ').filter(function(w){return w.length>1;});return D.map(function(e){var t=(e.t+' '+e.s+' '+e.c+' '+e.st).toLowerCase();return Object.assign({},e,{score:ws.reduce(function(s,w){return s+(t.indexOf(w)>=0?1:0);},0)});}).filter(function(e){return e.score>0;}).sort(function(a,b){return b.score-a.score;}).slice(0,20);}
function newChat(){var conv={id:Date.now(),title:'محادثة جديدة',messages:[]};convs.unshift(conv);cur=conv;document.getElementById('ws').style.display='none';document.getElementById('cw').classList.add('act');document.getElementById('msgs').innerHTML='';renderH();document.getElementById('ui').focus();}
function renderH(){var el=document.getElementById('hist');if(!convs.length){el.innerHTML='<li style="color:#6b8c7a;font-size:12px;padding:12px;">لا توجد محادثات سابقة</li>';return;}el.innerHTML=convs.map(function(c){return '<li class="'+(c.id===cur.id?'act':'')+'" onclick="swch('+c.id+')">💬 '+c.title+'</li>';}).join('');}
function swch(id){cur=convs.find(function(c){return c.id===id;});document.getElementById('ws').style.display='none';document.getElementById('cw').classList.add('act');document.getElementById('msgs').innerHTML='';cur.messages.forEach(function(m){addMsg(m.role,m.content,false);});renderH();}
function addMsg(role,content,animate){if(animate===undefined)animate=true;var msgs=document.getElementById('msgs');var div=document.createElement('div');div.className='msg '+(role==='user'?'u':'a');div.innerHTML='<div class="av">'+(role==='user'?'👤':'🤖')+'</div><div class="bbl">'+content.replace(/\n/g,'<br>')+'</div>';if(!animate)div.style.animation='none';msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight;}
function addTyp(){var msgs=document.getElementById('msgs');var div=document.createElement('div');div.className='msg a';div.id='typ';div.innerHTML='<div class="av">🤖</div><div class="bbl"><div class="typ"><span></span><span></span><span></span></div></div>';msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight;}
async function send(){if(loading)return;var input=document.getElementById('ui');var text=input.value.trim();if(!text)return;if(!cur)newChat();input.value='';input.style.height='auto';loading=true;document.getElementById('sb').disabled=true;addMsg('user',text);cur.messages.push({role:'user',content:text});if(cur.title==='محادثة جديدة'){cur.title=text.slice(0,30)+(text.length>30?'..':'');renderH();}addTyp();var rel=srch(text);var ctx=rel.length>0?rel.map(function(e){return '- '+e.t+'\n  المصدر: '+e.s+' ('+e.y+') | الحالة: '+e.st;}).join('\n'):'لم يتم العثور على بيانات مطابقة.';var sys='أنت مستشار متخصص في برنامج أمانة منطقة الرياض مع القطاع الخاص. أجب فقط بناءً على البيانات المقدمة. إذا لم تجد معلومة قل: هذه المعلومة غير متوفرة في بيانات المشروع. تحدث بالعربية دائماً. إجمالي البيانات: 429 مدخل من 6 مصادر 2023-2026.';var msgs=cur.messages.slice(-6).slice(0,-1).concat([{role:'user',content:'السؤال: '+text+'\n\nالبيانات:\n'+ctx}]);try{var res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:msgs,system:sys})});var data=await res.json();var t=document.getElementById('typ');if(t)t.remove();var reply=data.content&&data.content[0]?data.content[0].text:'حدث خطأ.';addMsg('assistant',reply);cur.messages.push({role:'assistant',content:reply});}catch(e){var t=document.getElementById('typ');if(t)t.remove();addMsg('assistant','حدث خطأ في الاتصال.');}loading=false;document.getElementById('sb').disabled=false;}
function askQ(q){if(!cur)newChat();document.getElementById('ui').value=q;send();}
</script>
</body>
</html>\`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
