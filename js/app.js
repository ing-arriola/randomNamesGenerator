const formUI=document.getElementById('generar-nombre')

formUI.addEventListener('submit',loadName)

function loadName(e){
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
            //a header for results :)
            let headerOfResults=document.createElement('h3')
            headerOfResults.innerHTML='Generated Names'
            //If the result sectio has any child.. remove it all of them :)
            while(result.hasChildNodes()){
                result.removeChild(result.firstChild)
            }
            //Adding the header :)
            result.appendChild(headerOfResults)
            answer.forEach(element => {
                let nombre=document.createElement('h6')
                nombre.classList.add('lista')
                
                nombre.innerHTML=`${element.name}`
                console.log(nombre)
                result.appendChild(nombre)
            });
            
        }
    }

    xhr.send()
}