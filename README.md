# 苗栗燈會｜4G 站台建設進度管控

以單一靜態網頁呈現苗栗燈會 4G 站台建設進度，彙整 6 個營運中心的租賃、P1／P2 工程、P2=3 配合完成、P3／P4 開台與完成率。資料依「中心資料統計總表（114 年 4G 站台進度）」建立。

## 功能

- **總覽儀表板**：建設目標、租賃完成、P2=3、SD_Ready、開台完成與待改善中心等 KPI。
- **完成率視覺化**：配合工程／開台完成率雙環圖、各營運中心橫向比較圖。
- **進度明細表**：完整重現原始表欄位，完成率以顏色與進度條標示，可依中心篩選、依欄位排序。
- **即時編修**：點擊任一營運中心列，即可更新目標與各階段數量，完成率自動重算。
- **本機儲存**：修改內容保存在瀏覽器 `localStorage`，可隨時「還原原始資料」。
- **匯出與列印**：可匯出 JSON 備份，或使用瀏覽器列印／存成 PDF（已整理列印樣式）。
- **響應式版面**：桌機、平板與手機皆可瀏覽。

## 檔案結構

```
index.html    頁面結構
styles.css    視覺樣式與列印樣式
app.js        資料、計算邏輯與互動
.nojekyll     讓 GitHub Pages 直接提供靜態檔
```

## 本機預覽

直接雙擊 `index.html` 即可開啟。若瀏覽器對本機檔案限制較多，可在資料夾內執行：

```powershell
python -m http.server 8000
```

再開啟 <http://localhost:8000/>。

## 更新資料

1. 點擊表格中的營運中心列。
2. 編輯建設目標、租賃完成、P1～P4 各階段數量（括號數量可留空）。
3. 按「儲存更新」，完成率、KPI 與合計立即重算。
4. 修改只存在目前瀏覽器；需要共用時請按「匯出 JSON」。

若要一次修改預設資料，請編輯 `app.js` 最上方的 `ORIGINAL.centers` 陣列。

## 計算方式

- 配合工程完成率 = P2=3 配合完成 ÷ 租賃完成 × 100%
- 開台完成率 = P4 開台日期 ÷ 4G 建設目標 × 100%
- 合計列為各營運中心數量加總後再計算完成率。

## 部署到 GitHub Pages

```powershell
git add .
git commit -m "建立苗栗燈會 4G 站台進度儀表板"
git branch -M main
git remote add origin https://github.com/<你的帳號>/<repo>.git
git push -u origin main
```

到 GitHub repo 的 **Settings → Pages**，Source 選擇 `Deploy from a branch`、分支 `main`、資料夾 `/ (root)`，即可透過
`https://<你的帳號>.github.io/<repo>/` 瀏覽。
