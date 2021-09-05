

function myfunc() {
  var input = document.getElementById('userinput').value;
  var date1 = document.getElementById('userinputdate1').value;
  var date2 = document.getElementById('userinputdate2').value;
// api url
let api_url =
  "https://wax.cryptolions.io/v2/history/get_actions?account="+input+"&skip=0&limit=1000&sort=desc&transfer.to="+input+"&transfer.from=m.federation&after="+date1+"&before="+date2+"";

// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data);
  if (response) {
    hideloader();
  }
  show(data);
}
// Calling that async function
getapi(api_url);

// Function to hide the loader
function hideloader() {
  document.getElementById("loading").style.display = "none";
}
// Function to define innerHTML for HTML table
function show(data) {
  let tab = `<tr>
          <th>Timings</th>
         </tr>`;

  // Loop to access all rows

  var newData = data.actions;
  console.log(newData);

  for (let r of data.actions) {
    tab += `<tr> 
    <td>${r.timestamp.substring(11).slice(0, -4)} </td>
       
</tr>`;
  }

  // Setting innerHTML as tab variable
  document.getElementById("table").innerHTML = tab;
}

} 




function exportReportToExcel() {
    let table = document.getElementsByTagName("table"); // you can use document.getElementById('tableId') as well by providing id to the table tag
    TableToExcel.convert(table[0], { // html code may contain multiple tables so here we are refering to 1st table tag
      name: `export.xlsx`, // fileName you could use any name
      sheet: {
        name: 'Sheet 1' // sheetName
      }
    });
  }

  function fnExcelReport()
  {
      var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
      var textRange; var j=0;
      tab = document.getElementById('table'); // id of table
  
      for(j = 0 ; j < tab.rows.length ; j++) 
      {     
          tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
          //tab_text=tab_text+"</tr>";
      }
  
      tab_text=tab_text+"</table>";
      tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
      tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
      tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params
  
      var ua = window.navigator.userAgent;
      var msie = ua.indexOf("MSIE "); 
  
      if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
      {
          txtArea1.document.open("txt/html","replace");
          txtArea1.document.write(tab_text);
          txtArea1.document.close();
          txtArea1.focus(); 
          sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
      }  
      else                 //other browser not tested on IE 11
          sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  
  
      return (sa);
  }