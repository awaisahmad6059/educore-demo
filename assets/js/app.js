/* EduCore Demo - shared helpers (frontend only, mock data) */
function showMsg(t){ var m=document.getElementById('msg'); if(!m){ m=document.createElement('div'); m.id='msg'; m.className='msg'; document.body.appendChild(m); } m.textContent=t; m.classList.add('show'); clearTimeout(m._t); m._t=setTimeout(function(){ m.classList.remove('show'); }, 2600); }

function openModal(id){
  var m=document.getElementById(id);
  if(m){ m.classList.add('show'); }
}
function closeModal(id){
  var m=document.getElementById(id);
  if(m){ m.classList.remove('show'); }
}
document.addEventListener('click', function(e){
  if(e.target.classList && e.target.classList.contains('modal-overlay')){ e.target.classList.remove('show'); }
});

/* ===== Mock Data Store (localStorage) ===== */
var STORE_KEY='educore_demo_v1';
function loadStore(){
  var seed=seedData();
  try{
    var d=JSON.parse(localStorage.getItem(STORE_KEY));
    if(d){
      // merge so newer schema keys (users, subjects, ...) always exist even from older saved data
      Object.keys(seed).forEach(function(k){ if(d[k]===undefined) d[k]=seed[k]; });
      if(d.users && d.users.length===0) d.users=seed.users;
      return d;
    }
  }catch(e){}
  return seed;
}
function saveStore(s){ localStorage.setItem(STORE_KEY, JSON.stringify(s)); }
function seedData(){
  return {
    users:[
      {id:1,role:'superadmin',name:'Super Admin',email:'superadmin@educore.pk',pass:'admin123',active:true},
      {id:2,role:'admin',name:'Admin',email:'admin@educore.pk',pass:'admin123',active:true},
      {id:3,role:'teacher',name:'Ms. Ahmed',email:'ahmed@educore.pk',pass:'teacher123',active:true,teacherId:1},
      {id:4,role:'teacher',name:'Mr. Khan',email:'khan@educore.pk',pass:'teacher123',active:true,teacherId:2},
      {id:5,role:'teacher',name:'Ms. Iqbal',email:'iqbal@educore.pk',pass:'teacher123',active:true,teacherId:3},
      {id:6,role:'student',name:'Ahmed Raza',email:'ahmed.raza@educore.pk',pass:'student123',active:true,studentId:1},
      {id:7,role:'student',name:'Fatima Noor',email:'fatima@educore.pk',pass:'student123',active:true,studentId:2},
      {id:8,role:'student',name:'Hamza Ali',email:'hamza@educore.pk',pass:'student123',active:true,studentId:3}
    ],
    students:[
      {id:1,roll:'R-101',name:'Ahmed Raza',class:'Grade 8-A',guardian:'Raza Ali',status:'active',gender:'Male'},
      {id:2,roll:'R-102',name:'Fatima Noor',class:'Grade 5-B',guardian:'Noor Khan',status:'active',gender:'Female'},
      {id:3,roll:'R-103',name:'Hamza Ali',class:'Grade 10-A',guardian:'Ali Raza',status:'active',gender:'Male'},
      {id:4,roll:'R-104',name:'Zainab Bibi',class:'Grade 3-A',guardian:'Bibi Aslam',status:'active',gender:'Female'},
      {id:5,roll:'R-105',name:'Ali Hassan',class:'Grade 8-A',guardian:'Hassan Ahmad',status:'active',gender:'Male'},
      {id:6,roll:'R-106',name:'Saad Khan',class:'Grade 9-B',guardian:'Khan Sahib',status:'active',gender:'Male'}
    ],
    teachers:[
      {id:1,emp:'T-01',name:'Ms. Ahmed',subject:'Mathematics',classes:['Grade 8-A','Grade 9-B','Grade 10-A'],status:'active'},
      {id:2,emp:'T-02',name:'Mr. Khan',subject:'English',classes:['Grade 5-B'],status:'active'},
      {id:3,emp:'T-03',name:'Ms. Iqbal',subject:'Science',classes:['Grade 3-A'],status:'active'}
    ],
    assignments:[
      {id:1,title:'Algebra HW #4',subject:'Mathematics',teacher:'Ms. Ahmed',class:'Grade 8-A',due:'2026-08-30',type:'pdf'},
      {id:2,title:'Geometry Practice',subject:'Mathematics',teacher:'Ms. Ahmed',class:'Grade 10-A',due:'2026-09-02',type:'docx'},
      {id:3,title:'Calculus Worksheet',subject:'Mathematics',teacher:'Ms. Ahmed',class:'Grade 9-B',due:'2026-09-05',type:'pdf'}
    ],
    exams:[
      {id:1,name:'Midterm',class:'Grade 8-A',subject:'Mathematics',date:'2026-09-02',total:100,status:'scheduled'},
      {id:2,name:'Algebra Quiz',class:'Grade 10-A',subject:'Algebra',date:'2026-09-05',total:50,status:'result-pending'},
      {id:3,name:'Unit Test',class:'Grade 9-B',subject:'Mathematics',date:'2026-08-28',total:100,status:'published'}
    ],
    fees:[
      {id:1,student:'Ahmed Raza',amount:250,due:'2026-08-15',status:'overdue'},
      {id:2,student:'Fatima Noor',amount:120,due:'2026-08-30',status:'pending'},
      {id:3,student:'Hamza Ali',amount:180,due:'2026-09-01',status:'pending'},
      {id:4,student:'Zainab Bibi',amount:90,due:'2026-09-02',status:'pending'}
    ],
    notifications:[
      {id:1,type:'Result',title:'Midterm results available',read:false},
      {id:2,type:'Assignment',title:'New assignment in Mathematics',read:false},
      {id:3,type:'Exam',title:'Algebra Midterm scheduled Sep 02',read:true}
    ],
    audit:[
      {action:'Created student',user:'Admin',time:'Today 9:10 AM',resource:'Students'},
      {action:'Recorded payment',user:'Admin',time:'Today 9:05 AM',resource:'Fees'},
      {action:'Published results',user:'Admin',time:'Yesterday',resource:'Results'}
    ],
    subjects:[
      {id:1,name:'Mathematics',code:'MATH'},
      {id:2,name:'English',code:'ENG'},
      {id:3,name:'Science',code:'SCI'},
      {id:4,name:'Urdu',code:'URD'},
      {id:5,name:'Computer',code:'CS'},
      {id:6,name:'Islamiat',code:'ISL'},
      {id:7,name:'Physics',code:'PHY'},
      {id:8,name:'Algebra',code:'ALG'}
    ],
    submissions:[
      {id:1,assignId:1,student:'Ahmed Raza',studentId:6,file:'algebra_hw4_solution.pdf',teacher:'Ms. Ahmed',date:'2026-08-28',status:'submitted'}
    ]
  };
}

