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
 
 
 
const ProdCRUD = () => {
 
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const[ProductId,setProductId] = useState(0);
  const[ProductName, setProductName] = useState('')
  const[ProductCost, setProductCost] = useState(0)
  const[Quantity, setQuantity] = useState(0)
 
  const[editProductDetailsId, seteditProductDetailsId] = useState(0);
  const[editProductName, seteditProductName] = useState('')
  const[editProductCost, seteditProductCost] = useState(0)
  const[editQuantity, seteditQuantity] = useState(0)

  // const [ProductIdError, setIdError] = useState('');
  //   const [ProductNameError, setNameError] = useState('');
  //   const [CostError, setCostError] = useState('');
  //   const [QuantityError, setQuantityError] = useState('');
 
 
  // const proddata = [
  //   {
  //       ProductId : 1,
  //       ProductName : "OnePlus",
  //       ProductCost : 65000,
  //       Quantity : 1
  //   },
  //   {
  //       ProductId : 2,
  //       ProductName : "Apple IPhone 15",
  //       ProductCost : 75000,
  //       Quantity : 1
  //   },
  //   {
  //       ProductId : 1,
  //       ProductName : "Samsung Flip",
  //       ProductCost : 65000,
  //       Quantity : 1
  //   }
 
  //  ]
  const [data, setData] = useState([]);
 
  useEffect(() => {
      getData();
       },[])
 
  const getData = () =>{
    axios.get('http://localhost:5122/api/ProductDetails')
    .then((result)=>{
    setData(result.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  function editvalidateFields() {
    let isValid = true;
    if (editProductDetailsId==0) {
       
        alert('Product Details cannot be empty');
        isValid = false;
    } 
 
    if (!editProductName) {
       
        alert('Product Name cannot be empty');
        isValid = false;
    } 
 
    if (editProductCost==0) {
       
        alert('Product Cost cannot be empty');
        isValid = false;
    } 
    if (editQuantity==0) {
       
      alert('Quantity cannot be empty');
      isValid = false;
  }  
   
    return isValid;
  }

  function validateFields() {
    let isValid = true;
    if (ProductId==0) {
       
        alert('ProductId cannot empty');
        isValid = false;
    } 
 
    if (!ProductName) {
       
        alert('ProductName cannot empty');
        isValid = false;
    } 
 
    if (ProductCost==0) {
       
        alert('ProductCost cannot empty');
        isValid = false;
    } 
 
    if (Quantity==0) {
        
        
        alert('ProductQuantity cannot empty');

        isValid = false;
    } 
    return isValid;
  }
 
 
  const handleEdit = (ProductId) =>{
    //alert(ProductId);
    handleShow();
    axios.get(`http://localhost:5122/api/ProductDetails/${ProductId}`)
    .then((result)=>{
        seteditProductName(result.data.productName);
        seteditProductCost(result.data.productCost);
        seteditQuantity(result.data.quantity);
        seteditProductDetailsId(result.data.productId);
     
        })
        .catch((error)=>{
          console.log(error)
        })
  }
 
  const handleDelete = (ProductId) => {
    console.log(ProductId);
    if (window.confirm("Confirm Deletion") == true) {
      axios.delete(`http://localhost:5122/api/ProductDetails/${ProductId}`)
      .then((result)=>{
        if(result)
        {
          toast.success('Product Deleted');
          getData();
        }
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  }
 
   
  const handleUpdate =()=>{
    if (editvalidateFields())
    
    {

      const url = `http://localhost:5122/api/ProductDetails/${editProductDetailsId}`
      const data = {
          "ProductDetailsId" : editProductDetailsId,
          "ProductName" : editProductName,
          "ProductCost" : editProductCost,
          "Quantity" : editQuantity
      }
   
      axios.put(url,data)
      .then((result)=>{
        getData();
        clear();
        toast.success('Product Updated succesfully');
      }).catch((error)=>{
        toast.error(error);
      })

    }
   
     
   
     
  }
 
  const handleSave=() =>{
    if(validateFields())
    
    {

      const url='http://localhost:5122/api/ProductDetails';
      const data = {
        "ProductId":ProductId,
          "ProductName" : ProductName,
          "ProductCost" : ProductCost,
          "Quantity" : Quantity
      }
   
      axios.post(url,data)
      .then((result)=>{
        getData();
        clear();
        toast.success('Product Added succesfully');
      }).catch((error)=>{
        toast.error(error);
      })


    }
    
  }
 
  const clear = ()=>{
    setProductId(0);
    setProductName(" ");
    setProductCost(0);
    setQuantity(0);
    seteditProductName("");
    seteditProductCost(0);
    seteditQuantity(0);
 
  }
   
 
 
 
  return(
 
    <>
     <ToastContainer/>
     <Container>
        <Row>
          <Col>
          <input type="text" className="form-control" placeholder="Enter Product Id" value={ProductId} onChange={(e)=>setProductId(e.target.value)}/>
         
          </Col>
          <Col>
          <input type="text" className="form-control" placeholder="Enter Product Name" value={ProductName} onChange={(e)=>setProductName(e.target.value)}/>
          
          </Col>
          <Col>
          <input type="text" className="form-control" placeholder="Enter Cost" value={ProductCost} onChange={(e)=>setProductCost(e.target.value)}/>
          </Col>
          <Col>
          <input type="text" className="form-control" placeholder="Enter Quantity" value={Quantity}onChange={(e)=>setQuantity(e.target.value)}/>
          </Col>
          <Col>
          <button className="btn btn-primary" onClick={()=>handleSave()}>Submit</button>
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Name</th>
          <th>ProductCost</th>
          <th>Availbale Quantity</th>
        </tr>
      </thead>
      <tbody>
        {
            data && data.length >0?
              data.map((item,index)=>{
                return(
                    <tr key={index}>
                       <td>{item.productId}</td>
                       <td>{item.productName}</td>
                       <td>{item.productCost}</td>
                       <td>{item.quantity}</td>
                       <td colSpan={2}>
                           <button className="btn btn-primary" onClick={()=>handleEdit(item.productId)}>Edit</button> &nbsp;
                           <p>{item.ProductId}</p>
                           <button className="btn btn-danger" onClick={()=>handleDelete(item.productId)}>Delete</button>
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
          <Modal.Title>Product Modification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
        <Col>
          <input type="text" className="form-control" placeholder="Enter Product Name" value={editProductName} onChange={(e)=>seteditProductName(e.target.value)}/>
          </Col>
          <Col>
          <input type="text" className="form-control" placeholder="Enter Cost" value={editProductCost} onChange={(e)=>seteditProductCost(e.target.value)}/>
          </Col>
          <Col>
          <input type="text" className="form-control" placeholder="Enter Quantity" value={editQuantity}onChange={(e)=>seteditQuantity(e.target.value)}/>
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
 
export default ProdCRUD