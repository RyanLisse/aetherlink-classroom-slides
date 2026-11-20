Output "assets/day5-daily-brief-teach/a4-guide.mp4"

Set Shell "zsh"
Set FontSize 18
Set Width 1148
Set Height 780
Set TypingSpeed 18ms

Type "cd ../day5-daily-brief-maarten"
Enter
Sleep 400ms
Type "sed -n '76,88p' SOLO.md"
Enter
Sleep 6s
Type "printf '\nINSTRUCTION — This clip does not run an unfinished renderer.\nPROOF ACTION — after the build: npm run brief:sample\nOpen out/latest.html and save the named 1440x900 screenshot.\n'"
Enter
Sleep 5s
