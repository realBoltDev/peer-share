import { Card, Container, SimpleGrid, Text, Title, useMantineTheme } from '@mantine/core';
import { gridData } from '@/data/about';
import classes from './AboutCards.module.css';

export function AboutCards() {
  const theme = useMantineTheme();

  const features = gridData.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon size={50} stroke={1.5} color={theme.colors.blue[6]} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="lg">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Transfer files instantly and privately across any device with PeerShare.
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Built for speed, privacy and simplicity. WebRTC technology lets you share files directly - no servers, no signups, no data limits.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
