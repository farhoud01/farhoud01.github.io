let input = document.getElementById("user-name");
let submit = document.getElementById("sub");
let info = document.getElementById("Info");

let errorOccurred = false;
 submit.addEventListener("click",() =>{
    sendRequest();
    event.preventDefault();
 }
 )

        async function sendRequest(){
            try{
                let req =  await fetch(`https://api.github.com/users/${input.value}/repos`);
            
            let data =   await  req.json();
                
            if (Array.isArray(data)) {
                if (info.firstChild) {
                    info.firstChild.remove();
                  }
              let container =   document.createElement("div");
                data.forEach((repo) => {
                  
                 let repoName =   document.createElement("h1");
                    
                   repoName.appendChild(document.createTextNode(repo.name));
                   let description =  document.createElement("p");
                   if (repo.description && repo.description.trim() !== "") {
                    description.textContent = repo.description;
                  } else {
                    description.textContent = "No description found in the repo.";
                  }
                   
                     container.appendChild(repoName);
                    container.appendChild(description);
                });
                container.classList.add("repo-container");
            
                info.appendChild(container);
              
               

              } 
                
              
            }
            catch(err){
              alert("Invalid user name");
            }
         
        }