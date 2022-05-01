import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import EditArea from '~/components/EditStructuredData/EditArea';

function App() {
  return (
    <Container sx={{ mt: 2 }}>
      <Link href="https://search.google.com/test/rich-results" underline="hover" target="_blank" rel="noopener">
        構造化データのテストを行う
      </Link>
      <EditArea />
    </Container>
  );
}

export default App;
