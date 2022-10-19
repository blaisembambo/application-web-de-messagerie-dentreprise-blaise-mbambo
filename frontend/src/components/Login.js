import '../styles/Login.css'

export default function Login() {
    return(
        <div className='login-wrapper'>
            <div className='login-container'>
                <h2 className='login-title'>CONNECTEZ-VOUS</h2>
                <hr className='underline' />
                <div className='login-form'>
                    <label><span>E-mail</span><input type="text" /></label>
                    <label><span>Mot de passe</span><input type="password" /></label>
                    <div><span>Vous n'avez pas de compte ? </span><a href='#' className="">inscivez-vous</a></div>
                    <div className="connection-button-container">
                        <button>SE CONNECTER</button>
                    </div>
                </div>
            </div>
        </div>
    )
}