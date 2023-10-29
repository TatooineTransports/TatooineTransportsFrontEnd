import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { palette } from '../../../../theme/pallete';

 export const SearchButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: palette.white,
  backgroundColor: palette.gunmetalB,
  '&:hover': {
    backgroundColor: palette.white,
    color: palette.teal
  },
}));

export const DeleteButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: palette.black,
  backgroundColor: palette.errorRed1,
  '&:hover': {
    backgroundColor: palette.errorRed2,
    color: palette.white
  },
}));
