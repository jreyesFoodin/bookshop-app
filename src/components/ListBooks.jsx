import { Card, Button, Col, Stack } from 'react-bootstrap'

const ListBooks = ({ item, handleEditForm, handledButtonRemove }) => {
  return (
    <>
      <Col>
        <Card>
          <Card.Body>
            <div className='col-md-5 mx-auto'>
              <img className='mb-3 size-portal' src={item.urlImg} />
            </div>
            <Card.Title>{item.nameBook}</Card.Title>
            <Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1 }}>
              {item.descriptionBook}
            </Card.Text>
            <Card.Text>Stock: {item.stock}</Card.Text>
            <Stack gap={2} className='col-md-5 mx-auto'>
              <Button variant='outline-success' onClick={() => handleEditForm(item)}>Editar</Button>
              <Button variant='outline-danger' onClick={() => handledButtonRemove(item)}>Remover</Button>
            </Stack>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}

export default ListBooks
