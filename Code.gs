function sync() {

  function matchTimes(pev, evi) {
    return pev.getStartTime().getTime() === evi.getStartTime().getTime() && pev.getEndTime().getTime() === evi.getEndTime().getTime();
  }

  var id = "your_email@gmail.com"; // CHANGE - id of the secondary calendar
  var secondaryCal = CalendarApp.getCalendarById(id);
  var today = new Date();
  var enddate = new Date();
  enddate.setDate(today.getDate() + 30); // how many days in advance
  var secondaryEvents = secondaryCal.getEvents(today, enddate);
  var primaryCal = CalendarApp.getDefaultCalendar();
  var primaryEvents = primaryCal.getEvents(today, enddate);

  var bookedEventsToVerify = primaryEvents.filter(
    // get existing events titled "Booked" previously created
    // this is so that we can remove events if they were removed from secondary calendar
    event => event.getTitle() === 'Booked').map(event => event.getId()
    );


  secondaryEvents.forEach(function (evi) {
    // checks if an event already exists in primary calendar
    // right now being done solely on start/end time
    // could be improved by checking title if there are bugs
    // if there is a match, store the event id
    var matchedEventId = null;
    var eventExists = primaryEvents.some(function (pev) {
      var isMatch = matchTimes(pev, evi);
      if (isMatch) {
        matchedEventId = pev.getId(); // Capture the ID here
      }
      return isMatch;
    });

    // if the event doesn't exist in primary AND
    // AND the event is _not_ all-day AND the event is on a weekday
    // Then create an event called "Booked" with the same time
    if (!eventExists && !evi.isAllDayEvent() && [1, 2, 3, 4, 5].includes(evi.getStartTime().getDay())) {
      primaryCal.createEvent('Booked', evi.getStartTime(), evi.getEndTime()).removeAllReminders();
    } else if (eventExists && matchedEventId) {
      // if the event already exists, remove it from bookedEventsToVerify
      bookedEventsToVerify = bookedEventsToVerify.filter(id => id !== matchedEventId);
    }
  });

  bookedEventsToVerify.forEach(function (eventId) {
    // all events that already existed were removed from bookedEventsToVerify
    // all other Booked events are either newly added or no longer valid
    // those that remain in the bookedEventsToVerify list are deprecated
    var eventToDelete = primaryCal.getEventById(eventId);
    if (eventToDelete) eventToDelete.deleteEvent();
  });

}
