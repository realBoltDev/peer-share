import { Paper, Text, useMantineTheme } from "@mantine/core";
import { AboutCards } from "@/components/AboutCards/AboutCards";

export function AboutPage() {
  const theme = useMantineTheme();

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <Paper shadow='xs' radius='sm' p='md' bg={theme.colors.dark[6]} m='md'>
        <AboutCards />
      </Paper>
    </div>
  );
}