/* ===== Role guard: without login redirect to login ===== */
function requireLogin(){
  var role=sessionStorage.getItem('educore_role');
  var email=sessionStorage.getItem('educore_email');
  if(!role){
    if(confirm('Pehle login karein. Kya login page par chalte hain?')){ window.location.href='../../auth/login.html'; return null; }
    return null;
  }
  return { role:role, email:email };
}
/* Check current page hai role ke liye correct hai */
function guard(pageRole){
  var allowed=Array.isArray(pageRole)?pageRole:[pageRole];
  var u=requireLogin();
  if(!u) return null;
  if(allowed.indexOf(u.role)===-1){ showMsg('Yeh page sirf '+allowed.join('/')+' ke liye hai - aap '+u.role+' hain.'); window.location.href='../../auth/login.html'; return null; }
  return u;
}
function logout(){ sessionStorage.removeItem('educore_role'); sessionStorage.removeItem('educore_email'); window.location.href='../../auth/login.html'; }

/* user chip name/initial */
function letterAvatar(name){ return (name||'U').trim().charAt(0).toUpperCase(); }

/* helpers */
function esc(s){ var d=document.createElement('div'); d.textContent=s; return d.innerHTML; }
function todayStr(){ var d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }

/* ===== Auth / Users (demo frontend) ===== */
function getUsers(){ return loadStore().users||[]; }
function getCurrentUser(){
  var em=sessionStorage.getItem('educore_email');
  var role=sessionStorage.getItem('educore_role');
  if(!em) return null;
  return getUsers().find(function(u){ return u.email.toLowerCase()===em.toLowerCase() && u.role===role; }) || {email:em,role:role,name:em};
}
function verifyLogin(email, pass, role){
  var u=getUsers().find(function(x){ return x.email.toLowerCase()===email.toLowerCase() && x.role===role && String(x.pass)===pass && x.active!==false; });
  return u||null;
}
function changePassword(email, role, newPass){
  var s=loadStore();
  var u=s.users.find(function(x){ return x.email.toLowerCase()===email.toLowerCase() && x.role===role; });
  if(!u) return false;
  u.pass=newPass; saveStore(s); return true;
}
function rolePage(role){
  var p={superadmin:'../pages/super-admin/index.html',admin:'../pages/admin/index.html',teacher:'../pages/teacher/index.html',student:'../pages/student/index.html'};
  return p[role]||'../../auth/login.html';
}

