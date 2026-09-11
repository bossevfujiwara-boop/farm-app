const defaultFields = [
  { id: 'a', crop: 'にら', variety: 'グリーンベルト', area: '80㎡', work: '追肥・除草', planting: '2027-03-12', harvest: '2027-05-20', status: 'growing', symbol: '🌿', progress: 42 },
  { id: 'b', crop: 'じゃがいも', variety: 'キタアカリ', area: '120㎡', work: '芽かき・土寄せ', planting: '2027-03-01', harvest: '2027-06-10', status: 'growing', symbol: '🥔', progress: 35 },
  { id: 'c', crop: 'スイカ', variety: '祭ばやし', area: '150㎡', work: 'つる整理', planting: '2027-04-15', harvest: '2027-07-25', status: 'growing', symbol: '🍉', progress: 18 },
  { id: 'd', crop: 'ミニトマト', variety: 'CF千果', area: '90㎡', work: '誘引・わき芽かき', planting: '2027-03-25', harvest: '2027-06-30', status: 'growing', symbol: '🍅', progress: 28 },
  { id: 'e1', crop: '休耕', variety: '土づくり中', area: '60㎡', work: '堆肥散布', planting: '', harvest: '', status: 'empty', symbol: '—', progress: 0 },
  { id: 'e2', crop: '枝豆', variety: '湯あがり娘', area: '70㎡', work: '播種準備', planting: '2027-04-05', harvest: '2027-06-20', status: 'growing', symbol: '🌱', progress: 20 },
  { id: 'f', crop: 'にら', variety: 'ワンダーグリーン', area: '75㎡', work: '収穫・追肥', planting: '2027-02-20', harvest: '2027-04-25', status: 'soon', symbol: '🌿', progress: 88 },
  { id: 'g', crop: 'じゃがいも', variety: '男爵', area: '110㎡', work: '土寄せ', planting: '2027-03-03', harvest: '2027-06-08', status: 'growing', symbol: '🥔', progress: 34 },
  { id: 'h', crop: 'スイカ', variety: '黒皮大玉', area: '180㎡', work: 'マルチ張り', planting: '2027-04-18', harvest: '2027-08-01', status: 'growing', symbol: '🍉', progress: 12 },
  { id: 'i', crop: 'ミニトマト', variety: 'アイコ', area: '95㎡', work: '支柱立て', planting: '2027-03-28', harvest: '2027-07-05', status: 'growing', symbol: '🍅', progress: 25 },
  { id: 'j', crop: 'きゅうり', variety: '夏すずみ', area: '85㎡', work: 'ネット設置', planting: '2027-04-10', harvest: '2027-06-28', status: 'growing', symbol: '🥒', progress: 17 },
  { id: 'k', crop: '休耕', variety: '次作準備', area: '55㎡', work: '耕うん', planting: '', harvest: '', status: 'empty', symbol: '—', progress: 0 },
  { id: 'l1', crop: 'にら', variety: 'グリーンベルト', area: '65㎡', work: '除草', planting: '2027-03-10', harvest: '2027-05-15', status: 'growing', symbol: '🌿', progress: 45 },
  { id: 'l2', crop: 'じゃがいも', variety: 'メークイン', area: '100㎡', work: '芽かき', planting: '2027-03-04', harvest: '2027-06-12', status: 'growing', symbol: '🥔', progress: 32 },
  { id: 'm', crop: 'スイカ', variety: '小玉ひとりじめ', area: '140㎡', work: '人工授粉', planting: '2027-04-20', harvest: '2027-07-30', status: 'growing', symbol: '🍉', progress: 8 },
  { id: 'n', crop: 'サツマイモ', variety: '紅はるか、安納芋', area: '', work: '栽培中', planting: '', harvest: '', status: 'growing', symbol: '🍠', progress: 50, nextCrop: 'ニンニク(新植)', nextVariety: '蒼山種', nextPlanting: '9月-11月', nextHarvest: '種まき後35-50日（翌年5月-6月）' },
  { id: 'o', crop: '休耕', variety: '輪作予定', area: '50㎡', work: '緑肥すき込み', planting: '', harvest: '', status: 'empty', symbol: '—', progress: 0 }
];

