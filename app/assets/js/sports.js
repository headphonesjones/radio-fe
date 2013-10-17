function loadSchedule() {
  var currentDate = new Date()
  var request = gapi.client.calendar.events.list({
    'calendarId': 'g972gtlnd1sh29kkpcim92hnrs@group.calendar.google.com',
    'singleEvents': 'true',
    'orderBy': 'startTime',
    'timeMin': currentDate.getFullYear() + "-" + ('0'+(currentDate.getMonth()+1)).slice(-2) + "-" + currentDate.getDate() + "T00:00:00-05:00",
  });
  request.execute(function(response) {
    $.each(response.items, function(key, value) {
      var startDate = value.start.dateTime;
      var startTime = startDate.substring(11,16);
      var hours = (startTime.substring(0,2) > 12)? startTime.substring(0,2) -12 : startTime.substring(0,2);
      var startTimeFormatted = hours + ":" + startTime.substring(3,5) + ((startTime.substring(0,2) >= 12)? 'pm' : 'am');
      var dateTimeFormatted = startDate.substring(5,7) + "/" + startDate.substring(8,10) + " " +startTimeFormatted;
      if (value.description == window.showName) {
        $('#schedule').append($('<li>', {
          text: dateTimeFormatted + " " + value.summary
        }));
      }
    });
  });
}
