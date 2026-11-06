/* =========================================================
   苗栗燈會｜4G 站台建設進度管控
   資料來源：中心資料統計總表（114 年 4G 站台進度）
   ========================================================= */

const ORIGINAL = {
  year: 114,
  updatedAt: "2026-11-06",
  centers: [
    {
      id: "miaoli", name: "苗栗營運中心",
      target: 17, lease: 106,
      p1: 101, p1x: 7,
      p2a: 100, p2ax: 8,
      p2b: 100, p2bx: 9,
      p2c: 100, p2cx: null,
      p23: 100,
      p3: 74, p3x: 4,
      sd: 87, sdx: 6,
      install: 73, installx: 4,
      open: 72, openx: 3
    },
    {
      id: "fengyuan", name: "豐原營運中心",
      target: 21, lease: 124,
      p1: 124, p1x: 6,
      p2a: 123, p2ax: 6,
      p2b: 124, p2bx: 6,
      p2c: 123, p2cx: null,
      p23: 123,
      p3: 120, p3x: 5,
      sd: 121, sdx: 6,
      install: 119, installx: 6,
      open: 119, openx: 6
    },
    {
      id: "taichung", name: "台中營運中心",
      target: 14, lease: 105,
      p1: 96, p1x: 7,
      p2a: 96, p2ax: 7,
      p2b: 96, p2bx: 7,
      p2c: 96, p2cx: 7,
      p23: 96,
      p3: 86, p3x: 10,
      sd: 88, sdx: 9,
      install: 83, installx: 8,
      open: 82, openx: 8
    },
    {
      id: "changhua", name: "彰化營運中心",
      target: 18, lease: 102,
      p1: 97, p1x: 10,
      p2a: 94, p2ax: 11,
      p2b: 93, p2bx: 12,
      p2c: 92, p2cx: null,
      p23: 92,
      p3: 74, p3x: 4,
      sd: 78, sdx: 2,
      install: 72, installx: 3,
      open: 72, openx: 3
    },
    {
      id: "nantou", name: "南投營運中心",
      target: 15, lease: 47,
      p1: 43, p1x: 5,
      p2a: 43, p2ax: 5,
      p2b: 41, p2bx: 3,
      p2c: 41, p2cx: null,
      p23: 41,
      p3: 41, p3x: 4,
      sd: 40, sdx: 3,
      install: 40, installx: 3,
      open: 40, openx: 3
    },
    {
      id: "yunlin", name: "雲林營運中心",
      target: 15, lease: 78,
      p1: 77, p1x: null,
      p2a: 77, p2ax: null,
      p2b: 78, p2bx: null,
      p2c: 77, p2cx: null,
      p23: 77,
      p3: 76, p3x: null,
      sd: 76, sdx: null,
      install: 76, installx: null,
      open: 76, openx: null
    }
  ]
};

const STORAGE_KEY = "miaoli-lantern-4g-progress-v1";
const NUM_FIELDS = [
  "target", "lease",
  "p1", "p1x", "p2a", "p2ax", "p2b", "p2bx", "p2c", "p2cx", "p23",
  "p3", "p3x", "sd", "sdx", "install", "installx", "open", "openx"
];

const FIELDS = [
  { key: "target", label: "4G 建設目標", unit: "站" },
  { key: "lease", label: "租賃完成", unit: "站" },
  { key: "p1", x: "p1x", label: "P1 電力配合" },
  { key: "p2a", x: "p2ax", label: "P2 美化" },
  { key: "p2b", x: "p2bx", label: "P2 電力配合" },
  { key: "p2c", x: "p2cx", label: "P2 傳輸測通" },
  { key: "p23", label: "P2=3 配合完成" },
  { key: "p3", x: "p3x", label: "P3 核數" },
  { key: "sd", x: "sdx", label: "P4 SD_Ready" },
  { key: "install", x: "installx", label: "P4 裝機完成" },
  { key: "open", x: "openx", label: "P4 開台日期" }
];