const mapImageCandidates = ['20260910_085313.jpg', 'data/20260910_085313.jpg'];
const csvCandidates = ['schedule.csv', 'data/schedule.csv'];
const latestOverrides = { n: { crop: 'サツマイモ', variety: '紅はるか、安納芋', status: 'growing', work: '栽培中', nextCrop: 'ニンニク(新植)', nextVariety: '蒼山種', nextPlanting: '9月-11月', nextHarvest: '種まき後35-50日（翌年5月-6月）' } };
const poleDataPendingIds = new Set(['m']);
const detailedPolePlans = { l1: Array.from({ length: 26 }, (_, index) => { const pole = index + 1; const lengths = ['95.7m', '88.6m', '91.2m', '86.4m', '82.1m', '79.8m']; const contents = [
  ['きゅうり(自根)', '4/29', '380本', '株間40cm'], ['〃', '〃', '380本', '株間40cm'], ['きゅうり(接木)', '5/6', '760本', '株間40cm'], ['〃', '〃', '760本', '株間40cm'],
  ['きゅうり(自根)', '08/15', '380本', '株間40cm'], ['〃', '〃', '380本', '株間40cm']
]; const [crop, planting, count, spacing] = contents[index % contents.length]; return { pole: `ポール↑${pole}`, length: lengths[index % lengths.length], crop, planting, count, spacing, bed: `畝${pole}`, mulch: pole % 3 === 0 ? '白黒マルチ' : '黒マルチ', work: pole % 4 === 0 ? '誘引・整枝' : '定植済み' }; }) };
function makePolePlan(count, lengths, crop, planting, countText, spacing = '株間40cm', work = '定植済み') { return Array.from({ length: count }, (_, index) => ({ pole: `ポール↑${index + 1}`, length: typeof lengths === 'function' ? lengths(index + 1) : lengths[index] || lengths[lengths.length - 1], crop, planting, count: countText, spacing, bed: `畝${index + 1}`, mulch: '黒マルチ', work })); }
Object.assign(detailedPolePlans, {
  a: makePolePlan(10, pole => ({ 1: '92.7m', 2: '92.7m', 3: '89.8m', 4: '87.8m', 5: '77m', 6: '66.4m', 7: '66.4m', 8: '47.3m', 9: '36.6m', 10: '28.9m' }[pole]), 'ジャガイモ', '2025/10/20', '株数指定・各2列', '株間30cm'),
  b: makePolePlan(12, pole => pole <= 6 ? '28.9m' : pole <= 11 ? '23.6m' : '21.3m', 'しし唐 / ジャガイモ', '6/6', '株数・列数は詳細図面参照', '株間指定'),
  d: makePolePlan(17, pole => pole <= 14 ? '85m' : pole <= 16 ? '82.3m' : '71.7m', 'ミニトマト', '5/4、5/13、7/4、7/7、7/9、7/11', '株数・列数指定', '株間指定'),
  e1: makePolePlan(18, pole => pole <= 7 ? '31.4m' : pole <= 15 ? '33.1m' : pole <= 17 ? '21.6m' : '16.5m', 'トマト', '07/17', '700本', '株間指定'),
  e2: makePolePlan(5, '44.1m', 'アスパラ', '定植日指定', '列ごと本数指定', '株間指定'),
  f: makePolePlan(23, pole => pole === 1 ? '17.9m' : pole <= 11 ? '50m' : pole <= 16 ? '69.7m' : '15.5m', '人参 / ピーマン / しし唐', '5/25、5/28、6/5', '本数・列数指定', '株間指定'),
  g: makePolePlan(4, ['71.8m', '71.8m', '71.8m', '71.8m'], 'サツマイモ / 準備中 / スイカ47本 / メロン79本', '作付計画参照', 'G1〜G4内訳', '仕様指定'),
  h: makePolePlan(23, '24.0m', 'メロン / スイカ / しし唐 / トウモロコシ / インゲン豆', '5/2、5/10、5/15、5/28、6/6', '列ごと本数指定', '株間指定'),
  i: makePolePlan(18, '171.6m', 'トマト / スイートバジル / ホーリーバジル / 白菜 / サツマイモ / 里芋', '4/25、6/10、6/18、6/25', '本数・列数指定', '株間指定'),
  j: makePolePlan(18, '171.6m', 'トマト / スイートバジル / ホーリーバジル / 白菜 / サツマイモ / 里芋', '4/25、6/10、6/18、6/25', '本数・列数指定', '株間指定'),
  k: makePolePlan(12, pole => pole <= 1 ? '26.6m' : pole <= 9 ? '100m' : '168m', 'モロヘイヤ / サツマイモ / しし唐 / オクラ', '4/25、6/10、6/13、6/25', '本数・列数指定', '株間指定'),
  l2: makePolePlan(19, pole => pole <= 2 ? '5.5m' : '37.5m', 'しし唐 / かぼちゃ', '5/2、6/6', 'かぼちゃ200本・列ごと指定', '株間指定'),
  n: makePolePlan(30, '29.0m', 'サツマイモ', '4/25、6/10、7/1、7/2', '各3列', '株間指定'),
  o: makePolePlan(1, '123.0m', '準備中 / 人参 / 白菜 / キャベツ', '作付計画参照', '人参10200本 / 白菜1200本 / キャベツ900本', '株間指定')
});
const greenhouseFields = [
  { id: 'bhouse', crop: 'スイカ', variety: 'Bハウス', area: '188.55㎡', work: '定植済み', planting: '', harvest: '', status: 'growing', symbol: '🏠', progress: 0, poles: makePolePlan(1, '41.9m', 'スイカ', '', '28本', '株間80cm') },
  { id: 'chouse', crop: 'ハウス作付', variety: 'Cハウス', area: '237.64㎡', work: '5.2m幅', planting: '', harvest: '', status: 'growing', symbol: '🏠', progress: 0, poles: makePolePlan(1, '45.7m', 'Cハウス作付', '', '仕様参照', '幅5.2m') },
  { id: 'ghouse', crop: 'サツマイモ / 準備中 / スイカ / メロン', variety: 'Gハウス G1〜G4', area: '', work: 'G3 スイカ47本 / G4 メロン79本', planting: '', harvest: '', status: 'growing', symbol: '🏠', progress: 0, poles: makePolePlan(4, '71.8m', 'G1 サツマイモ / G2 準備中 / G3 スイカ47本 / G4 メロン79本', '', 'G1〜G4内訳') },
  { id: 'gyu', crop: 'ニラ', variety: 'G夕', area: '', work: '栽培中', planting: '', harvest: '', status: 'growing', symbol: '🌿', progress: 0, poles: makePolePlan(1, '50.2m', 'ニラ', '', '仕様参照') },
  { id: 'hhouse', crop: 'ハウス作付', variety: 'Hハウス', area: '', work: '詳細図面参照', planting: '', harvest: '', status: 'growing', symbol: '🏠', progress: 0, poles: makePolePlan(1, '19.2m', 'Hハウス作付', '', '仕様参照') },
  { id: 'm1', crop: 'ハウス作付', variety: 'M1ハウス', area: '', work: '詳細図面参照', planting: '', harvest: '', status: 'growing', symbol: '🏠', progress: 0, poles: makePolePlan(1, '未設定', 'M1ハウス', '未設定', '未設定') },
  { id: 'm2', crop: 'ハウス作付', variety: 'M2ハウス', area: '', work: '詳細図面参照', planting: '', harvest: '', status: 'growing', symbol: '🏠', progress: 0, poles: makePolePlan(1, '未設定', 'M2ハウス', '未設定', '未設定') },
  { id: 'm3', crop: 'ハウス作付', variety: 'M3ハウス', area: '', work: '詳細図面参照', planting: '', harvest: '', status: 'growing', symbol: '🏠', progress: 0, poles: makePolePlan(1, '未設定', 'M3ハウス', '未設定', '未設定') },
  { id: 'm4', crop: 'ハウス作付', variety: 'M4ハウス', area: '', work: '詳細図面参照', planting: '', harvest: '', status: 'growing', symbol: '🏠', progress: 0, poles: makePolePlan(1, '未設定', 'M4ハウス', '未設定', '未設定') }
];
defaultFields.push(...greenhouseFields);
let fields = loadFields();
let selectedId = 'a';
let currentMonth = 3;

