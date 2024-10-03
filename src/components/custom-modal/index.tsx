import { Box, Modal, ModalProps, styled } from '@mui/material'

interface TCustomModal extends ModalProps {
  handleClose: () => void
}

const StyleModal = styled(Modal)<ModalProps>(({ theme }) => ({
  zIndex: 1444,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

const CustomModal = (props: TCustomModal) => {
  const { open, handleClose, children } = props
  return (
    <StyleModal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={{
          height: '100%',
          width: '100vw',
          overflow: 'auto'
        }}
      >
        <Box sx={{ maxHeight: '100vh', overflow: 'auto' }}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              minHeight: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box sx={{ margin: '40px 0' }}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </StyleModal>
  )
}

export default CustomModal
