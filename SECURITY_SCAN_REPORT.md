# 資安掃描報告

- 專案：`burneng-com/innoblue-web`
- 掃描時間：`2026-05-07T14:47:56Z`（UTC）
- 掃描執行者：GitHub Copilot Coding Agent

## 掃描範圍

- 目前版本庫內容（工作目錄）：`README.md`
- 敏感資訊關鍵字與私鑰樣式檢查
- 相依套件清單檢查
- GitHub 安全警示 API（Secret Scanning / Code Scanning）查詢

## 掃描方式與結果

1. **檔案盤點**
   - 結果：僅偵測到 `README.md` 為追蹤檔案。

2. **敏感資訊掃描（關鍵字）**
   - 規則：`api key / secret / token / password / private key / aws key` 等常見樣式
   - 結果：**未發現可疑字串**

3. **私鑰樣式掃描**
   - 規則：`-----BEGIN ... PRIVATE KEY-----`
   - 結果：**未發現私鑰內容**

4. **相依套件與供應鏈風險前置檢查**
   - 檢查項目：`package.json`、`requirements.txt`、`pyproject.toml`、`go.mod`、`Cargo.toml`
   - 結果：**未偵測到相依套件定義檔**

5. **GitHub 安全警示查詢**
   - Secret Scanning：查詢失敗（`403 Resource not accessible by integration`）
   - Code Scanning：查詢失敗（`403 Resource not accessible by integration`）
   - 說明：目前整合權限不足，無法直接讀取該倉庫安全警示。

## 結論

以目前可存取範圍與檔案內容，**未發現明顯敏感資訊或私鑰洩漏跡象**，且未偵測到相依套件清單。  
若需完整企業級掃描（含 GitHub Advanced Security 警示、SAST/DAST/SCA），建議補齊權限後再次執行。
