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
 
 
 
const RoleCRUD = () => {
 
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const[RoleId,setRoleId] = useState(0);
  const[RoleName, setRoleName] = useState('')
  
 
  const[editRoleId, seteditRoleId] = useState(0);
  const[editRoleName, seteditRoleName] = useState('')
  
 
 
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
    axios.get('http://localhost:5122/api/RoleDetails')
    .then((result)=>{
    setData(result.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
 
  const handleEdit = (RoleId) =>{
    //alert(ProductId);
    handleShow();
    axios.get(`http://localhost:5122/api/RoleDetails/${RoleId}`)
    .then((result)=>{
        seteditRoleName(result.data.roleName);
        seteditRoleId(result.data.roleId);
      
        })
        .catch((error)=>{
          console.log(error)
        })
  }
 
  const handleDelete = (RoleId) => {
    console.log(RoleId);
    if (window.confirm("Confirm Deletion") == true) {
      axios.delete(`http://localhost:5122/api/RoleDetails/${RoleId}`)
      .then((result)=>{
        if(result)
        {
          toast.success('Role Deleted');
          getData();
        }
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  }
 
   
  const handleUpdate =()=>{
    const url = `http://localhost:5122/api/RoleDetails/${editRoleId}`
    const data = {
        "RoleId" : editRoleId,
        "RoleName" : editRoleName,
       
    }
 
    axios.put(url,data)
    .then((result)=>{
      getData();
      clear();
      toast.success('Role Updated succesfully');
    }).catch((error)=>{
      toast.error(error);
    })
     
    
     
  }
 
  const handleSave=() =>{
    const url='http://localhost:5122/api/RoleDetails';
    const data = {
      "RoleId":RoleId,
        "RoleName" : RoleName,
      
    }
 
    axios.post(url,data)
    .then((result)=>{
      getData();
      clear();
      toast.success('Role Added succesfully');
    }).catch((error)=>{
      toast.error(error);
    })
  }
 
  const clear = ()=>{
    setRoleName(" ");
    setRoleId(0);
    
    seteditRoleName("");
    seteditRoleId(0);
    
 
  }
   
 
 
 
  return(
 
    <>
     <ToastContainer/>
     <Container>
        <Row>
        <Col>
          <input type="text" className="form-control" placeholder="Enter Role Id" value={RoleId} onChange={(e)=>setRoleId(e.target.value)}/>
          </Col>
          <Col>
          <input type="text" className="form-control" placeholder="Enter Role Name" value={RoleName} onChange={(e)=>setRoleName(e.target.value)}/>
          </Col>
          
          <Col>
          <button className="btn btn-primary" onClick={()=>handleSave()}>Submit</button>
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Role ID</th>
          <th>RoleName</th>
          
        </tr>
      </thead>
      <tbody>
        {
            data && data.length >0?
              data.map((item,index)=>{
                return(
                    <tr key={index}>
                       <td>{item.roleId}</td>
                       <td>{item.roleName}</td>
                      
                       <td colSpan={2}>
                           <button className="btn btn-primary" onClick={()=>handleEdit(item.roleId)}>Edit</button> &nbsp;
                           
                           <button className="btn btn-danger" onClick={()=>handleDelete(item.roleId)}>Delete</button>
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
          <Modal.Title>Role Modification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
        <Col>
          <input type="text" className="form-control" placeholder="Enter Role ID" value={editRoleId} onChange={(e)=>seteditRoleId(e.target.value)}/>
          </Col>
          <Col>
          <input type="text" className="form-control" placeholder="Enter Role name" value={editRoleName} onChange={(e)=>seteditRoleName(e.target.value)}/>
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
 
export default RoleCRUD