// ===== DU CSAS AUTO REORDER (CSV VERSION) =====
// 1) CSV file select karega
// 2) CSV ko parse karega
// 3) College + Program se exact match karega
// 4) Up button automatically click karega
// 5) End me Save Change button click karega

(async () => {
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // ---------- File picker ----------
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.csv';
  input.click();

  const file = await new Promise(resolve => {
    input.onchange = () => resolve(input.files[0]);
  });

  if (!file) {
    alert('CSV select nahi ki gayi.');
    return;
  }

  const text = await file.text();

  // ---------- CSV parse ----------
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(',').map(h => h.trim());

  // CSV me ye columns hone chahiye:
  // final_pref_no, COLLEGE NAME, PROGRAM NAME
  const idxCollege = headers.findIndex(h => /college/i.test(h));
  const idxProgram = headers.findIndex(h => /program/i.test(h));
  const idxRank = headers.findIndex(h => /final_pref_no|pref/i.test(h));

  if (idxCollege === -1 || idxProgram === -1 || idxRank === -1) {
    alert('CSV columns nahi mile. final_pref_no, COLLEGE NAME, PROGRAM NAME hone chahiye.');
    console.log(headers);
    return;
  }

  const desired = lines.slice(1).map(line => {
    const cols = line.split(',');
    return {
      rank: Number(cols[idxRank]),
      college: cols[idxCollege]?.trim(),
      program: cols[idxProgram]?.trim()
    };
  }).sort((a, b) => a.rank - b.rank);

  console.log('Desired order loaded:', desired);

  // ---------- Helpers ----------
  function getRows() {
    return [...document.querySelectorAll('#selected-prefs-table-id tbody tr')];
  }

  function rowInfo(row) {
    const tds = row.querySelectorAll('td');
    return {
      program: tds[0]?.innerText.trim(),
      college: tds[1]?.innerText.trim(),
      pref: Number(tds[2]?.innerText.trim()),
      upBtn: row.querySelector('button.up')
    };
  }

  function findRow(college, program) {
    return getRows().find(r => {
      const info = rowInfo(r);
      return info.college === college && info.program === program;
    });
  }

  // ---------- Reorder ----------
  for (let targetIndex = 0; targetIndex < desired.length; targetIndex++) {
    const item = desired[targetIndex];
    const targetPref = targetIndex + 1;

    let row = findRow(item.college, item.program);

    if (!row) {
      console.warn('Row nahi mili:', item);
      continue;
    }

    let info = rowInfo(row);

    console.log(`Moving: ${info.program} | ${info.college} from ${info.pref} -> ${targetPref}`);

    while (info.pref > targetPref) {
      info.upBtn.click();
      await sleep(350); // page update hone do

      row = findRow(item.college, item.program);
      info = rowInfo(row);

      console.log('  now at', info.pref);
    }
  }

  // ---------- Save ----------
  const saveBtn = [...document.querySelectorAll('button')]
    .find(b => /save change/i.test(b.innerText));

  if (saveBtn) {
    saveBtn.click();
    console.log('Save Change clicked.');
  } else {
    console.warn('Save button nahi mila.');
  }

  alert('Reordering complete! Ab Review & Submit kar do.');
})();
