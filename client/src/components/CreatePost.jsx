import React, { useState } from "react";
import axios from "axios";
import "../styles/Create.css";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { FaTrash } from "react-icons/fa";

const CreatePost = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    title: "",
    description: "",
    experienceLevel: "",
    endDate: "",
  });
  console.log(details)
  const [candidate, setCandidate] = useState({
    id: null,
    email: ""
  });
  const [candidates, setCandidates] = useState([]);

  const options = [
    "Fresher",
    "1 year",
    "2 years",
    "3 years",
    "4 years",
    "more than 5 years",
  ];

  const addCandidate = () => {
    setCandidates([...candidates, {
      id: candidates.length + 1,
      email: candidate.email
    }]);
    setCandidate({
      id: null,
      email: ""
    })
  };
  const removeCandidate = (id) => {
    const filteredCandiates = candidates.filter((candidate) => candidate.id != id);
    setCandidates(filteredCandiates); 
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("I am called");
      const res = await axios.post(
        "http://localhost:8000/api/post/create",
        {...details, candidates},
        {
          withCredentials: true,
        }
      );
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }finally{

    }
  };

  const handleChage = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
    <div className="create-div">
      <div className="">
        <div>
          <label htmlFor="title" className="titles">Title</label>
          <input
          className="create-input title"
            type="text"
            name="title"
            id="title"
            placeholder="Enter Title"
            value={details.title}
            onChange={handleChage}
          />
        </div>
        <div className="text-area">
          <label htmlFor="description" className="text-area-label titles">Description</label>
          <textarea
            className="description"
            rows={5}
            cols={48}
            type="text"
            name="description"
            id="description"
            placeholder="Enter Description"
            value={details.description}
            onChange={handleChage}
          />
        </div>
        <div>
          <label htmlFor="expericeLevel" className="titles">Expericence</label>
          <select
            className="create-input experience"
            name="experienceLevel"
            id="experienceLevel"
            value={details.experienceLevel}
            onChange={handleChage}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="endDate" className="titles">End date</label>
          <input
            className="create-input date"
            type="date"
            name="endDate"
            id="endDate"
            placeholder="Select a date"
            required
            value={details.endDate}
            onChange={handleChage}
          />
        </div>
        <div>
          <label htmlFor="" className="titles">Add candidates</label>
          <input
            className="create-input candidates"
            type="text"
            placeholder="Company Email"
            value={candidate.email}
            onChange={(e) => setCandidate({
              ...candidate, 
              email: e.target.value
            })}
          />
          <button type="button" disabled={candidate.email.length < 5} className="add-candi-btn" onClick={addCandidate}><IoMdAdd /></button>
        </div>
            <div className="candidate-div">{candidates.map((candidate) => (
              <div key={candidate.id} >
                <span>{candidate.email}</span>  
                <button type="button" className="remove-candi-btn" onClick={() => removeCandidate(candidate.id)}><FaTrash /></button>
              </div>
            ))}</div>
        <br />
        <button className="send-btn" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
