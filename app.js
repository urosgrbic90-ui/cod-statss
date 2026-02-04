// ========= EDIT THIS ONLY (your match data) =========

const match = {
  teams: {
    A: { name: "Team A", record: "0" },
    B: { name: "Team B", record: "0" }
  },
  seriesScore: { A: 3, B: 2 },

  // Each map has: mode, mapName, score, and per-team player stats for THAT map
  maps: [
    {
  mapNumber: 1,
  mode: "Hardpoint",
  mapName: "Scar",
  score: { A: 175, B: 250 },
  stats: {
    A: [
      { name: "Sempy", kills: 31, deaths: 25, damage: 3311, hillTime: 55 },
      { name: "Odee", kills: 15, deaths: 23, damage: 2397, hillTime: 24 },
      { name: "CC9", kills: 19, deaths: 29, damage: 2528, hillTime: 72 },
      { name: "Hameyz", kills: 31, deaths: 24, damage: 3586, hillTime: 40 }
    ],
    B: [
      { name: "Telo", kills: 22, deaths: 21, damage: 3057, hillTime: 71 },
      { name: "Garfield", kills: 31, deaths: 23, damage: 3514, hillTime: 25 },
      { name: "Nemmii", kills: 26, deaths: 22, damage: 3003, hillTime: 83 },
      { name: "Chuni", kills: 20, deaths: 30, damage: 2435, hillTime: 112 }
    ]
  }
},
    {
  mapNumber: 2,
  mode: "Search & Destroy",
  mapName: "Colossus",
  score: { A: 6, B: 2 },
  stats: {
    A: [
      { name: "Sempy", kills: 10, deaths: 7, damage: 1306, firstBloods: 1 },
      { name: "Odee", kills: 3, deaths: 5, damage: 729, firstBloods: 0 },
      { name: "CC9", kills: 6, deaths: 5, damage: 1010, firstBloods: 1 },
      { name: "Hameyz", kills: 7, deaths: 3, damage: 740, firstBloods: 3 }
    ],
    B: [
      { name: "Telo", kills: 5, deaths: 8, damage: 821, firstBloods: 2 },
      { name: "Garfield", kills: 7, deaths: 5, damage: 870, firstBloods: 0 },
      { name: "Nemmii", kills: 7, deaths: 6, damage: 746, firstBloods: 1 },
      { name: "Chuni", kills: 1, deaths: 7, damage: 315, firstBloods: 0 }
    ]
  }
},
   {
  mapNumber: 3,
  mode: "Overload",
  mapName: "Den",
  score: { A: 3, B: 2 },
  stats: {
    A: [
      { name: "Sempy", kills: 37, deaths: 21, damage: 3945, goals: 1 },
      { name: "Odee", kills: 19, deaths: 22, damage: 2621, goals: 1 },
      { name: "CC9", kills: 16, deaths: 20, damage: 2086, goals: 1 },
      { name: "Hameyz", kills: 28, deaths: 16, damage: 2947, goals: 0 }
    ],
    B: [
      { name: "Telo", kills: 17, deaths: 27, damage: 2334, goals: 0 },
      { name: "Garfield", kills: 20, deaths: 24, damage: 2548, goals: 0 },
      { name: "Nemmii", kills: 26, deaths: 24, damage: 3375, goals: 1 },
      { name: "Chuni", kills: 16, deaths: 25, damage: 2028, goals: 1 }
    ]
  }
},
{
  mapNumber: 4,
  mode: "Hardpoint",
  mapName: "Blackheart",
  score: { A: 224, B: 250 },
  stats: {
    A: [
      { name: "Sempy", kills: 41, deaths: 30, damage: 4671, hillTime: 100 },
      { name: "Odee", kills: 28, deaths: 31, damage: 3842, hillTime: 94 },
      { name: "CC9", kills: 24, deaths: 37, damage: 3024, hillTime: 90 },
      { name: "Hameyz", kills: 48, deaths: 26, damage: 5183, hillTime: 63 }
    ],
    B: [
      { name: "Telo", kills: 32, deaths: 37, damage: 3466, hillTime: 45 },
      { name: "Garfield", kills: 37, deaths: 36, damage: 4180, hillTime: 95 },
      { name: "Nemmii", kills: 32, deaths: 30, damage: 4111, hillTime: 149 },
      { name: "Chuni", kills: 23, deaths: 38, damage: 3297, hillTime: 90 }
    ]
  }
},
{
  mapNumber: 5,
  mode: "Search & Destroy",
  mapName: "Raid",
  score: { A: 6, B: 4 },
  stats: {
    A: [
      { name: "Sempy", kills: 14, deaths: 5, damage: 1820, firstBloods: 3 },
      { name: "Odee", kills: 2, deaths: 8, damage: 477, firstBloods: 0 },
      { name: "CC9", kills: 6, deaths: 7, damage: 728, firstBloods: 1 },
      { name: "Hameyz", kills: 8, deaths: 6, damage: 1012, firstBloods: 3 }
    ],
    B: [
      { name: "Telo", kills: 5, deaths: 8, damage: 703, firstBloods: 1 },
      { name: "Garfield", kills: 6, deaths: 8, damage: 1050, firstBloods: 1 },
      { name: "Nemmii", kills: 5, deaths: 6, damage: 802, firstBloods: 0 },
      { name: "Chuni", kills: 10, deaths: 8, damage: 1350, firstBloods: 1 }
    ]
  }
},
    // Add map 4 and 5 the same way when you have them
  ]
};
// ====================================================


