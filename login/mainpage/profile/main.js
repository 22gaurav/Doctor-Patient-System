document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }
};





var check_queue;
var length_for_email;
var time;
var GlobalfinalTime;
var GlobalfinalTimetwo;
var global_clinic_name;
 var token=localStorage.getItem("token"); 
    var disease=localStorage.getItem("disease");
$(document).ready(function(){
// $('#but_upload').on('click',(function() {
//   console.log("entered");
//    console.log("submit event");
//             var fd = new FormData(document.getElementById("filesubmit"));
            
//             $.ajax({
//               url: "https://finalyearp.herokuapp.com/upload",
//               type: "POST",
//               beforeSend: function(xhr){ xhr.setRequestHeader("Authorization","Bearer " + token)},
//               data:fd,
//               processData: false,  // tell jQuery not to process the data
//               contentType: false   // tell jQuery not to set contentType
//             }).done(function( data ) {
//                 console.log("sucess:");
               
//             });
//             return false;
//     }));

         $("#filesubmit").on("submit", function(e){
        e.preventDefault();
        var formData = new FormData(this);
        $.ajax({
          url  : "https://finalyearp.herokuapp.com/upload",
          type : "POST",
          beforeSend: function(xhr){ xhr.setRequestHeader("Authorization","Bearer " + token)},
          cache:false,
          data :formData,
          contentType : false, // you can also use multipart/form-data replace of false
          processData: false,
          success:function(response){
            console.log("uploaded");
            location.reload();
          }
        });
      });
var tokend=localStorage.getItem("token");
//download
 $.ajax({
           url: "https://finalyearp.herokuapp.com/download",
            method: "POST",
          
           beforeSend: function(xhr){ xhr.setRequestHeader("Authorization","Bearer " + tokend)},
           
            success: function (result) {
              var name_user=result.data.Username;
              document.getElementById("patient_name").innerHTML=name_user;
              document.getElementById("patient_name2").innerHTML=name_user;
                  console.log("entered download area");
                console.log(result);

           var lengthofdownload=result.data.Photos;
           console.log(lengthofdownload);
             
var lendownload=lengthofdownload.length;
for( var i=0;i<lendownload;i++)
{ var strnumber="Download"+(i+1);
  $(document).ready(function() {
    $('#containerdownload').append(
        $(document.createElement('a')).prop({
                target: '_blank',
                href: result.data.Photos[i],
                innerText: strnumber,
                class: "linkdown"
        })
    );
});
}
    



            },
            error: function (xhr, resp, text) {
     
            }
        });

//-----
 
var address_main;

document.getElementById("tables_content").style.display = 'none';
console.log(disease);
 var token=localStorage.getItem("token");
 console.log(token);
$.ajax({
  url: "https://finalyearp.herokuapp.com/getClinics",
  method: "POST",
  beforeSend: function(xhr){ xhr.setRequestHeader("Authorization","Bearer " + token)},
  data: {
      disease_name: disease
        },
 
  
  
  
  success: function(data){
    console.log(data);
    console.log(data.data);
    // var leng=data.data.clinics[2].queue.length;
    // console.log(leng);
    var len_clinics=data.data.clinics.length;
    for(var x=0;x<len_clinics;x++)
    {
    // console.log(data.data.clinics[x].clinic_name);
    // $('#response').html(data.data.clinics[x].clinic_name);
    var concatenation=data.data.clinics[x].clinic_name + "$" + data.data.clinics[x].queue.length+"$"+data.data.clinics[x].clinic_address+"$"+data.data.clinics[x].clinic_review+"$"+data.data.clinics[x].clinic_website;
     $('#selluser').append(
      '<option value="' +  concatenation +'">' + data.data.clinics[x].clinic_name+ '</option>'
      );
    
      var upgradeTime = (data.data.clinics[x].queue.length)*60*20;
      console.log(upgradeTime);
var seconds = upgradeTime;
var selecttime;
var strtime;
  var days        = Math.floor(seconds/24/60/60);
  var hoursLeft   = Math.floor((seconds) - (days*86400));
  var hours       = Math.floor(hoursLeft/3600);
  var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
  var minutes     = Math.floor(minutesLeft/60);
  var remainingSeconds = seconds % 60;
  function pad(n) {
    return (n < 10 ? "0" + n : n);
  }
   selecttime =  pad(hours) + ":" + pad(minutes) + ":" + pad(remainingSeconds);
   console.log(selecttime);
   var strtime = selecttime.toString();
   console.log(strtime);
  if (seconds == 0) {
    
     strtime = "First Appointment";
  } 

// var countdownTimer = setInterval(timer(),1000);
// console.log(strtime);



      var row = $('<tr><td>' + data.data.clinics[x].clinic_name+ '</td><td>' + strtime + '</td><td>' + data.data.clinics[x].clinic_address + '</td></tr>');
            $('#selectingtable').append(row);
        
  }
   
  
  },
  error: function(data){console.log("fail");}
});





});




 $(document).on('submit', '#location_selected', function () {
console.log("running 1");
console.log(disease);
        // get form data
         var sign_up_form = $(this);
        var form_raw_data = {
          
            "clinic_name": $('select[name=clinic_name]').val(),
            
        };
        var t=$('select[name=clinic_name]').val();
        const words = t.split("$");
        var original_clinic_name=words[0];
        global_clinic_name=original_clinic_name;
        var qlength = parseInt(words[1]);



           var address=words[2];
           var clin_reveiw=words[3];
           var clin_website=words[4];
        console.log(t);
        console.log(original_clinic_name);
        console.log(qlength);
        console.log(disease);
        
        var localtime=qlength*20;
         time=localtime;    //time is global variable
     
console.log("running 2");
      console.log(form_raw_data);
 console.log(JSON.stringify(form_raw_data));

        var form_data = JSON.stringify(form_raw_data);
        console.log(form_data);
        $('.loader__container').css('display', 'block');


// var upgradeTime1 = time*60;
// var seconds1 = upgradeTime1;
function timer() {
  var days        = Math.floor(localtime*60/24/60/60);
  var hoursLeft   = Math.floor((localtime*60) - (days*86400));
  var hours       = Math.floor(hoursLeft/3600);
  var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
  var minutes     = Math.floor(minutesLeft/60);
  var remainingSeconds = seconds % 60;
  function pad(n) {
    return (n < 10 ? "0" + n : n);
  }
  var finalTime=pad(hours) + ":" + pad(minutes) + ":" + pad(remainingSeconds);
  console.log(finalTime);
  GlobalfinalTimetwo=finalTime;
  document.getElementById('clinictimer').innerHTML =  pad(hours)+"hr" + ":" + pad(minutes)+"m"+ ":" + pad(remainingSeconds)+"s";
  if (seconds == 0) {
    clearInterval(countdownTimer);
    document.getElementById('clinictimer').innerHTML = "8:30 am";
  } else {
    seconds--;
  }
}




        $.ajax({
            url: "https://finalyearp.herokuapp.com/queue",
            method: "POST",
          
           beforeSend: function(xhr){ xhr.setRequestHeader("Authorization","Bearer " + token)},
            data: {
            clinic_name:original_clinic_name,
      disease_name: disease,
      time: time
        },
 
            success: function (result) {
               console.log(result)
                console.log("succe");

                swal("Your booking is confirmed,to change the clinic just delete the previous chosen clinic");
                document.getElementById("tables_content").style.display = 'block';
                $('#location_selected').attr("disabled", true);
                sessionStorage.setItem("nameofclinic", original_clinic_name);
                 sessionStorage.setItem("noofclinic", (qlength+1));
          
          document.getElementById("clin_address").innerHTML=address;
            document.getElementById("clinic-name").innerHTML=sessionStorage.getItem("nameofclinic");
              document.getElementById("queue_no").innerHTML=sessionStorage.getItem("noofclinic");
// $('#location_selected').prop('disabled', true);

$('#review').append(
        $(document.createElement('a')).prop({
                target: '_blank',
                href: clin_reveiw,
                innerText: original_clinic_name
                })
                
    );
$('#website').append(
        $(document.createElement('a')).prop({
                target: '_blank',
                href: clin_website,
                innerText: "Visit the website"
                })
                
    );



                    var upgradeTime = time*60;
var seconds = upgradeTime;
function timer() {
  var days        = Math.floor(seconds/24/60/60);
  var hoursLeft   = Math.floor((seconds) - (days*86400));
  var hours       = Math.floor(hoursLeft/3600);
  var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
  var minutes     = Math.floor(minutesLeft/60);
  var remainingSeconds = seconds % 60;
  function pad(n) {
    return (n < 10 ? "0" + n : n);
  }
  var finalTime=pad(hours) + ":" + pad(minutes) + ":" + pad(remainingSeconds);
  console.log(finalTime);
  GlobalfinalTime=finalTime;
  document.getElementById('clinictimer').innerHTML =  pad(hours)+"hr" + ":" + pad(minutes)+"m" + ":" + pad(remainingSeconds)+"s";
  if (seconds == 0) {
    clearInterval(countdownTimer);
    document.getElementById('clinictimer').innerHTML = "8:30 am";
  } else {
    seconds--;
  }
}
var countdownTimer = setInterval(timer(),1000);

$("#location_selected :input").prop("disabled", true);



    

            },
            error: function (result) {
                // on error, tell the user sign up failed
               console.log("fail");
                // $('.loader__container').css('display', 'none');
            }
        });

        return false;

    });