function normalizePolePlan(poles) { let previous = {}; return (poles || []).map(pole => { const normalized = { ...previous, ...pole }; for (const key of ['crop', 'planting', 'count', 'spacing', 'bed', 'mulch', 'work']) if (normalized[key] === '〃') normalized[key] = previous[key] || ''; previous = normalized; return normalized; }); }
function applyLatestOverrides(records) { return records.map(field => ({ ...field, ...(latestOverrides[field.id] || {}), poles: normalizePolePlan(field.poles || detailedPolePlans[field.id] || []) })); }
function loadFields() { try { const stored = JSON.parse(localStorage.getItem('farmnote-fields-v3')); return applyLatestOverrides(stored && stored.length >= defaultFields.length ? stored.map(field => ({ ...field, id: normalizeFieldId(field.id) })) : structuredClone(defaultFields)); } catch { return applyLatestOverrides(structuredClone(defaultFields)); } }
function saveFields() { localStorage.setItem('farmnote-fields-v3', JSON.stringify(fields)); document.getElementById('last-updated').textContent = '今 保存済み'; }
function formatDate(date) { if (!date) return '未設定'; const [y, m, d] = date.split('-'); return `${y}.${m}.${d}`; }
function statusText(status) { return { growing: '栽培中', soon: '収穫間近', empty: '空き' }[status] || '栽培中'; }
function normalizeFieldId(value) { return String(value || '').trim().toLowerCase().replace(/区画/g, ''); }
function normalizeDateValue(value) { const text = String(value || '').trim().replace(/[年月]/g, '-').replace(/日/g, '').replaceAll('/', '-'); const match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/); return match ? `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}` : text; }
function formatSpacing(value) { const text = String(value || '').trim(); return text ? (text.startsWith('株間') ? text : `株間${text}`) : ''; }

