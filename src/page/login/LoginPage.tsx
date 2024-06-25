import { Button } from '@mui/material'
import keycloak from '../../services/keycloak.ts'

function LoginPage() {
    return (
        <>
            <Button variant="contained" sx={{ height: '30px' }} onClick={() => keycloak.init({onLoad: 'login-required'})}>Create</Button>
        </>
    )
}
export default LoginPage