import * as React from 'react';
import Typography from '@mui/material/Typography';
import { palette } from '../../../../theme/pallete';

interface TitleProps {
  children?: React.ReactNode;
}

export default function Title(props: TitleProps) {
  return (
    <Typography component="h2" variant="h6" color={palette.gunmetalB} gutterBottom>
      {props.children}
    </Typography>
  );
}