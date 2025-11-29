import teleton from '../assets/teleton.png'; 

function NavBar(){
    return (
        <div>
    <nav class="navbar navbar-expand-lg custom-navbar">
    <div class="container-fluid">
        <img 
        src={teleton} 
        alt="Logo" 
        width="200"
        height="60  "
    />
  </div>
    </nav>
</div>
    )

}
export default NavBar;