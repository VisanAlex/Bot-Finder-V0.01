// api url
let api_url =
  "https://wax.cryptolions.io/v2/history/get_actions?account=pdvuy.wam&skip=0&limit=1000&sort=desc&transfer.to=pdvuy.wam&transfer.from=m.federation&after=2021-09-03T22:00:00.000Z&before=2021-09-05T21:59:59.999Z";

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
  document.getElementById("results").innerHTML = tab;
}

function exportReportToExcel() {
  let table = document.getElementsByTagName("table"); // you can use document.getElementById('tableId') as well by providing id to the table tag
  TableToExcel.convert(table[0], {
    // html code may contain multiple tables so here we are refering to 1st table tag
    name: `export.xlsx`, // fileName you could use any name
    sheet: {
      name: "Sheet 1", // sheetName
    },
  });
}
