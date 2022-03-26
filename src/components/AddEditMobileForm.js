import React, { useState } from "react";
import { Modal, Text } from "@nextui-org/react";
import axios from "axios";
import { mobileServiceType } from "../Services/utils";

function AddEditMobileForm({ editMode, editsubs }) {
  const [msisdn, setmsisdn] = useState(editsubs?.msisdn === "" ? "" : editsubs?.msisdn);
  const [customer_id_owner, setcustomer_id_owner] = useState(editsubs?.customer_id_owner === "" ? "" : editsubs?.customer_id_owner);
  const [customer_id_user, setcustomer_id_user] = useState(editsubs?.customer_id_user === "" ? "" : editsubs?.customer_id_user);
  const [service_type, setservice_type] = useState(editsubs?.service_type === undefined ? "Prepaid" : editsubs?.service_type);

  // logic to add/edit mobile subscribers
  const addEditForm = async () => {
    if (editMode) {
      editMobileSubs();
    } else {
      addMobileSubs();
    }
  };

  // logic to addMobileSubs
  const addMobileSubs = async () => {
    const data = {
      msisdn: msisdn,
      customer_id_owner: parseInt(customer_id_owner),
      customer_id_user: parseInt(customer_id_user),
      service_type: service_type,
    };
    axios
      .post("http://localhost:3001/mobile-sub", data)
      .then((response) => {
        alert("Mobile Subscriber Added")
            window.location.reload()
      })
      .catch((error) => {
        alert("Error Adding Subscriber. Try Again")
        window.location.reload()
      });
  };

  // logic to editMobileSubs
  const editMobileSubs = async () => {
    const data = {
      msisdn: msisdn,
      customer_id_owner: parseInt(customer_id_owner),
      customer_id_user: parseInt(customer_id_user),
      service_type: service_type,
    };

    axios
      .put(`http://localhost:3001/mobile-sub/${editsubs._id}`, data)
      .then((response) => {
        alert("Editing Successful")
        window.location.reload()
      })
      .catch((error) => {
        alert("Error Editing Subscriber. Try Again")
        window.location.reload()
      });
  };


  return (
    <div>
      <Modal.Header>
        <Text id="modal-title" size={18}>
          <Text b size={18}>
            {editMode ? `Edit Subscriber ` : `Add Subscriber`}
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <div className="grid md:grid-cols-2 grid-cols-1 ">
          <div className="mx-1 mb-2">
          <input
              type="text"
              required
              defaultValue={msisdn || ""}
              placeholder="Phone Number"
              onChange={(e) => setmsisdn(e.target.value)}
              className="w-full h-10 rounded-lg border-2 px-2 focus:outline-gray-400"
            />
          </div>
          <div className="mx-1">
          <select
              className="w-full h-10 rounded-lg focus:outline-gray-400 border-2"
              onChange={(e) => {
                setservice_type(e.target.value);
              }}
            >
              {mobileServiceType.map((serviceType, index) => {
                return (
                  <option value={serviceType.name} key={index}>
                    {serviceType.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 ">
          <div className="mx-1 mb-2">
            <input
              type="number"
              required
              defaultValue={customer_id_owner || ""}
              placeholder="Owner Id"
              onChange={(e) => setcustomer_id_owner(e.target.value)}
              className="w-full h-10 rounded-lg border-2 px-2 focus:outline-gray-400"
            />
          </div>
          <div className="mx-1">
            <input
              type="number"
              required
              defaultValue={customer_id_user || ""}
              placeholder="User Id"
              onChange={(e) => setcustomer_id_user(e.target.value)}
              className="w-full h-10 rounded-lg border-2 px-2 focus:outline-gray-400"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="bg-blue-700 md:w-40 w-full rounded-lg h-10 text-white"
          onClick={addEditForm}
        >
          {editMode ? `Edit Subscriber ` : `Add Subscriber`}
        </button>
      </Modal.Footer>
    </div>
  );
}

export default AddEditMobileForm;
