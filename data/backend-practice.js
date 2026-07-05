const xhr = new XMLHttpRequest();

xhr.open('GET', 'http://supersimplebackend.dev/' );

xhr.addEventListener('load', () =>{
    console.log(xhr.response);
});

xhr.send();