import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
} from 'antd'

interface AppFormDrawerProps {
  isEditorOpen: boolean
  close: () => void
  title: string
  children: JSX.Element
}

function AppFormDrawer({
  isEditorOpen,
  close,
  children,
  title,
}: AppFormDrawerProps) {
  return (
    <>
      <Drawer
        title={title}
        width="80vw"
        onClose={close}
        open={isEditorOpen}
        className='mb-20'
      >
        {children}
      </Drawer>
    </>
  )
}

export default AppFormDrawer