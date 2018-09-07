
  const { ipcRenderer } = require('electron');
  const axios = require('axios')

  function call_api_github(){
    let username = document.getElementById("username").value
    let url = `https://api.github.com/users/${username}/repos`
    let bodyTable = " ";
            bodyTable    += "<tr> <td>__OWNER__</td>";
              bodyTable  +="<td><img src=\"__gravatar__\" alt='' style=\"width:50px\"></td>";
              bodyTable  +="<td>__NAME__REPOS__</td>";
              bodyTable  +="<td>__REPOS__</td> </tr>";

    let rowTable = "<tbody>"

    axios.get(url)
      .then(function(response){
        for (let item of response.data) {
           rowTable += bodyTable
           .replace("__OWNER__",item.owner.login)
           .replace("__NAME__REPOS__",item.name)
           .replace("__gravatar__",item.owner.avatar_url)
           .replace("__REPOS__",item.git_url)

        }
        rowTable += "</tbody> ";
        console.log(rowTable);
        document.getElementById("table-repo").innerHTML += rowTable
        // $("table").append(rowTable)
        console.log(response.data);
        console.log(response.status);
      }
    )
  }
  var myEl = document.getElementById('send');

  myEl.addEventListener('click', function() {
      call_api_github();
  }, false);
  // document.getElementsByClassName('send').onclick = call_api_github
