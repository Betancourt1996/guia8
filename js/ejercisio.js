document.addEventListener('DOMContentLoaded',()=>{
    cargarDatos=()=>{
        //alert('Alerta');
        let url = "https://dataserverdaw.herokuapp.com/escritores/xml";
        fetch(url)
            .then(response => response.text())
            .then(data =>{
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "application/xml");
                //console.log(xml);
                let escritores = xml.getElementsByTagName('escritor')

                for(let escritor of escritores){
                    let id = escritor.getElementsByTagName('id')[0].textContent
                    let nombre = escritor.getElementsByTagName('nombre')[0].textContent

                    let plantilla =`<option value="${id}">${nombre}</option>`

                    document.querySelector('div.input-group > select').innerHTML += plantilla
                }
                })
            .catch(console.error);
    };
    window.addEventListener('DOMContentLoaded',(event)=>{
        cargarDatos();
    })
    document.getElementsByTagName('select').addEventListener('change',()=>{
        fetch("https://dataserverdaw.herokuapp.com/escritores/frases")
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            for (const key in response){
                if(obj.hasOwnProperty(key)){
                  console.log(`${key} : ${response[key]}`)
                } }
        })
        .catch(console.error);
        
    })
})