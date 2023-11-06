import { styled, Box } from '@mui/material'

export const WhiteWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.spacing(1),
  height:'calc(100vh/2 - 64px)'
}))
