Output "assets/day5-daily-brief-teach/a1-guide.mp4"

Set Shell "zsh"
Set FontSize 18
Set Width 1148
Set Height 780
Set TypingSpeed 18ms

Type "cd ../day5-daily-brief-maarten"
Enter
Sleep 400ms
Type "sed -n '34,46p' SOLO.md"
Enter
Sleep 5s
Type "printf '\nINSTRUCTION — Paste this prompt in manual mode.\nPROOF ACTION — inspect: git diff -- intent.md\nDo not start code. A facilitator accepts the boundary.\n'"
Enter
Sleep 5s
