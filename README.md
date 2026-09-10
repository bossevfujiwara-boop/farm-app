# FarmNote 圃場・栽培管理プロトタイプ

`index.html` をブラウザで開くと起動します。ビルドツールやサーバーは不要です。

## 使い方

- 圃場マップの区画をクリックして、作物・定植日・収穫予定日を確認・編集できます。
- `画像を変更` から手書きの農場図面を読み込めます。画像はGoogleマイマップ未設定時のフォールバックとして表示されます。
- Googleマイマップの埋め込みURLを入力すると、圃場レイアウト枠がインタラクティブ地図へ切り替わります。
- `CSVを読み込む` から `schedule.csv` を読み込めます。
- 作付カレンダーでは、各区画の定植から収穫までをガントチャートで確認できます。バーには作業内容も表示されます。

編集内容はブラウザの `localStorage` に保存されます。

## 2027年計画データ

マップ画面には次の17区画を一式表示します。

- `a, b, c, d, e1, e2, f, g, h, i, j, k, l1, l2, m, n, o`

## 自動読込するファイル

- 図面画像：`20260910_085313.jpg` または `data/20260910_085313.jpg`
- 作付CSV：`schedule.csv` または `data/schedule.csv`
- CSV列名は、英語（`id,crop,variety,area,planting,harvest,work,status`）と日本語（`区画,品目,品種,面積,定植日,収穫予定日,作業内容,ステータス`）に対応
- CSVに未登録の区画がある場合も、自動で区画を追加してマップとカレンダーに表示
- 列別内訳を表示する場合は、`列番号,株数,株間,畝,マルチ,列別作業`（英語では `column,count,spacing,bed,mulch,column_work`）を追加します。同じ区画IDの複数行を列番号ごとに集約します。
- ポール別詳細図面は、`ポール番号,長さ,ポール定植日`（英語では `pole,pole_length,pole_planting`）を追加します。区画IDが同じ複数行をポール番号ごとに集約し、`〃` は直前行の作物・品種・日付・本数・株間を継承します。
- `Excelを読み込む` から `2027年栽培計画.xlsx` を選択すると、`詳細地図a.b.c.d.e1.e2`、`詳細地図f.g.h.i.j.k`、`詳細地図l1.l2.m.n.o` を全行走査して17圃場のポール別データへ反映します。配置場所が `farm-app` 直下または `farm-app/data` の場合は起動時にも自動探索します。

画像ファイルは配置後に `index.html` を再読み込みすると反映されます。CSVの自動読込はブラウザの `file://` 制限により環境によって動かない場合があるため、その場合は画面上部の `CSVを読み込む` を使用してください。

## GitHub Pages公開

このプロジェクトには `.github/workflows/deploy-pages.yml` を含めています。GitHubリポジトリのルートへ配置して `main` または `master` ブランチへpushすると、自動でGitHub Pagesへデプロイされます。

```powershell
git init
git add .
git commit -m "Initial FarmNote prototype"
git branch -M main
git remote add origin https://github.com/<GitHubユーザー名>/farm-app.git
git push -u origin main
```

公開URLは通常 `https://<GitHubユーザー名>.github.io/farm-app/` です。初回デプロイ後、GitHubリポジトリの Settings > Pages で `GitHub Actions` が選択されていることを確認してください。