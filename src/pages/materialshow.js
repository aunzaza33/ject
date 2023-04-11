import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './materialshow.css';

function Materialshow() {

  const [material, setMaterial] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    getMaterial();
  }, []);

  const getMaterial = async () => {
    const response = await Axios.get('http://localhost:3001/material');
    setMaterial(response.data);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  //page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = material.filter(val =>
    val.material_name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(material.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="columns mt-3 is-centered">
      <div className="column is-half">
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="ค้นหาวัสดุ"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">ลำดับ</th>
              <th scope="col">เลขวัสดุ</th>
              <th scope="col">ชื่อ</th>
              <th scope="col">ราคา</th>
              <th scope="col">คงเหลือ</th>
              <th scope="col">หน่วยนับ</th>
              <th scope="col">แก้ไข</th>
              <th scope="col">รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((val, index) => (
              <tr key={val.material_Id}>
                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td scope="row">{val.material_Id}</td>
                <td>{val.material_name}</td>
                <td>{val.material_price}</td>
                <td>{val.material_remaining}</td>
                <td>{val.material_unit}</td>
                <td><Link to={`/materialedit/${val.material_Id}`} className="btn btn-warning">แก้ไข</Link></td>
                <td><Link to={`/mdetail/${val.material_Id}`} className="btn btn-primary">ดู</Link></td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav>
          <ul className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Materialshow;