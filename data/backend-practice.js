const xhr = new XMLHttpRequest();

xhr.open('GET', 'http://supersimplebackend.dev/products/second' );

xhr.addEventListener('load', () =>{
    console.log(xhr.response);
});

xhr.send();