// Teams setup
const TEAMS = [
  {id: 'nationals', name: 'Nationals'},
  {id: 'la-stars', name: 'LA Stars'},
  {id: 'all-stars', name: 'All Stars'},
  {id: '67-power-houses', name: '67 Power Houses'}
];

// In-memory results list (will reset on page refresh)
let results = [];

// Utilities
function getTeamById(id){ return TEAMS.find(t => t.id === id) }
function computeStandings(){
  const stats = {};
  TEAMS.forEach(t => stats[t.id] = {team: t.name, w:0, l:0});
  results.forEach(r => {
    if(r.homeScore > r.awayScore){
      stats[r.homeTeam].w += 1;
      stats[r.awayTeam].l += 1;
    } else if(r.homeScore < r.awayScore){
      stats[r.awayTeam].w += 1;
      stats[r.homeTeam].l += 1;
    } else {
      // tie -> count as half-win? keep simple: no change
    }
  });
  const arr = Object.values(stats).map(s => {
    const gp = s.w + s.l;
    const pct = gp === 0 ? 0 : +(s.w / gp).toFixed(3);
    return {...s, pct};
  });
  arr.sort((a,b) => b.pct - a.pct || (b.w - a.w));
  return arr;
}

// DOM helpers
function populateTeamSelectors(){
  const home = document.getElementById('home-team');
  const away = document.getElementById('away-team');
  if(home && away){
    home.innerHTML = '<option value="">-- pick --</option>';
    away.innerHTML = '<option value="">-- pick --</option>';
    TEAMS.forEach(t => {
      const o1 = document.createElement('option');
      o1.value = t.id; o1.textContent = t.name;
      const o2 = o1.cloneNode(true);
      home.appendChild(o1); away.appendChild(o2);
    });
  }
}

function renderResults(){
  const el = document.getElementById('results-list');
  if(!el) return;
  el.innerHTML = '';
  if(results.length === 0){
    el.innerHTML = '<li class="muted">No results yet â add the first game!</li>';
    return;
  }
  results.slice().reverse().forEach((r, i) => {
    const li = document.createElement('li');
    const home = getTeamById(r.homeTeam).name;
    const away = getTeamById(r.awayTeam).name;
    li.textContent = `${home} ${r.homeScore} â ${away} ${r.awayScore} (${r.date})`;
    el.appendChild(li);
  });
}

function renderStandings(){
  const tbody = document.querySelector('#standings-table tbody');
  if(!tbody) return;
  const standings = computeStandings();
  tbody.innerHTML = '';
  standings.forEach((s, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${idx+1}</td><td>${s.team}</td><td>${s.w}</td><td>${s.l}</td><td>${(s.pct).toFixed(3)}</td>`;
    tbody.appendChild(tr);
  });

  // preview on index page
  const preview = document.getElementById('standings-preview');
  if(preview){
    preview.innerHTML = '<ol>' + standings.map(s => `<li>${s.team} â ${s.w}-${s.l}</li>`).join('') + '</ol>';
  }
}

function renderTeamsPage(){
  const grid = document.getElementById('team-grid');
  if(!grid) return;
  grid.innerHTML = '';
  TEAMS.forEach(t => {
    const div = document.createElement('div');
    div.className = 'team-card';
    div.innerHTML = `<h4>${t.name}</h4><p class="muted">Short team bio or notes here. Add players and logo later.</p>`;
    grid.appendChild(div);
  });
}

// Form handling
document.addEventListener('DOMContentLoaded', () => {
  populateTeamSelectors();
  renderStandings();
  renderResults();
  renderTeamsPage();

  const form = document.getElementById('result-form');
  if(form){
    form.addEventListener('submit', e => {
      e.preventDefault();
      const homeTeam = document.getElementById('home-team').value;
      const awayTeam = document.getElementById('away-team').value;
      const homeScore = Number(document.getElementById('home-score').value);
      const awayScore = Number(document.getElementById('away-score').value);
      if(!homeTeam || !awayTeam || homeTeam === awayTeam){
        alert('Please pick two different teams.');
        return;
      }
      const now = new Date().toLocaleString();
      results.push({homeTeam, awayTeam, homeScore, awayScore, date: now});
      // re-render
      renderResults();
      renderStandings();
      form.reset();
    });
  }

  const clearBtn = document.getElementById('clear-results');
  if(clearBtn){
    clearBtn.addEventListener('click', () => {
      if(confirm('Clear all results? This cannot be undone.')){
        results = [];
        renderResults();
        renderStandings();
      }
    });
  }
});

// Contact form demo handler
function handleContactSubmit(e){
  e.preventDefault();
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const message = document.getElementById('contact-message').value;
  const feedback = document.getElementById('contact-feedback');
  feedback.textContent = 'Thanks â copy this message and email it to your organizer. (Demo form)';
  e.target.reset();
}
