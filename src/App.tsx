import { RouterProvider } from 'react-router-dom'
import router from './routes/router.tsx'

function App() {
    return (
        // <ReactKeycloakProvider authClient={keycloak}
        //                        initOptions={{ onLoad: 'login-required' }}
        // >
            <RouterProvider router={router} />
        // </ReactKeycloakProvider>
    )
}

export default App
