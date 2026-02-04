async function loadSeriesFromJSON() {
  const res = await fetch("/data/series.json", { cache: "no-store" });
  if (!res.ok) throw new Error(`Could not load /data/series.json (HTTP ${res.status})`);
  const data = await res.json();
  return data.series || [];
}

// ---------- Helpers ----------
function safeDiv(a, b) { return b === 0 ? 0 : a / b; }
function fmt2(x) { return Number(x).toFixed(2); }
function fmt1(x) { return Number(x).toFixed(1); }
function fmt0(x) { return Math.round(Number(x)); }

function fmtHillTime(seconds) {
  const sec = Math.max(0, Math.round(seconds));
  const mm = Math.floor(sec / 60);
  const ss = sec % 60;
  return `${mm}:${String(ss).padStart(2, "0")}`;
}

// Skip placeholder / unplayed maps
function isMapPlayed(m) {
  if (m?.score && !(Number(m.score.A) === 0 && Number(m.score.B) === 0)) return true;

  const rows = [
    ...((m.stats && m.stats.A) || []),
    ...((m.stats && m.stats.B) || [])
  ];

  return rows.some(p =>
    Number(p.kills || 0) > 0 ||
    Number(p.deaths || 0) > 0 ||
    Number(p.damage || 0) > 0 ||
    Number(p.hillTime || 0) > 0 ||
    Number(p.firstBloods || 0) > 0 ||
    Number(p.goals || 0) > 0
  );
}

function extraKeyForMode(mode) {
  if (mode === "Hardpoint") return "hillTime";
  if (mode === "Search & Destroy") return "firstBloods";
  if (mode === "Overload") return "goals";
  return null;
}

function extraLabelForMode(mode) {
  if (mode === "Hardpoint") return "Avg Hill Time";
  if (mode === "Search & Destroy") return "Avg First Bloods";
  if (mode === "Overload") return "Avg Goals";
  return "Avg Extra";
}

