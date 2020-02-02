const formUI=document.getElementById('generar-nombre')

formUI.addEventListener('submit',generateUrl)

function generateUrl(e){
    e.preventDefault()
    //variables for the UI elements from i gonna take data
    const origin=document.getElementById('origen')
    const gender=document.getElementById('genero')
    const amount=document.getElementById('numero').value
    //getting the value from the list of country options
    let originSelected=origin.options[origin.selectedIndex].value
    //getting the value from the list of genders
    let genderSelected=gender.options[gender.selectedIndex].value
    let url='https://uinames.com/api/?'
    //checking options
    if(originSelected !== ''){
        url+=`region=${originSelected}&`
    }
    if(genderSelected !== ''){
        url+=`gender=${genderSelected}&`
    }
    if(amount !== ''){
        url+=`amount=${amount}&`
    }
    
    doTheRequest(url)
}

function doTheRequest(url){
    //new instance of httpRequest
    const xhr=new XMLHttpRequest()
    //Set the object
    xhr.open('GET',url,true)

    xhr.onload=function(){
        if(this.status === 200){
            //Getting the DOM element to render the results
            const result=document.getElementById('resultado')
            //Getting the data
            let answer=JSON.parse(this.responseText)
            let state=checkNames(answer)
            //a header for results :)
            let headerOfResults=document.createElement('h3')
            
            headerOfResults.innerHTML='Generated Names'
            
            //If the result sectio has any child.. remove it all of them :)
            while(result.hasChildNodes()){
                result.removeChild(result.firstChild)
            }
            //Adding the header :)
            result.appendChild(headerOfResults)
            result.appendChild(state)
            result.appendChild(document.createElement('br'))//This only for a good looking :)
            answer.forEach(element => {
                if(element.name !== ''){
                    let nombre=document.createElement('h6')
                    nombre.classList.add('lista')
                    nombre.innerHTML=`${element.name}`
                    result.appendChild(nombre)
                }
                
            });
            
        }
    }

    xhr.send()
}

//This function checks if the response array has the same number of names as the user aks for
//If the requested number of names are equal to the generated names then... print the results 
//and add a success message... otherwise show a error message
function checkNames(jsonarray){
    let cuenta=0
    let message=document.createElement('div')
    
    jsonarray.forEach(element => {
        if(element.name !== ''){
            cuenta+=1
        }
        
    })
    console.log("array es: " + jsonarray.length + "y cuenta es:"+cuenta)
    if(cuenta >0 && cuenta === jsonarray.length){
        message.innerHTML='Success'
        message.classList.add('success')
    }else{
        message.innerHTML='At this moment the API DB has not enogth data'
        message.classList.add('danger')
    }
    return message
}