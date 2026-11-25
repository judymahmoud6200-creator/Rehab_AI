const USERS_KEY='rehabai_users_v1'; const CURRENT_KEY='rehabai_current_v1';
function users(){return JSON.parse(localStorage.getItem(USERS_KEY)||'[]')}
function saveUsers(u){localStorage.setItem(USERS_KEY,JSON.stringify(u))}
function current(){return JSON.parse(localStorage.getItem(CURRENT_KEY)||'null')}
function requireAuth(){if(!current() && !location.pathname.endsWith('login.html') && !location.pathname.endsWith('signup.html') && !location.pathname.endsWith('index.html')) location.href='login.html'}
document.addEventListener('DOMContentLoaded',()=>{
 const signup=document.getElementById('signupForm');
 if(signup) signup.addEventListener('submit',e=>{
   e.preventDefault(); const name=fullName.value.trim(), un=username.value.trim(), em=email.value.trim().toLowerCase(), pw=password.value, cp=confirmPassword.value, msg=document.getElementById('signupMsg');
   const list=users(); if(pw!==cp){msg.textContent='Passwords do not match.';msg.className='form-message error';return}
   if(list.some(x=>x.email===em)){msg.textContent='This email already has an account. Log in instead.';msg.className='form-message error';return}
   if(list.some(x=>x.username.toLowerCase()===un.toLowerCase())){msg.textContent='That username is already taken. Choose another one.';msg.className='form-message error';return}
   const user={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),name,username:un,email:em,password:pw,verified:false}; list.push(user);saveUsers(list);localStorage.setItem(CURRENT_KEY,JSON.stringify(user));
   msg.textContent='Account created. Demo email verification is ready for backend integration.';msg.className='form-message success';setTimeout(()=>location.href='dashboard.html',700);
 });
 const login=document.getElementById('loginForm');
 if(login) login.addEventListener('submit',e=>{
   e.preventDefault(); const em=loginEmail.value.trim().toLowerCase(), un=loginUsername.value.trim(), pw=loginPassword.value, msg=document.getElementById('loginMsg');
   const user=users().find(x=>x.email===em && x.username.toLowerCase()===un.toLowerCase());
   if(!user){msg.textContent='No account matches this email and username.';msg.className='form-message error';return}
   if(user.password!==pw){msg.textContent='Incorrect password.';msg.className='form-message error';return}
   localStorage.setItem(CURRENT_KEY,JSON.stringify(user));location.href='dashboard.html';
 });
 const c=current();
 const chip=document.getElementById('userChip'); if(chip&&c) chip.textContent='@'+c.username;
 const first=document.getElementById('firstName'); if(first&&c) first.textContent=c.name.split(' ')[0];
 const pn=document.getElementById('profileName'); if(pn&&c) pn.textContent=c.name;
 const pe=document.getElementById('profileEmail'); if(pe&&c) pe.textContent=c.email;
 const pe2=document.getElementById('profileEmail2'); if(pe2&&c) pe2.textContent=c.email;
 const pu=document.getElementById('profileUsername'); if(pu&&c) pu.textContent=c.username;
 const av=document.getElementById('avatar'); if(av&&c) av.textContent=c.name.charAt(0).toUpperCase();
 const logout=document.getElementById('logout'); if(logout) logout.onclick=()=>{localStorage.removeItem(CURRENT_KEY);location.href='index.html'};
 if(['dashboard.html','exercises.html','session.html','progress.html','profile.html'].some(x=>location.pathname.endsWith(x))) requireAuth();
});