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
 
 
 
const CustCRUD = () => {
 
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
 const[CId,setCId]=useState(0);
  const[CName, setCName] = useState('')
  const[Address, setAddress] = useState('')
  const[CEmail, setCEmail] = useState('')
  const[CPhone,setCPhone]=useState('');
 
  const[editId, seteditId] = useState(0);
  const[editName, seteditName] = useState('')
  const[editAddr, seteditAddr] = useState('')
  const[editEmail, seteditEmail] = useState('')
 const[editPhone,seteditPhone]=useState('')
 
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
    axios.get('http://localhost:5122/api/CustomerDetails')
    .then((result)=>{
    setData(result.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  function editvalidateFields() {
    let isValid = true;
    if (editId==0) {
       
        alert('Customer Id cannot empty');
        isValid = false;
    } 
 
    if (!editName) {
       
        alert('Customer Name cannot be empty');
        isValid = false;
    } 
 
    if (!editEmail) {
       
        alert('Email cannot be empty');
        isValid = false;
    } 
    if (!editAddr) {
       
      alert('Address cannot be empty');
      isValid = false;
  } 
 
  if (!editPhone) {
       
    alert('Phone Number cannot be  empty');
    isValid = false;
   }  
    return isValid;
  }
  function validateFields() {
    let isValid = true;
    if (CId==0) {
       
        alert('Customer Id cannot empty');
        isValid = false;
    } 
 
    if (!CName) {
       
        alert('Customer Name cannot be empty');
        isValid = false;
    } 
 
    if (!CEmail) {
       
        alert('Email cannot be empty');
        isValid = false;
    } 
    if (!Address) {
       
      alert('Address cannot be empty');
      isValid = false;
  } 
 
  if (!CPhone) {
       
    alert('Phone Number cannot be  empty');
    isValid = false;
   }  
    return isValid;
  }
 
  const handleEdit = (cid) =>{
    //alert(ProductId);
    handleShow();
    axios.get(`http://localhost:5122/api/CustomerDetails/${cid}`)
    .then((result)=>{
        seteditName(result.data.cname);
        seteditAddr(result.data.cemail);
        seteditEmail(result.data.address);
        seteditPhone(result.data.cphone)
        seteditId(result.data.cid);
     
        })
        .catch((error)=>{
          console.log(error)
        })
  }
 
  const handleDelete = (DetailsId) => {
    console.log(DetailsId);
    if (window.confirm("Confirm Deletion") == true) {
      axios.delete(`http://localhost:5122/api/CustomerDetails/${DetailsId}`)
      .then((result)=>{
        if(result)
        {
          toast.success('Customer Deleted');
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
    const url = `http://localhost:5122/api/CustomerDetails/${editId}`
    const data = {
        "cid" : editId,
        "cname" : editName,
        "address":editAddr,
        "cemail" : editEmail,
        "cphone" : editPhone,
       
 
    }
 
    axios.put(url,data)
    .then((result)=>{
      getData();
      clear();
      toast.success('Customer Updated succesfully');
    }).catch((error)=>{
      toast.error(error);
    })
  }
     
   
     
  }
 
  const handleSave=() =>{
    if(validateFields()){
    const url='http://localhost:5122/api/CustomerDetails';
    const data = {
      "CID":CId,
        "CName" : CName,
        "CEmail" : CEmail,
        "CPhone" :CPhone,
        "Address":Address
    }
 
    axios.post(url,data)
    .then((result)=>{
      getData();
      clear();
      toast.success('Customer Added succesfully');
    }).catch((error)=>{
      toast.error(error);
    })
  }
  }
 
  const clear = ()=>{
    setCId(0);
    setCName(" ");
    setCEmail('');
    setAddress('');
    setCPhone('');
    seteditName("");
    seteditAddr("");
    seteditEmail("");
    seteditPhone("");
 
  }
   
 
 
 
  return(
 
    <>
     <ToastContainer/>
     <Container>
        <Row>
        <Col>
          <input type="text" className="form-control" placeholder="Enter CustomerId" value={CId} onChange={(e)=>setCId(e.target.value)}/>
          </Col>
          <br/>
          <Col>
          <input type="text" className="form-control" placeholder="Enter Customer Name" value={CName} onChange={(e)=>setCName(e.target.value)}/>
          </Col>
          <br/>
          <Col>
          <input type="text" className="form-control" placeholder="Enter EMail" value={CEmail} onChange={(e)=>setCEmail(e.target.value)}/>
          </Col>
          <br/>
          <Col>
          <input type="text" className="form-control" placeholder="Enter Phone Number" value={CPhone}onChange={(e)=>setCPhone(e.target.value)}/>
          </Col>
          <br/>
          <Col>
          <input type="text" className="form-control" placeholder="Enter Address" value={Address}onChange={(e)=>setAddress(e.target.value)}/>
          </Col>
          <br/>
          <Col>
          <button className="btn btn-primary" onClick={()=>handleSave()}>Submit</button>
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>CustomerId</th>
          <th>CustomerName</th>
          <th>CustomerEmail</th>
          <th>CustomerPhone</th>
          <th>CustomerAddress</th>
        </tr>
      </thead>
      <tbody>
        {
            data && data.length >0?
              data.map((item,index)=>{
                return(
                    <tr key={index}>
                       <td>{item.cid}</td>
                     
                       <td>{item.cname}</td>
                       <td>{item.cemail}</td>
                       <td>{item.cphone}</td>
                       <td>{item.address}</td>
                       <td colSpan={2}>
                           <button className="btn btn-primary" onClick={()=>handleEdit(item.cid)}>Edit</button> &nbsp;
                           <p>{item.ProductId}</p>
                           <button className="btn btn-danger" onClick={()=>handleDelete(item.cid)}>Delete</button>
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
          <Modal.Title>Customer Modification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
        <Col>
          <input type="text" className="form-control" placeholder="Enter Customer Name" value={editName} onChange={(e)=>seteditName(e.target.value)}/>
          </Col>
          <Col>
          <input type="text" className="form-control" placeholder="Enter Customer Email" value={editEmail} onChange={(e)=>seteditEmail(e.target.value)}/>
          </Col>
          <Col>
          <input type="text" className="form-control" placeholder="Enter Customer Phone Number" value={editPhone}onChange={(e)=>seteditPhone(e.target.value)}/>
          </Col>
          <Col>
          <input type="text" className="form-control" placeholder="Enter Customer Address" value={editAddr}onChange={(e)=>seteditAddr(e.target.value)}/>
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
 
export default CustCRUD