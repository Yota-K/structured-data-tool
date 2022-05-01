import { forwardRef } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// 参考: https://mui.com/material-ui/react-snackbar/-content
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default Alert;
