async function loadSeriesFromJSON() {
  const res = await fetch("./data/series.json");
  if (!res.ok) throw new Error("Could not load data/series.json");
  const data = await res.json();
  return data.series || [];
}

function safeDiv(a, b) {
  return b === 0 ? 0 : a / b;
}
function fmt2(x) { return Number(x).toFixed(2); }
function fmt1(x) { return Number(x).toFixed(1); }
function fmt0(x) { return Math.round(Number(x)); }
function isMapPlayed(m) {
  // If score exists and isn't 0-0, it's played
  if (m?.score && !(Number(m.score.A) === 0 && Number(m.score.B) === 0)) return true;

  // Otherwise, if ANY stat is > 0, it's played
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
function calcRows(savedSeries) {
  // Your save stores: { id, savedAt, match }
  const seriesList = savedSeries.map(s => s.match).filter(Boolean);

  const acc = new Map(); // key = name|mode -> totals

  for (const series of seriesList) {
    for (const m of (series.maps || [])) {
      if (!isMapPlayed(m)) continue;
      const mode = m.mode;
      const extraKey =
        mode === "Hardpoint" ? "hillTime" :
        mode === "Search & Destroy" ? "firstBloods" :
        mode === "Overload" ? "goals" : null;

      const rows = [
        ...((m.stats && m.stats.A) || []),
        ...((m.stats && m.stats.B) || [])
      ];

      for (const p of rows) {
        const key = `${p.name}|${mode}`;
        if (!acc.has(key)) {
          acc.set(key, { name: p.name, mode, maps: 0, kills: 0, deaths: 0, damage: 0, extra: 0 });
        }
        const t = acc.get(key);
        t.maps += 1;
        t.kills += Number(p.kills || 0);
        t.deaths += Number(p.deaths || 0);
        t.damage += Number(p.damage || 0);
        if (extraKey) t.extra += Number(p[extraKey] || 0);
      }
    }
  }

  const out = [];
  for (const t of acc.values()) {
    const extraLabel =
      t.mode === "Hardpoint" ? "Avg Hill Time" :
      t.mode === "Search & Destroy" ? "Avg First Bloods" :
      t.mode === "Overload" ? "Avg Goals" : "Avg Extra";

    out.push({
      name: t.name,
      mode: t.mode,
      maps: t.maps,
      kd: safeDiv(t.kills, t.deaths),
      avgKills: safeDiv(t.kills, t.maps),
      avgDeaths: safeDiv(t.deaths, t.maps),
      avgDamage: safeDiv(t.damage, t.maps),
      extraLabel,
      avgExtra: safeDiv(t.extra, t.maps),
    });
  }

  // sort: mode then KD desc
  out.sort((a, b) => a.mode.localeCompare(b.mode) || (b.kd - a.kd));
  return out;
}

function render(rows) {
  const wrap = document.getElementById("tableWrap");
  if (!rows.length) {
    wrap.innerHTML = `<div class="map-card">No saved data found.</div>`;
    return;
  }

  const body = rows.map(r => `
    <tr>
      <td>
  <a href="player.html?name=${encodeURIComponent(r.name)}"
     style="color:white; text-decoration:underline;">
    ${r.name}
  </a>
</td>
      <td>${r.mode}</td>
      <td class="${r.kd >= 1 ? "green" : "red"}">${fmt2(r.kd)}</td>
      <td>${fmt1(r.avgKills)}</td>
      <td>${fmt1(r.avgDeaths)}</td>
      <td>${fmt0(r.avgDamage).toLocaleString()}</td>
      <td>${fmt2(r.avgExtra)}</td>
    </tr>
  `).join("");

  wrap.innerHTML = `
    <section class="stats">
      <table>
        <tr>
          <th>Player</th>
          <th>Mode</th>
          <th>K/D</th>
          <th>Avg K</th>
          <th>Avg D</th>
          <th>Avg Damage</th>
          <th>Mode Extra Avg</th>
        </tr>
        ${body}
      </table>
      <div style="color:#888; margin-top:10px;">
        Mode Extra Avg = Hill Time (HP) / First Bloods (S&amp;D) / Goals (Overload)
      </div>
    </section>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  const status = document.getElementById("status");

  try {
    const saved = await loadSeriesFromJSON();
    status.textContent = `Saved series found: ${saved.length}`;

    const rows = calcRows(saved);
    render(rows);
  } catch (e) {
    console.error(e);
    status.textContent = "Failed to load series data.";
  }
});
