async function signup(e){

    try{
    e.preventDefault(); 
    const signupDetails={
     name : e.target.name.value,
     email : e.target.email.value,
     password : e.target.password.value
    }
   
       
        const response = await axios.post("http://localhost:3000/user/signup",signupDetails);
        if(response.status===201){
            alert('user signup succesfully')
           window.location.href="../Login/login.html"
        }
        else if(response.status==401){
            alert('user already exist pls login')
           console.log(response.data.message);
        }
       // console.log(obj.id)
       
else{
    throw new Error('failed to login')
}
    } 
        catch(err){
            document.body.innerHTML+=`<div style="color:red;">${err}<div>`;
        }
    }
