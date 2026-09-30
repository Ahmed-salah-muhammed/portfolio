import { Component } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// One broken section must never take the whole page down.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error(`[${this.props.name ?? 'section'}] failed to render`, error, info);
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <Box sx={{ py: 8, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="body2">
          This section could not be displayed.
        </Typography>
      </Box>
    );
  }
}