const ICONS = {
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="8.2"/><circle cx="12" cy="12" r="3.6"/><path d="M12 1.8v3M12 19.2v3M1.8 12h3M19.2 12h3"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12.5 9 5 9-5M3 17l9 5 9-5"/></svg>',
  signal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 20v-3M9.3 20v-6M14.7 20V9.5M20 20V4"/></svg>',
  flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4"/><path d="M5 4h11l-2.2 4L16 12H5z"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5 21 20H3z"/><path d="M12 9v5M12 17.2v.1"/></svg>'
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---------- 工具函式 ---------- */
const clone = (value) => JSON.parse(JSON.stringify(value));
const toNum = (value) => {
  if (value === null || value === undefined || value === "") return 0;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};
const fmt = (value) => new Intl.NumberFormat("zh-TW", { maximumFractionDigits: 0 }).format(toNum(value));
const pct = (value) => `${(Number.isFinite(value) ? value : 0).toFixed(2)}%`;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const escapeHtml = (value) => String(value)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function todayISO() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function formatDate(value) {
  if (!value) return "—";
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10).replace(/-/g, "/");
  return String(value);
}

function rates(center) {
  return {
    eng: toNum(center.lease) ? (toNum(center.p23) / toNum(center.lease)) * 100 : 0,
    open: toNum(center.target) ? (toNum(center.open) / toNum(center.target)) * 100 : 0
  };
}

function totals(centers = state.centers) {
  const total = {};
  NUM_FIELDS.forEach((key) => {
    total[key] = centers.reduce((sum, center) => sum + toNum(center[key]), 0);
  });
  total.engRate = total.lease ? (total.p23 / total.lease) * 100 : 0;
  total.openRate = total.target ? (total.open / total.target) * 100 : 0;
  return total;
}

function engTone(value) {
  return value >= 95 ? "good" : value >= 90 ? "warn" : "bad";
}

/* ---------- 狀態 ---------- */
function freshState() {
  return { ...clone(ORIGINAL), updatedAt: ORIGINAL.updatedAt };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshState();

    const saved = JSON.parse(raw);
    if (!saved || !Array.isArray(saved.centers)) return freshState();

    const centers = ORIGINAL.centers.map((base) => {
      const match = saved.centers.find((center) => center && center.id === base.id);
      if (!match) return clone(base);
      const merged = { ...clone(base), ...match, id: base.id, name: base.name };
      NUM_FIELDS.forEach((key) => {
        if (["p1x", "p2ax", "p2bx", "p2cx", "p3x", "sdx", "installx", "openx"].includes(key)) {
          merged[key] = match[key] === null || match[key] === undefined || match[key] === ""
            ? null
            : Math.max(0, Math.round(toNum(match[key])));
        } else {
          merged[key] = Math.max(0, Math.round(toNum(match[key])));
        }
      });
      return merged;
    });

    return {
      year: Number(saved.year) || ORIGINAL.year,
      updatedAt: saved.updatedAt || ORIGINAL.updatedAt,
      centers
    };
  } catch (error) {
    console.warn("無法讀取本機資料，改用原始資料。", error);
    return freshState();
  }
}

let state = loadState();
state.showExtra = true;
state.activeCenter = "all";
state.sort = { key: null, dir: 1 };
let lastFocused = null;
let toastTimer = null;

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      year: state.year,
      updatedAt: state.updatedAt,
      centers: state.centers
    }));
    return true;
  } catch (error) {
    console.warn("資料儲存失敗。", error);
    showToast("瀏覽器無法儲存資料，請改用匯出 JSON");
    return false;
  }
}

/* ---------- 共用小元件 ---------- */
function pair(main, extra, tone) {
  const mainText = fmt(main);
  if (!state.showExtra || extra === null || extra === undefined) return mainText;
  return `${mainText} <span class="paren ${tone}">(${fmt(extra)})</span>`;
}

