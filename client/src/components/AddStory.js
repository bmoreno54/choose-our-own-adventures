// client/src/components/AddStory.js

import React, { useState } from 'react';
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root');

function AddStory({ onBack, onStoryCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  console.log('AddStory Component State:', { title, content, author, modalIsOpen });

  const openModal = () => {
    console.log('openModal called');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    console.log('closeModal called');
    setModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit called');
    openModal();
  };

  const confirmSubmit = async () => {
    console.log('confirmSubmit called');
    const newStory = { title, content, author };
    console.log('Submitting story:', newStory);

    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStory),
      });
      const data = await response.json();
      console.log('Story added:', data);
      if (response.ok) {
        closeModal();
        setTitle('');
        setContent('');
        setAuthor('');
        onStoryCreated(data._id); // Navigate to StoryInteraction with the newly created story
      } else {
        console.error('Error adding story:', data);
      }
    } catch (error) {
      console.error('Error adding story:', error);
      closeModal();
    }
  };

  console.log('Rendering AddStory Component');

  return (
    <div className="add-story-container">
      <h2>Add a New Story</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Story</button>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Story Submission"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <h2>Confirm Story Submission</h2>
        <p><strong>Title:</strong> {title}</p>
        <p><strong>Content:</strong> {content}</p>
        <p><strong>Author:</strong> {author}</p>
        <button onClick={confirmSubmit}>Confirm</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
      <button onClick={onBack}>Back to Main Menu</button>
    </div>
  );
}

export default AddStory;

/**
 * ACS - AddStory.js
 *
 * This component allows users to add a new story by filling out a form.
 * Before the story is added, a confirmation modal is shown to confirm the details.
 *
 * Props:
 * - onBack: A function to navigate back to the main menu.
 * - onStoryCreated: A function to handle navigation to StoryInteraction after creating a story.
 *
 * State:
 * - title: The title of the story.
 * - content: The content of the story.
 * - author: The author of the story.
 * - modalIsOpen: A boolean state to control the visibility of the confirmation modal.
 *
 * Handlers:
 * - handleSubmit: Handles form submission and opens the confirmation modal.
 * - confirmSubmit: Sends a POST request to the backend to add a new story, then closes the modal and navigates to StoryInteraction.
 * - openModal: Opens the confirmation modal.
 * - closeModal: Closes the confirmation modal.
 *
 * Debugging:
 * - Console logs to track the component state and method calls.
 *
 * Rendering:
 * - Renders a form with input fields for the title, content, and author, and a submit button.
 * - Renders a modal for confirming the story submission with options to confirm or cancel.
 * - Renders a button to navigate back to the main menu.
 *
 * ACS Enrichment Reminder:
 * - Ensure systematic enrichment of ACS during each file update.
 * - Check if the file needs modularization or refactoring.
 */