// 座標指定なしのFlexboxカード一覧。要素の物理的な重なりが起こらない
function renderMap() {
  const container = document.getElementById('field-card-row');
  container.innerHTML = fields.map(field => `<button class="field-card ${field.status} ${field.id === selectedId ? 'selected' : ''}" data-id="${field.id}"><span class="field-card-name">${field.id.toUpperCase()}区画</span><span class="field-card-crop">${field.crop || '未設定'}</span></button>`).join('');
  container.querySelectorAll('.field-card').forEach(button => button.addEventListener('click', () => { selectedId = button.dataset.id; renderMap(); renderDetail(); }));
  document.getElementById('active-count').textContent = fields.filter(field => field.status !== 'empty').length;
  document.getElementById('total-area').textContent = fields.reduce((total, field) => total + (Number.parseFloat(String(field.area || '').replace(',', '')) || 0), 0).toLocaleString('ja-JP');
}

function renderDetail() {
  const field = fields.find(item => item.id === selectedId) || fields[0];
  document.getElementById('selected-field-name').textContent = `${field.id.toUpperCase()}区画`;
  document.getElementById('selected-status').textContent = statusText(field.status);
  document.getElementById('selected-status').className = `crop-status status-${field.status}`;
  document.getElementById('selected-symbol').textContent = field.symbol;
  document.getElementById('selected-crop').textContent = field.crop;
  document.getElementById('selected-variety').textContent = field.variety;
  document.getElementById('selected-area').textContent = field.area || '未設定';
  document.getElementById('selected-work').textContent = field.work || '未設定';
  document.getElementById('selected-planting').textContent = formatDate(field.planting);
  document.getElementById('selected-harvest').textContent = formatDate(field.harvest);
  document.getElementById('selected-progress').style.width = `${field.progress}%`;
  document.getElementById('selected-progress-text').textContent = `${field.progress}%`;
  document.getElementById('selected-progress-note').textContent = field.status === 'empty' ? '次の作付け準備中' : field.harvest ? `収穫予定まで ${daysUntil(field.harvest)} 日` : '予定日未設定';
  document.getElementById('selected-detail-note').textContent = field.work ? `作業予定：${field.work}` : 'スプレッドシートの作付計画を反映しています。';
  document.getElementById('selected-next-crop').textContent = field.nextCrop ? `${field.nextCrop}（${field.nextVariety || '品種未設定'}）` : '未設定';
  document.getElementById('selected-next-timing').textContent = field.nextPlanting || '未設定';
  document.getElementById('selected-next-harvest').textContent = field.nextHarvest || '未設定';
  renderRowPlan(field);
}

function getPoleRows(field) {
  const sourceColumns = Array.isArray(field.columns) && field.columns.length ? field.columns : (field.poles || []).map(pole => ({ column: pole.pole, length: pole.length, crop: pole.crop, variety: pole.variety, planting: pole.planting, count: pole.count, spacing: pole.spacing, bed: pole.bed, mulch: pole.mulch, work: pole.work }));
  return normalizePolePlan(sourceColumns).sort((left, right) => Number(String(left.column).replace(/[^0-9]/g, '')) - Number(String(right.column).replace(/[^0-9]/g, '')));
}