// ---------- Build list of players ----------
function collectPlayers(savedRows) {
  const set = new Set();

  for (const row of savedRows) {
    const match = row.match; // IMPORTANT: your save stored { match }
    const maps = match?.maps || [];
    for (const m of maps) {
      if (!isMapPlayed(m)) continue;
      const all = [...(m.stats?.A || []), ...(m.stats?.B || [])];
      for (const p of all) if (p?.name) set.add(p.name);
    }
  }

  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

// ---------- Build profile ----------
function buildProfile(savedRows, playerName) {
  const modes = {}; // mode -> totals
  const history = [];

  for (const row of savedRows) {
    const match = row.match;
    const savedAt = row.savedAt;

    for (const m of (match?.maps || [])) {
      if (!isMapPlayed(m)) continue;

      const mode = m.mode || "Unknown";
      const extraKey = extraKeyForMode(mode);

      const all = [...(m.stats?.A || []), ...(m.stats?.B || [])];
      const me = all.find(x => x.name === playerName);
      if (!me) continue;

      if (!modes[mode]) {
        modes[mode] = { maps: 0, kills: 0, deaths: 0, damage: 0, extra: 0 };
      }

      modes[mode].maps += 1;
      modes[mode].kills += Number(me.kills || 0);
      modes[mode].deaths += Number(me.deaths || 0);
      modes[mode].damage += Number(me.damage || 0);
      if (extraKey) modes[mode].extra += Number(me[extraKey] || 0);

      history.push({
        savedAt,
        mapNumber: m.mapNumber,
        mode,
        mapName: m.mapName,
        kills: Number(me.kills || 0),
        deaths: Number(me.deaths || 0),
        damage: Number(me.damage || 0),
        extraKey,
        extraVal: extraKey ? Number(me[extraKey] || 0) : 0
      });
    }
  }

  const summary = Object.entries(modes)
    .map(([mode, t]) => ({
      mode,
      maps: t.maps,
      kd: safeDiv(t.kills, t.deaths),
      avgKills: safeDiv(t.kills, t.maps),
      avgDeaths: safeDiv(t.deaths, t.maps),
      avgDamage: safeDiv(t.damage, t.maps),
      avgExtra: safeDiv(t.extra, t.maps),
      extraLabel: extraLabelForMode(mode)
    }))
    .sort((a, b) => a.mode.localeCompare(b.mode));

  history.sort((a, b) => String(b.savedAt).localeCompare(String(a.savedAt)));

  return { summary, history };
}

// ---------- Render ----------
function renderProfile(playerName, profile) {
  const summaryEl = document.getElementById("profileSummary");
  const historyEl = document.getElementById("profileHistory");

  if (!profile.summary.length) {
    summaryEl.innerHTML = `<div class="map-card" style="opacity:0.8;">No stats found for ${playerName}.</div>`;
    historyEl.innerHTML = "";
    return;
  }

  const summaryRows = profile.summary.map(r => `
    <tr>
      <td>${r.mode}</td>
      <td>${r.maps}</td>
      <td class="${r.kd >= 1 ? "green" : "red"}">${fmt2(r.kd)}</td>
      <td>${fmt1(r.avgKills)}</td>
      <td>${fmt1(r.avgDeaths)}</td>
      <td>${fmt0(r.avgDamage).toLocaleString()}</td>
      <td>${r.mode === "Hardpoint" ? fmtHillTime(r.avgExtra) : fmt2(r.avgExtra)}</td>
    </tr>
  `).join("");

  summaryEl.innerHTML = `
    <section class="stats">
      <h3>${playerName} • Career (by mode)</h3>
      <table>
        <tr>
          <th>Mode</th><th>Maps</th><th>K/D</th><th>Avg K</th><th>Avg D</th><th>Avg Damage</th><th>Mode Extra Avg</th>
        </tr>
        ${summaryRows}
      </table>
      <div style="color:#888; margin-top:10px;">
        Mode Extra Avg = Hill Time (HP) / First Bloods (S&amp;D) / Goals (Overload)
      </div>
    </section>
  `;

  const histRows = profile.history.map(h => {
    const kd = safeDiv(h.kills, h.deaths);
    const extraLabel =
      h.mode === "Hardpoint" ? "Hill" :
      h.mode === "Search & Destroy" ? "FB" :
      h.mode === "Overload" ? "Goals" : "Extra";

    const extraVal =
      h.mode === "Hardpoint" ? fmtHillTime(h.extraVal) : String(h.extraVal);

    return `
      <tr>
        <td>${h.savedAt ? new Date(h.savedAt).toLocaleString() : ""}</td>
        <td>Map ${h.mapNumber}</td>
        <td>${h.mode}</td>
        <td>${h.mapName}</td>
        <td>${h.kills}</td>
        <td>${h.deaths}</td>
        <td class="${kd >= 1 ? "green" : "red"}">${fmt2(kd)}</td>
        <td>${fmt0(h.damage).toLocaleString()}</td>
        <td>${extraLabel}: ${extraVal}</td>
      </tr>
    `;
  }).join("");

  historyEl.innerHTML = `
    <section class="stats">
      <h3>${playerName} • Match history</h3>
      <table>
        <tr>
          <th>Saved</th><th>Map</th><th>Mode</th><th>Map Name</th><th>K</th><th>D</th><th>K/D</th><th>Dmg</th><th>Extra</th>
        </tr>
        ${histRows}
      </table>
    </section>
  `;
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", async () => {
  const select = document.getElementById("playerSelect");
  const status = document.getElementById("status");

  try {
    const savedRows = await loadSeriesFromJSON();
status.textContent = `Saved series: ${savedRows.length}`;

    status.textContent = `Saved series: ${savedRows.length}`;

    const players = collectPlayers(savedRows);
    select.innerHTML = players.map(p => `<option value="${p}">${p}</option>`).join("");

    const urlName = new URLSearchParams(location.search).get("name");
    if (urlName && players.includes(urlName)) select.value = urlName;

    const run = () => {
      const name = select.value;
      const profile = buildProfile(savedRows, name);
      renderProfile(name, profile);
    };

    select.addEventListener("change", run);
    run();
  } catch (e) {
    console.error(e);
    status.textContent = "Error loading profile (check console).";
  }
});