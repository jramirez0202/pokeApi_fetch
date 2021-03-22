document.addEventListener('DOMContentLoaded', function() {
    let next = "https://pokeapi.co/api/v2/pokemon/";
    getCharacters()
    $('.btn__more').click(function(e){
        e.preventDefault();
        $("#info").html("");
        getCharacters();
    });
    // $('a').click(function(e){
    //     console.log(e)
    //     e.preventDefault();
    //     $('#myModal').modal('show')
    //     let new_url = ($(this).attr('url'));
    //     getModal(new_url); 
    // });

    function  getCharacters(){
        fetch(next).then(function(response){
            return response.json();
            })
            .then(function(response){
                next = response.next
                response.results.forEach(function(info){
                fetch(info.url).then(function(response){
                    return response.json();
                    }).then((pokemon)=>{
                    let details = `<div class="card m-3  col-sm-3" style="width: 18rem;">
                        <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${info.name}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" url="${info.url}" id="${info.name}" class="btn btn-primary description">¡Quiero ver más de este pokémon!</a>
                        </div>
                    </div> `
                    document.querySelector("#info").insertAdjacentHTML('beforeend', details);
                    document.querySelector(`#${info.name}`).setAttribute('href', info.url)
                    document.querySelector(`#${info.name}`).addEventListener("click", function(e){
                        e.preventDefault();
                        let urlPokemon = e.target.href
                        getModal(urlPokemon)
                      })
                })
            })
            // .then(function(){ boton()
            // function(){ 
            //     $('.description').click(function(e){
            //     console.log(e)
            //     e.preventDefault();
            //     $('#myModal').modal('show')
            //     let new_url = ($(this).attr('url'));
            //     getModal(new_url); 
            // })
        })
        
    }
    function getModal(new_url){
        fetch(new_url).then(function(response){
            return response.json();
        })
        .then(function(response){
            $('#myModal').modal('show')
            document.querySelector('[data-dismiss="modal"]').addEventListener('click', (e) => {
                e.stopPropagation();
                clearModal('.pokemon-info');
                $('#pokemon-modal').modal('hide');
              });
            $("#namePokemon").empty();
            $('#namePokemon').append(response.species.name)
            $("#namePokemon").append("<img src='"+response.sprites.front_default+"'></img>")
            $("#namePokemon").append("<img src='"+response.sprites.front_shiny+"'></img>")
            response.abilities.forEach(function(abi){
                $("#abilityPokemon").append("<p>"+abi.ability.name+"</p>").append(`<div>
                <button type="button" class="btn btn-secondary btn1">Otros pokemones que tienen estabilidad</button>        
              </div>`)
            })
            response.types.forEach(function(tipo){
                $("#typePokemon").append("<p>"+tipo.type.name+"</p>").append(`<div>
                <button type="button" class="btn btn-secondary btn2">Ver relaciones de daños</button>        
              </div>`)
            })

            response.moves.forEach(function(move, index){
                if (index < 5) {
                    $("#movePokemon").append("<p>"+move.move.name+"</p>")
                }
            
            })

            response.game_indices.forEach(function(gen){
                $("#generationPokemon").append("<p>"+gen.version.name+"</p>")
            })
        }).then(function(){
            document.querySelector('.btn2').addEventListener("click", function(e){
                e.preventDefault();
                let type_url = 
                damagesModal(type_url)
            })
        })
    }
    function damagesModal(type_url){
        $('#damagesModal').modal('show')

    }
    
})