function rateCell(value, tone, width) {
  return `<td class="rate-cell" data-tone="${tone}">
    <div class="rate-val">${pct(value)}</div>
    <div class="mini-track"><span style="width:${clamp(width, 0, 100)}%"></span></div>
  </td>`;
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

/* ---------- 渲染：頁首 ---------- */
function renderMeta() {
  $("#metaYear").textContent = state.year;
  $("#metaUpdated").textContent = formatDate(state.updatedAt);
  $("#overallPill").textContent = `${state.centers.length} 個營運中心 · 目標 ${fmt(totals().target)} 站`;
}

/* ---------- 渲染：KPI ---------- */
function renderKpis() {
  const total = totals();
  const lagging = state.centers.filter((center) => rates(center).eng < 95);
  const cards = [
    {
      label: "4G 建設目標", value: total.target, unit: "站",
      sub: `${state.centers.length} 個營運中心參與`, icon: ICONS.target, accent: "#b52c33"
    },
    {
      label: "租賃完成", value: total.lease, unit: "站",
      sub: "配合工程完成率之分母", icon: ICONS.doc, accent: "#9a7429"
    },
    {
      label: "P2=3 配合完成", value: total.p23, unit: "站",
      sub: `配合工程完成率 ${pct(total.engRate)}`, icon: ICONS.layers, accent: "#0f8a6a"
    },
    {
      label: "P4 SD_Ready", value: total.sd, unit: "站",
      sub: `裝機完成 ${fmt(total.install)} 站`, icon: ICONS.signal, accent: "#2b5fa8"
    },
    {
      label: "P4 開台完成", value: total.open, unit: "站",
      sub: `開台完成率 ${pct(total.openRate)}`, icon: ICONS.flag, accent: "#b8892f"
    },
    {
      label: lagging.length ? "待改善中心" : "全數達標",
      value: lagging.length, unit: "個",
      sub: lagging.length ? "配合工程完成率 < 95%" : "配合工程完成率皆 ≥ 95%",
      icon: ICONS.alert, accent: lagging.length ? "#bd7712" : "#0f8a6a"
    }
  ];

  $("#kpiGrid").innerHTML = cards.map((card) => `
    <article class="kpi" style="--accent:${card.accent}">
      <div class="kpi-top">
        <span class="kpi-label">${card.label}</span>
        <span class="kpi-icon" aria-hidden="true">${card.icon}</span>
      </div>
      <div class="kpi-value">${fmt(card.value)}<span class="kpi-unit">${card.unit}</span></div>
      <div class="kpi-sub">${card.sub}</div>
    </article>
  `).join("");
}

/* ---------- 渲染：儀表與洞察 ---------- */
function renderOverview() {
  const total = totals();
  $("#gauges").innerHTML = `
    <div class="gauge-card">
      <div class="gauge" style="--p:${clamp(total.engRate, 0, 100)};--gcolor:${total.engRate >= 95 ? "#0f8a6a" : total.engRate >= 90 ? "#bd7712" : "#bf3a2c"}">
        <div class="gauge-center">
          <strong>${pct(total.engRate)}</strong>
          <span>配合工程</span>
        </div>
      </div>
      <p class="gauge-caption">P2=3 ${fmt(total.p23)} / 租賃 ${fmt(total.lease)}</p>
    </div>
    <div class="gauge-card">
      <div class="gauge" style="--p:${clamp(total.openRate, 0, 100)};--gcolor:#b8892f">
        <div class="gauge-center">
          <strong>${pct(total.openRate)}</strong>
          <span>開台完成</span>
        </div>
      </div>
      <p class="gauge-caption">開台 ${fmt(total.open)} / 目標 ${fmt(total.target)}${total.openRate > 100 ? ` · 超標 ${pct(total.openRate - 100)}` : ""}</p>
    </div>
  `;

  const ranked = [...state.centers].sort((a, b) => rates(b).eng - rates(a).eng);
  const best = ranked[0];
  const worst = ranked[ranked.length - 1];
  const gap = Math.max(0, total.lease - total.p23);

  $("#insights").innerHTML = `
    <div class="insight" style="--tone:#0f8a6a">
      <span class="insight-badge" aria-hidden="true">最</span>
      <div>
        <strong>${escapeHtml(best.name.replace("營運中心", ""))} ${pct(rates(best).eng)}</strong>
        <p>配合工程完成率最高</p>
      </div>
    </div>
    <div class="insight" style="--tone:${rates(worst).eng >= 95 ? "#0f8a6a" : "#bf3a2c"}">
      <span class="insight-badge" aria-hidden="true">${rates(worst).eng >= 95 ? "達" : "弱"}</span>
      <div>
        <strong>${escapeHtml(worst.name.replace("營運中心", ""))} ${pct(rates(worst).eng)}</strong>
        <p>${rates(worst).eng >= 95 ? "全數中心皆達 95% 門檻" : "低於 95% 門檻，建議優先追蹤"}</p>
      </div>
    </div>
    <div class="insight" style="--tone:#bd7712">
      <span class="insight-badge" aria-hidden="true">缺</span>
      <div>
        <strong>${fmt(gap)} 站</strong>
        <p>租賃完成但尚未達成 P2=3</p>
      </div>
    </div>
    <div class="insight" style="--tone:#2b5fa8">
      <span class="insight-badge" aria-hidden="true">超</span>
      <div>
        <strong>+${pct(Math.max(0, total.openRate - 100))}</strong>
        <p>開台進度相對建設目標</p>
      </div>
    </div>
  `;

  renderBars("#barsEng", "eng", 100, "Eng");
  renderBars("#barsOpen", "open", null, "Open");
}

function renderBars(selector, key, fixedMax, className) {
  const container = $(selector);
  const values = state.centers.map((center) => rates(center)[key]);
  const max = fixedMax || Math.max(100, Math.ceil(Math.max(...values, 0) / 100) * 100);

  container.innerHTML = state.centers.map((center) => {
    const value = rates(center)[key];
    const width = max ? (value / max) * 100 : 0;
    return `<div class="bar-row">
      <span class="bar-label" title="${escapeHtml(center.name)}">${escapeHtml(center.name.replace("營運中心", ""))}</span>
      <span class="bar-track"><span class="bar-fill" data-w="${clamp(width, 0, 100).toFixed(2)}"></span></span>
      <span class="bar-value">${pct(value)}</span>
    </div>`;
  }).join("");

  const block = container.closest(".chart-block");
  if (block) block.classList.toggle("open", className === "Open");

  window.requestAnimationFrame(() => {
    $$(".bar-fill", container).forEach((bar) => {
      bar.style.width = `${bar.dataset.w}%`;
    });
  });
}

/* ---------- 渲染：篩選 ---------- */
function renderFilters() {
  const buttons = [
    `<button class="chip" type="button" data-filter="all" aria-pressed="${state.activeCenter === "all"}">全部 <span class="chip-count">${state.centers.length}</span></button>`,
    ...state.centers.map((center) => {
      const tone = engTone(rates(center).eng);
      const mark = tone === "good" ? "" : " •";
      return `<button class="chip" type="button" data-filter="${center.id}" aria-pressed="${state.activeCenter === center.id}">${escapeHtml(center.name.replace("營運中心", ""))}${mark} <span class="chip-count">${pct(rates(center).eng)}</span></button>`;
    })
  ];
  $("#filters").innerHTML = buttons.join("");
}

/* ---------- 渲染：表格 ---------- */
function renderTable() {
  const rows = state.centers.filter((center) => state.activeCenter === "all" || center.id === state.activeCenter);
  const sorted = [...rows];

  if (state.sort.key) {
    const { key, dir } = state.sort;
    sorted.sort((a, b) => {
      let av;
      let bv;
      if (key === "name") {
        return a.name.localeCompare(b.name, "zh-Hant") * dir;
      }
      if (key === "eng") {
        av = rates(a).eng;
        bv = rates(b).eng;
      } else if (key === "open") {
        av = rates(a).open;
        bv = rates(b).open;
      } else {
        av = toNum(a[key]);
        bv = toNum(b[key]);
      }
      return (av - bv) * dir;
    });
  }

  const maxOpen = Math.max(100, ...state.centers.map((center) => rates(center).open));

  const bodyRows = sorted.map((center) => {
    const rate = rates(center);
    return `
      <tr data-id="${center.id}" tabindex="0" title="點擊更新 ${escapeHtml(center.name)} 進度">
        <td class="sticky-col">
          <div class="center-cell">
            <span class="center-dot" aria-hidden="true"></span>
            <div class="center-name">
              <strong>${escapeHtml(center.name)}</strong>
              <small>點擊更新進度</small>
            </div>
            <span class="edit-hint" aria-hidden="true">編輯 ✎</span>
          </div>
        </td>
        <td>${fmt(center.target)}</td>
        <td>${fmt(center.lease)}</td>
        <td>${pair(center.p1, center.p1x, "amber")}</td>
        <td>${pair(center.p2a, center.p2ax, "green")}</td>
        <td>${pair(center.p2b, center.p2bx, "green")}</td>
        <td>${pair(center.p2c, center.p2cx, "green")}</td>
        <td>${fmt(center.p23)}</td>
        ${rateCell(rate.eng, engTone(rate.eng), rate.eng)}
        <td>${pair(center.p3, center.p3x, "amber")}</td>
        <td>${pair(center.sd, center.sdx, "green")}</td>
        <td>${pair(center.install, center.installx, "green")}</td>
        <td>${pair(center.open, center.openx, "amber")}</td>
        ${rateCell(rate.open, "over", (rate.open / maxOpen) * 100)}
      </tr>
    `;
  }).join("");

  const total = totals();
  const totalRow = `
    <tr class="total-row">
      <td class="sticky-col">
        <div class="center-cell">
          <span class="center-dot" aria-hidden="true"></span>
          <div class="center-name">
            <strong>合計</strong>
            <small>全部營運中心加總</small>
          </div>
        </div>
      </td>
      <td>${fmt(total.target)}</td>
      <td>${fmt(total.lease)}</td>
      <td>${fmt(total.p1)}</td>
      <td>${fmt(total.p2a)}</td>
      <td>${fmt(total.p2b)}</td>
      <td>${fmt(total.p2c)}</td>
      <td>${fmt(total.p23)}</td>
      ${rateCell(total.engRate, engTone(total.engRate), total.engRate)}
      <td>${fmt(total.p3)}</td>
      <td>${fmt(total.sd)}</td>
      <td>${fmt(total.install)}</td>
      <td>${fmt(total.open)}</td>
      ${rateCell(total.openRate, "over", (total.openRate / maxOpen) * 100)}
    </tr>
  `;

  $("#tableBody").innerHTML = bodyRows + (state.activeCenter === "all" ? totalRow : "");

  $$("#progressTable .sort-btn").forEach((button) => {
    const active = button.dataset.sort === state.sort.key;
    button.dataset.active = String(active);
    const indicator = button.querySelector(".sort-ind");
    if (indicator) indicator.textContent = active ? (state.sort.dir === 1 ? "↑" : "↓") : "↕";
  });
}

/* ---------- 彈窗：編輯 ---------- */
function openModal(centerId) {
  const center = state.centers.find((item) => item.id === centerId);
  if (!center) return;

  lastFocused = document.activeElement;
  $("#modal").dataset.centerId = centerId;
  $("#modalTitle").textContent = center.name;
  $("#formGrid").innerHTML = FIELDS.map((field) => {
    const inputId = `field_${field.key}`;
    const extra = field.x
      ? `<div class="x-field">
           <span>括號</span>
           <input id="field_${field.x}" name="${field.x}" type="number" min="0" step="1" inputmode="numeric"
             value="${center[field.x] === null ? "" : center[field.x]}" placeholder="—" aria-label="${field.label} 括號數量" />
         </div>`
      : "";
    return `<div class="field">
      <label for="${inputId}">${field.label}${field.unit ? `（${field.unit}）` : ""}</label>
      <div class="inputs">
        <input id="${inputId}" name="${field.key}" type="number" min="0" step="1" inputmode="numeric" value="${toNum(center[field.key])}" />
        ${extra}
      </div>
    </div>`;
  }).join("");

  updatePreview();
  $("#modal").hidden = false;
  document.body.style.overflow = "hidden";
  window.requestAnimationFrame(() => {
    const first = $("#formGrid input");
    if (first) first.focus();
  });
}

function closeModal() {
  $("#modal").hidden = true;
  document.body.style.overflow = "";
  if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
}

function readForm() {
  const form = $("#editForm");
  const values = {};
  FIELDS.forEach((field) => {
    const main = form.elements[field.key];
    values[field.key] = Math.max(0, Math.round(toNum(main ? main.value : 0)));
    if (field.x) {
      const extra = form.elements[field.x];
      const raw = extra ? String(extra.value).trim() : "";
      values[field.x] = raw === "" ? null : Math.max(0, Math.round(toNum(raw)));
    }
  });
  return values;
}

function updatePreview() {
  const values = readForm();
  const rate = rates(values);
  $("#formPreview").innerHTML = `
    <div class="preview-item">
      <span>配合工程完成率（P2=3 / 租賃）</span>
      <strong>${pct(rate.eng)}</strong>
    </div>
    <div class="preview-item">
      <span>開台完成率（開台 / 目標）</span>
      <strong>${pct(rate.open)}</strong>
    </div>
    <span class="preview-note">數值變更時即時試算，儲存後才會寫入。</span>
  `;
}

function submitEdit(event) {
  event.preventDefault();
  const centerId = $("#modal").dataset.centerId;
  const index = state.centers.findIndex((center) => center.id === centerId);
  if (index === -1) return;

  const values = readForm();
  state.centers[index] = { ...state.centers[index], ...values };
  state.updatedAt = todayISO();
  persist();
  renderAll();
  closeModal();
  showToast(`已更新 ${state.centers[index].name} 進度`);
}

/* ---------- 匯出 / 還原 ---------- */
function exportJson() {
  const payload = {
    title: "苗栗燈會 4G 站台建設進度",
    year: state.year,
    updatedAt: state.updatedAt,
    calculated: {
      target: totals().target,
      lease: totals().lease,
      p23: totals().p23,
      engRate: Number(totals().engRate.toFixed(2)),
      open: totals().open,
      openRate: Number(totals().openRate.toFixed(2))
    },
    centers: state.centers
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `苗栗燈會_4G站台進度_${state.updatedAt || todayISO()}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 800);
  showToast("已匯出 JSON 檔");
}

function resetAll() {
  if (!window.confirm("確定要還原為原始資料嗎？本機儲存的修改將會清除。")) return;
  try { localStorage.removeItem(STORAGE_KEY); } catch (error) { console.warn(error); }
  state = freshState();
  state.showExtra = true;
  state.activeCenter = "all";
  state.sort = { key: null, dir: 1 };
  $("#showExtra").checked = true;
  renderAll();
  showToast("已還原原始資料");
}

function restoreCenter() {
  const centerId = $("#modal").dataset.centerId;
  const index = state.centers.findIndex((center) => center.id === centerId);
  if (index === -1) return;
  const original = ORIGINAL.centers.find((center) => center.id === centerId);
  if (!original) return;
  state.centers[index] = clone(original);
  state.updatedAt = todayISO();
  persist();
  renderAll();
  closeModal();
  showToast(`已還原 ${original.name} 原始資料`);
}

/* ---------- 事件 ---------- */
function bindEvents() {
  $("#exportBtn").addEventListener("click", exportJson);
  $("#printBtn").addEventListener("click", () => window.print());
  $("#resetBtn").addEventListener("click", resetAll);
  $("#restoreCenter").addEventListener("click", restoreCenter);
  $("#editForm").addEventListener("submit", submitEdit);
  $("#editForm").addEventListener("input", (event) => {
    if (event.target.matches("input")) updatePreview();
  });

  $("#showExtra").addEventListener("change", (event) => {
    state.showExtra = event.target.checked;
    renderTable();
  });

  $("#filters").addEventListener("click", (event) => {
    const chip = event.target.closest("[data-filter]");
    if (!chip) return;
    state.activeCenter = chip.dataset.filter;
    renderFilters();
    renderTable();
  });

  $$("#progressTable .sort-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.sort;
      if (state.sort.key === key) {
        state.sort.dir *= -1;
      } else {
        state.sort.key = key;
        state.sort.dir = 1;
      }
      renderTable();
    });
  });

  $("#tableBody").addEventListener("click", (event) => {
    const row = event.target.closest("tr[data-id]");
    if (row) openModal(row.dataset.id);
  });

  $("#tableBody").addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const row = event.target.closest("tr[data-id]");
    if (!row) return;
    event.preventDefault();
    openModal(row.dataset.id);
  });

  $$("[data-close]").forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !$("#modal").hidden) closeModal();
  });
}

/* ---------- 啟動 ---------- */
function renderAll() {
  renderMeta();
  renderKpis();
  renderOverview();
  renderFilters();
  renderTable();
}

bindEvents();
renderAll();
