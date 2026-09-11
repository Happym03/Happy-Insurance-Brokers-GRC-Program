document.addEventListener('DOMContentLoaded', () => {
  loadDashboardData();
});

async function loadDashboardData() {
  const datasets = ['risks', 'controls', 'compliance', 'vendors', 'findings', 'metadata'];
  const data = {};

  try {
    for (const name of datasets) {
      const res = await fetch(`data/${name}.json`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status} on ${name}`);
      data[name] = await res.json();
    }
    renderDashboard(data);
  } catch (error) {
    console.error('Error loading GRC dashboard data:', error);
    const mainContent = document.querySelector('.main-content') || document.body;
    mainContent.innerHTML = `
      <div style="padding: 2rem; background: #fff1f0; border: 1px solid #ffa39e; border-radius: 8px; margin: 2rem;">
        <h3 style="color: #cf1322; margin-top: 0;">⚠️ Unable to Load Dashboard Data</h3>
        <p style="color: #434343;">There was an issue loading the asynchronous GRC JSON models. Please check your network connection or verify file paths in the repository.</p>
      </div>
    `;
  }
}

function renderDashboard(data) {
  renderMetadata(data.metadata);
  renderRiskRegister(data.risks);
  renderCompliance(data.compliance);
  renderControls(data.controls);
  renderVendors(data.vendors);
  renderFindings(data.findings);
}

function renderMetadata(metadata) {
  if (!metadata) return;
  
  const lastUpdatedElem = document.getElementById('last-updated');
  if (lastUpdatedElem) {
    lastUpdatedElem.textContent = `Data Last Reviewed: ${metadata.lastReviewed} (v${metadata.version})`;
  }

  const postureElem = document.getElementById('overall-risk-posture');
  if (postureElem) {
    postureElem.innerHTML = `
      <div style="background: #fafafa; border-left: 4px solid #f5222d; padding: 1rem; border-radius: 4px; margin-bottom: 1.5rem;">
        <strong style="color: #cf1322;">Overall Enterprise Risk Posture: ${metadata.overallRiskPosture}</strong>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: #595959;">${metadata.postureRationale}</p>
      </div>
    `;
  }
}

function renderRiskRegister(risks) {
  const tableBody = document.getElementById('risk-table-body');
  if (!tableBody || !risks) return;

  tableBody.innerHTML = risks.map(r => `
    <tr>
      <td><strong>${r.id}</strong></td>
      <td>${r.name}<br><small style="color:#8c8c8c">${r.category}</small></td>
      <td>
        <span class="badge ${r.inherentRating.toLowerCase()}">${r.inherentScore} (${r.inherentRating})</span>
      </td>
      <td style="font-size: 0.85rem; color: #434343;">${r.controls}</td>
      <td>
        <span class="badge ${r.residualRating.toLowerCase()}">${r.residualScore} (${r.residualRating})</span>
      </td>
      <td><code>${r.treatment}</code></td>
      <td>${r.owner}</td>
      <td><span class="status-pill ${r.status.toLowerCase().replace(/\s+/g, '-')}">${r.status}</span></td>
    </tr>
  `).join('');
}

function renderCompliance(compliance) {
  const container = document.getElementById('compliance-grid');
  if (!container || !compliance) return;

  container.innerHTML = compliance.map(c => `
    <div class="card">
      <h4>${c.framework}</h4>
      <div class="score-display">${c.score}%</div>
      <div style="font-size: 0.85rem; font-weight: 600; color: #262626;">${c.metricLabel}</div>
      <p style="font-size: 0.78rem; color: #8c8c8c; margin-top: 0.25rem;">${c.definition}</p>
    </div>
  `).join('');
}

function renderControls(controls) {
  const tableBody = document.getElementById('controls-table-body');
  if (!tableBody || !controls) return;

  tableBody.innerHTML = controls.map(c => `
    <tr>
      <td><strong>${c.id}</strong></td>
      <td>${c.name}</td>
      <td><code>${c.isoMapping}</code></td>
      <td>${c.owner}</td>
      <td><span class="status-pill ${c.status.toLowerCase().replace(/\s+/g, '-')}">${c.status}</span></td>
    </tr>
  `).join('');
}

function renderVendors(vendors) {
  const tableBody = document.getElementById('vendor-table-body');
  if (!tableBody || !vendors) return;

  tableBody.innerHTML = vendors.map(v => `
    <tr>
      <td><strong>${v.name}</strong></td>
      <td>${v.service}</td>
      <td><span class="badge ${v.tier.toLowerCase()}">${v.tier} Risk</span></td>
      <td>${v.dataAccess}</td>
      <td><span class="status-pill ${v.assessmentStatus.toLowerCase().replace(/\s+/g, '-')}">${v.assessmentStatus}</span></td>
    </tr>
  `).join('');
}

function renderFindings(findings) {
  const tableBody = document.getElementById('findings-table-body');
  if (!tableBody || !findings) return;

  tableBody.innerHTML = findings.map(f => `
    <tr>
      <td><strong>${f.id}</strong></td>
      <td>${f.title}</td>
      <td><span class="badge ${f.severity.toLowerCase()}">${f.severity}</span></td>
      <td>${f.dueDate}</td>
      <td>${f.owner}</td>
      <td><span class="status-pill ${f.status.toLowerCase().replace(/\s+/g, '-')}">${f.status}</span></td>
    </tr>
  `).join('');
}
