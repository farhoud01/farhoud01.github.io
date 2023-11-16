let input = document.getElementById("user-name");
let submit = document.getElementById("sub");
let info = document.getElementById("Info");
let reset = document.getElementById("reset");

let errorOccurred = false;
 submit.addEventListener("click",() =>{
    sendRequest();
    event.preventDefault();
 }
 )
reset.addEventListener("click",() =>{
  info.firstChild.remove();
});

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
                    
                   repoName.appendChild(document.createTextNode("repository name : "+repo.name));
                   let description =  document.createElement("p");
                   let url = document.createElement("a");
                   url.setAttribute("href",  repo.html_url);
                   url.setAttribute("target", "_blank");
                   url.classList.add("link")  
                   url.appendChild(document.createTextNode("Visit Repository"));
                   if (repo.description && repo.description.trim() !== "") {
                    description.textContent = "description : "+repo.description;
                  } else {
                    description.textContent = "No description found in the repository";
                  }
                  url.classList.add("reset","link");
                   
                     container.appendChild(repoName); 
                    container.appendChild(description);
                    container.appendChild(url);
                });
                container.classList.add("repo-container");
            
                info.appendChild(container);
              
               

              } 
                
              
            }
            catch(err){
              alert(err);
              
            }
         
        }
