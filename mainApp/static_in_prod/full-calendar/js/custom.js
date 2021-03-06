//----------------------------------------------------------------------------------------//
//                               CALENDAR + CLOCK-PICKER                                  //
//----------------------------------------------------------------------------------------// 

$(document).ready(function() {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        businessHours: true, // display business hours (weekends grey)
        selectable: true,
        selectHelper: true,
        nowIndicator: true,
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        select: function(start) {
            // Display modal with options to create a new event
            $('#myModal').modal('show');

            /* Define the default values and then when the modal is activated. The default values are:
               Date: selected date in the full-calendar by the user
               Begin-Time: none
               End-Time: none
               All-Day-Checkbox: True
               If the user doesn't change any value (date, time or all-day-checkbox), the default values will be used when
               the event is created
               If the user changes any value (date, time or all-day-checkbox), the respective function below will be called
               to get the new values for the event */
            var selected_date = start._d.getUTCMonth()+1 + '-' + start._d.getUTCDate() + '-' + start._d.getUTCFullYear();
            $('input[name$="start"]').datepicker('update', selected_date);  // $('#input-datestart').val(selected_date); will skip the leading zero if the dates.
            $('input[name$="end"]').datepicker('update', selected_date);
            var temp = $("#input-datestart").val().split('-');
            var begin_date = [temp[2], temp[0], temp[1]].join('-');
            var end_date = begin_date;
            var begin_event = begin_date;
            var end_event = begin_date;
            var begin_time;
            var end_time;
            var begin_time_toggle = "";
            var end_time_toggle = "";

            /* Date-Picker Function (activated only when there's a change)
               It reads the user input and stores them in variables which are used when the event is created
               If the the All-Day-Event checkbox state  is true(true by default), a time variable is appended to the date */
            $('input[name$="start"]').change(function(){
                temp = $("#input-datestart").val().split('-');
                begin_date = [temp[2], temp[0], temp[1]].join('-');
                if (document.getElementById('checkbox-alldayevent').checked === true)
                    begin_event = begin_date;
                else if (document.getElementById('checkbox-alldayevent').checked === false)
                    begin_event = begin_date + begin_time;
            });
            $('input[name$="end"]').change(function(){
                temp = $("#input-dateend").val().split('-');
                end_date = new Date([temp[2], temp[0], temp[1]].join('/'));
                end_date.setDate(end_date.getDate() + 1); 
                end_date = [end_date.getUTCFullYear(), ('0'+(end_date.getUTCMonth()+1)).slice(-2), ('0'+(end_date.getUTCDate())).slice(-2)].join('-');

                if (document.getElementById('checkbox-alldayevent').checked === true)
                    end_event = end_date;
                else if (document.getElementById('checkbox-alldayevent').checked === false)
                    end_event = end_date + end_time;
            });

            /* Clock-Picker Function (activated only when there's a change)
               The default time is the current time
               It reads the user input and appends it to the time specified in the date input fields (see Date-Picker Function above)
               The values (date+time) are then stored in variables which are used when the event is created */
            $('.clockpicker').clockpicker({'default':'now'})
            .find('input').change(function(){
                document.getElementById('checkbox-alldayevent').checked = false;
                if ($("#input-eventbegintime").val() !== ""){
                    begin_time = 'T' + $("#input-eventbegintime").val() + ':00';
                    begin_event = begin_date + begin_time;
                }
                if ($("#input-eventendtime").val() !== ""){
                    end_time = 'T' + $("#input-eventendtime").val() + ':00';
                    end_event = end_date + end_time;
                }
            });

            /* Checkbox Function (activated only when there's a change)
               If checked, the event is set to be all day (no begining and end time) */
            $('#checkbox-alldayevent').change(function(){
                if (document.getElementById('checkbox-alldayevent').checked === true) {
                    begin_time_toggle = $("#input-eventbegintime").val();
                    end_time_toggle = $("#input-eventendtime").val();
                    $("#input-eventbegintime").val("");
                    $("#input-eventendtime").val("");
                    begin_event = begin_date;
                    end_event = end_date;
                }
                else if (document.getElementById('checkbox-alldayevent').checked === false) {
                    $("#input-eventbegintime").val(begin_time_toggle);
                    $("#input-eventendtime").val(end_time_toggle);
                    begin_event = begin_date + begin_time;
                    end_event = end_date + end_time;
                }
                
                  
            });

            /* Button to create the event. 
               Creates an event if clicked (if all the conditions are met) */
            $('#create-event-button').click(function(event){    // or instead of event.stopImmediatePropagation() $('#create-event-button').unbind('click').click(function(){ 
                event.stopImmediatePropagation();               
                var title = $("#event-title-input").val();
                var description = $("#description-input").val();
                var sub_users = $("#subusers-input").val();
                var begin = new Date(begin_event);
                var end = new Date(end_event);
                if(begin < end)
                    end.setDate(end.getDate() - 1);
                var check_box = document.getElementById('checkbox-alldayevent').checked;

                if(title === "")
                    alert("You need to input a title");
                else if(description === "")
                    alert("You need to input a description");
                else if(sub_users === "")
                    alert("You need to input a title");                
                else if(begin > end)
                    alert("The end of the event has to be greater than the begining...");
                else if(check_box == false && $("#input-eventbegintime").val() == "" || check_box == false && $("#input-eventendtime").val() == "")
                    alert("If it's not an 'All Day Event', you must provide a time range...");
                else{
                    var eventData = {
                        title: title,
                        start: begin_event,
                        end: end_event,
                    };
                    $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                    $('#calendar').fullCalendar('unselect');
                    $('#myModal').modal('hide');
                }
            });
        },
        events: [
            {
                title: 'All Day Event',
                start: '2016-05-01',
                description: 'This is a cool event',
            },
            {
                title: 'Long Event',
                start: '2016-05-07',
                end: '2016-05-10'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2016-05-07T16:00:00'
            },
            {
                title: 'GHP Conference',
                start: '2016-05-11',
                end: '2016-05-13'
            },
            {
                title: 'Brunch with Katie',
                start: '2016-05-15T10:30:00',
                end: '2016-05-15T12:30:00'
            },
            {
                title: 'Meeting with Josh',
                start: '2016-05-18T14:30:00'
            },
            {
                title: 'Family Dinner',
                start: '2016-05-27T20:00:00'
            },
            {
                title: 'Jenny Birthday Party',
                start: '2016-05-31T07:00:00'
            },
        ]
    });
});


//----------------------------------------------------------------------------------------//
//                                      DATE-PICKER                                       //
//----------------------------------------------------------------------------------------// 

$(function(){
    $("#datepicker").datepicker({
        // orientation: "bottom left",
        format: "mm-dd-yyyy",
        todayHighlight: true,
        todayBtn: "linked",
        autoclose: true,
        // datesDisabled: ['03/08/2016'],
        // defaultViewDate: { year: 1977, month: 04, day: 25 },
    }).datepicker('update', new Date());
});