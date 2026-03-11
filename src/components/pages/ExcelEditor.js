import React, { useEffect, useRef, useState } from "react";
import { HotTable } from "@handsontable/react";

import "handsontable/dist/handsontable.min.css";
import "handsontable/dist/handsontable.full.min.css";
import "../../App.css";

const API = "https://ecopi-backend.onrender.com";

export default function ExcelEditor() {
  const [sheets, setSheets] = useState([]);
  const [sheet, setSheet] = useState("");
  const [data, setData] = useState([[]]);

  const pending = useRef([]);
  const timer = useRef(null);
  const sheetRef = useRef(sheet);

  useEffect(() => {
    sheetRef.current = sheet;
  }, [sheet]);

  useEffect(() => {
    fetch(`${API}/excel/sheets`)
      .then((res) => res.json())
      .then((json) => {
        const list = json.sheets || [];
        setSheets(list);
        if (list.length > 0) setSheet(list[0]);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!sheet) {
      setData([[]]);
      return;
    }

    fetch(`${API}/excel/sheet/${encodeURIComponent(sheet)}?max_rows=200&max_cols=50`)
      .then((res) => res.json())
      .then((json) => setData(json.rows?.length ? json.rows : [[]]))
      .catch(console.error);

    pending.current = [];
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, [sheet]);

  const queueUpdates = (changes) => {
    pending.current.push(...changes);

    if (timer.current) return;

    timer.current = setTimeout(async () => {
      const batch = pending.current.splice(0, 200);
      timer.current = null;
      if (!batch.length) return;

      const currentSheet = sheetRef.current;

      try {
        await fetch(`${API}/excel/update_cells`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sheet: currentSheet,
            updates: batch.map((p) => ({
              sheet: currentSheet,
              row: p.r,
              col: p.c,
              value: p.v,
            })),
          }),
        });
      } catch (err) {
        console.error("Failed to update cells:", err);
      }
    }, 400);
  };

  return (
    <div className="page">
      <div className="page__container">
        <div className="excel-header">
          <h1>Excel Editor</h1>
          <p className="excel-subtitle">
            View and edit worksheet data directly from the ECO-Pi emission workbook.
          </p>
        </div>

        <div className="page__card">
          <div className="excel-toolbar">
            <label className="page__label" htmlFor="sheet-select">Sheet</label>
            <select
              id="sheet-select"
              className="page__input excel-select"
              value={sheet}
              onChange={(e) => setSheet(e.target.value)}
            >
              {sheets.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="excel-table-wrap">
            <HotTable
              data={data || [[]]}
              rowHeaders
              colHeaders
              width="100%"
              height="75vh"
              licenseKey="non-commercial-and-evaluation"
              stretchH="all"
              autoColumnSize={{ useHeaders: true }}
              manualColumnResize
              manualRowResize
              colWidths="auto"
              wordWrap
              cells={(row, col) => {
                if (row === 0 && col === 0) return { className: "excel-title-cell" };
                if (row === 0) return { className: "excel-header-row" };
                if (col === 0) return { className: "excel-title-col" };
                return {};
              }}
              afterChange={(changes, source) => {
                if (!changes || source === "loadData") return;

                const patches = changes.map(([row, col, oldVal, newVal]) => ({
                  r: row + 1,
                  c: col + 1,
                  v: newVal ?? "",
                }));

                queueUpdates(patches);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}