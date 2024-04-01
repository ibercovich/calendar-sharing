function sync() {

  // CHANGE - id of the secondary calendar to pull events from
  // if the calendar you are sharing is not your primary under another account
  // then the ID will be something like something@group.calendar.google.com
  var id="your_personal_email@gmail.com"; 
      
  var secondaryCal=CalendarApp.getCalendarById(id);
  var today=new Date();
  var enddate=new Date();
  enddate.setDate(today.getDate()+30); // how many days in advance to monitor and block off time
  var secondaryEvents=secondaryCal.getEvents(today,enddate);

  var primaryCal=CalendarApp.getDefaultCalendar();
  
  var primaryEvents=primaryCal.getEvents(today,enddate);
  
  var stat=1;
  var evi, existingEvents;
 
  for (ev in secondaryEvents)
  {
    stat=1;
    evi=secondaryEvents[ev];
    
    for (existingEvents in primaryEvents) // if the secondary event has already been blocked in the primary calendar, ignore it
      {
        if ((primaryEvents[existingEvents].getStartTime().getTime()==evi.getStartTime().getTime()) && (primaryEvents[existingEvents].getEndTime().getTime()==evi.getEndTime().getTime()))
        {
           stat=0;
           break;
        }
      }
    
    if (stat==0) continue;
    
    var d = evi.getStartTime();
    var n = d.getDay();

    if (evi.isAllDayEvent()) continue;
    
    if (n==1 || n==2 || n==3 || n==4 || n==5) // skip weekends. Delete this if you want to include weekends
    {
      var newEvent = primaryCal.createEvent('Booked',evi.getStartTime(),evi.getEndTime()); // change the Booked text to whatever you would like your merged event titles to be
      // alternative version below that copies the exact secondary event information into the primary calendar event
      // var newEvent = primaryCal.createEvent(evi.getTitle(),evi.getStartTime(),evi.getEndTime(), {location: evi.getLocation(), description: evi.getDescription()});  

      newEvent.removeAllReminders(); // so you don't get double notifications. Delete this if you want to keep the default reminders for your newly created primary calendar events
    }

  }

}
