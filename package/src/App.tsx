import { Anchor, Container } from '@mantine/core';
import EditArea from '~/components/EditStructuredData/EditArea';

function App() {
  return (
    <Container sx={{ mt: 2 }}>
      <Anchor href="https://search.google.com/test/rich-results" target="_blank" rel="noopener">
        構造化データのテストを行う
      </Anchor>
      <EditArea />
    </Container>
  );
}

export default App;
