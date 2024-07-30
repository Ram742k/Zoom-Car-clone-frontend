import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import '../css/profile.css'; 


const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  picture: Yup.mixed().test('fileSize', 'The file is too large', 
    value => !value || (value && value.size <= 2 * 1024 * 1024)) // Limit to 2MB
});

const Profile = () => {
  const { user, updateProfile, setProfilePicture, deleteUser } = useContext(AuthContext);

  if (!user) {
    return <div>Please log in to view your profile</div>;
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      
      if (values.name !== user.name) {
        await updateProfile(values.name);
      }

      if (values.picture) {
        const formData = new FormData();
        formData.append('picture', values.picture);
        await setProfilePicture(formData);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="container profile-container mt-5">
      <h1 className="text-center mb-4">Profile</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 text-center mb-4">
          <p><strong>Name:</strong> {user?.name}</p>
          {user?.profilePicture && (
            <div>
              <p><strong>Profile Picture:</strong></p>
              <img 
                src={`http://localhost:5000/${user.profilePicture.replace(/\\/g, '/')}`} 
                alt="Profile" 
                className="profile-picture img-thumbnail"
              />
            </div>
          )}
        </div>
        <div className="col-md-6">
          <Formik
            initialValues={{ name: user?.name || '', picture: null }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <div className="form-group mb-3">
                  <Field
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="New Name"
                  />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="file"
                    name="picture"
                    className="form-control"
                    onChange={(event) => {
                      setFieldValue('picture', event.currentTarget.files[0]);
                    }}
                  />
                  <ErrorMessage name="picture" component="div" className="text-danger" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Updating...' : 'Update Profile'}
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-3">
            <button className="btn btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
