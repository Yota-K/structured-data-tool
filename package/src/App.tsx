import { NotificationsProvider } from '@mantine/notifications';
import { Anchor, Container } from '@mantine/core';
import EditArea from '~/components/EditStructuredData/EditArea';

function App() {
  return (
    <NotificationsProvider>
      <Container sx={{ mt: 2 }}>
        <Anchor href="https://search.google.com/test/rich-results" target="_blank" rel="noopener">
          構造化データのテストを行う
        </Anchor>
        <EditArea />
      </Container>
    </NotificationsProvider>
  );
}

export default App;
