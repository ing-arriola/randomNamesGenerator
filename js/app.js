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
    
   
}