function renderRowPlan(field) {
  const columns = getPoleRows(field);
  document.getElementById('column-summary').textContent = `${columns.length}列`;
  const pendingMessage = '列データ未登録（今後設定予定）';
  const missingMessage = `${field.id.toUpperCase()}区画の詳細地図データ未読込。Excelの詳細地図シートを読み込むと表示されます。`;
  document.getElementById('column-map-grid').innerHTML = columns.length ? columns.map(column => `<div class="column-map-cell"><span>${column.column}</span><strong>${column.length || '長さ未設定'}</strong><small>${column.crop || '未設定'}</small></div>`).join('') : `<div class="column-empty ${poleDataPendingIds.has(field.id) ? 'pending' : ''}">${poleDataPendingIds.has(field.id) ? pendingMessage : 'ポールデータ未読込'}<br><small>${poleDataPendingIds.has(field.id) ? 'ポール・列情報は今後設定されます。' : 'Excelの詳細地図シートを読み込むと表示されます。'}</small></div>`;
  document.getElementById('column-list').innerHTML = `<div class="column-table-wrap"><table class="column-detail-table"><thead><tr><th>ポール / 列</th><th>長さ</th><th>作物・定植日・仕様</th></tr></thead><tbody>${columns.length ? columns.map(column => `<tr><td><strong>${column.column}</strong></td><td>${column.length || '未設定'}</td><td><strong>${column.crop || '作物未設定'} ${column.variety ? `<em>${column.variety}</em>` : ''}</strong><br><span>${column.planting ? `定植 ${column.planting}` : '定植日未設定'} ・ ${column.count || '本数未設定'}${column.spacing ? ` ・ ${formatSpacing(column.spacing)}` : ''}</span><small>${column.bed || '畝未設定'} ・ ${column.mulch || 'マルチ未設定'} ・ ${column.work || '作業状態未設定'}</small></td></tr>`).join('') : `<tr><td colspan="3" class="column-table-empty ${poleDataPendingIds.has(field.id) ? 'pending' : ''}">${poleDataPendingIds.has(field.id) ? pendingMessage : missingMessage}</td></tr>`}</tbody></table></div>`;
}

function renderPolePlan(field) {
  const poles = normalizePolePlan(field.poles || []);
  document.getElementById('layout-title').textContent = `${field.id.toUpperCase()}区画 詳細図面`;
  document.getElementById('pole-map').innerHTML = poles.length ? poles.map(pole => `<button class="pole-map-cell" data-pole="${pole.pole}"><span>${pole.pole}</span><strong>${pole.crop || '未設定'}</strong><small>${pole.length || '長さ未設定'}</small></button>`).join('') : '<div class="column-empty">ポール別データ未登録</div>';
  document.getElementById('pole-list').innerHTML = poles.length ? poles.map(pole => `<article class="pole-row"><div class="pole-index">${pole.pole.replace('ポール↑', '')}</div><div class="pole-main"><div><strong>${pole.pole}</strong><span>${pole.length || '長さ未設定'}</span></div><b>${pole.crop || '作物未設定'}</b><p>${pole.planting ? `定植 ${pole.planting}` : '定植日未設定'} ・ ${pole.count || '本数未設定'} ・ ${formatSpacing(pole.spacing) || '株間未設定'}</p><small>${pole.bed || '畝未設定'} ・ ${pole.mulch || 'マルチ未設定'} ・ ${pole.work || '作業状態未設定'}</small></div></article>`).join('') : '<div class="column-empty">詳細図面データがありません。列・ポール情報付きCSVを読み込んでください。</div>';
}

function openLayoutDetail() { const field = fields.find(item => item.id === selectedId) || fields[0]; renderPolePlan(field); document.getElementById('layout-modal').classList.remove('hidden'); }
function closeLayoutDetail() { document.getElementById('layout-modal').classList.add('hidden'); }

function daysUntil(date) { const diff = new Date(`${date}T00:00:00`) - new Date('2027-04-12T00:00:00'); return Math.max(0, Math.round(diff / 86400000)); }
function showView(viewId) { document.querySelectorAll('.page-section').forEach(section => section.classList.toggle('hidden', section.id !== viewId)); document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === viewId)); document.getElementById('page-title').textContent = viewId === 'map-view' ? '圃場マップ' : '作付カレンダー'; if (viewId === 'calendar-view') renderCalendar(); }

function renderCalendar() {
  const year = 2027; const daysInMonth = new Date(year, currentMonth + 1, 0).getDate();
  document.getElementById('calendar-month').textContent = `${year}年 ${currentMonth + 1}月`;
  document.getElementById('gantt-days').innerHTML = Array.from({ length: daysInMonth }, (_, index) => { const date = new Date(year, currentMonth, index + 1); const weekend = date.getDay() === 0 || date.getDay() === 6; return `<div class="day-cell ${weekend ? 'weekend' : ''} ${index + 1 === 12 && currentMonth === 3 ? 'today' : ''}"><span>${index + 1}</span><small>${['日','月','火','水','木','金','土'][date.getDay()]}</small></div>`; }).join('');
  document.getElementById('gantt-rows').innerHTML = fields.map(field => { const start = field.planting ? new Date(`${field.planting}T00:00:00`) : null; const end = field.harvest ? new Date(`${field.harvest}T00:00:00`) : null; const monthStart = new Date(year, currentMonth, 1); const startOffset = start ? Math.max(0, Math.min(daysInMonth, Math.round((start - monthStart) / 86400000))) : 0; const endOffset = end ? Math.max(1, Math.min(daysInMonth, Math.round((end - monthStart) / 86400000))) : 0; const width = field.status === 'empty' ? 10 : Math.max(7, endOffset - startOffset); const bar = field.status === 'empty' ? '<div class="gantt-bar empty" style="left:2%;width:10%">休耕</div>' : `<div class="gantt-bar ${field.status}" data-id="${field.id}" style="left:${startOffset / daysInMonth * 100}%;width:${width / daysInMonth * 100}%">${field.crop} / ${field.work || '作業未設定'}</div><i class="gantt-harvest" style="left:${endOffset / daysInMonth * 100}%"></i>`; return `<div class="gantt-row"><div class="gantt-field"><b>${field.id.toUpperCase()}区画</b><span>${field.crop} / ${field.variety || '品種未設定'}</span></div><div class="gantt-track">${bar}</div></div>`; }).join('');
  document.querySelectorAll('.gantt-bar[data-id]').forEach(bar => bar.addEventListener('click', () => { selectedId = bar.dataset.id; showView('map-view'); renderMap(); renderDetail(); }));
  document.getElementById('calendar-total').textContent = fields.filter(field => field.status !== 'empty').length; document.getElementById('calendar-harvests').textContent = fields.filter(field => field.harvest && new Date(field.harvest).getMonth() === currentMonth).length;
}

