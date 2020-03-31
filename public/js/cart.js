$( document ).ready(function() {
    $.ajax({
        type: "GET",
        url: "/phonedata",
        dataType: "json",
        success: function (msg) {
            console.log(msg);
        if (msg.length) {
            var maintable=document.getElementById('maintable');
            for (var x = 0; x < msg.length; x++) {
               var row1=document.createElement('tr');
               var row2=document.createElement('tr');
               var row3=document.createElement('tr');
               var row4=document.createElement('tr');

               var data11=document.createElement('td');
               var data21=document.createElement('td');
               var data31=document.createElement('td');
               var data41 =document.createElement('td');

               var div41=document.createElement('div');
               var divminus41=document.createElement('div');
               var divplus41=document.createElement('div');
               var minus41=document.createElement('button');
               var plus41=document.createElement('button');
               var input41=document.createElement('input');

               div41.setAttribute('class','input-group mb-3');
   
               divminus41.setAttribute('class','input-group-prepend');
               divplus41.setAttribute('class','input-group-append');
               minus41.setAttribute('class','btn btn-outline-primary js-btn-minus');
       
               minus41.textContent="&minus;";
               plus41.setAttribute('class','btn btn-outline-primary js-btn-plus');
       
               plus41.setAttribute('class','&plus;');

               input41.setAttribute('class','form-control text-center');
               input41.id="brokenglass";

               divminus41.appendChild(minus41);
               divplus41.appendChild(plus41);

               div41.appendChild(divminus41);
               div41.appendChild(input41);
               div41.appendChild(divplus41);

               data41.appendChild(div41);
       

               


               var data12=document.createElement('td');
               var data22=document.createElement('td');
               var data32=document.createElement('td');
               var data42 =document.createElement('td');

               var div42=document.createElement('div');
               var divminus42=document.createElement('div');
               var divplus42=document.createElement('div');
               var minus42=document.createElement('button');
               var plus42=document.createElement('button');
               var input42=document.createElement('input');

               div42.setAttribute('class','input-group mb-3');
            //    div42.style('maxwidth:120px');
               divminus42.setAttribute('class','input-group-prepend');
               divplus42.setAttribute('class','input-group-append');
               minus42.setAttribute('class','btn btn-outline-primary js-btn-minus');
      
               minus42.textContent="&minus;";
               plus42.setAttribute('class','btn btn-outline-primary js-btn-plus');
         
               plus42.setAttribute('class','&plus;');
      
               input42.setAttribute('class','form-control text-center');
               input42.id="touch/screen/display";

               divminus42.appendChild(minus42);
               divplus42.appendChild(plus42);

               div42.appendChild(divminus42);
               div42.appendChild(input42);
               div42.appendChild(divplus42);

               data42.appendChild(div42);

               var data13=document.createElement('td');
               var data23=document.createElement('td');
               var data33=document.createElement('td');
               var input43=document.createElement('input');

               div43.setAttribute('class','input-group mb-3');
            //    div43.style('maxwidth:120px');
               divminus43.setAttribute('class','input-group-prepend');
               divplus43.setAttribute('class','input-group-append');
               minus43.setAttribute('class','btn btn-outline-primary js-btn-minus');
               
               minus43.textContent="&minus;";
               plus43.setAttribute('class','btn btn-outline-primary js-btn-plus');
              
               plus43.setAttribute('class','&plus;');
        
               input43.setAttribute('class','form-control text-center');
               input43.id="chargingjack";

               divminus43.appendChild(minus43);
               divplus43.appendChild(plus43);

               div43.appendChild(divminus43);
               div43.appendChild(input43);
               div43.appendChild(divplus43);

               data43.appendChild(div43);



               var data14=document.createElement('td');
               var data24=document.createElement('td');
               var data34=document.createElement('td');
               var input44=document.createElement('input');

               div44.setAttribute('class','input-group mb-3');
            //    div44.style('maxwidth:120px');
               divminus44.setAttribute('class','input-group-prepend');
               divplus44.setAttribute('class','input-group-append');
               minus44.setAttribute('class','btn btn-outline-primary js-btn-minus');
             
               minus44.textContent="&minus;";
               plus44.setAttribute('class','btn btn-outline-primary js-btn-plus');
              
               plus44.setAttribute('class','&plus;');
        
               input44.setAttribute('class','form-control text-center');
               input44.id="batteryreplacement";

               divminus44.appendChild(minus44);
               divplus44.appendChild(plus44);

               div44.appendChild(divminus44);
               div44.appendChild(input44);
               div44.appendChild(divplus44);

               data42.appendChild(div44);


               data11.textContent=msg[x].Type;
               data21.textContent="Broken glass";
               data31.textContent="RS"+ msg[x].brokenglass;
               



               data12.textContent=msg[x].Type;
               data22.textContent="touch/screen/display";
               data32.textContent="RS"+ msg[x].touchscreendisplay;

               data13.textContent=msg[x].Type;
               data23.textContent="charging jack";
               data33.textContent="RS"+ msg[x].chargingjack;



               data14.textContent=msg[x].Type;
               data24.textContent="Battery Replacement";
               data34.textContent="RS"+ msg[x].batteryreplacement;


               row1.appendChild(data11);
               row1.appendChild(data21);
               row1.appendChild(data31);
               row1.appendChild(data41);


               row2.appendChild(data12);
               row2.appendChild(data22);
               row2.appendChild(data32);
               row2.appendChild(data42);

               row3.appendChild(data13);
               row3.appendChild(data23);
               row3.appendChild(data33);
               row3.appendChild(data43);

               row4.appendChild(data14);
               row4.appendChild(data24);
               row4.appendChild(data34);
               row4.appendChild(data44);


               maintable.appendChild(row1);
               maintable.appendChild(row2);
               maintable.appendChild(row3);
               maintable.appendChild(row4);

            }
        }
            else {
                alert("Something went wrong please try again !");
            }
        },
    });
});