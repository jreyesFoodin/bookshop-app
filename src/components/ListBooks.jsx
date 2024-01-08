import { Card, Button, Col, Stack } from 'react-bootstrap'

const ListBooks = ({ item, handleEditForm, handledButtonRemove }) => {
  return (
    <>
      <Col>
        <Card>
          <Card.Img variant='top' width={200} height={300} src={item.urlImg} />
          <Card.Body>
            <Card.Title>{item.nameBook}</Card.Title>
            <Card.Text> {item.descriptionBook} </Card.Text>
            <Card.Text>Stock: {item.stock}</Card.Text>
            <Stack gap={2} className='col-md-5 mx-auto'>
              <Button variant='secondary' onClick={() => handleEditForm(item)}>Editar</Button>
              <Button variant='outline-secondary' onClick={() => handledButtonRemove(item)}>Remover</Button>
            </Stack>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}

export default ListBooks
