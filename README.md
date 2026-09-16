# FarmNote 圃場・栽培管理プロトタイプ

`index.html` をブラウザで開くと起動します。ビルドツールやサーバーは不要です。

## 使い方

- 圃場マップの区画をクリックして、作物・定植日・収穫予定日を確認・編集できます。
- `画像を変更` から手書きの農場図面を読み込めます。画像はGoogleマイマップ未設定時のフォールバックとして表示されます。
- Googleマイマップの埋め込みURLを入力すると、圃場レイアウト枠がインタラクティブ地図へ切り替わります。
- `CSVを読み込む` から `schedule.csv` を読み込めます。
- 作付カレンダーでは、各区画の定植から収穫までをガントチャートで確認できます。バーには作業内容も表示されます。

編集内容はブラウザの `localStorage` に保存されます。

## 2026-2027年計画データ

アプリは2026年9月20日の収穫開始を基準に、2026-2027年シーズンの作付・工程データを表示します。基本区画、ハウス区画、Gエリアの分割区画を含む現行の区画データを表示します。

- Excelの詳細地図シートでは、`a, b, c, d, e1, e2, f, g, h, i, j, k, l1, l2, m, n, o` の区画IDを使用します。`g` は露地のG区画へ反映されます。

## 自動読込するファイル

- 図面画像：`20260910_085313.jpg` または `data/20260910_085313.jpg`
- 作付CSV：`schedule.csv` または `data/schedule.csv`
- CSV列名は、英語（`id,crop,variety,area,planting,harvest,work,status`）と日本語（`区画,品目,品種,面積,定植日,収穫予定日,作業内容,ステータス`）に対応
- CSVに未登録の区画がある場合も、自動で区画を追加してマップとカレンダーに表示
- 列別内訳を表示する場合は、`列番号,株数,株間,畝,マルチ,列別作業`（英語では `column,count,spacing,bed,mulch,column_work`）を追加します。同じ区画IDの複数行を列番号ごとに集約します。
- ポール別詳細図面は、`ポール番号,長さ,ポール定植日`（英語では `pole,pole_length,pole_planting`）を追加します。区画IDが同じ複数行をポール番号ごとに集約し、`〃` は直前行の作物・品種・日付・本数・株間を継承します。
- `Excelを読み込む` から `2026-2027年栽培計画.xlsx` または `2026-27年栽培計画.xlsx` を選択します。起動時には `farm-app` 直下または `farm-app/data` をこの順で自動探索します。
- 詳細図面は `2026-27詳細地図A.B.C.D.E1.E2`、`2026-27詳細地図A.B.C.D.E1.E`、`2026-27詳細地図F.G.H.I.J.K`、`2026-27詳細地図L1.L2.M.N.O` を読み込みます。`F.G.H.I.J.K` の `G` は露地のG区画へ反映します。旧年度の詳細地図シートは取込対象外です。
- 同じ詳細地図タブに複数区画を置く場合は、各ブロックの先頭行に `B区画` または `B圃場` のような区画見出しを置きます。直後のポール行はその区画だけに反映されます。
- 工程・日付は `2026-27作業詳細-1` など、`2026-27作業詳細` で始まるシートから読み込みます。旧年度の作業詳細シートは取込対象外です。

画像ファイルは配置後に `index.html` を再読み込みすると反映されます。CSVの自動読込はブラウザの `file://` 制限により環境によって動かない場合があるため、その場合は画面上部の `CSVを読み込む` を使用してください。

## GitHub Pages公開

このプロジェクトには `.github/workflows/deploy-pages.yml` を含めています。GitHubリポジトリのルートへ配置して `main` または `master` ブランチへpushすると、自動でGitHub Pagesへデプロイされます。

```powershell
git init
git add .
git commit -m "Initial FarmNote prototype"
git branch -M main
git remote add origin https://github.com/bossevfujiwara-boop/farm-app.git
git push -u origin main
```

公開URLは `https://bossevfujiwara-boop.github.io/farm-app/` です。初回デプロイ後、GitHubリポジトリの Settings > Pages で `GitHub Actions` が選択されていることを確認してください。