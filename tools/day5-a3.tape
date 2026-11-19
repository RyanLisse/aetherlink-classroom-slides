Output "assets/day5-daily-brief-teach/a3-guide.mp4"

Set Shell "zsh"
Set FontSize 18
Set Width 1148
Set Height 780
Set TypingSpeed 18ms

Type "cd ../day5-daily-brief-maarten"
Enter
Sleep 400ms
Type "sed -n '62,74p' SOLO.md"
Enter
Sleep 6s
Type "printf '\nINSTRUCTION — Press Shift+Tab until plan mode is on.\nPROOF ACTION — inspect: git diff -- docs/design.md docs/decisions docs/plan.md\nDo not build before the plan is accepted.\n'"
Enter
Sleep 5s