function openEditor() { const field = fields.find(item => item.id === selectedId); const form = document.getElementById('field-form'); form.elements.crop.value = field.crop; form.elements.variety.value = field.variety; form.elements.area.value = field.area || ''; form.elements.work.value = field.work || ''; form.elements.planting.value = field.planting; form.elements.harvest.value = field.harvest; form.elements.status.value = field.status; document.getElementById('modal-title').textContent = `${field.id.toUpperCase()}区画の情報`; document.getElementById('edit-modal').classList.remove('hidden'); }
function closeEditor() { document.getElementById('edit-modal').classList.add('hidden'); }
function showToast(message) { const toast = document.getElementById('toast'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2200); }

document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', () => showView(item.dataset.view)));
document.getElementById('edit-field').addEventListener('click', openEditor); document.getElementById('close-modal').addEventListener('click', closeEditor); document.getElementById('cancel-edit').addEventListener('click', closeEditor); document.getElementById('edit-modal').addEventListener('click', event => { if (event.target.id === 'edit-modal') closeEditor(); });
document.getElementById('open-layout-detail').addEventListener('click', openLayoutDetail); document.getElementById('close-layout-modal').addEventListener('click', closeLayoutDetail); document.getElementById('layout-modal').addEventListener('click', event => { if (event.target.id === 'layout-modal') closeLayoutDetail(); });
document.getElementById('field-form').addEventListener('submit', event => { event.preventDefault(); const form = event.currentTarget; const field = fields.find(item => item.id === selectedId); field.crop = form.elements.crop.value; field.variety = form.elements.variety.value; field.area = form.elements.area.value; field.work = form.elements.work.value; field.planting = form.elements.planting.value; field.harvest = form.elements.harvest.value; field.status = form.elements.status.value; field.progress = field.status === 'empty' ? 0 : field.progress || 10; saveFields(); renderMap(); renderDetail(); closeEditor(); showToast('区画情報を保存しました'); });
document.getElementById('reset-data').addEventListener('click', () => { fields = structuredClone(defaultFields); saveFields(); renderMap(); renderDetail(); renderCalendar(); showToast('サンプルデータに戻しました'); });
document.getElementById('prev-month').addEventListener('click', () => { currentMonth = currentMonth === 0 ? 11 : currentMonth - 1; renderCalendar(); }); document.getElementById('next-month').addEventListener('click', () => { currentMonth = currentMonth === 11 ? 0 : currentMonth + 1; renderCalendar(); });
function parseCsv(csvText) { const rows = csvText.trim().split(/\r?\n/).map(row => row.split(',').map(value => value.trim().replace(/^"|"$/g, ''))); const headers = rows.shift().map(header => header.toLowerCase()); const findColumn = names => headers.findIndex(header => names.includes(header)); const columns = { id: findColumn(['id', '区画', '区画名', '圃場', 'field', 'field_id']), crop: findColumn(['crop', '作物', '作物名', '品目', '品目名']), variety: findColumn(['variety', '品種', '品種・メモ', 'memo']), area: findColumn(['area', '面積', '作付面積']), planting: findColumn(['planting', '定植日', '定植', 'plant_date']), harvest: findColumn(['harvest', '収穫予定日', '収穫日', '収穫', 'harvest_date']), work: findColumn(['work', '作業', '作業内容', '作業予定']), status: findColumn(['status', '状態', 'ステータス']), column: findColumn(['column', '列', '列番号', '列no', 'row']), count: findColumn(['count', '株数', '本数', '株数・本数']), spacing: findColumn(['spacing', '株間', '間隔']), bed: findColumn(['bed', '畝', '畝番号']), mulch: findColumn(['mulch', 'マルチ', 'マルチ状態']), columnWork: findColumn(['column_work', '列作業', '畝作業', '列別作業']), pole: findColumn(['pole', 'ポール', 'ポール番号']), poleLength: findColumn(['pole_length', '長さ', 'ポール長さ', 'length']), polePlanting: findColumn(['pole_planting', 'ポール定植日', '植付日', '植付け内容']) }; return rows.filter(row => row[columns.id]).map(row => [columns.id, columns.crop, columns.variety, columns.area, columns.planting, columns.harvest, columns.work, columns.status, columns.column, columns.count, columns.spacing, columns.bed, columns.mulch, columns.columnWork, columns.pole, columns.poleLength, columns.polePlanting].map(column => column === -1 ? '' : row[column] || '')); }
function applyCsv(csvText) { parseCsv(csvText).forEach(([rawId, crop, variety, area, planting, harvest, work, status, column, count, spacing, bed, mulch, columnWork, pole, poleLength, polePlanting]) => { const id = normalizeFieldId(rawId); let field = fields.find(item => item.id === id); if (!field) { field = { id, crop: '', variety: '', area: '', work: '', planting: '', harvest: '', status: 'empty', symbol: '🌱', progress: 0, columns: [], poles: [] }; fields.push(field); } Object.assign(field, { crop: crop || field.crop, variety: variety || field.variety, area: area || field.area, planting: normalizeDateValue(planting), harvest: normalizeDateValue(harvest), work: work || field.work, status: status || (harvest ? 'growing' : field.status) }); if (column) { field.columns = Array.isArray(field.columns) ? field.columns : []; const detail = { column, crop, variety, count, spacing, bed, mulch, work: columnWork || work }; const existingIndex = field.columns.findIndex(item => String(item.column) === String(column)); if (existingIndex >= 0) field.columns[existingIndex] = detail; else field.columns.push(detail); } if (pole) { field.poles = Array.isArray(field.poles) ? field.poles : []; const detail = { pole: pole.startsWith('ポール') ? pole : `ポール↑${pole}`, length: poleLength, crop, variety, planting: polePlanting || planting, count, spacing, bed, mulch, work: columnWork || work }; const existingIndex = field.poles.findIndex(item => item.pole === detail.pole); if (existingIndex >= 0) field.poles[existingIndex] = detail; else field.poles.push(detail); field.poles = normalizePolePlan(field.poles); } }); saveFields(); renderMap(); renderDetail(); renderCalendar(); }
function workbookFieldIds(sheetName) { const match = String(sheetName).toLowerCase().match(/詳細地図(.+)/); if (!match) return []; return match[1].split(/[.・、,\s]+/).map(normalizeFieldId).filter(id => ['a', 'b', 'c', 'd', 'e1', 'e2', 'f', 'g', 'h', 'i', 'j', 'k', 'l1', 'l2', 'm', 'n', 'o'].includes(id)); }
function extractWorkbookPoleRow(row) { const cells = row.map(cell => String(cell ?? '').trim()).filter(Boolean); const poleCell = cells.find(cell => /ポール|pole/i.test(cell) && /\d+/.test(cell)) || cells.find(cell => /^\d+$/.test(cell)); if (!poleCell) return null; const poleNumber = poleCell.match(/\d+/)?.[0]; if (!poleNumber) return null; const length = cells.find(cell => /\d+(?:\.\d+)?\s*m(?:\s|$)/i.test(cell)) || ''; const dateMatches = cells.join(' ').match(/(?:\d{1,2}[\/\-]\d{1,2}|\d{1,2}月\d{1,2}日)/g) || []; const count = cells.find(cell => /\d+\s*(?:本|株)/.test(cell)) || ''; const content = cells.filter(cell => cell !== poleCell && cell !== length && !/^\d+(?:\.\d+)?\s*m$/i.test(cell) && !/^(?:列|ポール|長さ|本数|株数|株間|畝|マルチ|作業)/.test(cell)).join(' / '); return { pole: `ポール↑${poleNumber}`, length, crop: content || '〃', planting: dateMatches[0] || '〃', count, spacing: cells.find(cell => /株間|cm/i.test(cell)) || '', bed: cells.find(cell => /畝/.test(cell)) || '', mulch: cells.find(cell => /マルチ/.test(cell)) || '', work: cells.find(cell => /作業|定植|誘引|除草|収穫/.test(cell)) || '' }; }
function applyWorkbook(file) { if (!window.XLSX) { showToast('Excel読み込みライブラリを取得できません'); return; } const reader = new FileReader(); reader.onload = event => { try { const workbook = XLSX.read(event.target.result, { type: 'array', cellDates: false }); const targetSheets = workbook.SheetNames.filter(name => /^詳細地図(?:a|b|c|d|e1|e2|f|g|h|i|j|k|l1|l2|m|n|o)(?:[.・、,\s]|$)/i.test(name) || name.includes('詳細地図')); const extracted = new Map(); targetSheets.forEach(sheetName => { const ids = workbookFieldIds(sheetName); if (!ids.length) return; const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, defval: '' }); rows.forEach(row => { const pole = extractWorkbookPoleRow(row); if (!pole) return; ids.forEach(id => { if (!extracted.has(id)) extracted.set(id, []); extracted.get(id).push(pole); }); }); }); extracted.forEach((poles, id) => { let field = fields.find(item => item.id === id); if (!field) { field = { id, crop: '', variety: '', area: '', work: '', planting: '', harvest: '', status: 'growing', symbol: '🌱', progress: 0, columns: [], poles: [] }; fields.push(field); } field.poles = normalizePolePlan(poles); if (latestOverrides[id]) Object.assign(field, latestOverrides[id]); }); saveFields(); renderMap(); renderDetail(); renderCalendar(); showToast(`${extracted.size}圃場の詳細地図を読み込みました`); } catch (error) { console.error(error); showToast('Excelの詳細地図を解析できませんでした'); } }; reader.readAsArrayBuffer(file); }
async function loadWorkbookCandidates() { for (const path of ['2027年栽培計画.xlsx', 'data/2027年栽培計画.xlsx']) { try { const response = await fetch(path, { cache: 'no-store' }); if (response.ok) { const blob = await response.blob(); applyWorkbook(new File([blob], path)); return; } } catch { } } }
function loadMapImage() { mapImageCandidates.forEach(path => { const image = new Image(); image.onload = () => { const map = document.getElementById('map-image'); map.style.setProperty('--map-background-image', `url("${path}")`); map.classList.add('custom'); }; image.src = path; }); }
function setMapSource(url) { const iframe = document.getElementById('map-iframe'); const image = document.getElementById('map-image'); const trimmedUrl = String(url || '').trim(); if (!trimmedUrl) { iframe.classList.add('hidden'); iframe.removeAttribute('src'); image.classList.remove('hidden'); return; } try { const parsedUrl = new URL(trimmedUrl); if (!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error('Unsupported protocol'); iframe.src = parsedUrl.href; iframe.classList.remove('hidden'); image.classList.add('hidden'); localStorage.setItem('farmnote-map-embed-url', parsedUrl.href); showToast('インタラクティブ地図を表示しました'); } catch { showToast('Googleマイマップの埋め込みURLを確認してください'); } }
function loadMapSource() { const savedUrl = localStorage.getItem('farmnote-map-embed-url') || ''; document.getElementById('map-url').value = savedUrl; if (savedUrl) setMapSource(savedUrl); }
async function loadCsvCandidates() { for (const path of csvCandidates) { try { const response = await fetch(path, { cache: 'no-store' }); if (response.ok) { applyCsv(await response.text()); showToast(`${path} を読み込みました`); return; } } catch { } } }
document.getElementById('csv-input').addEventListener('change', event => { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { applyCsv(reader.result); showToast('CSVデータを反映しました'); }; reader.readAsText(file, 'UTF-8'); });
document.getElementById('xlsx-input').addEventListener('change', event => { const file = event.target.files[0]; if (file) applyWorkbook(file); });
document.getElementById('apply-map-url').addEventListener('click', () => setMapSource(document.getElementById('map-url').value));
document.getElementById('use-image-map').addEventListener('click', () => { localStorage.removeItem('farmnote-map-embed-url'); document.getElementById('map-url').value = ''; setMapSource(''); });
document.getElementById('map-input').addEventListener('change', event => { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { localStorage.removeItem('farmnote-map-embed-url'); document.getElementById('map-url').value = ''; document.getElementById('map-iframe').classList.add('hidden'); document.getElementById('map-iframe').removeAttribute('src'); document.getElementById('map-image').classList.remove('hidden'); document.getElementById('map-image').style.setProperty('--map-background-image', `url(${reader.result})`); document.getElementById('map-image').classList.add('custom'); showToast('画像マップへ戻しました'); }; reader.readAsDataURL(file); });
renderMap(); renderDetail(); loadMapImage(); loadMapSource(); loadCsvCandidates(); loadWorkbookCandidates();