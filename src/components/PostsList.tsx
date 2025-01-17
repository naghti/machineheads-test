import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Avatar, Button, List } from "antd"
import { Post } from '../models/IPost'
import { formatDate } from '../utils/dateUtils'

interface PostsListProps {
  posts: Post[]
  openEditor: (itemId: number) => void
  delItem: (itemId: number) => void
  deletingPostId: number
}

function PostsList({
  posts,
  delItem,
  openEditor,
  deletingPostId,
}: PostsListProps) {
  return (
    <>
      <List
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page)
          },
          pageSize: 5,
        }}
        bordered
        loading={false}
        dataSource={posts}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => openEditor(item.id)}>
                <EditOutlined />
                Редактировать
              </Button>,
              <Button
                type="primary"
                danger
                onClick={() => delItem(item.id)}
                loading={item.id === deletingPostId}
              >
                <DeleteOutlined /> Удалить
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  shape="square"
                  size="large"
                  src={item.previewPicture.url}
                />
              }
              title={item.title}
              description={`${item.authorName} опубликовал в ${formatDate(
                item.createdAt
              )}`}
            />
          </List.Item>
        )}
      />
    </>
  )
}

export default PostsList