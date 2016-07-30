Template.calender.created = function() {




  
}

Template.calender.helpers({


});

Template.calender.events({


 
});

Template.calender.rendered = function() {

  $('#kalendar').fullCalendar({
    defaultView: 'agendaDay',
    
    aspectRatio: 1.1,
    height: 350,
    // contentHeight: 300,

    events: [
        {
            title: 'My Event',
            start: '2016-07-29',
            url: 'http://google.com/'
        }
        // other events here
    ],
    resources: [
        { id: 'a', title: 'Room A' },
        { id: 'b', title: 'Room B' },
        { id: 'c', title: 'Room C' },
        { id: 'd', title: 'Room D' }
    ],
    customButtons: {
        // myCustomButton: {
        //     text: 'custom!',
        //     click: function() {
        //         alert('clicked the custom button!');
        //     }
        // }
    },
    header: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    },
    views: {
        month: { // name of view
            // titleFormat: 'YYYY, MM, DD'
            // other view-specific options here
        }
    },
   dayClick: function(date, jsEvent, view, resourceObj) {

        alert('Date: ' + date.format());
        alert('Resource ID: ' + resourceObj.id);

    },
    eventClick: function(event) {
        if (event.url) {
            window.open(event.url);
            return false;
        }
    }    
    // other options go here...
  });


}