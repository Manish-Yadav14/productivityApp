(function renderHomePage(){
    const token = localStorage.getItem('token');
    if(!token){
        window.location.href ='http://localhost:3000/index.html';
    }
})();