// -------- Helpers --------
const MODE_ORDER = {
  1: "Hardpoint",
  2: "Search & Destroy",
  3: "Overload",
  4: "Hardpoint",
  5: "Search & Destroy",
};
function safeKD(k, d) {
  return (k / Math.max(d, 1)).toFixed(2);
}
function diffStr(k, d) {
  const x = k - d;
  return x > 0 ? `+${x}` : `${x}`;
}
function kdClass(k, d) {
  return (k / Math.max(d, 1)) >= 1 ? "green" : "red";
}
function diffClass(k, d) {
  return (k - d) >= 0 ? "green" : "red";
}
function sumTeamStats(mapsStatsArray) {
  // mapsStatsArray is array of arrays of player rows
  const acc = new Map();
  for (const rows of mapsStatsArray) {
    for (const r of rows) {
      if (!acc.has(r.name)) acc.set(r.name, { name: r.name, kills: 0, deaths: 0, damage: 0 });
      const cur = acc.get(r.name);
      cur.kills += r.kills;
      cur.deaths += r.deaths;
      cur.damage += r.damage;
    }
  }
  return Array.from(acc.values());
}
function renderHeader() {
  const el = document.getElementById("matchHeader");
  el.className = "match-header";
  el.innerHTML = `
    <div class="team left">
      <h2>${match.teams.A.name}</h2>
      <div class="record">${match.teams.A.record}</div>
    </div>

    <div class="score">${match.seriesScore.A} – ${match.seriesScore.B}</div>

    <div class="team right" style="text-align:right;">
      <h2>${match.teams.B.name}</h2>
      <div class="record">${match.teams.B.record}</div>
    </div>
  `;
}
function renderMapsRow() {
  const row = document.getElementById("mapsRow");
  if (!row) return;

  row.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const m = match.maps.find(x => x.mapNumber === i);
    const mode = (m?.mode) || MODE_ORDER[i] || "Unknown Mode";

    let title = "Not played yet";
    let scoreHTML = `<span style="opacity:0.7;">—</span>`;

    if (m) {
      title = m.mapName;

      const a = m.score.A;
      const b = m.score.B;

      scoreHTML = (a > b)
        ? `<span class="green">${a}</span> - <span class="red">${b}</span>`
        : `<span class="red">${a}</span> - <span class="green">${b}</span>`;
    }

    row.innerHTML += `
      <div class="map-card" style="${m ? "" : "opacity:0.6;"}">
        <div class="mode">Map ${i} • ${mode}</div>
        <h3>${title}</h3>
        <div class="result">${scoreHTML}</div>
      </div>
    `;
  }
}
function renderTeamTable(teamLabel, rows, mode) {
  let extraHeader = "";
  if (mode === "Hardpoint") extraHeader = "<th>Hill Time</th>";
  if (mode === "Search & Destroy") extraHeader = "<th>First Bloods</th>";
  if (mode === "Overload") extraHeader = "<th>Goals</th>";

  const body = rows.map(r => {
    const kd = safeKD(r.kills, r.deaths);
    const df = diffStr(r.kills, r.deaths);

    let extraCell = "";
    if (mode === "Hardpoint") extraCell = `<td>${r.hillTime ?? 0}</td>`;
    if (mode === "Search & Destroy") extraCell = `<td>${r.firstBloods ?? 0}</td>`;
    if (mode === "Overload") extraCell = `<td>${r.goals ?? 0}</td>`;

    return `
      <tr>
        <td>${r.name}</td>
        <td>${r.kills}</td>
        <td>${r.deaths}</td>
        <td class="${kdClass(r.kills, r.deaths)}">${kd}</td>
        <td class="${diffClass(r.kills, r.deaths)}">${df}</td>
        <td>${(r.damage ?? 0).toLocaleString()}</td>
        ${extraCell}
      </tr>
    `;
  }).join("");

  return `
    <section class="stats">
      <h3>${teamLabel}</h3>
      <table>
        <tr>
          <th>Player</th><th>K</th><th>D</th><th>K/D</th><th>+/-</th><th>Damage</th>
          ${extraHeader}
        </tr>
        ${body}
      </table>
    </section>
  `;
}
function renderSeriesTotals() {
  const content = document.getElementById("tabContent");

  const totalsA = sumTeamStats(match.maps.map(m => m.stats.A));
  const totalsB = sumTeamStats(match.maps.map(m => m.stats.B));

  content.innerHTML =
    renderTeamTable(match.teams.A.name, totalsA) +
    renderTeamTable(match.teams.B.name, totalsB);
}
function renderSingleMap(mapNumber) {
  const content = document.getElementById("tabContent");
  const m = match.maps.find(x => x.mapNumber === mapNumber);

  if (!m) {
    content.innerHTML = `<div class="map-card">No data for Map ${mapNumber}</div>`;
    return;
  }

  const a = m.score.A;
  const b = m.score.B;

  const scoreHTML = (a > b)
    ? `<span class="green">${a}</span> - <span class="red">${b}</span>`
    : `<span class="red">${a}</span> - <span class="green">${b}</span>`;

  content.innerHTML = `
    <div class="map-card" style="margin-top:10px;">
      <div class="mode">Map ${m.mapNumber} • ${m.mode}</div>
      <h3>${m.mapName}</h3>
      <div class="result">${scoreHTML}</div>
    </div>
   ${renderTeamTable(match.teams.A.name, m.stats.A, m.mode)}
${renderTeamTable(match.teams.B.name, m.stats.B, m.mode)}
  `;
}
function buildTabs() {
  const tabs = document.getElementById("tabs");
  if (!tabs) return;

  tabs.innerHTML = "";

  function setActive(btn) {
    document.querySelectorAll("#tabs .tab-btn")
      .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }

  // Series tab
  const seriesBtn = document.createElement("button");
  seriesBtn.className = "tab-btn active";
  seriesBtn.textContent = "Series";
  seriesBtn.onclick = () => {
    setActive(seriesBtn);
    renderSeriesTotals();
  };
  tabs.appendChild(seriesBtn);

  // One tab per map
  match.maps.forEach(m => {
    const btn = document.createElement("button");
    btn.className = "tab-btn";
    btn.textContent = `Map ${m.mapNumber}`;
    btn.onclick = () => {
      setActive(btn);
      renderSingleMap(m.mapNumber);
    };
    tabs.appendChild(btn);
  });
}
// ---------- AVERAGES / AGGREGATION ----------

