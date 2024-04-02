# calendar-sharing
Google script to block times from personal calendar on work calendar

1. Personal calendar needs to be shared with work calendar through gmail gui
2. Google script needs to be added to the destination account (e.g. work calendar google drive)
  - go to https://script.google.com in your work account and create a new script
  - copy the contents of Code.gs in this repository
  - replace your_email@gmail.com with the appropriate email address
4. Create a manual trigger to make it run every hour or run manually to test
  - click the little clock icon on the right side of the script editor
  - click add trigger
  - select the sync function and tell it to run every hour
  - go back to the code and run the script once to confirm that it works

Based on ideas from: https://medium.com/@willroman/auto-block-time-on-your-work-google-calendar-for-your-personal-events-2a752ae91dab
