import { styled, Box } from '@mui/material'

export const WhiteWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.spacing(1),
  minHeight:'calc(100vh/2 - 64px)'
}))
