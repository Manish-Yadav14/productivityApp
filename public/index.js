const loginForm = document.getElementById('user-login');

loginForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('pwd').value;
    try {
        const res = await axios.post('/api/v1/users/login',{email,password});
        if(res.status==201){
            localStorage.setItem('token',`${res?.data?.token}`)
            window.location.href = 'http://localhost:3000/home.html';
        }
        
    } catch (error) {
        console.log(error);
        alert("Error with login... check Credentials")
    }
})
