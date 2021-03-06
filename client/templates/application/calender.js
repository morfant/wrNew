var MOMENT_FORMAT = "MMM D, YYYY HH:mm";

var isPast = ( date ) => {
  let today = moment().format(MOMENT_FORMAT);
  return moment( today ).isAfter( date );
};


Template.calender.created = function() {
  let template = Template.instance();
  template.subscribe( 'events' );
}

Template.calender.helpers({


});

Template.calender.events({


 
});

Template.calender.rendered = function() {

  $('#kalendar').fullCalendar({
    defaultView: 'agendaWeek',
    
    aspectRatio: 2,
    // contentHeight: 300,

    // events: [
    //     {
    //         title: 'My Event',
    //         start: '2016-07-29',
    //         url: 'http://google.com/'
    //     }
    //     // other events here
    // ],
    // resources: [
    //     { id: 'a', title: 'Room A' },
    //     { id: 'b', title: 'Room B' },
    //     { id: 'c', title: 'Room C' },
    //     { id: 'd', title: 'Room D' }
    // ],
    // customButtons: {
    //     // myCustomButton: {
    //     //     text: 'custom!',
    //     //     click: function() {
    //     //         alert('clicked the custom button!');
    //     //     }
    //     // }
    // },
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    },
    views: {
        month: { // name of view
            // titleFormat: 'YYYY, MM, DD'
            // other view-specific options here
        }
    },
    events( start, end, timezone, callback ) {
      let data = Events.find().fetch().map( ( event ) => {
        // event.eventStartEditable = !isPast( event.start );
        return event;
      });

      if ( data ) {
        callback( data );
      }
    },
    eventRender( event, element ) { //Triggered while an event is being rendered.
      element.find( '.fc-content' ).html(
        `<h4>${ event.title }</h4>
         <p class="type-${ event.type }">#${ event.type }</p>
        `
      );
    },
    // eventDrop( event, delta, revert ) {
    //   let _start = event.start.format(MOMENT_FORMAT);
    //   let _end = event.end.format(MOMENT_FORMAT);
    //   if ( !isPast( _start ) ) {
    //     let update = {
    //       _id: event._id,
    //       start: _start,
    //       end: _end
    //     };

    //     Meteor.call( 'editEvent', update, ( error ) => {
    //       if ( error ) {
    //         Bert.alert( error.reason, 'danger' );
    //       }
    //     });
    //   } else {
    //     revert();
    //     Bert.alert( 'Sorry, you can\'t move items to the past!', 'danger' );
    //   }
    // },
    dayClick( date ) {
      Session.set( 'eventModal', {
        type: 'add',
        start: date.add(5, 'hour').format(MOMENT_FORMAT),
        end: date.add(2,'hour').format(MOMENT_FORMAT)
      });
      // console.log(date);
      // console.log(date.format("dddd, YYYY MM DD, h:mm a"));
      $( '#add-edit-event-modal' ).modal( 'show' );
    },
    eventClick( event ) {
      Session.set( 'eventModal', { type: 'edit', event: event._id } );
      $( '#add-edit-event-modal' ).modal( 'show' );
    }

  });


  Tracker.autorun( function() {
    Events.find().fetch();
    $( '#kalendar' ).fullCalendar( 'refetchEvents' );
  });


}