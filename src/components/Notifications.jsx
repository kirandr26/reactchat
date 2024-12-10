import React, { useState } from 'react';
import Footer from './Footer';
import AlertsHeader from './AlertsHeader';
import { Modal } from 'bootstrap'; // Import Bootstrap Modal

function Notifications() {
  const [modalName, setModalName] = useState('');
  const [modalContent, setModalContent] = useState('');

  // Function to handle showing the modal
  const handleShowModal = (event) => {
    // Ensure event is being passed and we can access currentTarget
    const alertListElement = event.currentTarget.closest('.alertList'); // Find closest .alertList
    const name = alertListElement.querySelector('.alertList_name h5').innerHTML;  // Get .alertList_name content
    const content = alertListElement.querySelector('.alertList_cnt').innerHTML;  // Get .alertList_cnt content

    console.log(name);
    console.log(content);

    // Optionally, combine content into a formatted string for display in the modal
    const combinedContent = `
      <strong>Details:</strong><br />
      <div><strong>Name:</strong> ${name}</div>
      <div><strong>Content:</strong> ${content}</div>
    `;

    // Set the content in the modal
    setModalName(name);
    setModalContent(content);

    // Show the modal
    const modalElement = document.getElementById('alertModal');
    const modalInstance = new Modal(modalElement); // Initialize Modal instance
    modalInstance.show();
  };

  return (
    <>
      <AlertsHeader />
      <div className="alersWrap">
        <div className="alertCard">
          <div className="day">
            <p>Today</p>
          </div>
          <div className="alertList" onClick={handleShowModal}>
            <div className="alertList_name">
              <h5>Vijay (Principal)</h5>
              <p className="timeStamp">8:14 PM</p>
            </div>
            <div className="alertList_cnt">
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat consequatur harum aliquid fugit ea distinctio saepe dolorum eum, accusamus porro temporibus necessitatibus omnis alias quaerat obcaecati, reprehenderit at odio quidem.</p>
            </div>
          </div>

          <div className="alertList" onClick={handleShowModal}>
            <div className="alertList_name">
              <h5>Max</h5>
              <p className="timeStamp">8:12 PM</p>
            </div>
            <div className="alertList_cnt">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat consequatur harum aliquid fugit ea distinctio saepe dolorum eum, accusamus porro temporibus necessitatibus omnis alias quaerat obcaecati, reprehenderit at odio quidem.</p>
            </div>
          </div>
        </div>

        <div className="alertCard">
          <div className="day">
            <p>Yesterday</p>
          </div>
          <div className="alertList" onClick={handleShowModal}>
            <div className="alertList_name">
              <h5>Vijay (Principal)</h5>
              <p className="timeStamp">Yesterday at 8:17 PM</p>
            </div>
            <div className="alertList_cnt">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat consequatur harum aliquid fugit ea distinctio saepe dolorum eum, accusamus porro temporibus necessitatibus omnis alias quaerat obcaecati, reprehenderit at odio quidem.</p>
            </div>
          </div>

          <div className="alertList" onClick={handleShowModal}>
            <div className="alertList_name">
              <h5>Max</h5>
              <p className="timeStamp">Yesterday at 8:13 PM</p>
            </div>
            <div className="alertList_cnt">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat consequatur harum aliquid fugit ea distinctio saepe dolorum eum, accusamus porro temporibus necessitatibus omnis alias quaerat obcaecati, reprehenderit at odio quidem.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal for Alert Details */}
      <div
        className="modal fade"
        id="alertModal"
        tabIndex="-1"
        aria-labelledby="alertModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="alertModalLabel"><div className='modalName' dangerouslySetInnerHTML={{ __html: modalName }} /></h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='modalBody' dangerouslySetInnerHTML={{ __html: modalContent }} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Notifications;
