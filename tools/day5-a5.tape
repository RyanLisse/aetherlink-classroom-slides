Output "assets/day5-daily-brief-teach/a5-guide.mp4"

Set Shell "zsh"
Set FontSize 18
Set Width 1148
Set Height 780
Set TypingSpeed 18ms

Type "cd ../day5-daily-brief-maarten"
Enter
Sleep 400ms
Type "sed -n '90,102p' SOLO.md"
Enter
Sleep 6s
Type "printf '\nINSTRUCTION — This clip does not use credentials or call a model.\nPROOF ACTION — without credentials: npm run brief:sample\nKeep the live result OPEN. Never print tokens.\n'"
Enter
Sleep 5s
