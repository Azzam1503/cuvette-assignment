import React, { useState } from "react";
import axios from "axios";
import "../styles/Create.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    title: "",
    description: "",
    experienceLevel: "",
    endDate: "",
  });

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
        "http://localhost:8000/api/company/login",
        details,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChage = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
    <div className="create-div">
      <div className="">
        <h2>Create Job Post</h2>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter Title"
            value={details.title}
            onChange={handleChage}
          />
        </div>
        <div>
          <label htmlFor="">Description</label>
          <textarea
            rows={10}
            cols={45}
            type="text"
            name="description"
            id="description"
            placeholder="Enter Description"
            value={details.description}
            onChange={handleChage}
          />
        </div>
        <div>
          <label htmlFor="expericeLevel">Expericence Level</label>
          <select
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
          <label htmlFor="data">End date</label>
          <input
            type="date"
            name="date"
            id="date"
            placeholder="Select a date"
            required
            value={details.data}
            onChange={handleChage}
          />
        </div>
        <div>
          <label htmlFor="">Add candidates</label>
          <input
            type="text"
            placeholder="Company Email"
            value={candidate.email}
            onChange={(e) => setCandidate({
              ...candidate, 
              email: e.target.value
            })}
          />
          <button type="button" onClick={addCandidate}>Add</button>
        </div>
            <div>{candidates.map((candidate) => (
              <div key={candidate.id}>
                <span>{candidate.email}</span>  
                <button type="button" onClick={() => removeCandidate(candidate.id)}>X</button>
              </div>
            ))}</div>
        <br />
        <button className="btn" onClick={handleSubmit}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
