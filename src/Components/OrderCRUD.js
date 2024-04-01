import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from 'bootstrap';
import { Dropdown } from "react-bootstrap";
 
 
 
const OrderCRUD = () => {
 
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   const[OrderId,setOrderId]=useState(0);
  const[CId,setCId] = useState(0);
  const[ProductId,setProductId] = useState(0);
  const[Quantity, setQuantity] = useState(0);
  const[StatusId, setStatusId] = useState(0);
  const [status,setstatus]=useState('');
 
  const[editOrderId, seteditOrderId] = useState(0);
  const[editCId, seteditCId] = useState(0)
  const[editProductId, seteditProductId] = useState(0);
  const[editQuantity, seteditQuantity] = useState(0);
  const[editStatusId, seteditStatusId] = useState(0);
 
 
  const [data, setData] = useState([]);
 
  useEffect(() => {
      getData();
       },[])
 
  const getData = () =>{
    axios.get('http://localhost:5122/api/OrderDetails')
    .then((result)=>{
    setData(result.data)
    if((result.data.statusId) == 0){
      setstatus('Packed');
    }
    if((result.data.statusId) == 1){
      setstatus('Success');
    }
    if((result.data.statusId == 2)){
      setstatus('Delivering');
    }

    })
    .catch((error)=>{
      console.log(error)
    })
  }
  function editvalidateFields() {
    let isValid = true;
    if (editOrderId==0) {
       
        alert('Order ID cannot be empty');
        isValid = false;
    } 
 
    if (editCId==0) {
       
        alert('Customer ID cannot be empty');
        isValid = false;
    } 
 
    if (editProductId==0) {
       
        alert('Product ID cannot be empty');
        isValid = false;
    } 
    if (editQuantity==0) {
       
      alert('Quantity cannot be empty');
      isValid = false;
  } 
 
  if (editStatusId==0) {
       
    alert('Status Id cannot be  empty');
    isValid = false;
   } 
   
  
    return isValid;
  }
 
  const handleEdit = (OrderId) =>{
    //alert(ProductId);
    handleShow();
    axios.get(`http://localhost:5122/api/OrderDetails/${OrderId}`)
    .then((result)=>{
        seteditOrderId(result.data.orderId);
        seteditCId(result.data.cid);
        seteditProductId(result.data.productId);
        seteditQuantity(result.data.quantity);
        seteditStatusId(result.data.statusId);
     
        })
        .catch((error)=>{
          console.log(error)
        })
  }
 
  const handleDelete = (OrderId) => {
    
    if (window.confirm("Confirm Cancellation") == true) {
      axios.delete(`http://localhost:5122/api/OrderDetails/${OrderId}`)
      .then((result)=>{
        if(result)
        {
          toast.success('Order Cancelled');
          getData();
        }
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  }
 
   
  const handleUpdate =()=>{
    if(editvalidateFields()){
    const url = `http://localhost:5122/api/OrderDetails/${editOrderId}`
    const data = {
        "OrderId" : editOrderId,
        "CId" : editCId,
        "ProductId" : editProductId,
        "Quantity" : editQuantity,
        "StatusId" : editStatusId
    }
 
    axios.put(url,data)
    .then((result)=>{
      getData();
      clear();
      toast.success('Order Updated succesfully');
    }).catch((error)=>{
      toast.error(error);
    })
     
  }
     
  }
  function validateFields() {
    let isValid = true;
    if (OrderId==0) {
       
        alert('Order ID cannot be empty');
        isValid = false;
    } 
 
    if (CId==0) {
       
        alert('Customer ID cannot be empty');
        isValid = false;
    } 
 
    if (ProductId==0) {
       
        alert('Product ID cannot be empty');
        isValid = false;
    } 
    if (Quantity==0) {
       
      alert('Quantity cannot be empty');
      isValid = false;
  } 
 
  if (StatusId==0) {
       
    alert('Status Id cannot be  empty');
    isValid = false;
   } 
   
  
    return isValid;
  }
 
 
  const handleSave=() =>{
    if(validateFields()){
    const url='http://localhost:5122/api/OrderDetails';
    const data = {
      "OrderId": OrderId,
        "StatusId" : StatusId,
        "ProductId" : ProductId,
        "Quantity" : Quantity,
        "CId": CId,
    }
 
    axios.post(url,data)
    .then((result)=>{
      getData();
      clear();
      toast.success('Order Added succesfully');
    }).catch((error)=>{
      toast.error(error);
    })
  }
  }
 
  const clear = ()=>{
    setCId(0);
    setProductId(0)
    setStatusId(0);
    setQuantity(0);
    seteditOrderId(0);
    seteditCId(0);
    seteditProductId(0);
    seteditStatusId(0);
    seteditQuantity(0);
 
  }
   
 
 
 
  return(
 
    <>
     <ToastContainer/>
     <Container>
        <Row>
        <Col>
          <input type="text" className="form-control" placeholder="Enter orderID" value={OrderId} onChange={(e)=>setOrderId(e.target.value)}/>
          </Col>
          <Col>
          <input type="text" className="form-control" placeholder="Enter CustomerID" value={CId} onChange={(e)=>setCId(e.target.value)}/>
          </Col>
          <Col>
          <input type="text" className="form-control" placeholder="Enter ProductID" value={ProductId} onChange={(e)=>setProductId(e.target.value)}/>
          </Col>
          <Col>
          <input type="text" className="form-control" placeholder="Enter Quantity" value={Quantity} onChange={(e)=>setQuantity(e.target.value)}/>
          </Col>
          <Col>
          <input type="text" className="form-control" placeholder="Enter StatusID" value={StatusId} onChange={(e)=>setStatusId(e.target.value)}/>
          </Col>
          <Col>
          <button className="btn btn-primary" onClick={()=>handleSave()}>Submit</button>
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover>
      <thead>
        <tr>
          
          <th>Order  id</th>
          <th>CId</th>
          <th>Product id</th>
          <th>Quantity</th>
          <th><Dropdown>
          StatusId
         <Dropdown.Toggle style={{ border: "none", background: "none" }}>
                             <img
                                 
                                 height="50px"
                                 title="info"
                                 src="https://www.logolynx.com/images/logolynx/18/188a80cc5cd1f0dadd54f543e40885a3.jpeg"
                                alt="person logo"
                                 className="p-1"
                             />
                        </Dropdown.Toggle>
        

                         <Dropdown.Menu className="ms-auto">
                      
                           
                        <Dropdown.Item >Status 0=Packed</Dropdown.Item>
                        <Dropdown.Item >Status 1=Success</Dropdown.Item>
                        <Dropdown.Item >Status 2=Delivering</Dropdown.Item>

                        </Dropdown.Menu>
                        </Dropdown>
                        </th>
          
          
        </tr>
      </thead>
      <tbody>
        {
            data && data.length >0?
              data.map((item,index)=>{
                return(
                    <tr key={index}>
                       
                       <td>{item.orderId}</td>
                       <td>{item.cid}</td>
                       <td>{item.productId}</td>
                       <td>{item.quantity}</td>
                       <td>{item.statusId} {status}</td>
                       <td colSpan={2}>
                           <button className="btn btn-primary" onClick={()=>handleEdit(item.orderId)}>Edit</button> &nbsp;
                           <p>{item.ProductId}</p>
                           <button className="btn btn-danger" onClick={()=>handleDelete(item.orderId)}>Delete</button>
                       </td>
                  </tr>
                )
               
            })
            :
            "Loading..."
        }
      </tbody>
    </Table>
 
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Modification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
        <Col>
          <input type="text" className="form-control" placeholder="Enter CustomerID" value={editCId} onChange={(e)=>seteditCId(e.target.value)}/>
          </Col>
        <Col>
          <input type="text" className="form-control" placeholder="Enter ProductID" value={editProductId} onChange={(e)=>seteditProductId(e.target.value)}/>
          </Col>
          <Col>
          <input type="text" className="form-control" placeholder="Enter Quantity" value={editQuantity} onChange={(e)=>seteditQuantity(e.target.value)}/>
          </Col>
          <Col>
          <input type="text" className="form-control" placeholder="Enter StatusID" value={editStatusId}onChange={(e)=>seteditStatusId(e.target.value)}/>
          </Col>
         
        </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
 
export default OrderCRUD