// Keep mode names consistent
function normalizeMode(mode) {
  const m = (mode || "").toLowerCase();
  if (m.includes("hardpoint")) return "Hardpoint";
  if (m.includes("search")) return "Search & Destroy";
  if (m.includes("snd")) return "Search & Destroy";
  if (m.includes("overload")) return "Overload";
  return mode || "Unknown";
}

function emptyModeBucket(modeName) {
  return {
    mode: modeName,
    mapsPlayed: 0,

    kills: 0,
    deaths: 0,
    damage: 0,

    // mode-specific totals
    hillTime: 0,       // Hardpoint only
    firstBloods: 0,    // S&D only
    goals: 0,          // Overload only

    // how many maps had that extra stat present (for accurate averages)
    hillTimeMaps: 0,
    firstBloodsMaps: 0,
    goalsMaps: 0
  };
}

function finalizeBucket(b) {
  const avg = (total, n) => (n > 0 ? total / n : 0);
  const kd = b.deaths > 0 ? (b.kills / b.deaths) : b.kills; // if deaths 0, treat KD as kills

  return {
    mode: b.mode,
    mapsPlayed: b.mapsPlayed,

    avgKills: avg(b.kills, b.mapsPlayed),
    avgDeaths: avg(b.deaths, b.mapsPlayed),
    avgDamage: avg(b.damage, b.mapsPlayed),
    kd: kd,

    // extras only averaged over maps where they exist
    avgHillTime: avg(b.hillTime, b.hillTimeMaps),
    avgFirstBloods: avg(b.firstBloods, b.firstBloodsMaps),
    avgGoals: avg(b.goals, b.goalsMaps)
  };
}
/**
 * Input: seriesList = [series, series, ...]
 * Where each series looks like your `match` object with:
 * series.maps = [{ mode, stats: { A:[players], B:[players] } }, ...]
 *
 * Output: per-player object with per-mode averages:
 * {
 *   Envoy: { Hardpoint: {...}, "Search & Destroy": {...}, Overload: {...} },
 *   ...
 * }
 */
