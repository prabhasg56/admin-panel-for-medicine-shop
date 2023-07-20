import React from "react";

const MedicineList = () => {
  return (
    <>
      <div class="container mt-3">
        <h2 className="text-center">Medicine List</h2>
        <table class="table">
        <thead>
        <tr>
          <th>Medicine Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
          <th></th>
        </tr>
      </thead>
          <tbody>

            <tr>
              <td class="text-dark">Dolo</td>
              <td className="text-secondary">headache and fever</td>
              <td  className="text-secondary">{ `Rs ${5}`}</td>
              <td  className="text-secondary">{100}</td>

              <td>
                <button type="button" className="btn btn-success text-white fw-bold">
                  Add to bill
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MedicineList;
