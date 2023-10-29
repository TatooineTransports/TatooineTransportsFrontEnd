import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { palette } from '../../../../theme/pallete';

 export const NavButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: palette.gunmetalB,
  backgroundColor: palette.white,
  '&:hover': {
    backgroundColor: palette.cerulean,
    color: palette.white
  },
}));
