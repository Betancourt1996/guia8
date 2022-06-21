document.addEventListener('DOMContentLoaded',()=>{
  
    cargarDatos=()=>{
        //alert('Alerta');
        let url = "https://dataserverdaw.herokuapp.com/escritores/xml";
        fetch(url)
            .then(response => response.text())
            .then(data =>{
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "application/xml");
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
    let select = document.getElementsByName('select')[0]
    select.addEventListener('change',()=>{
        (async () => {
            try {
              let divFrases = document.getElementById('frases')  
              divFrases.innerHTML = "";
              const response = await fetch("https://dataserverdaw.herokuapp.com/escritores/frases");
              const data = await response.json();
                
              Object.entries(data['frases']).forEach(([key, value]) => {
                if (value['id_autor'] == select.value){                  
                                   
                  let nombre = select.options[select.selectedIndex].textContent
                  let frase = value['texto']

                  let plantilla = `
                  <div class="col-lg-3">
                  <div class="test-inner ">
                      <div class="test-author-thumb d-flex">
                          <div class="test-author-info">
                              <h4>${nombre}</h4>                                            
                          </div>
                      </div>
                      <span>${frase}</span>
                      <i class="fa fa-quote-right"></i>
                  </div>
                  </div>
                  `
                  divFrases.innerHTML += plantilla
                }                
              });

            } catch (err) {
              console.error(err);
            }
          })();
    })
})