function calculatePlayerAverages(seriesList) {
  const store = new Map(); // playerName -> Map(modeName -> bucket)

  function getPlayerModeBucket(playerName, modeName) {
    if (!store.has(playerName)) store.set(playerName, new Map());
    const modeMap = store.get(playerName);
    if (!modeMap.has(modeName)) modeMap.set(modeName, emptyModeBucket(modeName));
    return modeMap.get(modeName);
  }

  for (const series of (seriesList || [])) {
    for (const map of (series.maps || [])) {
      const modeName = normalizeMode(map.mode);

      // combine both teams into one list (we want player averages regardless of team)
      const allRows = [
        ...((map.stats && map.stats.A) || []),
        ...((map.stats && map.stats.B) || [])
      ];

      for (const r of allRows) {
        if (!r || !r.name) continue;

        const b = getPlayerModeBucket(r.name, modeName);

        b.mapsPlayed += 1;
        b.kills += Number(r.kills || 0);
        b.deaths += Number(r.deaths || 0);
        b.damage += Number(r.damage || 0);

        // mode-specific fields (only count if present)
        if (typeof r.hillTime !== "undefined") {
          b.hillTime += Number(r.hillTime || 0);
          b.hillTimeMaps += 1;
        }
        if (typeof r.firstBloods !== "undefined") {
          b.firstBloods += Number(r.firstBloods || 0);
          b.firstBloodsMaps += 1;
        }
        if (typeof r.goals !== "undefined") {
          b.goals += Number(r.goals || 0);
          b.goalsMaps += 1;
        }
      }
    }
  }
// ================= PLAYER AVERAGES =================

// Normalize mode names
function normalizeMode(mode) {
  if (mode === "Hardpoint") return "Hardpoint";
  if (mode === "Search & Destroy") return "Search & Destroy";
  if (mode === "Overload") return "Overload";
  return "Unknown";
}

function emptyBucket(mode) {
  return {
    mode,
    mapsPlayed: 0,
    kills: 0,
    deaths: 0,
    damage: 0,
    hillTime: 0,
    firstBloods: 0,
    goals: 0,
    hillMaps: 0,
    fbMaps: 0,
    goalMaps: 0
  };
}

function calculatePlayerAverages(seriesList) {
  const players = {};

  for (const series of seriesList) {
    for (const map of series.maps) {
      const mode = normalizeMode(map.mode);
      const allPlayers = [...map.stats.A, ...map.stats.B];

      for (const p of allPlayers) {
        if (!players[p.name]) players[p.name] = {};
        if (!players[p.name][mode]) players[p.name][mode] = emptyBucket(mode);

        const b = players[p.name][mode];

        b.mapsPlayed++;
        b.kills += p.kills;
        b.deaths += p.deaths;
        b.damage += p.damage;

        if (p.hillTime !== undefined) {
          b.hillTime += p.hillTime;
          b.hillMaps++;
        }
        if (p.firstBloods !== undefined) {
          b.firstBloods += p.firstBloods;
          b.fbMaps++;
        }
        if (p.goals !== undefined) {
          b.goals += p.goals;
          b.goalMaps++;
        }
      }
    }
  }

  // Finalize averages
  for (const player in players) {
    for (const mode in players[player]) {
      const b = players[player][mode];
      b.avgKills = b.kills / b.mapsPlayed;
      b.avgDeaths = b.deaths / b.mapsPlayed;
      b.avgDamage = b.damage / b.mapsPlayed;
      b.kd = b.deaths > 0 ? b.kills / b.deaths : b.kills;
      b.avgHillTime = b.hillMaps ? b.hillTime / b.hillMaps : 0;
      b.avgFirstBloods = b.fbMaps ? b.firstBloods / b.fbMaps : 0;
      b.avgGoals = b.goalMaps ? b.goals / b.goalMaps : 0;
    }
  }

  return players;
}
// ================= PLAYER AVERAGES =================

// Normalize mode names
function normalizeMode(mode) {
  if (mode === "Hardpoint") return "Hardpoint";
  if (mode === "Search & Destroy") return "Search & Destroy";
  if (mode === "Overload") return "Overload";
  return "Unknown";
}

function emptyBucket(mode) {
  return {
    mode,
    mapsPlayed: 0,
    kills: 0,
    deaths: 0,
    damage: 0,
    hillTime: 0,
    firstBloods: 0,
    goals: 0,
    hillMaps: 0,
    fbMaps: 0,
    goalMaps: 0
  };
}

function calculatePlayerAverages(seriesList) {
  const players = {};

  for (const series of seriesList) {
    for (const map of series.maps) {
      const mode = normalizeMode(map.mode);
      const allPlayers = [...map.stats.A, ...map.stats.B];

      for (const p of allPlayers) {
        if (!players[p.name]) players[p.name] = {};
        if (!players[p.name][mode]) players[p.name][mode] = emptyBucket(mode);

        const b = players[p.name][mode];

        b.mapsPlayed++;
        b.kills += p.kills;
        b.deaths += p.deaths;
        b.damage += p.damage;

        if (p.hillTime !== undefined) {
          b.hillTime += p.hillTime;
          b.hillMaps++;
        }
        if (p.firstBloods !== undefined) {
          b.firstBloods += p.firstBloods;
          b.fbMaps++;
        }
        if (p.goals !== undefined) {
          b.goals += p.goals;
          b.goalMaps++;
        }
      }
    }
  }

  // Finalize averages
  for (const player in players) {
    for (const mode in players[player]) {
      const b = players[player][mode];
      b.avgKills = b.kills / b.mapsPlayed;
      b.avgDeaths = b.deaths / b.mapsPlayed;
      b.avgDamage = b.damage / b.mapsPlayed;
      b.kd = b.deaths > 0 ? b.kills / b.deaths : b.kills;
      b.avgHillTime = b.hillMaps ? b.hillTime / b.hillMaps : 0;
      b.avgFirstBloods = b.fbMaps ? b.firstBloods / b.fbMaps : 0;
      b.avgGoals = b.goalMaps ? b.goals / b.goalMaps : 0;
    }
  }

  return players;
}
  // finalize into plain objects
  const result = {};
  for (const [playerName, modeMap] of store.entries()) {
    result[playerName] = {};
    for (const [modeName, bucket] of modeMap.entries()) {
      result[playerName][modeName] = finalizeBucket(bucket);
    }
  }
  return result;
}
// ================= SAVE SERIES TO DATABASE =================
const DB_NAME = "cod_stats_db";
const DB_VERSION = 3; // must match players.js too

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;

      // store where each series is saved
      if (!db.objectStoreNames.contains("series")) {
        db.createObjectStore("series", { keyPath: "id" });
      }

      // OPTIONAL (only if you are also saving totals here)
      // if (!db.objectStoreNames.contains("playerTotals")) {
      //   db.createObjectStore("playerTotals", { keyPath: "key" });
      // }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    req.onblocked = () => console.warn("DB open blocked (close other tabs)");
  });
}
function saveCurrentSeriesToDB() {
  console.log("SAVE: clicked");

  const req = indexedDB.open("cod_stats_db", 3);

  req.onupgradeneeded = () => {
    const db = req.result;
    if (!db.objectStoreNames.contains("series")) {
      db.createObjectStore("series", { keyPath: "id" });
    }
  };

  req.onerror = () => {
    console.error("DB open error", req.error);
  };

  req.onsuccess = () => {
    const db = req.result;
    console.log("DB opened");

    const tx = db.transaction(["series"], "readwrite");
    const store = tx.objectStore("series");

    store.put({
      id: `series_${Date.now()}`,
      savedAt: new Date().toISOString(),
      match
    });

    tx.oncomplete = () => {
      console.log("SAVE COMPLETE");
      alert("Series saved successfully!");
      db.close();
    };
  };
}
document.addEventListener("DOMContentLoaded", () => {
  // Now run your real render functions
  renderHeader();
  renderMapsRow();
  buildTabs();
  renderSeriesTotals(); // (or renderSeriesTotals() if that's what you named it)
});
const averages = calculatePlayerAverages([match]);
console.log("PLAYER AVERAGES:", averages);
const btn = document.getElementById("saveBtn");
console.log("saveBtn found?", !!btn);
if (btn) {
  btn.addEventListener("click", () => {
    console.log("Save button clicked");
    saveCurrentSeriesToDB();
  });
}


    

