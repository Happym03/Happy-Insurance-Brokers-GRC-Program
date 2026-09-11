const dataFiles=['risks','controls','findings','vendors','compliance'];
const data={};

async function loadData(){
  for(const name of dataFiles){
    const res=await fetch(`data/${name}.json`);
    data[name]=await res.json();
  }
  renderAll();
}

const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const badge=(value)=>`<span class="badge ${String(value).toLowerCase().replaceAll(' ','-')}">${esc(value)}</span>`;

function renderAll(){
  document.getElementById('lastUpdated').textContent=new Date().toLocaleDateString('en-ZA',{day:'2-digit',month:'short',year:'numeric'});
  document.getElementById('openRisks').textContent=data.risks.filter(r=>r.status!=='Closed').length;
  document.getElementById('avgCompliance').textContent=Math.round(data.compliance.reduce((a,b)=>a+b.compliance,0)/data.compliance.length)+'%';
  document.getElementById('openFindings').textContent=data.findings.filter(f=>f.status!=='Completed').length;
  renderRiskBars(); renderCompliance(); renderTopRisks(); renderFindingSummary(); renderControlSummary();
  renderRiskTable(); renderControlTable(); renderFindingTable(); renderVendorTable();
  const high=data.vendors.filter(v=>v.risk==='High').length;
  const complete=data.vendors.filter(v=>v.assessment==='Complete').length;
  document.getElementById('highVendors').textContent=high;
  document.getElementById('vendorCompletion').textContent=Math.round(complete/data.vendors.length*100)+'%';
}

function renderRiskBars(){
  const order=['Critical','High','Medium','Low'];
  const counts=order.map(x=>[x,data.risks.filter(r=>r.rating===x).length]);
  const max=Math.max(...counts.map(x=>x[1]));
  document.getElementById('riskBars').innerHTML=counts.map(([name,n])=>`<div class="bar-row"><span>${name}</span><div class="track"><div class="fill ${name.toLowerCase()}" style="width:${n/max*100}%"></div></div><strong>${n}</strong></div>`).join('');
}
function renderCompliance(){
  document.getElementById('complianceBars').innerHTML=data.compliance.map(x=>`<div class="bar-row"><span>${x.framework}</span><div class="track"><div class="fill" style="width:${x.compliance}%"></div></div><strong>${x.compliance}%</strong></div>`).join('');
}
function renderTopRisks(){
  const rows=[...data.risks].sort((a,b)=>b.score-a.score).slice(0,5);
  document.getElementById('topRisks').innerHTML=`<table class="table"><thead><tr><th>ID</th><th>Risk</th><th>Category</th><th>Score</th><th>Rating</th><th>Status</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r.id}</td><td><strong>${esc(r.title)}</strong></td><td>${esc(r.category)}</td><td>${r.score}</td><td>${badge(r.rating)}</td><td>${badge(r.status)}</td></tr>`).join('')}</tbody></table>`;
}
function renderFindingSummary(){
  const states=['Open','In Progress','Overdue'];
  document.getElementById('findingSummary').innerHTML=states.map(s=>`<div class="status-item"><strong>${data.findings.filter(f=>f.status===s).length}</strong><span>${s}</span></div>`).join('');
}
function renderControlSummary(){
  const states=['Effective','Partially Effective','Ineffective'];
  document.getElementById('controlSummary').innerHTML=states.map(s=>`<div class="status-item"><strong>${data.controls.filter(c=>c.status===s).length}</strong><span>${s}</span></div>`).join('');
}
function renderRiskTable(){
  const search=(document.getElementById('riskSearch')?.value||'').toLowerCase();
  const filter=document.getElementById('riskFilter')?.value||'All';
  const rows=data.risks.filter(r=>(filter==='All'||r.rating===filter)&&(`${r.id} ${r.title} ${r.category} ${r.owner}`.toLowerCase().includes(search)));
  document.getElementById('riskTable').innerHTML=`<table class="table"><thead><tr><th>ID</th><th>Risk</th><th>Category</th><th>Likelihood</th><th>Impact</th><th>Score</th><th>Rating</th><th>Owner</th><th>Status</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r.id}</td><td><strong>${esc(r.title)}</strong></td><td>${esc(r.category)}</td><td>${r.likelihood}</td><td>${r.impact}</td><td><strong>${r.score}</strong></td><td>${badge(r.rating)}</td><td>${esc(r.owner)}</td><td>${badge(r.status)}</td></tr>`).join('')}</tbody></table>`;
}
function renderControlTable(){
  document.getElementById('controlTable').innerHTML=`<table class="table"><thead><tr><th>ID</th><th>Control</th><th>Framework</th><th>Effectiveness</th></tr></thead><tbody>${data.controls.map(c=>`<tr><td>${c.id}</td><td><strong>${esc(c.name)}</strong></td><td>${esc(c.framework)}</td><td>${badge(c.status)}</td></tr>`).join('')}</tbody></table>`;
}
function renderFindingTable(){
  const search=(document.getElementById('findingSearch')?.value||'').toLowerCase();
  const filter=document.getElementById('findingFilter')?.value||'All';
  const rows=data.findings.filter(f=>(filter==='All'||f.status===filter)&&(`${f.id} ${f.title} ${f.owner}`.toLowerCase().includes(search)));
  document.getElementById('findingTable').innerHTML=`<table class="table"><thead><tr><th>ID</th><th>Finding</th><th>Severity</th><th>Owner</th><th>Due Date</th><th>Status</th></tr></thead><tbody>${rows.map(f=>`<tr><td>${f.id}</td><td><strong>${esc(f.title)}</strong></td><td>${badge(f.severity)}</td><td>${esc(f.owner)}</td><td>${f.dueDate}</td><td>${badge(f.status)}</td></tr>`).join('')}</tbody></table>`;
}
function renderVendorTable(){
  document.getElementById('vendorTable').innerHTML=`<table class="table"><thead><tr><th>Vendor</th><th>Service</th><th>Risk</th><th>Assessment</th></tr></thead><tbody>${data.vendors.map(v=>`<tr><td><strong>${esc(v.vendor)}</strong></td><td>${esc(v.service)}</td><td>${badge(v.risk)}</td><td>${badge(v.assessment)}</td></tr>`).join('')}</tbody></table>`;
}

function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.target===id));
}
document.addEventListener('click',e=>{
  const target=e.target.closest('[data-target]');
  if(target) showPage(target.dataset.target);
});
document.getElementById('riskSearch').addEventListener('input',renderRiskTable);
document.getElementById('riskFilter').addEventListener('change',renderRiskTable);
document.getElementById('findingSearch').addEventListener('input',renderFindingTable);
document.getElementById('findingFilter').addEventListener('change',renderFindingTable);

loadData();