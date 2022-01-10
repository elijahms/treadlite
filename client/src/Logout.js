import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


const Logout = ({setUser}) => {

    function logoutFunc() {
        fetch('/api/logout', { method: 'DELETE' })
        .then((data) => console.log(data));
        setUser(null)
    }

    return (
        <Container>
        <Box 
            maxWidth='sm'
            className='logout-box' >
            <Stack>
                <Button 
                    variant="contained"
                    onClick={logoutFunc}
                    >Logout
                </Button>
            </Stack>
        </Box>
        </Container>
    )
}

export default Logout