/* Reusable sidebar builder for dashboards */
function buildSidebar(active, role){
  var links=[];
  if(role==='superadmin'){
    links=[
      {icon:'🏠',label:'Overview',url:'index.html'},
      {icon:'🛡️',label:'Admins / Sub-Admins',url:'admins.html'},
      {icon:'🏫',label:'School Setup',url:'setup.html'},
      {icon:'📚',label:'Subjects',url:'subjects.html'},
      {icon:'💾',label:'Backup & Restore',url:'backup.html'},
      {icon:'🛠️',label:'System Settings',url:'settings.html'}
    ];
  } else if(role==='admin'){
    links=[
      {icon:'📊',label:'Dashboard',url:'index.html'},
      {icon:'🎓',label:'Students',url:'students.html'},
      {icon:'👩‍🏫',label:'Teachers',url:'teachers.html'},
      {icon:'📚',label:'Subjects',url:'subjects.html'},
      {icon:'🏫',label:'Classes',url:'classes.html'},
      {icon:'📅',label:'Attendance',url:'attendance.html'},
      {icon:'📝',label:'Exams',url:'exams.html'},
      {icon:'💰',label:'Fees',url:'fees.html'},
      {icon:'🔔',label:'Notifications',url:'notifications.html'},
      {icon:'🛡️',label:'Audit Logs',url:'audit.html'},
      {icon:'⚙️',label:'Settings',url:'settings.html'}
    ];
  } else if(role==='teacher'){
    links=[
      {icon:'📊',label:'Dashboard',url:'index.html'},
      {icon:'📅',label:'Mark Attendance',url:'attendance.html'},
      {icon:'📚',label:'Assignments',url:'assignments.html'},
      {icon:'📝',label:'Grades',url:'grades.html'},
      {icon:'📢',label:'Notifications',url:'notifications.html'},
      {icon:'📈',label:'Performance',url:'performance.html'},
      {icon:'🔑',label:'Change Password',url:'change-password.html'}
    ];
  } else {
    links=[
      {icon:'📊',label:'Dashboard',url:'index.html'},
      {icon:'📅',label:'My Attendance',url:'attendance.html'},
      {icon:'📚',label:'Assignments',url:'assignments.html'},
      {icon:'📝',label:'Results',url:'results.html'},
      {icon:'📄',label:'Report Card',url:'report.html'},
      {icon:'💰',label:'Fee Status',url:'fees.html'},
      {icon:'🔔',label:'Notifications',url:'notifications.html'},
      {icon:'🔑',label:'Change Password',url:'change-password.html'}
    ];
  }
  var h='<a class="brand" href="#" onclick="logout();return false;"><span class="brand-icon">E</span>EduCore</a>';
  h+='<div class="sb-group">Menu</div>';
  links.forEach(function(l){
    h+='<div class="sb-link '+(active===l.label?'active':'')+'" onclick="if(\''+l.url+'\'&&\''+l.url+'\'!==window.location.href.split(\'/\').pop()){window.location.href=\''+l.url+'\'}"><span class="ico">'+l.icon+'</span>'+l.label+'</div>';
  });
  h+='<div class="sb-group">Account</div>';
  h+='<div class="sb-link" onclick="logout()"><span class="ico">🚪</span>Logout</div>';
  var cu=getCurrentUser();
  h+='<div class="sb-foot">Signed in as '+(cu&&cu.name?cu.name:roleLabel(role))+'<br/>'+roleLabel(role)+' · EduCore Demo v1.0</div>';
  return h;
}
function roleLabel(role){ return ({superadmin:'Super Admin',admin:'Admin',teacher:'Teacher',student:'Student'})[role]||role; }
