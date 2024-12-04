import { useState } from 'react';
import axios from 'axios';
import { OTHER_SERVICES } from '../helper/api';

const useOtherServices = () => {
  const [formData, setFormData] = useState({
    servicesAvailed: '',
    date: '',
    firstName: '',
    middleName: '',
    lastName: '', 
    sex: '',
    status: '',
    dateOfBirth: '',
    age: '',
    bloodType: '',
    bloodPressure: '',
    height: '',
    weight: '',
    relationship: '',
    prescription: ''
  });
  const [otherServices, setOtherServices] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const createNewOtherServices = async (data, user) => {
    setIsLoading(true);
    try {
      const response = await axios.post(OTHER_SERVICES, {
        ...data,
        nurseIncharge: user?.id,
        patientSignature: '',
        nurseSignature: ''
      });

      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOtherServices = async (otherServicesId, updatedData) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`${OTHER_SERVICES}/${otherServicesId}`, updatedData);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update service record');
    } finally {
      setIsLoading(false);
    }
  };

  const getOtherService = async (userId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${OTHER_SERVICES}/user/${userId}`);
      setOtherServices(response.data.data)
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch service record');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleInputChange,
    createNewOtherServices,
    updateOtherServices,
    getOtherService,
    otherServices,
    isLoading,
    setFormData
  };
};

export default useOtherServices;