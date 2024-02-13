import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { GET_ME, DELETE_BOOK } from '../utils/queries'; // Assuming DELETE_BOOK is the correct mutation

import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  // define mutation for adding a user
  const [createUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await createUser({
        variables: { ...userFormData }
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        {/* ... rest of the form fields and submit button */}
      </Form>
    </>
  );
};

export default SignupForm;
import Auth from '../utils/auth';



const SavedBooks = () => {
  const { loading, error, data } = useQuery(GET_ME);
  const [deleteBook] = useMutation(DELETE_BOOK); // Use the correct mutation name

  const userData = data?.me || {};

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook({
        variables: { bookId },
        update: (cache) => {
          const data = cache.readQuery({ query: GET_ME });
          const userDataCache = data.me;
          const savedBooksCache = userDataCache.savedBooks;
          const updatedBookCache = savedBooksCache.filter((book) => book.bookId !== bookId);
          data.me.savedBooks = updatedBookCache;
          cache.writeQuery({ query: GET_ME, data });
        }
      });
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };


};