//time calclation
// function actualtimecalc(){


//      var upgradeTime = time*60;
// var seconds = upgradeTime;
// function timer() {
//   var days        = Math.floor(time*60/24/60/60);
//   var hoursLeft   = Math.floor((time*60) - (days*86400));
//   var hours       = Math.floor(hoursLeft/3600);
//   var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
//   var minutes     = Math.floor(minutesLeft/60);
//   var remainingSeconds = seconds % 60;
//   function pad(n) {
//     return (n < 10 ? "0" + n : n);
//   }
//   document.getElementById('clinictimer').innerHTML =  pad(hours) + ":" + pad(minutes) + ":" + pad(remainingSeconds);
//   if (seconds == 0) {
//     clearInterval(countdownTimer);
//     document.getElementById('clinictimer').innerHTML = "Completed";
//   } else {
//     seconds--;
//   }
// }
// var countdownTimer = setInterval(timer(), 1000);
// }
$(document).on('submit', '#secondtimedisease', function () {
console.log("entered");        // get form data
        // var sign_up_form = $(this);
        // var form_raw_data = {
           
        //     "disease": $('select[name=diseasetwo]').val(),
            
        // };
        // var disea=document.getElementById('disease');
        var t=$('select[name=diseasetwo]').val();

        console.log(t);
        // var form_data = JSON.stringify(form_raw_data);
        // $('.loader__container').css('display', 'block');

});



delete queue
console.log(check_queue);
$(document).on('click', '#deletebutton', function () {
var strtime = time.toString();
        
        $.ajax({
           url: "https://finalyearp.herokuapp.com/delqueue",
            method: "POST",
          
           beforeSend: function(xhr){ xhr.setRequestHeader("Authorization","Bearer " + token)},
            data: {
            clinic_name:global_clinic_name,
      disease_name: disease,
      time: GlobalfinalTime
        },
            success: function (result) {

                // $('#location_selected').attr("disabled", true);
                // $('#location_selected').prop('disabled', false)

                 document.getElementById("tables_content").style.display = 'none';
                 location.reload();
                 // $('#location_selected').attr('disabled',false); 
                 
                
                
            },
            error: function (xhr, resp, text) {
                
            }
        });

        return false;
    });





      //  $.ajax({
      //      url: "https://finalyearp.herokuapp.com/download",
      //       method: "POST",
          
      //      beforeSend: function(xhr){ xhr.setRequestHeader("Authorization","Bearer " + token)},
      //      
      //       success: function (result) {

                
     
      //       },
      //       error: function (xhr, resp, text) {
     
      //       }
      //   });

   function logging_out()
   {
    localStorage.clear();
    window.location = "../../../index.html";
   }