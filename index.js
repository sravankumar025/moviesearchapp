let searchbar=document.getElementById('searchBar');
let searchbtn=document.getElementById('searchBtn');
let content=document.getElementById('content');
let arr=[];
searchbtn.addEventListener('click',function(event){
    let myurl=`https://www.omdbapi.com/?apikey=22117d0e&s=${encodeURIComponent(searchbar.value.trim())}`;
    fetch(myurl)
    .then((response)=>response.json())
    .then((data)=>{
        // console.log(data);
        content.innerHTML=" ";
        if(data.Search){
            for(let i=0;i<data.Search.length;i++){
                let m=data.Search[i];
                let uri=`https://www.omdbapi.com/?apikey=22117d0e&i=${m.imdbID}`;
                // console.log(uri);
                fetch(uri)
                .then((response) => response.json())
                .then((data) => {
                    let divTag=document.createElement('div');
                    divTag.innerHTML=`
                    <img src=${m.Poster} height="250px" width="250px"/>
                    <h4>${m.Title} (${m.Year})</h4> 
                    <p><b>IMDB Rating</b> : ${data.Ratings[0].Value}</p>   
                    <p><b>Cast</b> : ${data.Actors}<br/>
                       <b>Director</b> : ${data.Director}
                    </p>          
                    `;
                    content.appendChild(divTag);
                    divTag.className="sbox";
                })
                .catch((error)=>console.log(error));
            }
        }else{
            content.textContent='No result for the movie you have searched';
        }
    })
    .catch((error)=>console.log(error));
})