
# DU CSAS Auto Reorder

A small JavaScript automation tool I built to make the DU CSAS college and program preference reordering process faster.

## Why I built this

During the DU CSAS counselling process, my brother had to arrange a large number of college and program preferences in the required order.

Doing this manually was taking around **4 hours** because the choices had to be moved one by one.

I thought this repetitive work could be automated, so I built this tool.

## What it does

The script:

1. Takes a CSV file containing the required preference order.
2. Reads the college name, program name, and preference number from the CSV.
3. Finds the matching college and program on the CSAS webpage.
4. Automatically clicks the **Up** button to move the choice to its required position.
5. Clicks **Save Change** after completing the reordering.

## Input CSV

The CSV should contain these columns:

```text
final_pref_no,COLLEGE NAME,PROGRAM NAME
1,College A,B.Com
2,College B,B.Com
3,College C,B.Com
```

The actual counselling data is not included in this repository.

## Result

| Method            | Approx. time |
| ----------------- | -----------: |
| Manual reordering |     ~4 hours |
| Using this tool   |   ~5 minutes |

This reduced a repetitive manual task to a few minutes.

## Tech Used

* JavaScript
* Browser DOM manipulation
* CSV file handling
* Async/Await

## How it works

The script is designed to run in the browser's Developer Console while the relevant counselling preference page is open.

It reads the CSV, matches each college + program combination, and moves each row upward until it reaches the required preference number.

## Important Note

This is a **personal automation project** created for learning and solving a specific real-world problem.

The script depends on the structure and button/class names of the webpage at the time it was created. If the website changes its HTML structure, the script may need to be updated.

Always review the final preference order on the website before submitting it.

## Files

* `du_csas_auto_reorder.js` — Main automation script
* `sample_preferences.csv` — Example CSV format

## What I would improve today

If I built this again, I would add:

* Better CSV parsing for values containing commas
* More error handling
* Validation before making changes
* Progress/status messages
* A simple user interface instead of requiring the browser console
* Better handling of changes in the webpage structure

## Why I am proud of it

This was not a college assignment. I built it because I faced a repetitive problem during a real counselling process and wanted to save time.

The main thing I learned was that even a small script can be useful when it solves a real problem.

