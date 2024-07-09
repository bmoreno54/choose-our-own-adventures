export async function deleteStory(storyId, user) {
  try {
    const response = await fetch(`/api/stories/${storyId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete the story');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting story:', error);
    throw error;
  }
}

/**
 * ACS - storyActions.js
 *
 * This file contains utility functions for handling story-related actions such as deletion.
 *
 * Functions:
 * - deleteStory: Sends a DELETE request to remove a story.
 *
 * Parameters:
 * - storyId: The ID of the story to delete.
 * - user: The user requesting the deletion.
 *
 * Return:
 * - The response data from the DELETE request.
 *
 * ACS:
 * - This ACS section provides an overview of the file's functionality and structure,
 *   serving as a guide for developers to understand and extend the code.
 */
